// Shared file-upload helper for all admin pages.
//
// Why this exists: Vercel Serverless Functions have a hard, non-configurable
// 4.5MB request body limit. Routing an uploaded file through our own API
// route (the old approach) meant anything over ~4.5MB — e.g. a product
// catalogue PDF with images — would always fail with no clear reason shown
// to the user.
//
// The fix is a "client direct upload": the browser uploads the file straight
// to Vercel Blob storage, and our server only ever handles a tiny JSON
// token-exchange request (well under the limit). This removes the 4.5MB
// ceiling entirely (files up to 50MB are allowed here — see upload-token
// route). If Blob isn't configured (e.g. local `npm run dev` without a
// connected store), the token request fails and we transparently fall back
// to the original small-file server-proxy upload so local development keeps
// working without any cloud setup.
//
// iPhone photos: iOS saves photos as HEIC/HEIF by default, a format most
// browsers (Chrome, Firefox, Edge — anything non-Safari) cannot display in
// an <img> tag. Rather than reject these uploads or let them silently show
// as broken images on the live site, we detect HEIC/HEIF here and convert
// it to a normal JPEG right in the browser before it's ever uploaded. This
// runs automatically for every admin upload (Gallery, Products,
// Certificates, Hero, etc.) since they all share this one function.

const HEIC_TYPES = ['image/heic', 'image/heif'];

async function convertHeicToJpegIfNeeded(file: File): Promise<File> {
  const looksHeic =
    HEIC_TYPES.includes(file.type.toLowerCase()) ||
    /\.hei[cf]$/i.test(file.name);
  if (!looksHeic) return file;

  try {
    const heic2any = (await import('heic2any')).default;
    const result = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.9 });
    const jpegBlob = Array.isArray(result) ? result[0] : result;
    const newName = file.name.replace(/\.hei[cf]$/i, '.jpg');
    return new File([jpegBlob], newName || 'photo.jpg', { type: 'image/jpeg' });
  } catch (err) {
    // If conversion fails for any reason, fall back to uploading the
    // original file rather than blocking the admin's upload entirely —
    // the upload-token route still allows HEIC/HEIF as a safety net.
    console.warn('[upload] HEIC to JPEG conversion failed, uploading original file:', err);
    return file;
  }
}

// Photos saved via "Save image as" from Google Images (and some other
// sources) are frequently given a ".jfif" extension — or no reliable MIME
// type at all — even though the underlying file is a normal JPEG. Browsers
// then report an empty/generic `file.type` for these, which our upload
// route doesn't recognise as an allowed image type. Previously this quietly
// fell through to the fallback proxy-upload path (which has a stricter size
// ceiling) and could appear to hang forever with no explanation. We instead
// resolve the correct content type from the file extension up front, so
// these files go straight through the normal, unlimited direct-to-Blob path
// like any other photo.
const EXT_TO_MIME: Record<string, string> = {
  jpg: 'image/jpeg', jpeg: 'image/jpeg', jfif: 'image/jpeg', jpe: 'image/jpeg', pjpeg: 'image/jpeg',
  png: 'image/png', gif: 'image/gif', webp: 'image/webp',
  heic: 'image/heic', heif: 'image/heif', pdf: 'application/pdf',
  mp4: 'video/mp4', webm: 'video/webm', mov: 'video/quicktime',
};

function resolveContentType(file: File): string {
  if (file.type && file.type !== 'application/octet-stream') return file.type;
  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  return EXT_TO_MIME[ext] || file.type || 'application/octet-stream';
}

// Wraps a promise so an upload can never spin forever with no feedback —
// if it hasn't settled within `ms`, we reject with a clear, actionable
// message instead of leaving the admin looking at a stuck "Uploading..."
// button indefinitely.
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Upload timed out after ${Math.round(ms / 1000)}s. Please check your internet connection and try again.`));
    }, ms);
    promise.then(
      (val) => { clearTimeout(timer); resolve(val); },
      (err) => { clearTimeout(timer); reject(err); }
    );
  });
}

export async function uploadFile(rawFile: File, type: string): Promise<string> {
  const file = await convertHeicToJpegIfNeeded(rawFile);
  const contentType = resolveContentType(file);
  const token = typeof window !== 'undefined' ? sessionStorage.getItem('maac_admin_token') || '' : '';
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const pathname = `uploads/${type}-${Date.now()}-${safeName}`;

  try {
    const { upload } = await import('@vercel/blob/client');
    const blob = await withTimeout(
      upload(pathname, file, {
        access: 'public',
        handleUploadUrl: '/api/admin/upload-token',
        clientPayload: JSON.stringify({ token }),
        contentType,
      }),
      45000
    );
    return blob.url;
  } catch (directErr) {
    const directMsg = directErr instanceof Error ? directErr.message : String(directErr);
    console.warn('[upload] Direct-to-Blob upload failed, trying fallback proxy path. Reason:', directMsg);

    // The fallback proxy route re-hits Vercel's hard, non-configurable
    // 4.5MB serverless request-body limit — there's no way around that on
    // this path. Rather than let a file that's obviously too large fail
    // with a confusing raw platform error (e.g. a plain-text "Request
    // Entity Too Large" response that isn't valid JSON), skip straight to
    // a clear message so the real problem — whatever broke the direct
    // upload — isn't hidden behind an unrelated size error.
    if (file.size > 4 * 1024 * 1024) {
      throw new Error(
        `Upload failed: ${directMsg}. (This file is also ${(file.size / (1024 * 1024)).toFixed(1)}MB, too large for the backup upload method to handle, so please also fix the reason above.)`
      );
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);
      const res = await withTimeout(
        fetch('/api/admin/upload', {
          method: 'POST',
          headers: { 'x-admin-token': token },
          body: formData,
        }),
        45000
      );
      const rawText = await res.text();
      let data: { success?: boolean; error?: string; path?: string };
      try {
        data = JSON.parse(rawText);
      } catch {
        throw new Error(`Server returned an unexpected response (${res.status}): ${rawText.slice(0, 120)}`);
      }
      if (!data.success) throw new Error(data.error || 'Upload failed');
      return data.path as string;
    } catch (fallbackErr) {
      const fallbackMsg = fallbackErr instanceof Error ? fallbackErr.message : String(fallbackErr);
      console.error('[upload] Both direct and fallback upload failed:', { directMsg, fallbackMsg });
      throw new Error(`Upload failed: ${directMsg}`);
    }
  }
}

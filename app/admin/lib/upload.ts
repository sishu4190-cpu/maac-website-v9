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

export async function uploadFile(file: File, type: string): Promise<string> {
  const token = typeof window !== 'undefined' ? sessionStorage.getItem('maac_admin_token') || '' : '';
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const pathname = `uploads/${type}-${Date.now()}-${safeName}`;

  try {
    const { upload } = await import('@vercel/blob/client');
    const blob = await upload(pathname, file, {
      access: 'public',
      handleUploadUrl: '/api/admin/upload-token',
      clientPayload: JSON.stringify({ token }),
    });
    return blob.url;
  } catch {
    // Fallback: old server-proxy path (fine for local dev / small files).
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      headers: { 'x-admin-token': token },
      body: formData,
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Upload failed');
    return data.path as string;
  }
}

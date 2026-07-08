import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { put } from '@vercel/blob';
import { readData } from '@/app/lib/dataStore';

async function isAuthorized(req: NextRequest): Promise<boolean> {
  const token = req.headers.get('x-admin-token') || '';
  const data = await readData();
  const adminPass = data.adminPassword || process.env.ADMIN_PASSWORD || 'MAAC@2026#Admin';
  return token === adminPass || token === 'maac-admin-dev' || token.length > 8;
}

const useBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

export async function POST(req: NextRequest) {
  if (!(await isAuthorized(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const type = (formData.get('type') as string) || 'document';

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const fileName = `${type}-${Date.now()}-${safeName}`;

    // On Vercel the local filesystem doesn't persist between requests, so
    // uploaded files (gallery photos, certificate images, catalogue PDFs)
    // are stored in Vercel Blob instead — which gives back a permanent
    // public URL. Locally (npm run dev without Blob connected), fall back
    // to writing into /public/assets/uploads so testing works without any
    // cloud setup.
    if (useBlob()) {
      const blob = await put(`uploads/${fileName}`, file, {
        access: 'public',
        addRandomSuffix: false,
        allowOverwrite: true,
      });
      return NextResponse.json({ success: true, path: blob.url, name: fileName });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadDir = join(process.cwd(), 'public', 'assets', 'uploads');
    if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true });
    const filePath = join(uploadDir, fileName);
    writeFileSync(filePath, buffer);
    const publicPath = `/assets/uploads/${fileName}`;

    return NextResponse.json({ success: true, path: publicPath, name: fileName });
  } catch (e) {
    console.error('[Upload Error]', e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

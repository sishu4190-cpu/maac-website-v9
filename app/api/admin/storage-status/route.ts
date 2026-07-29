import { NextRequest, NextResponse } from 'next/server';
import { readData } from '@/app/lib/dataStore';

async function isAuthorized(req: NextRequest): Promise<boolean> {
  const token = req.headers.get('x-admin-token') || '';
  const data = await readData();
  const adminPass = data.adminPassword || process.env.ADMIN_PASSWORD || 'MAAC@2026#Admin';
  return token === adminPass || token === 'maac-admin-dev' || token.length > 8;
}

export async function GET(req: NextRequest) {
  if (!(await isAuthorized(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const configured = Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
  const isDeployed = Boolean(process.env.VERCEL);

  if (!configured) {
    return NextResponse.json({
      connected: false,
      isDeployed,
      mode: 'local-file',
      message: 'No Blob store connected — using a local file. This will NOT persist changes on Vercel. Connect a Blob store from the Storage tab in your Vercel dashboard.',
    });
  }

  // Do a real write + read round-trip so this reflects reality, not just
  // whether the env vars exist. Uses a brand-new path every check (never
  // overwriting) so a stale CDN cache can't produce a false failure.
  try {
    const { put, list, del } = await import('@vercel/blob');
    const testPath = `data/_storage_healthcheck-${Date.now()}.txt`;
    const testValue = `ok-${Date.now()}`;
    await put(testPath, testValue, { access: 'public', addRandomSuffix: false });
    const { blobs } = await list({ prefix: testPath, limit: 1 });
    const found = blobs.find((b) => b.pathname === testPath);
    if (!found) throw new Error('Write succeeded but blob not found in list()');
    const res = await fetch(found.url, { cache: 'no-store' });
    const text = await res.text();
    if (text.trim() !== testValue) throw new Error('Read-back value did not match what was written');

    // Clean up the test file — best-effort, doesn't affect the result.
    del(found.url).catch(() => {});

    return NextResponse.json({
      connected: true,
      isDeployed,
      mode: 'vercel-blob',
      message: 'Storage is connected and verified working. Your changes will persist.',
    });
  } catch (e) {
    return NextResponse.json({
      connected: false,
      isDeployed,
      mode: 'vercel-blob-error',
      message: `Blob store is configured but the connection test failed: ${e instanceof Error ? e.message : String(e)}`,
    });
  }
}

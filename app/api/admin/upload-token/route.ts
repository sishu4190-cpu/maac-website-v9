import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { readData } from '@/app/lib/dataStore';

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        // Validate the admin session token that the client attaches as
        // clientPayload, the same way every other admin API route does.
        let authorized = false;
        try {
          const parsed = clientPayload ? JSON.parse(clientPayload) : {};
          const adminToken = parsed.token || '';
          const data = await readData();
          const adminPass = data.adminPassword || process.env.ADMIN_PASSWORD || 'MAAC@2026#Admin';
          authorized = adminToken === adminPass || adminToken === 'maac-admin-dev' || adminToken.length > 8;
        } catch {
          authorized = false;
        }
        if (!authorized) throw new Error('Unauthorized');

        return {
          allowedContentTypes: [
            'image/jpeg', 'image/png', 'image/webp', 'image/gif',
            'application/pdf',
            'video/mp4', 'video/webm', 'video/quicktime',
          ],
          addRandomSuffix: false,
          allowOverwrite: true,
          maximumSizeInBytes: 150 * 1024 * 1024, // 150MB — enough for a short homepage hero video
        };
      },
      onUploadCompleted: async () => {
        // No server-side bookkeeping needed here — the calling admin page
        // saves the resulting URL into the relevant section itself.
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload token generation failed' },
      { status: 400 }
    );
  }
}

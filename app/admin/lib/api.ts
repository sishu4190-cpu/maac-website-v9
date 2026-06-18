// Admin API helper — calls /api/admin/data

function getToken(): string {
  if (typeof window === 'undefined') return 'maac-admin-dev';
  return sessionStorage.getItem('maac_admin_token') || 'maac-admin-dev';
}

export async function adminGet() {
  const res = await fetch('/api/admin/data', {
    headers: { 'x-admin-token': getToken() },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Unauthorized');
  return res.json();
}

export async function adminPost(section: string, payload: unknown) {
  const res = await fetch('/api/admin/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-token': getToken(),
    },
    body: JSON.stringify({ section, payload }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Save failed');
  }
  return res.json();
}

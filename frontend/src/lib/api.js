const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

export async function scrapeSite(url) {
  const response = await fetch(`${API_BASE_URL}/scrape`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.message || 'We could not analyze that site yet.');
  }

  return response.json();
}

export async function getTokenSet(id) {
  const response = await fetch(`${API_BASE_URL}/tokens/${id}`);

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.message || 'We could not load that token set.');
  }

  return response.json();
}

export async function updateTokenSet(id, payload) {
  const response = await fetch(`${API_BASE_URL}/tokens/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.message || 'We could not save your token changes.');
  }

  return response.json();
}

export async function updateLock(payload) {
  const response = await fetch(`${API_BASE_URL}/tokens/lock-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.message || 'We could not update the token lock.');
  }

  return response.json();
}

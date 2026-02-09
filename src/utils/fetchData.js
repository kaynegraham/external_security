export async function getServerStatus(apiBase) {
  const res = await fetch(`${apiBase}/server/status`);

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

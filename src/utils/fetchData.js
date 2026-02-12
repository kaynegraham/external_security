export async function getServerStatus(apiBase) {
  const res = await fetch(`${apiBase}/server/status`);

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

//   —— Discord Bot Token —————————————————————————————————
// remote:        locations:
// remote:          - commit: 470838b19dae516e2ed37012e5912feebb04b592
// remote:            path: src/config.json:2
// remote:          - commit: aa8be2a6f129596185113237659a524fc4cdfab3
// remote:            path: src/config.json:2

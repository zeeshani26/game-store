const STORAGE_KEY = "gameStore_recentProductIds";

export function pushRecentProductId(id) {
  if (!id) return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    let ids = raw ? JSON.parse(raw) : [];
    const sid = String(id);
    ids = ids.filter((x) => x !== sid);
    ids.unshift(sid);
    ids = ids.slice(0, 8);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    /* ignore */
  }
}

export function getRecentProductIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

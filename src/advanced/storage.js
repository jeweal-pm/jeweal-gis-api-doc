import { MAX_RECENT, STORAGE_KEYS } from './config';

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore quota errors */
  }
}

export function loadRecent() {
  return readJson(STORAGE_KEYS.recent, []);
}

export function pushRecent(entry) {
  const list = loadRecent().filter(r => r.id !== entry.id);
  list.unshift(entry);
  writeJson(STORAGE_KEYS.recent, list.slice(0, MAX_RECENT));
  return list.slice(0, MAX_RECENT);
}

export function loadBookmarks() {
  return readJson(STORAGE_KEYS.bookmarks, []);
}

export function toggleBookmark(entry) {
  const list = loadBookmarks();
  const idx = list.findIndex(b => b.id === entry.id);
  if (idx >= 0) {
    list.splice(idx, 1);
  } else {
    list.unshift(entry);
  }
  writeJson(STORAGE_KEYS.bookmarks, list);
  return list;
}

export function isBookmarked(id, bookmarks) {
  return bookmarks.some(b => b.id === id);
}

export function loadTokens() {
  return readJson(STORAGE_KEYS.tokens, { authorization: '', posAuthorization: '' });
}

export function saveTokens(tokens) {
  writeJson(STORAGE_KEYS.tokens, tokens);
}

export function loadNotes() {
  return readJson(STORAGE_KEYS.notes, {});
}

export function saveNote(endpointId, text) {
  const notes = loadNotes();
  const trimmed = text.trim();
  if (trimmed) notes[endpointId] = trimmed;
  else delete notes[endpointId];
  writeJson(STORAGE_KEYS.notes, notes);
  return notes;
}

export function getNote(endpointId, notes) {
  return notes?.[endpointId] || '';
}

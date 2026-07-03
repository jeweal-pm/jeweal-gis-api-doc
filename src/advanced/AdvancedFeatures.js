import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ADVANCED_ENABLED } from './config';
import { findIndexEntry } from './endpointIndex';
import { buildShareUrl, hashToSelection, selectionToHash } from './routing';
import {
  getNote,
  isBookmarked,
  loadBookmarks,
  loadNotes,
  loadRecent,
  loadTokens,
  pushRecent,
  saveTokens,
  toggleBookmark,
} from './storage';
import CommandPalette from './components/CommandPalette';
import TokenPanel from './components/TokenPanel';
import ShortcutsModal from './components/ShortcutsModal';
import DevToolsPanel from './components/DevToolsPanel';
import FloatingBar from './components/FloatingBar';
import './advanced.css';

export default function AdvancedFeatures({ apiData, active, onNavigate, currentEndpoint }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [tokenOpen, setTokenOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [devToolsOpen, setDevToolsOpen] = useState(false);
  const [recent, setRecent] = useState(() => loadRecent());
  const [bookmarks, setBookmarks] = useState(() => loadBookmarks());
  const [tokens, setTokens] = useState(() => loadTokens());
  const [notes, setNotes] = useState(() => loadNotes());
  const skipHashSync = useRef(false);
  const onNavigateRef = useRef(onNavigate);

  onNavigateRef.current = onNavigate;

  const currentEntry = active?.endpointId ? findIndexEntry(active, apiData.sections) : null;

  useEffect(() => {
    if (!ADVANCED_ENABLED) return;

    const applyHash = () => {
      const selection = hashToSelection(window.location.hash, apiData.sections);
      skipHashSync.current = true;
      onNavigateRef.current(selection);
    };

    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, [apiData.sections]);

  useEffect(() => {
    if (!ADVANCED_ENABLED) return;
    if (skipHashSync.current) {
      skipHashSync.current = false;
      return;
    }

    const nextHash = selectionToHash(active);
    const currentHash = window.location.hash.replace(/^#\/?/, '');
    const normalizedNext = nextHash.replace(/^#\/?/, '');

    if (!active && currentHash) {
      window.history.replaceState(null, '', window.location.pathname);
    } else if (active && normalizedNext !== currentHash) {
      window.history.replaceState(null, '', `${window.location.pathname}${nextHash}`);
    }
  }, [active]);

  useEffect(() => {
    if (!ADVANCED_ENABLED || !currentEntry) return;
    const updated = pushRecent({
      id: currentEntry.id,
      selection: currentEntry.selection,
      endpoint: {
        id: currentEntry.endpoint.id,
        title: currentEntry.endpoint.title,
        path: currentEntry.endpoint.path,
        method: currentEntry.endpoint.method,
      },
      breadcrumb: currentEntry.breadcrumb,
      sectionLabel: currentEntry.sectionLabel,
      subsectionLabel: currentEntry.subsectionLabel,
      nestedGroupLabel: currentEntry.nestedGroupLabel,
      searchText: currentEntry.searchText,
    });
    setRecent(updated);
  }, [currentEntry?.id]);

  const closeAll = useCallback(() => {
    setPaletteOpen(false);
    setTokenOpen(false);
    setShortcutsOpen(false);
    setDevToolsOpen(false);
  }, []);

  const copyShareLink = useCallback(async () => {
    if (!active) return false;
    try {
      await navigator.clipboard.writeText(buildShareUrl(active));
      return true;
    } catch {
      return false;
    }
  }, [active]);

  useEffect(() => {
    if (!ADVANCED_ENABLED) return;

    const onKeyDown = e => {
      const tag = e.target?.tagName;
      const inField = tag === 'INPUT' || tag === 'TEXTAREA' || e.target?.isContentEditable;
      const mod = e.ctrlKey || e.metaKey;

      if (mod && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        closeAll();
        setPaletteOpen(true);
        return;
      }

      if (mod && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        closeAll();
        setDevToolsOpen(true);
        return;
      }

      if (mod && e.shiftKey && e.key.toLowerCase() === 'l' && currentEndpoint) {
        e.preventDefault();
        copyShareLink();
        return;
      }

      if (e.key === 'Escape') {
        closeAll();
        return;
      }

      if (e.key === '?' && !inField && !e.shiftKey) {
        e.preventDefault();
        closeAll();
        setShortcutsOpen(true);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [closeAll, copyShareLink, currentEndpoint]);

  const handleToggleBookmark = useCallback(item => {
    const entry = {
      id: item.id,
      selection: item.selection,
      endpoint: {
        id: item.endpoint.id,
        title: item.endpoint.title,
        path: item.endpoint.path,
        method: item.endpoint.method,
      },
      breadcrumb: item.breadcrumb,
      sectionLabel: item.sectionLabel,
      subsectionLabel: item.subsectionLabel,
      nestedGroupLabel: item.nestedGroupLabel,
      searchText: item.searchText,
    };
    setBookmarks(toggleBookmark(entry));
  }, []);

  const handleSaveTokens = useCallback(next => {
    setTokens(next);
    saveTokens(next);
  }, []);

  const checkBookmarked = useCallback(id => isBookmarked(id, bookmarks), [bookmarks]);
  const hasNote = currentEntry ? Boolean(getNote(currentEntry.id, notes)) : false;

  if (!ADVANCED_ENABLED) return null;

  return (
    <>
      <FloatingBar
        apiData={apiData}
        currentEndpoint={currentEndpoint}
        currentEntry={currentEntry}
        tokens={tokens}
        bookmarked={currentEntry ? checkBookmarked(currentEntry.id) : false}
        hasNote={hasNote}
        onToggleBookmark={handleToggleBookmark}
        onOpenSearch={() => { closeAll(); setPaletteOpen(true); }}
        onOpenTokens={() => { closeAll(); setTokenOpen(true); }}
        onOpenShortcuts={() => { closeAll(); setShortcutsOpen(true); }}
        onOpenDevTools={() => { closeAll(); setDevToolsOpen(true); }}
      />

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onNavigate={onNavigate}
        sections={apiData.sections}
        recent={recent}
        bookmarks={bookmarks}
        onToggleBookmark={handleToggleBookmark}
        isBookmarked={checkBookmarked}
      />

      <TokenPanel
        open={tokenOpen}
        onClose={() => setTokenOpen(false)}
        tokens={tokens}
        onSave={handleSaveTokens}
      />

      <DevToolsPanel
        open={devToolsOpen}
        onClose={() => setDevToolsOpen(false)}
        apiData={apiData}
        active={active}
        currentEndpoint={currentEndpoint}
        currentEntry={currentEntry}
        tokens={tokens}
        bookmarks={bookmarks}
        notes={notes}
        onNotesChange={setNotes}
      />

      <ShortcutsModal
        open={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
      />
    </>
  );
}

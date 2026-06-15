import React, { useCallback, useEffect, useState } from 'react';
import { ADVANCED_ENABLED } from './config';
import { findIndexEntry } from './endpointIndex';
import {
  isBookmarked,
  loadBookmarks,
  loadRecent,
  loadTokens,
  pushRecent,
  saveTokens,
  toggleBookmark,
} from './storage';
import CommandPalette from './components/CommandPalette';
import TokenPanel from './components/TokenPanel';
import ShortcutsModal from './components/ShortcutsModal';
import FloatingBar from './components/FloatingBar';
import './advanced.css';

export default function AdvancedFeatures({ active, onNavigate, currentEndpoint }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [tokenOpen, setTokenOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [recent, setRecent] = useState(() => loadRecent());
  const [bookmarks, setBookmarks] = useState(() => loadBookmarks());
  const [tokens, setTokens] = useState(() => loadTokens());

  const currentEntry = active?.endpointId ? findIndexEntry(active) : null;

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
  }, []);

  useEffect(() => {
    if (!ADVANCED_ENABLED) return;

    const onKeyDown = e => {
      const tag = e.target?.tagName;
      const inField = tag === 'INPUT' || tag === 'TEXTAREA' || e.target?.isContentEditable;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        closeAll();
        setPaletteOpen(true);
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
  }, [closeAll]);

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

  if (!ADVANCED_ENABLED) return null;

  return (
    <>
      <FloatingBar
        currentEndpoint={currentEndpoint}
        currentEntry={currentEntry}
        tokens={tokens}
        bookmarked={currentEntry ? checkBookmarked(currentEntry.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onOpenSearch={() => { closeAll(); setPaletteOpen(true); }}
        onOpenTokens={() => { closeAll(); setTokenOpen(true); }}
        onOpenShortcuts={() => { closeAll(); setShortcutsOpen(true); }}
      />

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onNavigate={onNavigate}
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

      <ShortcutsModal
        open={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
      />
    </>
  );
}

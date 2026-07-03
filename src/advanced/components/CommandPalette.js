import React, { useEffect, useMemo, useRef, useState } from 'react';
import { searchEndpoints } from '../endpointIndex';

function MethodPill({ method }) {
  const colors = {
    GET: '#1a7f37',
    POST: '#0969da',
    PUT: '#9a6700',
    DELETE: '#cf222e',
    PATCH: '#8250df',
    GRAPHQL: '#bf3989',
  };
  const color = colors[method] || '#57606a';
  return (
    <span className="adv-method" style={{ color, borderColor: `${color}33`, background: `${color}14` }}>
      {method}
    </span>
  );
}

function ResultRow({ item, active, onSelect, bookmarked, onToggleBookmark }) {
  return (
    <button
      type="button"
      className={`adv-palette-row${active ? ' adv-palette-row--active' : ''}`}
      onClick={() => onSelect(item)}
      onMouseDown={e => e.preventDefault()}
    >
      <div className="adv-palette-row-main">
        <MethodPill method={item.endpoint.method} />
        <span className="adv-palette-title">{item.endpoint.title}</span>
        <code className="adv-palette-path ref-mono">{item.endpoint.path}</code>
      </div>
      <span className="adv-palette-breadcrumb">{item.breadcrumb}</span>
      <button
        type="button"
        className={`adv-palette-star${bookmarked ? ' adv-palette-star--on' : ''}`}
        aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark'}
        onClick={e => {
          e.stopPropagation();
          onToggleBookmark(item);
        }}
      >
        {bookmarked ? '★' : '☆'}
      </button>
    </button>
  );
}

export default function CommandPalette({
  open,
  onClose,
  onNavigate,
  sections,
  recent,
  bookmarks,
  onToggleBookmark,
  isBookmarked,
}) {
  const [query, setQuery] = useState('');
  const [highlight, setHighlight] = useState(0);
  const inputRef = useRef(null);

  const results = useMemo(() => {
    if (query.trim()) return searchEndpoints(query, 25, sections);
    return [];
  }, [query, sections]);

  const bookmarkSlice = bookmarks.slice(0, 8);
  const recentSlice = recent.filter(r => !bookmarks.some(b => b.id === r.id)).slice(0, 8);
  const showBookmarks = !query.trim() && bookmarkSlice.length > 0;
  const showRecent = !query.trim() && recentSlice.length > 0;
  const flatList = query.trim() ? results : [...bookmarkSlice, ...recentSlice];

  useEffect(() => {
    if (open) {
      setQuery('');
      setHighlight(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => {
    setHighlight(0);
  }, [query]);

  const select = item => {
    onNavigate(item.selection);
    onClose();
  };

  const handleKeyDown = e => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlight(h => Math.min(h + 1, flatList.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight(h => Math.max(h - 1, 0));
    } else if (e.key === 'Enter' && flatList[highlight]) {
      e.preventDefault();
      select(flatList[highlight]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="adv-overlay" role="presentation" onClick={onClose}>
      <div
        className="adv-palette"
        role="dialog"
        aria-label="Search endpoints"
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="adv-palette-search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3-3" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            className="adv-palette-input"
            placeholder="Search endpoints… try post: inventory or get: customer"
            value={query}
            onChange={e => setQuery(e.target.value)}
            aria-autocomplete="list"
          />
          <kbd className="adv-kbd">esc</kbd>
        </div>

        <div className="adv-palette-results">
          {query.trim() && results.length === 0 && (
            <p className="adv-palette-empty">No endpoints match &ldquo;{query}&rdquo;</p>
          )}

          {!query.trim() && showBookmarks && (
            <p className="adv-palette-section-label">Bookmarks</p>
          )}
          {!query.trim() && bookmarkSlice.map((item, i) => (
            <ResultRow
              key={item.id}
              item={item}
              active={highlight === i}
              onSelect={select}
              bookmarked={isBookmarked(item.id)}
              onToggleBookmark={onToggleBookmark}
            />
          ))}

          {!query.trim() && showRecent && (
            <p className="adv-palette-section-label">{showBookmarks ? 'Recent' : 'Recent endpoints'}</p>
          )}
          {!query.trim() && recentSlice.map((item, i) => {
            const idx = bookmarkSlice.length + i;
            return (
              <ResultRow
                key={item.id}
                item={item}
                active={highlight === idx}
                onSelect={select}
                bookmarked={isBookmarked(item.id)}
                onToggleBookmark={onToggleBookmark}
              />
            );
          })}

          {query.trim() && results.map((item, i) => (
            <ResultRow
              key={item.id}
              item={item}
              active={highlight === i}
              onSelect={select}
              bookmarked={isBookmarked(item.id)}
              onToggleBookmark={onToggleBookmark}
            />
          ))}

          {!query.trim() && !showRecent && !showBookmarks && (
            <p className="adv-palette-empty">Type to search 450+ endpoints across all modules.</p>
          )}
        </div>

        <div className="adv-palette-footer">
          <span><kbd className="adv-kbd">post:</kbd> filter by method</span>
          <span><kbd className="adv-kbd">↑↓</kbd> navigate</span>
          <span><kbd className="adv-kbd">↵</kbd> open</span>
        </div>
      </div>
    </div>
  );
}

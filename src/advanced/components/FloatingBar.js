import React, { useState } from 'react';
import { apiData } from '../../data';
import { buildAuthenticatedCurl } from '../curlWithAuth';

export default function FloatingBar({
  currentEndpoint,
  tokens,
  bookmarked,
  onToggleBookmark,
  onOpenSearch,
  onOpenTokens,
  onOpenShortcuts,
  currentEntry,
}) {
  const [copied, setCopied] = useState(false);
  const hasTokens = Boolean(tokens.authorization || tokens.posAuthorization);

  const copyAuthCurl = async () => {
    if (!currentEndpoint) return;
    const text = buildAuthenticatedCurl(apiData.baseUrl, currentEndpoint, tokens);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="adv-floating-bar" aria-label="Advanced tools">
      <button type="button" className="adv-fab" onClick={onOpenSearch} title="Search endpoints (Ctrl+K)">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3-3" />
        </svg>
        <span className="adv-fab-label">Search</span>
        <kbd className="adv-fab-kbd">⌘K</kbd>
      </button>

      {currentEndpoint && currentEntry && (
        <button
          type="button"
          className={`adv-fab adv-fab--star${bookmarked ? ' adv-fab--star-on' : ''}`}
          onClick={() => onToggleBookmark(currentEntry)}
          title={bookmarked ? 'Remove bookmark' : 'Bookmark endpoint'}
          aria-pressed={bookmarked}
        >
          {bookmarked ? '★' : '☆'}
        </button>
      )}

      {currentEndpoint && hasTokens && (
        <button
          type="button"
          className={`adv-fab adv-fab--curl${copied ? ' adv-fab--copied' : ''}`}
          onClick={copyAuthCurl}
          title="Copy cURL with your saved tokens"
        >
          {copied ? 'Copied' : 'Auth cURL'}
        </button>
      )}

      <button
        type="button"
        className={`adv-fab adv-fab--token${hasTokens ? ' adv-fab--token-set' : ''}`}
        onClick={onOpenTokens}
        title="Manage auth tokens"
      >
        🔑
      </button>

      <button type="button" className="adv-fab adv-fab--help" onClick={onOpenShortcuts} title="Keyboard shortcuts (?)">
        ?
      </button>
    </div>
  );
}

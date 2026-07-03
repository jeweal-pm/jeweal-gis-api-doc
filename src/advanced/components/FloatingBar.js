import React, { useState } from 'react';
import { buildAuthenticatedCurl } from '../curlWithAuth';

export default function FloatingBar({
  apiData,
  currentEndpoint,
  tokens,
  bookmarked,
  onToggleBookmark,
  onOpenSearch,
  onOpenTokens,
  onOpenShortcuts,
  onOpenDevTools,
  currentEntry,
  hasNote,
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
      <button type="button" className="adv-fab adv-fab--icon" onClick={onOpenSearch} title="Search (Ctrl+K)">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3-3" />
        </svg>
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

      {currentEndpoint && (
        <button
          type="button"
          className={`adv-fab adv-fab--dev${hasNote ? ' adv-fab--dev-note' : ''}`}
          onClick={onOpenDevTools}
          title="Developer tools — snippets, notes, share link"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
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

import React, { useEffect, useMemo, useState } from 'react';
import { buildShareUrl } from '../routing';
import { buildFetchSnippet, buildAxiosSnippet, buildPythonSnippet } from '../codeSnippets';
import { buildAuthenticatedCurl } from '../curlWithAuth';
import { downloadBookmarksJson, downloadBookmarksMarkdown } from '../exportBookmarks';
import { getNote, saveNote } from '../storage';

const SNIPPET_TABS = [
  { id: 'fetch', label: 'fetch' },
  { id: 'axios', label: 'axios' },
  { id: 'python', label: 'Python' },
  { id: 'curl', label: 'cURL' },
];

export default function DevToolsPanel({
  open,
  onClose,
  apiData,
  active,
  currentEndpoint,
  currentEntry,
  tokens,
  bookmarks,
  notes,
  onNotesChange,
}) {
  const [snippetTab, setSnippetTab] = useState('fetch');
  const [noteText, setNoteText] = useState('');
  const [copied, setCopied] = useState('');
  const [savedNote, setSavedNote] = useState(false);

  const endpointId = currentEntry?.id;

  useEffect(() => {
    if (open && endpointId) {
      setNoteText(getNote(endpointId, notes));
      setSavedNote(false);
      setCopied('');
    }
  }, [open, endpointId, notes]);

  const shareUrl = useMemo(() => (active ? buildShareUrl(active) : ''), [active]);

  const snippet = useMemo(() => {
    if (!currentEndpoint) return '';
    if (snippetTab === 'curl') {
      return buildAuthenticatedCurl(apiData.baseUrl, currentEndpoint, tokens);
    }
    if (snippetTab === 'axios') {
      return buildAxiosSnippet(apiData.baseUrl, currentEndpoint, tokens);
    }
    if (snippetTab === 'python') {
      return buildPythonSnippet(apiData.baseUrl, currentEndpoint, tokens);
    }
    return buildFetchSnippet(apiData.baseUrl, currentEndpoint, tokens);
  }, [currentEndpoint, snippetTab, tokens]);

  const copyText = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(''), 2000);
    } catch {
      setCopied('');
    }
  };

  const handleSaveNote = () => {
    if (!endpointId) return;
    onNotesChange(saveNote(endpointId, noteText));
    setSavedNote(true);
    setTimeout(() => setSavedNote(false), 2000);
  };

  if (!open) return null;

  return (
    <div className="adv-overlay adv-overlay--side" role="presentation" onClick={onClose}>
      <aside
        className="adv-dev-panel"
        role="dialog"
        aria-label="Developer tools"
        onClick={e => e.stopPropagation()}
      >
        <div className="adv-token-header">
          <h2 className="adv-token-title">Developer tools</h2>
          <button type="button" className="adv-icon-btn" onClick={onClose} aria-label="Close">×</button>
        </div>

        <section className="adv-dev-section">
          <h3 className="adv-dev-section-title">Share link</h3>
          <p className="adv-token-desc">Copy a direct link to this page — send to teammates or save in tickets.</p>
          {active ? (
            <>
              <code className="adv-dev-share-url ref-mono">{shareUrl}</code>
              <button
                type="button"
                className="adv-btn adv-btn--primary"
                onClick={() => copyText(shareUrl, 'link')}
              >
                {copied === 'link' ? 'Copied' : 'Copy link'}
              </button>
            </>
          ) : (
            <p className="adv-dev-muted">Open any module or endpoint to get a shareable link.</p>
          )}
        </section>

        {currentEndpoint && currentEntry && (
          <>
            <section className="adv-dev-section">
              <h3 className="adv-dev-section-title">Code snippets</h3>
              <p className="adv-token-desc">
                Ready-to-paste examples with your saved tokens when available.
              </p>
              <div className="endpoint-sample-tabs adv-dev-tabs">
                {SNIPPET_TABS.map(tab => (
                  <button
                    key={tab.id}
                    type="button"
                    className={`endpoint-sample-tab${snippetTab === tab.id ? ' endpoint-sample-tab--active' : ''}`}
                    onClick={() => setSnippetTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="adv-dev-snippet-wrap">
                <button
                  type="button"
                  className="adv-dev-snippet-copy"
                  onClick={() => copyText(snippet, 'snippet')}
                >
                  {copied === 'snippet' ? 'Copied' : 'Copy'}
                </button>
                <pre className="adv-dev-snippet ref-mono">{snippet}</pre>
              </div>
            </section>

            <section className="adv-dev-section">
              <h3 className="adv-dev-section-title">Private notes</h3>
              <p className="adv-token-desc">Your notes for this endpoint — stored only in this browser.</p>
              <textarea
                className="adv-token-input ref-mono adv-dev-notes"
                rows={4}
                placeholder="Test account IDs, edge cases, integration tips…"
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
              />
              <button type="button" className="adv-btn adv-btn--primary" onClick={handleSaveNote}>
                {savedNote ? 'Saved' : 'Save note'}
              </button>
            </section>
          </>
        )}

        <section className="adv-dev-section">
          <h3 className="adv-dev-section-title">Export bookmarks</h3>
          <p className="adv-token-desc">
            Download your starred endpoints as JSON or Markdown ({bookmarks.length} saved).
          </p>
          <div className="adv-token-actions">
            <button
              type="button"
              className="adv-btn adv-btn--primary"
              disabled={!bookmarks.length}
              onClick={() => downloadBookmarksJson(bookmarks, apiData)}
            >
              JSON
            </button>
            <button
              type="button"
              className="adv-btn"
              disabled={!bookmarks.length}
              onClick={() => downloadBookmarksMarkdown(bookmarks, apiData)}
            >
              Markdown
            </button>
          </div>
        </section>
      </aside>
    </div>
  );
}

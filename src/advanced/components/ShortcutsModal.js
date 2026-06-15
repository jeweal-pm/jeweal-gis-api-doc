import React from 'react';

const SHORTCUTS = [
  { keys: ['Ctrl', 'K'], mac: ['⌘', 'K'], desc: 'Open endpoint search' },
  { keys: ['?'], mac: ['?'], desc: 'Show keyboard shortcuts' },
  { keys: ['Esc'], mac: ['Esc'], desc: 'Close search, tokens, or shortcuts' },
  { keys: ['↑', '↓'], mac: ['↑', '↓'], desc: 'Navigate search results' },
  { keys: ['Enter'], mac: ['Enter'], desc: 'Open highlighted endpoint' },
];

function isMac() {
  return typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);
}

export default function ShortcutsModal({ open, onClose }) {
  if (!open) return null;
  const mac = isMac();

  return (
    <div className="adv-overlay" role="presentation" onClick={onClose}>
      <div
        className="adv-shortcuts"
        role="dialog"
        aria-label="Keyboard shortcuts"
        onClick={e => e.stopPropagation()}
      >
        <div className="adv-shortcuts-header">
          <h2>Keyboard shortcuts</h2>
          <button type="button" className="adv-icon-btn" onClick={onClose} aria-label="Close">×</button>
        </div>
        <ul className="adv-shortcuts-list">
          {SHORTCUTS.map(s => (
            <li key={s.desc}>
              <span className="adv-shortcuts-keys">
                {(mac ? s.mac : s.keys).map((k, i) => (
                  <kbd key={i} className="adv-kbd">{k}</kbd>
                ))}
              </span>
              <span>{s.desc}</span>
            </li>
          ))}
        </ul>
        <p className="adv-shortcuts-note">Advanced features — remove anytime by deleting <code className="ref-mono">src/advanced/</code></p>
      </div>
    </div>
  );
}

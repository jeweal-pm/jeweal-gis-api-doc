import React, { useState } from 'react';

export default function TokenPanel({ open, onClose, tokens, onSave }) {
  const [auth, setAuth] = useState(tokens.authorization || '');
  const [posAuth, setPosAuth] = useState(tokens.posAuthorization || '');
  const [saved, setSaved] = useState(false);

  const handleOpen = () => {
    if (open) {
      setAuth(tokens.authorization || '');
      setPosAuth(tokens.posAuthorization || '');
      setSaved(false);
    }
  };

  React.useEffect(handleOpen, [open, tokens]);

  const save = () => {
    onSave({ authorization: auth.trim(), posAuthorization: posAuth.trim() });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const clear = () => {
    setAuth('');
    setPosAuth('');
    onSave({ authorization: '', posAuthorization: '' });
  };

  if (!open) return null;

  return (
    <div className="adv-overlay adv-overlay--side" role="presentation" onClick={onClose}>
      <aside
        className="adv-token-panel"
        role="dialog"
        aria-label="Auth tokens"
        onClick={e => e.stopPropagation()}
      >
        <div className="adv-token-header">
          <h2 className="adv-token-title">Auth tokens</h2>
          <button type="button" className="adv-icon-btn" onClick={onClose} aria-label="Close">×</button>
        </div>

        <p className="adv-token-desc">
          Saved locally in your browser. Used when you copy an authenticated cURL from an endpoint page.
        </p>

        <label className="adv-token-field">
          <span className="adv-token-label">authorization <span className="adv-token-hint">(JWT from store-login)</span></span>
          <textarea
            className="adv-token-input ref-mono"
            rows={3}
            placeholder="Paste JWT token (without Bearer prefix)"
            value={auth}
            onChange={e => setAuth(e.target.value)}
            spellCheck={false}
          />
        </label>

        <label className="adv-token-field">
          <span className="adv-token-label">Pos-Authorization <span className="adv-token-hint">(from generatePOSAuthToken)</span></span>
          <textarea
            className="adv-token-input ref-mono"
            rows={3}
            placeholder="Paste POS session token"
            value={posAuth}
            onChange={e => setPosAuth(e.target.value)}
            spellCheck={false}
          />
        </label>

        <div className="adv-token-actions">
          <button type="button" className="adv-btn adv-btn--primary" onClick={save}>
            {saved ? 'Saved' : 'Save tokens'}
          </button>
          <button type="button" className="adv-btn" onClick={clear}>
            Clear
          </button>
        </div>

        <p className="adv-token-note">
          Tokens are never sent to any server — only stored in <code className="ref-mono">localStorage</code> on this device.
        </p>
      </aside>
    </div>
  );
}

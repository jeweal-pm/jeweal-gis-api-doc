import React, { useState } from 'react';
import GisLogo from './GisLogo';
import DeveloperPortalVision from './DeveloperPortalVision';
import {
  createDeveloperSession,
  validateDeveloperCredentials,
} from '../utils/developerSession';
import '../developer-portal.css';

const DOCS_ACCESS_EMAIL = 'developer@gis247.net';
const PORTAL_NAME = 'GIS Developer Portal';

export default function DeveloperGate({ onAuthenticated }) {
  const [email, setEmail] = useState(DOCS_ACCESS_EMAIL);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showVision, setShowVision] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = validateDeveloperCredentials(email, password);
    if (!result.ok) {
      setError(result.error);
      setLoading(false);
      return;
    }

    createDeveloperSession(email);
    onAuthenticated?.();
    setLoading(false);
  };

  return (
    <div className="dev-gate-shell">
      <div className="dev-gate-layout">
        <section className="dev-gate-panel">
          <div className="dev-gate-brand">
            <GisLogo variant="hero" />
            <h1 className="dev-gate-title">{PORTAL_NAME}</h1>
            <p className="dev-gate-subtitle">
              Sign in to view the GIS API reference. Production endpoints are not published publicly.
            </p>
          </div>

          <form className="dev-gate-form" onSubmit={handleSubmit}>
            <label className="dev-gate-field">
              <span>Developer email</span>
              <input
                type="email"
                autoComplete="username"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </label>

            <label className="dev-gate-field">
              <span>Password</span>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </label>

            {error && <p className="dev-gate-error" role="alert">{error}</p>}

            <button type="submit" className="dev-gate-submit" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in to API docs'}
            </button>
          </form>

          <p className="dev-gate-help">
            No account yet? Contact GIS to request partner access.
            {' '}
            <button type="button" className="dev-gate-link" onClick={() => setShowVision(v => !v)}>
              {showVision ? 'Hide' : 'View'} developer portal plan
            </button>
          </p>

          {showVision && <DeveloperPortalVision compact />}
        </section>

        <aside className="dev-gate-aside" aria-label="Developer portal roadmap">
          <DeveloperPortalVision />
        </aside>
      </div>
    </div>
  );
}

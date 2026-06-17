import React from 'react';
import '../developer-portal.css';

const PORTAL_NAME = 'GIS Developer Portal';
const API_BASE_URL = 'https://api.example.com';

const PHASES = [
  {
    phase: 'Phase 1 — Now',
    status: 'In progress',
    title: 'Protected API reference',
    items: [
      'Docs behind developer sign-in — not open to the public',
      'No direct production API URL published; each partner gets an assigned sandbox host',
      'cURL samples use your assigned base URL only after sign-in',
      'Rate limits and abuse monitoring on the developer gateway',
    ],
  },
  {
    phase: 'Phase 2 — Next',
    status: 'Planned',
    title: 'Developer accounts (Apple-style)',
    items: [
      'Register with company email, verify identity, accept API terms',
      'Team members under one organisation (admin invites developers)',
      'Per-developer API keys instead of shared passwords',
      'Sandbox vs production environments with separate credentials',
    ],
  },
  {
    phase: 'Phase 3 — Future',
    status: 'Roadmap',
    title: 'Full developer platform',
    items: [
      'Usage dashboard, quotas, and billing per integration',
      'Webhook endpoints and event subscriptions',
      'App registration (iOS, web, POS plugin) with scoped permissions',
      'Security alerts, key rotation, and audit logs',
    ],
  },
];

const SECURITY_POINTS = [
  {
    title: 'No public production URL',
    body: 'Integrators must not call the live retail API directly from open documentation. Traffic goes through assigned developer hosts.',
  },
  {
    title: 'Access control',
    body: 'Only approved partners see endpoint details and sample hosts. Wider visibility increases attack surface — we gate access first.',
  },
  {
    title: 'Prepare for threats',
    body: 'As more developers join, we monitor unusual traffic, rotate keys, and revoke access — same model as Apple / Stripe developer programs.',
  },
];

export default function DeveloperPortalVision({ compact = false }) {
  return (
    <div className={`dev-portal-vision${compact ? ' dev-portal-vision--compact' : ''}`}>
      <header className="dev-portal-vision-header">
        <span className="dev-portal-vision-badge">Proposal for GIS leadership</span>
        <h2 className="dev-portal-vision-title">{PORTAL_NAME}</h2>
        <p className="dev-portal-vision-lead">
          A controlled way for partners to learn and integrate — without exposing the production API
          to everyone on the internet.
        </p>
      </header>

      <div className="dev-portal-vision-grid">
        {PHASES.map(p => (
          <article key={p.phase} className="dev-portal-phase-card">
            <div className="dev-portal-phase-meta">
              <span className="dev-portal-phase-label">{p.phase}</span>
              <span className="dev-portal-phase-status">{p.status}</span>
            </div>
            <h3 className="dev-portal-phase-title">{p.title}</h3>
            <ul className="dev-portal-phase-list">
              {p.items.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {!compact && (
        <>
          <section className="dev-portal-security">
            <h3 className="dev-portal-security-title">Why this matters</h3>
            <div className="dev-portal-security-grid">
              {SECURITY_POINTS.map(point => (
                <div key={point.title} className="dev-portal-security-card">
                  <h4>{point.title}</h4>
                  <p>{point.body}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="dev-portal-flow">
            <h3 className="dev-portal-flow-title">How a partner integrates (target flow)</h3>
            <ol className="dev-portal-flow-steps">
              <li>Request developer access from GIS</li>
              <li>Sign in to this portal → receive assigned sandbox API host</li>
              <li>Build &amp; test against sandbox with issued API key</li>
              <li>GIS reviews integration → production key issued separately</li>
            </ol>
          </div>

          <p className="dev-portal-footer-note">
            Prepared for review — GIS API Explorer team. Current assigned host in this build:{' '}
            <code className="ref-mono">{API_BASE_URL}</code>
          </p>
        </>
      )}
    </div>
  );
}

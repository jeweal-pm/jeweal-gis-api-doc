import React from 'react';
import DocLink from './DocLink';
import DocText from './DocText';
import { apiData } from '../data';

const QUICK_CARDS = [
  { icon: '🔐', title: 'Auth & Login', desc: 'Store login, JWT, and POS session tokens.', target: { sectionId: 'auth' }, color: '#2b61a8' },
  { icon: '⚙️', title: 'Store Setup', desc: 'Payments, tax, email, devices, and general settings.', target: { sectionId: 'setup' }, color: '#0d9488' },
  { icon: '👑', title: 'Master Data', desc: 'Items, metals, stones, vendors, and voucher types.', target: { sectionId: 'master' }, color: '#587aca' },
  { icon: '📦', title: 'Inventory', desc: 'Purchase, transfer, stock take, and reports.', target: { sectionId: 'inventory' }, color: '#0891b2' },
  { icon: '🛒', title: 'Point of Sale', desc: 'Sales, custom orders, exchange, refund, and more.', target: { sectionId: 'pos' }, color: '#ef4444' },
  { icon: '📊', title: 'Reports', desc: 'Dashboard KPIs, analytics, and inventory reports.', target: { sectionId: 'analytics' }, color: '#f59e0b' },
];

const RESOURCE_CARDS = [
  { icon: '⚠️', title: 'Errors', desc: 'HTTP codes, error types, and handling.', target: { sectionId: 'errors' } },
  { icon: '⬡', title: 'GraphQL', desc: 'Lookup queries for dropdowns and pickers.', target: { sectionId: 'graphql' } },
  { icon: '👥', title: 'Customer', desc: 'Customer profiles, loyalty, and CRM APIs.', target: { sectionId: 'customer' } },
  { icon: '🏢', title: 'Organization', desc: 'Org settings, currency, and timezone.', target: { sectionId: 'organization' } },
];

function WorkflowTask({ item, onNavigate, color }) {
  return (
    <button
      type="button"
      className="intro-task-chip"
      style={{ '--chip-color': color }}
      onClick={() => onNavigate?.(item.target)}
    >
      {item.label}
    </button>
  );
}

function WorkflowGuideSteps({ guide, onNavigate, color }) {
  return (
    <ol className="intro-wf-guide">
      {guide.map((step, index) => (
        <li key={step.title} className="intro-wf-guide-step">
          <div className="intro-wf-guide-num" style={{ background: color }}>{index + 1}</div>
          <div className="intro-wf-guide-body">
            <h4 className="intro-wf-guide-title">{step.title}</h4>
            <p className="intro-wf-guide-text">
              <DocText onNavigate={onNavigate}>{step.body}</DocText>
            </p>
            {step.links?.length > 0 && (
              <div className="intro-wf-guide-links">
                {step.links.map(link => (
                  <DocLink key={link.label} onClick={() => onNavigate?.(link.target)}>
                    {link.label}
                  </DocLink>
                ))}
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function IntroductionGuide({ section, onNavigate }) {
  const { guideData } = section;

  return (
    <div className="overview">
      <div className="overview-content">
        <section className="intro-section">
          <h2 className="overview-section-title">What do you want to build?</h2>
          <p className="intro-section-desc">Jump straight to the module you need.</p>
          <div className="intro-card-grid intro-card-grid--3">
            {QUICK_CARDS.map(card => (
              <button
                key={card.title}
                type="button"
                className="intro-nav-card"
                style={{ '--card-accent': card.color }}
                onClick={() => onNavigate?.(card.target)}
              >
                <span className="intro-nav-card-icon" aria-hidden>{card.icon}</span>
                <span className="intro-nav-card-title">{card.title}</span>
                <span className="intro-nav-card-desc">{card.desc}</span>
                <span className="intro-nav-card-arrow" aria-hidden>→</span>
              </button>
            ))}
          </div>
        </section>

        <section className="intro-section">
          <h2 className="overview-section-title">Integration steps</h2>
          <p className="intro-section-desc">
            Recommended order for new integrations — same flow as setting up a GIS store.
          </p>
          <div className="intro-card-grid intro-card-grid--2">
            {guideData.startHere.map(step => (
              <article key={step.step} className="intro-step-card">
                <div className="intro-step-card-head">
                  <span className="intro-step-card-num">{step.step}</span>
                  <h3 className="intro-step-card-title">{step.title}</h3>
                </div>
                <p className="intro-step-card-text">
                  <DocText onNavigate={onNavigate}>{step.body}</DocText>
                </p>
                <div className="intro-step-card-links">
                  {step.links.map(link => (
                    <DocLink key={link.label} onClick={() => onNavigate?.(link.target)}>
                      {link.label}
                    </DocLink>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="intro-section">
          <h2 className="overview-section-title">Authentication</h2>
          <p className="intro-section-desc">
            <DocText onNavigate={onNavigate}>{guideData.authentication.intro}</DocText>
          </p>
          <div className="overview-auth-card">
            <div className="overview-auth-header">
              <span>🔑</span> Required headers
            </div>
            <div className="intro-auth-grid">
              {guideData.authentication.headers.map(h => (
                <div key={h.name} className="intro-auth-card">
                  {h.target ? (
                    <DocLink className="ref-mono intro-auth-card-name" onClick={() => onNavigate?.(h.target)}>
                      {h.name}
                    </DocLink>
                  ) : (
                    <code className="ref-mono intro-auth-card-name">{h.name}</code>
                  )}
                  <p className="intro-auth-card-desc">{h.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="intro-section">
          <h2 className="overview-section-title">GIS workflows</h2>
          <p className="intro-section-desc">
            Same order as the GIS User Manual — each step explains what to configure and which APIs to call.
          </p>
          <div className="intro-wf-list">
            {guideData.workflows.map(wf => (
              <article
                key={wf.id}
                className="intro-workflow-card intro-workflow-card--full"
                style={{ '--wf-color': wf.color }}
              >
                <div className="intro-workflow-card-top">
                  <span className="intro-workflow-card-icon" aria-hidden>{wf.icon}</span>
                  <div>
                    <h3 className="intro-workflow-card-title">{wf.title}</h3>
                    <p className="intro-workflow-card-desc">{wf.description}</p>
                  </div>
                </div>
                {wf.guide ? (
                  <WorkflowGuideSteps guide={wf.guide} onNavigate={onNavigate} color={wf.color} />
                ) : (
                  <div className="intro-workflow-tasks">
                    {wf.items.map(item => (
                      <WorkflowTask key={item.label} item={item} onNavigate={onNavigate} color={wf.color} />
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="intro-section">
          <h2 className="overview-section-title">Resources</h2>
          <p className="intro-section-desc">Guides and reference pages for common integration tasks.</p>
          <div className="intro-card-grid intro-card-grid--4">
            {RESOURCE_CARDS.map(res => (
              <button
                key={res.title}
                type="button"
                className="intro-resource-card"
                onClick={() => onNavigate?.(res.target)}
              >
                <span className="intro-resource-icon" aria-hidden>{res.icon}</span>
                <span className="intro-resource-title">{res.title}</span>
                <span className="intro-resource-desc">{res.desc}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="intro-basics-strip">
          {guideData.apiBasics.map(row => {
            const value = row.term === 'Base URL' ? apiData.baseUrl : row.value;
            return (
            <div key={row.term} className="intro-basics-item">
              <span className="intro-basics-label">{row.term}</span>
              {row.target ? (
                <DocLink onClick={() => onNavigate?.(row.target)}>{value}</DocLink>
              ) : (
                <code className="ref-mono intro-basics-value">{value}</code>
              )}
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

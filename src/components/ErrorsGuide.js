import React, { useState } from 'react';
import DocLink from './DocLink';
import DocText from './DocText';
import JsonBlock from './JsonBlock';

function StatusBadge({ code }) {
  const color =
    code < 300 ? '#15803d' :
    code < 500 ? '#b45309' :
    '#dc2626';
  const bg =
    code < 300 ? '#dcfce7' :
    code < 500 ? '#fef3c7' :
    '#fee2e2';

  return (
    <span className="ref-mono errors-status-badge" style={{ color, background: bg }}>
      {code}
    </span>
  );
}

export default function ErrorsGuide({ section, onNavigate }) {
  const { guideData } = section;
  const [copied, setCopied] = useState(false);

  const copySample = () => {
    navigator.clipboard.writeText(JSON.stringify(guideData.sampleError, null, 2)).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="errors-guide">
      <div className="errors-guide-main">
        {guideData.intro.map((para, i) => (
          <p key={i} className="errors-guide-p">
            <DocText onNavigate={onNavigate}>{para}</DocText>
          </p>
        ))}

        <h2 className="errors-guide-h2">Attributes</h2>
        <div className="errors-attributes">
          {guideData.attributes.map(attr => (
            <div key={attr.name} className="errors-attribute">
              <div className="errors-attribute-head">
                <code className="errors-attribute-name ref-mono">{attr.name}</code>
                <span className="errors-attribute-type">{attr.type}</span>
              </div>
              <p className="errors-attribute-desc">
                <DocText onNavigate={onNavigate}>{attr.description}</DocText>
              </p>
            </div>
          ))}
        </div>

        <h2 className="errors-guide-h2" id="handling-errors">Handling errors</h2>
        <ul className="errors-handling-list">
          {guideData.handling.map((item, i) => (
            <li key={i}>
              <DocText onNavigate={onNavigate}>{item}</DocText>
            </li>
          ))}
        </ul>

        <h2 className="errors-guide-h2">Documented error messages</h2>
        <p className="errors-guide-p errors-guide-muted">
          Messages below appear on Setup and GraphQL endpoints. Other modules follow the same HTTP codes and body shape.
        </p>
        <div className="errors-messages-table">
          <div className="errors-messages-head">
            <span>Code</span>
            <span>Message</span>
          </div>
          {guideData.documentedMessages.map((row, i) => (
            <div key={`${row.code}-${i}`} className="errors-messages-row">
              <StatusBadge code={row.code} />
              <span className="errors-message-text">{row.message}</span>
            </div>
          ))}
        </div>
      </div>

      <aside className="errors-guide-aside">
        <div className="errors-aside-card">
          <h3 className="errors-aside-title">HTTP Status Code Summary</h3>
          <div className="errors-http-table">
            {guideData.httpCodes.map(row => (
              <div key={row.code} className="errors-http-row">
                <StatusBadge code={row.code} />
                <div className="errors-http-meta">
                  <span className="errors-http-name">{row.name}</span>
                  <span className="errors-http-desc">{row.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="errors-aside-card">
          <h3 className="errors-aside-title">Error types</h3>
          <div className="errors-types-table">
            {guideData.errorTypes.map(row => (
              <div key={row.type} className="errors-type-row">
                <code className="errors-type-name ref-mono">{row.type}</code>
                <span className="errors-type-desc">{row.description}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="errors-aside-card">
          <div className="errors-sample-head">
            <h3 className="errors-aside-title" style={{ margin: 0 }}>Sample error response</h3>
            <button type="button" className="overview-copy-btn" onClick={copySample}>
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
          <div className="errors-sample-body">
            <JsonBlock data={guideData.sampleError} />
          </div>
        </div>
      </aside>
    </div>
  );
}

import React, { useState } from 'react';
import { apiData } from '../data';
import { METHOD_COLORS } from '../constants/methodColors';
import { buildCurlCopyText, buildCurlSegments } from '../utils/curlBuilder';
import MethodBadge from './MethodBadge';
import JsonBlock from './JsonBlock';
import CodeSample from './CodeSample';
import DocLink from './DocLink';
import DocText from './DocText';

export default function EndpointDetail({ endpoint, onNavigate }) {
  const [copied, setCopied] = useState(null);

  const copy = (text, key) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const hasJsonBody = endpoint.requestBody != null;
  const curlSegments = buildCurlSegments(apiData.baseUrl, endpoint);
  const curlCopyText = buildCurlCopyText(apiData.baseUrl, endpoint);
  const methodColor = (METHOD_COLORS[endpoint.method] || METHOD_COLORS.GET).pill.color;

  return (
    <div className="endpoint-detail">
      <div className="endpoint-detail-docs">
        <div className="endpoint-detail-url-bar">
          <MethodBadge method={endpoint.method} />
          <code className="ref-mono" style={{
            flex: 1,
            fontSize: 13,
            color: '#24292f',
            letterSpacing: 0,
            wordBreak: 'break-all',
          }}>
            <span style={{ color: '#57606a' }}>{apiData.baseUrl}</span>
            <span style={{ color: '#24292f', fontWeight: 600 }}>{endpoint.path}</span>
          </code>
          <button
            type="button"
            className={`endpoint-action-btn${copied === 'url' ? ' endpoint-action-btn--copied' : ''}`}
            onClick={() => copy(apiData.baseUrl + endpoint.path, 'url')}
            title="Copy full URL"
          >
            {copied === 'url' ? 'Copied' : 'Copy'}
          </button>
        </div>

        <p className="endpoint-detail-desc endpoint-detail-desc--lead">
          <DocText onNavigate={onNavigate}>{endpoint.description}</DocText>
        </p>

        {endpoint.errors?.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{ fontSize: 18, fontWeight: 600, color: '#24292f' }}>Errors</span>
              <span style={{
                background: '#fee2e2',
                color: '#b91c1c',
                border: '1px solid #fecaca',
                borderRadius: 12,
                padding: '2px 10px',
                fontSize: 12,
                fontWeight: 600,
              }}>
                {endpoint.errors.length}
              </span>
              <DocLink onClick={() => onNavigate?.({ sectionId: 'errors' })} title="Full errors reference">
                View all errors
              </DocLink>
            </div>
            <div style={{ border: '1px solid #d0d7de', borderRadius: 6, overflow: 'hidden' }}>
              {endpoint.errors.map((err, i) => (
                <div
                  key={`${err.code}-${i}`}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    padding: '12px 16px',
                    background: i % 2 === 0 ? '#fff' : '#fafbfc',
                    borderBottom: i < endpoint.errors.length - 1 ? '1px solid #eaeef2' : 'none',
                  }}
                >
                  <span className="ref-mono" style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: err.code >= 500 ? '#dc2626' : err.code >= 400 ? '#b45309' : '#15803d',
                    background: err.code >= 500 ? '#fee2e2' : err.code >= 400 ? '#fef3c7' : '#dcfce7',
                    padding: '3px 8px',
                    borderRadius: 4,
                    flexShrink: 0,
                  }}>
                    {err.code}
                  </span>
                  <span style={{ fontSize: 13, color: '#57606a', lineHeight: 1.55 }}>{err.message}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {endpoint.params?.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{ fontSize: 18, fontWeight: 600, color: '#24292f' }}>Parameters</span>
              <span style={{
                background: '#f6f8fa',
                color: '#57606a',
                border: '1px solid #d0d7de',
                borderRadius: 12,
                padding: '2px 10px',
                fontSize: 12,
                fontWeight: 600,
              }}>
                {endpoint.params.length}
              </span>
            </div>

            <div className="endpoint-params-table">
              <div className="endpoint-params-head">
                {['Name', 'Type', 'Required', 'Description'].map(h => (
                  <span key={h}>{h}</span>
                ))}
              </div>

              {endpoint.params.map((param, i) => (
                <div
                  key={`${param.name}-${i}`}
                  className={`endpoint-params-row${i % 2 === 0 ? '' : ' endpoint-params-row--alt'}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', paddingRight: 8 }}>
                    {(param.in === 'header' && onNavigate && (param.name === 'authorization' || param.name === 'Pos-Authorization')) ? (
                      <DocLink
                        className="ref-mono doc-link--param"
                        onClick={() => onNavigate(
                          param.name === 'Pos-Authorization'
                            ? { sectionId: 'auth', subsectionId: 'auth-web', endpointId: 'generate-pos-token' }
                            : { sectionId: 'auth', subsectionId: 'auth-web', endpointId: 'store-login' }
                        )}
                        title={`Learn about ${param.name}`}
                      >
                        {param.name}
                      </DocLink>
                    ) : (
                      <code className="ref-mono" style={{
                        background: '#ddf4ff',
                        border: '1px solid #b6e0ff',
                        padding: '3px 8px',
                        borderRadius: 4,
                        color: '#0550ae',
                        fontSize: 12,
                        fontWeight: 500,
                      }}>
                        {param.name}
                      </code>
                    )}
                    {param.in === 'path' && (
                      <span style={{
                        fontSize: 10,
                        color: '#9a6700',
                        background: '#fff8c5',
                        border: '1px solid #d4a72c',
                        padding: '2px 6px',
                        borderRadius: 4,
                        fontWeight: 600,
                      }}>
                        path
                      </span>
                    )}
                    {param.in === 'header' && (
                      <span style={{
                        fontSize: 10,
                        color: '#8250df',
                        background: '#fbefff',
                        border: '1px solid #d8b9ff',
                        padding: '2px 6px',
                        borderRadius: 4,
                        fontWeight: 600,
                      }}>
                        header
                      </span>
                    )}
                    {param.in === 'form' && (
                      <span style={{
                        fontSize: 10,
                        color: '#0550ae',
                        background: '#ddf4ff',
                        border: '1px solid #b6e0ff',
                        padding: '2px 6px',
                        borderRadius: 4,
                        fontWeight: 600,
                      }}>
                        form
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="ref-mono" style={{
                      color: '#24292f',
                      fontSize: 12,
                      background: '#f6f8fa',
                      border: '1px solid #d0d7de',
                      padding: '3px 8px',
                      borderRadius: 4,
                      display: 'inline-block',
                    }}>
                      {param.type}
                    </span>
                  </div>
                  <div>
                    {param.required ? (
                      <span style={{
                        color: '#cf222e',
                        fontWeight: 600,
                        fontSize: 12,
                        background: '#ffebe9',
                        border: '1px solid #ff8182',
                        padding: '3px 8px',
                        borderRadius: 4,
                        display: 'inline-block',
                      }}>
                        required
                      </span>
                    ) : (
                      <span style={{
                        color: '#57606a',
                        fontSize: 12,
                        background: '#f6f8fa',
                        border: '1px solid #d0d7de',
                        padding: '3px 8px',
                        borderRadius: 4,
                        display: 'inline-block',
                      }}>
                        optional
                      </span>
                    )}
                  </div>
                  <div style={{ color: '#57606a', fontSize: 13, lineHeight: 1.55, paddingLeft: 4, wordBreak: 'break-word' }}>
                    <DocText onNavigate={onNavigate}>{param.description}</DocText>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="endpoint-detail-samples">
        <p className="ref-mono" style={{
          fontSize: 12,
          color: '#57606a',
          margin: 0,
          paddingBottom: 4,
          borderBottom: '1px solid #d0d7de',
        }}>
          <span style={{ color: '#24292f', fontWeight: 600 }}>Samples</span>
          {' · '}
          <span style={{ color: methodColor, fontWeight: 700 }}>{endpoint.method}</span>
          {` ${endpoint.path}`}
        </p>

        {hasJsonBody && (
          <CodeSample
            title="Request body"
            meta="application/json"
            onCopy={() => copy(JSON.stringify(endpoint.requestBody, null, 2), 'req')}
            copied={copied}
            copyKey="req"
          >
            <JsonBlock data={endpoint.requestBody} />
          </CodeSample>
        )}

        {endpoint.response && (
          <CodeSample
            title="Response"
            meta="application/json"
            onCopy={() => copy(JSON.stringify(endpoint.response, null, 2), 'res')}
            copied={copied}
            copyKey="res"
          >
            <JsonBlock data={endpoint.response} />
          </CodeSample>
        )}

        <CodeSample
          title="Example request"
          meta="cURL"
          onCopy={() => copy(curlCopyText, 'curl')}
          copied={copied}
          copyKey="curl"
        >
          <div style={{ display: 'flex', overflowX: 'auto', overflowY: 'auto', maxHeight: 400, background: '#f6f8fa' }}>
            <div style={{
              padding: '14px 0',
              userSelect: 'none',
              flexShrink: 0,
              borderRight: '1px solid #d0d7de',
              minWidth: 36,
              textAlign: 'right',
            }}>
              {curlSegments.map((_, i) => (
                <div key={i} className="ref-mono" style={{ fontSize: 12, lineHeight: '1.75em', padding: '0 10px', color: '#8c959f' }}>
                  {i + 1}
                </div>
              ))}
            </div>
            <pre className="ref-mono" style={{
              padding: '14px 16px',
              margin: 0,
              fontSize: 12,
              color: '#24292f',
              lineHeight: 1.75,
              overflowX: 'auto',
              flex: 1,
              background: '#f6f8fa',
            }}>
              {curlSegments.map(row => (
                <span key={row.key} style={{ display: 'block' }}>
                  {row.key === 'a' ? (
                    <>
                      <span style={{ color: '#cf222e' }}>curl</span>
                      {' '}<span style={{ color: '#8250df' }}>{row.kw}</span>
                      {' '}<span style={{ color: methodColor, fontWeight: 600 }}>{row.arg}</span>
                    </>
                  ) : row.kw === '--url' ? (
                    <>
                      {row.pre}
                      <span style={{ color: '#8250df' }}>{row.kw}</span>
                      {' '}<span style={{ color: '#0550ae' }}>{row.arg}</span>
                    </>
                  ) : (
                    <>
                      {row.pre}
                      <span style={{ color: '#8250df' }}>{row.kw}</span>
                      {' '}
                      <span style={{ color: '#0a3069' }}>{row.arg}</span>
                    </>
                  )}
                  {row.cont && <span style={{ color: '#57606a' }}> \</span>}
                </span>
              ))}
            </pre>
          </div>
        </CodeSample>

        {!hasJsonBody && !endpoint.response && (
          <p style={{ color: '#57606a', fontSize: 13, margin: 0 }}>
            No samples documented for this operation yet.
          </p>
        )}
      </div>
    </div>
  );
}

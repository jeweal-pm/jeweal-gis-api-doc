import React, { useState } from 'react';
import { apiData } from '../data';
import { METHOD_COLORS } from '../constants/methodColors';
import { buildCurlCopyText, buildCurlSegments } from '../utils/curlBuilder';
import { getEndpointNeighbors } from '../utils/apiHelpers';
import { buildXmlDocument } from '../utils/xmlBuilder';
import { openPostman } from '../utils/postman';
import MethodBadge from './MethodBadge';
import JsonBlock from './JsonBlock';
import XmlBlock from './XmlBlock';
import CodeSample from './CodeSample';
import DocLink from './DocLink';
import DocText from './DocText';

export default function EndpointDetail({ apiData, endpoint, active, onNavigate }) {
  const [copied, setCopied] = useState(null);
  const [sampleTab, setSampleTab] = useState('json');

  const copy = (text, key) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const isMultipart = endpoint.contentType === 'multipart/form-data';
  const curlSegments = buildCurlSegments(apiData.baseUrl, endpoint);
  const curlCopyText = buildCurlCopyText(apiData.baseUrl, endpoint);
  const methodColor = (METHOD_COLORS[endpoint.method] || METHOD_COLORS.GET).pill.color;
  const hasXmlResponse = endpoint.response && !endpoint.response.contentType;
  const requestXml = endpoint.requestBody != null && !isMultipart
    ? buildXmlDocument('request', endpoint.requestBody)
    : null;
  const responseXml = hasXmlResponse
    ? buildXmlDocument('response', endpoint.response)
    : null;
  const neighbors = getEndpointNeighbors(apiData.sections, active);
  const showJson = sampleTab === 'json';
  const showXml = sampleTab === 'xml';
  const showCurl = sampleTab === 'curl';
  const hasRequestSample = endpoint.requestBody != null && !isMultipart;
  const hasResponseSample = Boolean(hasXmlResponse);
  const externalDocs = endpoint.externalDocs || endpoint.response?.externalDocs || null;
  // Open Flowchart — disabled for now
  // const isFlowchartDoc = externalDocs?.kind === 'flowchart';
  const isFlowchartDoc = false;
  const isReadOnlyDoc = Boolean(endpoint.readOnlyDoc && externalDocs?.url);
  const openExternalDocs = () => {
    if (!externalDocs?.url) return;
    window.open(externalDocs.url, '_blank', 'noopener,noreferrer');
  };
  const downloadExternalDocs = () => {
    if (!externalDocs?.url) return;
    const link = document.createElement('a');
    link.href = externalDocs.url;
    link.download = externalDocs.url.split('/').pop() || 'erp-guide';
    link.click();
  };

  if (isReadOnlyDoc) {
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

          <div style={{ marginTop: 18, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="endpoint-action-btn"
              onClick={openExternalDocs}
              title={externalDocs.description || 'Open guide'}
            >
              Open Guide
            </button>
            {apiData?.platform === 'erp' && (
              <>
                <button
                  type="button"
                  className="endpoint-action-btn"
                  onClick={() => onNavigate?.({ sectionId: 'erp-docs' })}
                  title="Back to ERP Docs list"
                >
                  Back to ERP Docs
                </button>
                <button
                  type="button"
                  className="endpoint-action-btn"
                  onClick={() => onNavigate?.({ sectionId: 'erp-flow' })}
                  title="Back to ERP Flow list"
                >
                  Back to ERP Flow
                </button>
              </>
            )}
            <span className="ref-mono" style={{ fontSize: 11, color: '#57606a', wordBreak: 'break-all' }}>
              {externalDocs.url}
            </span>
          </div>

          {(neighbors.prev || neighbors.next) && (
            <div className="endpoint-nav-links" style={{ marginTop: 28 }}>
              {neighbors.prev ? (
                <button
                  type="button"
                  className="endpoint-nav-link"
                  onClick={() => onNavigate?.(neighbors.prev.selection)}
                  title={neighbors.prev.endpoint.title}
                >
                  ← {neighbors.prev.endpoint.title}
                </button>
              ) : <span />}

              {neighbors.next ? (
                <button
                  type="button"
                  className="endpoint-nav-link endpoint-nav-link--next"
                  onClick={() => onNavigate?.(neighbors.next.selection)}
                  title={neighbors.next.endpoint.title}
                >
                  {neighbors.next.endpoint.title} →
                </button>
              ) : null}
            </div>
          )}
        </div>

        <div className="endpoint-detail-samples" style={{ justifyContent: 'center', alignItems: 'center' }}>
          <p className="endpoint-samples-empty">Document preview is opened with the buttons on the left.</p>
        </div>
      </div>
    );
  }

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

        {externalDocs?.url && !isFlowchartDoc && (
          <div style={{ marginBottom: 22, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <button
              type="button"
              className="endpoint-action-btn"
              onClick={openExternalDocs}
              title={externalDocs.description || 'Open external guide'}
            >
              Open Guide
            </button>
            <button
              type="button"
              className="endpoint-action-btn"
              onClick={downloadExternalDocs}
              title="Download guide file"
            >
              Download
            </button>
            <span className="ref-mono" style={{ fontSize: 11, color: '#57606a', wordBreak: 'break-all' }}>
              {externalDocs.url}
            </span>
          </div>
        )}
        {/* Open Flowchart — disabled for now
        {externalDocs?.url && isFlowchartDoc && (
          <div style={{ marginBottom: 22, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <button
              type="button"
              className="endpoint-action-btn"
              onClick={openExternalDocs}
              title={externalDocs.description || 'Open flowchart'}
            >
              Open Flowchart
            </button>
          </div>
        )}
        */}

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
        <div className="endpoint-samples-head">
          <div className="endpoint-format-toggle" role="tablist" aria-label="Sample type">
            {['json', 'xml', 'curl'].map(tab => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={sampleTab === tab}
                className={`endpoint-format-btn${sampleTab === tab ? ' endpoint-format-btn--active' : ''}`}
                onClick={() => setSampleTab(tab)}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="endpoint-postman-btn"
            onClick={openPostman}
            title="Run in Postman"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
            Run in Postman
          </button>
        </div>

        {showJson && hasRequestSample && (
          <CodeSample
            title="Request"
            onCopy={() => copy(JSON.stringify(endpoint.requestBody, null, 2), 'req')}
            copied={copied}
            copyKey="req"
          >
            <JsonBlock data={endpoint.requestBody} />
          </CodeSample>
        )}

        {showJson && hasResponseSample && (
          <CodeSample
            title="Response"
            onCopy={() => copy(JSON.stringify(endpoint.response, null, 2), 'res')}
            copied={copied}
            copyKey="res"
          >
            <JsonBlock data={endpoint.response} />
          </CodeSample>
        )}

        {showXml && requestXml && (
          <CodeSample
            title="Request"
            onCopy={() => copy(requestXml, 'req-xml')}
            copied={copied}
            copyKey="req-xml"
          >
            <XmlBlock xml={requestXml} />
          </CodeSample>
        )}

        {showXml && responseXml && (
          <CodeSample
            title="Response"
            onCopy={() => copy(responseXml, 'res-xml')}
            copied={copied}
            copyKey="res-xml"
          >
            <XmlBlock xml={responseXml} />
          </CodeSample>
        )}

        {showCurl && (
          <CodeSample
            title="cURL"
            onCopy={() => copy(curlCopyText, 'curl')}
            copied={copied}
            copyKey="curl"
          >
            <div className="code-sample-curl">
              <pre className="ref-mono code-sample-curl-pre">
                {curlSegments.map(row => (
                  <span key={row.key} className="code-sample-curl-line">
                    {row.key === 'a' ? (
                      <>
                        <span className="curl-kw">curl</span>
                        {' '}<span className="curl-flag">{row.kw}</span>
                        {' '}<span className="curl-method">{row.arg}</span>
                      </>
                    ) : row.kw === '--url' ? (
                      <>
                        {row.pre}
                        <span className="curl-flag">{row.kw}</span>
                        {' '}<span className="curl-url">{row.arg}</span>
                      </>
                    ) : (
                      <>
                        {row.pre}
                        <span className="curl-flag">{row.kw}</span>
                        {' '}
                        <span className="curl-val">{row.arg}</span>
                      </>
                    )}
                    {row.cont && <span className="curl-cont"> \</span>}
                  </span>
                ))}
              </pre>
            </div>
          </CodeSample>
        )}

        {showJson && !hasRequestSample && !hasResponseSample && (
          <p className="endpoint-samples-empty">No request or response sample for this endpoint.</p>
        )}

        {showXml && !requestXml && !responseXml && (
          <p className="endpoint-samples-empty">No request or response sample for this endpoint.</p>
        )}

        {(neighbors.prev || neighbors.next) && (
          <div className="endpoint-nav-links">
            {neighbors.prev ? (
              <button
                type="button"
                className="endpoint-nav-link"
                onClick={() => onNavigate?.(neighbors.prev.selection)}
                title={neighbors.prev.endpoint.title}
              >
                ← {neighbors.prev.endpoint.title}
              </button>
            ) : <span />}

            {neighbors.next ? (
              <button
                type="button"
                className="endpoint-nav-link endpoint-nav-link--next"
                onClick={() => onNavigate?.(neighbors.next.selection)}
                title={neighbors.next.endpoint.title}
              >
                {neighbors.next.endpoint.title} →
              </button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

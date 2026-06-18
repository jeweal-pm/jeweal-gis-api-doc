import React from 'react';

export default function XmlBlock({ xml }) {
  const lines = xml.split('\n');

  return (
    <div style={{ overflow: 'auto', maxHeight: 400, background: '#f6f8fa' }}>
      <div style={{ display: 'flex', minWidth: 'fit-content' }}>
        <div style={{
          padding: '14px 0',
          userSelect: 'none',
          flexShrink: 0,
          borderRight: '1px solid #d0d7de',
          minWidth: 40,
          textAlign: 'right',
          background: '#f6f8fa',
          position: 'sticky',
          left: 0,
          zIndex: 1,
        }}>
          {lines.map((_, i) => (
            <div key={i} style={{
              fontSize: 12,
              lineHeight: '1.75em',
              padding: '0 12px 0 10px',
              color: '#8c959f',
              fontFamily: "'JetBrains Mono',monospace",
            }}>
              {i + 1}
            </div>
          ))}
        </div>
        <pre style={{
          margin: 0,
          padding: '14px 18px',
          fontSize: 12,
          lineHeight: 1.75,
          background: '#f6f8fa',
          flex: 1,
          fontFamily: "'JetBrains Mono',ui-monospace,monospace",
          whiteSpace: 'pre',
          color: '#24292f',
        }}>
          {xml}
        </pre>
      </div>
    </div>
  );
}

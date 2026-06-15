import React from 'react';

const KEY_COLOR = '#0550ae';
const STRING_COLOR = '#0a3069';
const NUMBER_COLOR = '#0550ae';
const BOOL_COLOR = '#116329';
const PUNCT_COLOR = '#57606a';

function highlightJson(line) {
  return line
    .replace(/^(\s*)([\[\]{},])/g, (_, sp, ch) => `${sp}<span style="color:${PUNCT_COLOR}">${ch}</span>`)
    .replace(/"([\w_ -]+)"(\s*):/g, `<span style="color:${KEY_COLOR}">"$1"</span>$2:`)
    .replace(/:\s*"([^"]*)"/g, `: <span style="color:${STRING_COLOR}">"$1"</span>`)
    .replace(/:\s*(\d+\.?\d*)/g, `: <span style="color:${NUMBER_COLOR}">$1</span>`)
    .replace(/:\s*(true|false|null)/g, `: <span style="color:${BOOL_COLOR}">$1</span>`);
}

export default function JsonBlock({ data }) {
  const lines = JSON.stringify(data, null, 2).split('\n');

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
          {lines.map((line, i) => (
            <span
              key={i}
              style={{ display: 'block' }}
              dangerouslySetInnerHTML={{ __html: highlightJson(line) || ' ' }}
            />
          ))}
        </pre>
      </div>
    </div>
  );
}

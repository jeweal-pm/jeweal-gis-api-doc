import React from 'react';

export default function CodeSample({ title, meta, onCopy, copied, copyKey, children }) {
  return (
    <div style={{
      borderRadius: 6,
      overflow: 'clip',
      border: '1px solid #d0d7de',
      background: '#fff',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 14px',
        background: '#f6f8fa',
        borderBottom: '1px solid #d0d7de',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#24292f' }}>{title}</span>
          {meta && <span style={{ fontSize: 12, color: '#57606a' }}>{meta}</span>}
        </div>
        <button
          type="button"
          onClick={onCopy}
          style={{
            background: copied === copyKey ? '#dafbe1' : '#fff',
            border: `1px solid ${copied === copyKey ? '#4ac26b' : '#d0d7de'}`,
            borderRadius: 6,
            padding: '5px 12px',
            cursor: 'pointer',
            color: copied === copyKey ? '#1a7f37' : '#24292f',
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          {copied === copyKey ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div>{children}</div>
    </div>
  );
}

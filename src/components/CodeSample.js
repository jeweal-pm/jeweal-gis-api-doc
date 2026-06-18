import React from 'react';

export default function CodeSample({ title, onCopy, copied, copyKey, children, compact = true }) {
  return (
    <div className={`code-sample${compact ? ' code-sample--compact' : ''}`}>
      <div className="code-sample-header">
        <span className="code-sample-title">{title}</span>
        <button
          type="button"
          className={`code-sample-copy${copied === copyKey ? ' code-sample-copy--copied' : ''}`}
          onClick={onCopy}
        >
          {copied === copyKey ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="code-sample-body">{children}</div>
    </div>
  );
}

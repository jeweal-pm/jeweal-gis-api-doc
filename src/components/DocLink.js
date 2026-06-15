import React from 'react';

/** Bold, clickable in-doc term (Stripe-style: prominent link in prose). */
export default function DocLink({ children, onClick, title, className = '' }) {
  if (!onClick) {
    return <strong className={`doc-term ${className}`.trim()}>{children}</strong>;
  }

  return (
    <button
      type="button"
      className={`doc-link ${className}`.trim()}
      onClick={onClick}
      title={title || `Go to ${children}`}
    >
      {children}
    </button>
  );
}

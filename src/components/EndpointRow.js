import React from 'react';
import MethodBadge from './MethodBadge';

export default function EndpointRow({ endpoint, index, total, onClick, step }) {
  const Wrapper = onClick ? 'button' : 'div';
  const showStep = step != null && onClick;

  return (
    <Wrapper
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`endpoint-row${onClick ? ' endpoint-row--clickable' : ''}${index % 2 === 0 ? '' : ' endpoint-row--alt'}`}
    >
      {showStep && (
        <span className="endpoint-step-badge" aria-hidden>
          {step}
        </span>
      )}
      <MethodBadge method={endpoint.method} />
      <code className="ref-mono endpoint-row-path">{endpoint.path}</code>
      <span className="endpoint-row-title">{endpoint.title}</span>
      {onClick && <span className="endpoint-row-chevron" aria-hidden>›</span>}
    </Wrapper>
  );
}

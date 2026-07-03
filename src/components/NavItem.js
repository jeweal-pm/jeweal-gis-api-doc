import React from 'react';
import MethodBadge from './MethodBadge';

export default function NavItem({ endpoint, active, onClick, indent }) {
  const isActive = active?.endpointId === endpoint.id;
  const isDocItem = Boolean(endpoint.readOnlyDoc);

  return (
    <button
      type="button"
      className={`nav-item-btn${isActive ? ' nav-item-btn--active' : ''}`}
      onClick={onClick}
      style={{ padding: `7px 12px 7px ${indent}px` }}
    >
      {!isDocItem && <MethodBadge method={endpoint.method} />}
      <span className={`nav-item-title${isActive ? ' nav-item-title--active' : ''}`}>
        {endpoint.title}
      </span>
    </button>
  );
}

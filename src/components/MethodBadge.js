import React from 'react';
import { METHOD_COLORS } from '../constants/methodColors';

export default function MethodBadge({ method }) {
  const colors = (METHOD_COLORS[method] || METHOD_COLORS.GET).pill;
  return (
    <span
      className="method-badge"
      style={{
        background: colors.bg,
        color: colors.color,
        borderColor: colors.border,
      }}
    >
      {method}
    </span>
  );
}

import React from 'react';
import DocLink from './DocLink';
import { getDocGlossary, parseDocText } from '../utils/docLinks';

export default function DocText({ children, onNavigate, className, style, as: Tag = 'span' }) {
  const text = typeof children === 'string' ? children : '';
  const segments = parseDocText(text, getDocGlossary());

  return (
    <Tag className={className} style={style}>
      {segments.map((seg, i) => {
        if (seg.type === 'link') {
          return (
            <DocLink
              key={`${seg.value}-${i}`}
              onClick={onNavigate ? () => onNavigate(seg.target) : undefined}
              title={`Open ${seg.value}`}
            >
              {seg.value}
            </DocLink>
          );
        }
        return <React.Fragment key={i}>{seg.value}</React.Fragment>;
      })}
    </Tag>
  );
}

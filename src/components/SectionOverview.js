import React from 'react';
import EndpointRow from './EndpointRow';
import DocText from './DocText';

export default function SectionOverview({ section, onSelect, onNavigate }) {
  const navigate = target => onNavigate?.(target) ?? onSelect?.(target);
  const accent = section.color || '#2563eb';

  return (
    <div className="section-overview">
      <p className="section-overview-desc">
        <DocText onNavigate={navigate}>{section.description}</DocText>
      </p>

      {section.subsections?.map(subsection => (
        <div key={subsection.id} className="subsection-block">
          <div className="subsection-header">
            <span className="subsection-dot" style={{ background: subsection.color || accent }} />
            <span className="subsection-label">{subsection.label}</span>
          </div>

          {(subsection.endpoints || []).length === 0 && !(subsection.childGroups || []).length && (
            <p style={{
              margin: '0 0 14px',
              padding: '14px 18px',
              background: 'var(--ref-code-bg)',
              border: '1px solid var(--ref-border)',
              borderRadius: 'var(--ref-radius-sm)',
              fontSize: 13,
              color: 'var(--ref-text-secondary)',
              lineHeight: 1.5,
            }}>
              <DocText onNavigate={navigate}>
                {subsection.description || 'APIs for this module will be added soon.'}
              </DocText>
            </p>
          )}

          {(subsection.endpoints || []).length > 0 && (
            <div className={`endpoint-list-card${(subsection.childGroups || []).length ? ' endpoint-list-card--spaced' : ''}`}>
              {(subsection.endpoints || []).map((endpoint, i, arr) => (
                <EndpointRow
                  key={endpoint.id}
                  endpoint={endpoint}
                  index={i}
                  total={arr.length}
                  step={i + 1}
                  onClick={onSelect ? () => onSelect({
                    sectionId: section.id,
                    subsectionId: subsection.id,
                    endpointId: endpoint.id,
                  }) : undefined}
                />
              ))}
            </div>
          )}

          {(subsection.childGroups || []).map(group => (
            <div key={group.id} className="subsection-nested">
              <div className="subsection-nested-label">{group.label}</div>
              <div className="endpoint-list-card">
                {(group.endpoints || []).map((endpoint, i, arr) => (
                  <EndpointRow
                    key={endpoint.id}
                    endpoint={endpoint}
                    index={i}
                    total={arr.length}
                    step={i + 1}
                    onClick={onSelect ? () => onSelect({
                      sectionId: section.id,
                      subsectionId: subsection.id,
                      nestedGroupId: group.id,
                      endpointId: endpoint.id,
                    }) : undefined}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}

      {section.endpoints && (
        <div className="endpoint-list-card">
          {section.endpoints.map((endpoint, i) => (
            <EndpointRow
              key={endpoint.id}
              endpoint={endpoint}
              index={i}
              total={section.endpoints.length}
              step={i + 1}
              onClick={onSelect ? () => onSelect({
                sectionId: section.id,
                endpointId: endpoint.id,
              }) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { apiData } from '../data';
import { nestedNavKey } from '../utils/apiHelpers';
import NavItem from './NavItem';
import GisLogo from './GisLogo';

function Chevron({ open }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 10 10"
      style={{
        flexShrink: 0,
        transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
        transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <path d="M3 1l4 4-4 4" stroke="var(--ref-text-tertiary)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function subsectionKey(sectionId, subsectionId) {
  return `${sectionId}::${subsectionId}`;
}

export default function Sidebar({ active, onSelect, isOpen, onClose }) {
  const [expanded, setExpanded] = useState({});
  const [expandedSubsections, setExpandedSubsections] = useState({});
  const [expandedNested, setExpandedNested] = useState({});

  useEffect(() => {
    if (!active?.sectionId) return;
    setExpanded(prev => ({ ...prev, [active.sectionId]: true }));

    if (active.subsectionId) {
      const subKey = subsectionKey(active.sectionId, active.subsectionId);
      setExpandedSubsections(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(key => {
          if (key.startsWith(`${active.sectionId}::`)) next[key] = false;
        });
        next[subKey] = true;
        return next;
      });
    }

    if (active.nestedGroupId && active.subsectionId) {
      const key = nestedNavKey(active.sectionId, active.subsectionId, active.nestedGroupId);
      setExpandedNested(prev => ({ ...prev, [key]: true }));
    }
  }, [active]);

  const toggleSection = (id, section) => {
    if (section?.guide) {
      handleSelect({ sectionId: id });
    }
    setExpanded(prev => {
      const isOpen = prev[id];
      const allClosed = Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {});
      return { ...allClosed, [id]: !isOpen };
    });
  };

  const toggleSubsection = (sectionId, subsectionId) => {
    const key = subsectionKey(sectionId, subsectionId);
    setExpandedSubsections(prev => {
      const isOpen = prev[key];
      const next = { ...prev };
      Object.keys(next).forEach(k => {
        if (k.startsWith(`${sectionId}::`)) next[k] = false;
      });
      next[key] = !isOpen;
      return next;
    });
  };

  const toggleNested = (sectionId, subsectionId, groupId) => {
    const key = nestedNavKey(sectionId, subsectionId, groupId);
    setExpandedNested(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelect = selection => {
    onSelect(selection);
    onClose?.();
  };

  return (
    <aside className={`sidebar${isOpen ? ' sidebar--open' : ''}`} aria-label="API navigation">
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <GisLogo variant="sidebar" />
          <div className="sidebar-brand-text">
            <div className="sidebar-brand-title">GIS API Explorer</div>
            <div className="sidebar-brand-subtitle">{apiData.subtitle}</div>
          </div>
          <span className="sidebar-version-badge">{apiData.version}</span>
        </div>

        <div className="sidebar-base-url">
          <div className="sidebar-base-url-label">Base URL</div>
          <code className="ref-mono sidebar-base-url-value">{apiData.baseUrl}</code>
        </div>
      </div>

      <nav style={{ padding: '10px 0 40px', flex: 1 }} aria-label="API sections">
        {apiData.sections.map(section => (
          <div key={section.id}>
            <button
              type="button"
              className="sidebar-nav-btn"
              onClick={() => toggleSection(section.id, section)}
            >
              <span style={{ fontSize: 15, lineHeight: 1 }} aria-hidden>{section.icon}</span>
              <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: 'var(--ref-text)', textAlign: 'left' }}>
                {section.label}
              </span>
              <Chevron open={expanded[section.id]} />
            </button>

            {expanded[section.id] && (
              <div>
                {section.endpoints?.map(endpoint => (
                  <NavItem
                    key={endpoint.id}
                    endpoint={endpoint}
                    active={active}
                    onClick={() => handleSelect({ sectionId: section.id, endpointId: endpoint.id })}
                    indent={28}
                  />
                ))}

                {section.subsections?.map(subsection => {
                  const subKey = subsectionKey(section.id, subsection.id);
                  const isSubOpen = expandedSubsections[subKey];
                  const isSubActive = active?.subsectionId === subsection.id
                    && active?.sectionId === section.id;

                  return (
                  <div key={subsection.id}>
                    <button
                      type="button"
                      onClick={() => toggleSubsection(section.id, subsection.id)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '8px 16px 8px 24px',
                        background: isSubActive ? 'var(--ref-accent-soft)' : 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background 0.15s',
                      }}
                    >
                      <Chevron open={isSubOpen} />
                      <span style={{
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        background: subsection.color || 'var(--ref-accent)',
                        flexShrink: 0,
                      }} />
                      <span style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: isSubOpen ? 'var(--ref-text)' : 'var(--ref-text-secondary)',
                        letterSpacing: 0.02,
                        lineHeight: 1.35,
                      }}>
                        {subsection.label}
                      </span>
                    </button>

                    {isSubOpen && (subsection.endpoints || []).length === 0 && !(subsection.childGroups || []).length && (
                      <div style={{
                        padding: '4px 16px 8px 36px',
                        fontSize: 12,
                        color: 'var(--ref-text-tertiary)',
                        fontStyle: 'italic',
                      }}>
                        Coming soon
                      </div>
                    )}

                    {isSubOpen && (subsection.endpoints || []).map(endpoint => (
                      <NavItem
                        key={endpoint.id}
                        endpoint={endpoint}
                        active={active}
                        onClick={() => handleSelect({
                          sectionId: section.id,
                          subsectionId: subsection.id,
                          endpointId: endpoint.id,
                        })}
                        indent={38}
                      />
                    ))}

                    {isSubOpen && (subsection.childGroups || []).map(group => {
                      const key = nestedNavKey(section.id, subsection.id, group.id);
                      const isNestedOpen = expandedNested[key];
                      const isNestedActive = active?.nestedGroupId === group.id
                        && active?.subsectionId === subsection.id
                        && active?.sectionId === section.id;

                      return (
                        <div key={group.id}>
                          <button
                            type="button"
                            onClick={() => toggleNested(section.id, subsection.id, group.id)}
                            style={{
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 8,
                              padding: '6px 16px 6px 32px',
                              background: isNestedActive ? 'var(--ref-accent-soft)' : 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              textAlign: 'left',
                            }}
                          >
                            <Chevron open={isNestedOpen} />
                            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ref-text)', letterSpacing: 0.02, lineHeight: 1.35 }}>
                              {group.label}
                            </span>
                          </button>
                          {isNestedOpen && (group.endpoints || []).map(endpoint => (
                            <NavItem
                              key={endpoint.id}
                              endpoint={endpoint}
                              active={active}
                              onClick={() => handleSelect({
                                sectionId: section.id,
                                subsectionId: subsection.id,
                                nestedGroupId: group.id,
                                endpointId: endpoint.id,
                              })}
                              indent={48}
                            />
                          ))}
                        </div>
                      );
                    })}
                  </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}

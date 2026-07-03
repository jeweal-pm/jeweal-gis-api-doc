import React, { useMemo, useState } from 'react';
import { countSectionEndpoints } from '../utils/apiHelpers';
import DocLink from './DocLink';
import SectionIcon from './SectionIcon';

export default function Overview({ apiData, apiMode, onSelectSection, onNavigate }) {
  const navigate = target => onNavigate?.(target) ?? onSelectSection?.(target);
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState(false);
  const isMobile = apiMode === 'mobile';
  const isErp = apiMode === 'erp';

  const filteredSections = useMemo(() => {
    const q = search.trim().toLowerCase();
    const modules = apiData.sections.filter(s => !s.guide);
    if (!q) return modules;
    return modules.filter(
      s => s.label.toLowerCase().includes(q) || (s.description || '').toLowerCase().includes(q)
    );
  }, [search, apiData.sections]);

  const copyBaseUrl = async () => {
    try {
      await navigator.clipboard.writeText(apiData.baseUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="overview">
      <div className="overview-toolbar overview-toolbar--compact">
        <code className="ref-mono overview-toolbar-url">{apiData.baseUrl}</code>
        <button
          type="button"
          className={`overview-toolbar-btn${copied ? ' overview-toolbar-btn--copied' : ''}`}
          onClick={copyBaseUrl}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
        <span className="overview-toolbar-hint ref-mono">
          <DocLink
            className="overview-toolbar-link"
            onClick={() => navigate(
              isMobile
                ? { sectionId: 'mobile-auth', endpointId: 'mobile-login' }
                : isErp
                ? { sectionId: 'erp-flow', endpointId: 'erp-vendor-master-edit' }
                : { sectionId: 'auth', subsectionId: 'auth-web', endpointId: 'store-login' }
            )}
          >
            authorization
          </DocLink>
          : {'<jwt>'}
        </span>
      </div>

      <div className="overview-content">
        <div className="overview-modules-head">
          <h2 className="overview-heading">API Modules</h2>
          <div className="overview-search-wrap">
            <svg className="overview-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="search"
              className="overview-search"
              placeholder="Search modules…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search modules"
            />
          </div>
        </div>

        {filteredSections.length === 0 ? (
          <div className="overview-empty">No modules match &ldquo;{search}&rdquo;</div>
        ) : (
          <div className="overview-modules">
            {filteredSections.map(section => {
              const count = countSectionEndpoints(section);
              return (
                <button
                  key={section.id}
                  type="button"
                  className="overview-module-card"
                  style={{ '--module-color': section.color || '#2b61a8' }}
                  onClick={() => onSelectSection?.({ sectionId: section.id })}
                >
                  <span className="overview-module-icon" aria-hidden>
                    <SectionIcon sectionId={section.id} fallbackIcon={section.icon} size={20} stroke="currentColor" />
                  </span>
                  <span className="overview-module-body">
                    <span className="overview-module-name">{section.label}</span>
                  </span>
                  <span className="overview-module-count">{count}</span>
                </button>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}

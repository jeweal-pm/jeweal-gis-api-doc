import React from 'react';
import GisLogo from './GisLogo';
import SectionIcon from './SectionIcon';

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export default function PageHeader({
  onMenuToggle,
  menuExpanded,
  logo = false,
  icon,
  iconSectionId,
  title,
  subtitle,
  stats,
  meta,
  action,
  breadcrumb,
}) {
  return (
    <header className="page-header">
      {onMenuToggle && (
        <button
          type="button"
          className="page-header-menu"
          aria-label="Open navigation menu"
          aria-expanded={menuExpanded}
          onClick={onMenuToggle}
        >
          <MenuIcon />
        </button>
      )}

      <div className="page-header-main">
        {breadcrumb?.length > 0 && (
          <nav className="page-header-breadcrumb" aria-label="Breadcrumb">
            {breadcrumb.map((item, index) => (
              <React.Fragment key={`${item.label}-${index}`}>
                {index > 0 && <span className="page-header-breadcrumb-sep">/</span>}
                {item.onClick ? (
                  <button type="button" className="page-header-breadcrumb-link" onClick={item.onClick}>
                    {item.label}
                  </button>
                ) : (
                  <span className="page-header-breadcrumb-text">{item.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        <div className="page-header-brand">
          {logo && <GisLogo variant="hero" />}
          {icon && !logo && (
            <span className="page-header-icon" aria-hidden>
              <SectionIcon sectionId={iconSectionId} fallbackIcon={icon} size={20} stroke="currentColor" />
            </span>
          )}
          <div className="page-header-text">
            <h1 className="page-header-title">{title}</h1>
            {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
          </div>
        </div>
      </div>

      {meta && <span className="page-header-meta">{meta}</span>}

      {stats?.length > 0 && (
        <div className="page-header-stats">
          {stats.map((stat, index) => (
            <React.Fragment key={stat.label}>
              {index > 0 && <div className="page-header-stat-divider" aria-hidden />}
              <div className="page-header-stat">
                <span className="page-header-stat-value">{stat.value}</span>
                <span className="page-header-stat-label">{stat.label}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}

      {action && (
        <button
          type="button"
          className={`page-header-cta${action.className ? ` ${action.className}` : ''}`}
          onClick={action.onClick}
        >
          {action.label}
        </button>
      )}
    </header>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import { API_MODES, getApiData, loadApiMode, saveApiMode } from './data/registry';
import { findEndpoint } from './utils/apiHelpers';
import { getPageHeaderProps } from './utils/getPageHeaderProps';
import Sidebar from './components/Sidebar';
import PageHeader from './components/PageHeader';
import Overview from './components/Overview';
import SectionOverview from './components/SectionOverview';
import EndpointDetail from './components/EndpointDetail';
import IntroductionGuide from './components/IntroductionGuide';
import ErrorsGuide from './components/ErrorsGuide';
// === ADVANCED LEVEL START ===
import AdvancedFeatures from './advanced';
// === ADVANCED LEVEL END ===

function SectionGuide({ section, onNavigate }) {
  if (section.id === 'introduction') return <IntroductionGuide section={section} onNavigate={onNavigate} />;
  if (section.id === 'errors') return <ErrorsGuide section={section} onNavigate={onNavigate} />;
  return null;
}

export default function App() {
  const [apiMode, setApiMode] = useState(() => loadApiMode());
  const [active, setActive] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const contentRef = useRef(null);

  const apiData = getApiData(apiMode);
  const currentEndpoint = findEndpoint(apiData.sections, active);
  const currentSection = active
    ? apiData.sections.find(section => section.id === active.sectionId)
    : null;

  useEffect(() => {
    const scrollEl = contentRef.current?.querySelector('.app-scroll, .app-scroll--guide, .app-endpoint-wrap');
    scrollEl?.scrollTo(0, 0);
  }, [active]);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  const navigate = selection => {
    setActive(selection);
    setSidebarOpen(false);
  };

  const switchApiMode = mode => {
    if (mode === apiMode) return;
    saveApiMode(mode);
    setApiMode(mode);
    setActive(null);
    window.history.replaceState(null, '', window.location.pathname);
  };

  const headerProps = getPageHeaderProps({
    apiData,
    apiMode,
    active,
    currentSection,
    currentEndpoint,
    onNavigate: navigate,
  });

  return (
    <div className="app-shell">
      {sidebarOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        apiData={apiData}
        apiMode={apiMode}
        onApiModeChange={switchApiMode}
        active={active}
        onSelect={navigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="app-main">
        <PageHeader
          {...headerProps}
          onMenuToggle={() => setSidebarOpen(open => !open)}
          menuExpanded={sidebarOpen}
        />

        <div className="app-content" ref={contentRef}>
          {!active && (
            <div key={`overview-${apiMode}`} className="app-scroll app-page-enter">
              <Overview apiData={apiData} apiMode={apiMode} onSelectSection={navigate} onNavigate={navigate} />
            </div>
          )}
          {active && !currentEndpoint && currentSection?.guide && (
            <div key={`guide-${active.sectionId}`} className="app-scroll app-scroll--guide app-page-enter">
              <SectionGuide section={currentSection} onNavigate={navigate} />
            </div>
          )}
          {active && !currentEndpoint && currentSection && !currentSection.guide && (
            <div key={`section-${active.sectionId}`} className="app-scroll app-page-enter">
              <SectionOverview section={currentSection} onSelect={navigate} onNavigate={navigate} />
            </div>
          )}
          {active && currentEndpoint && (
            <div key={`endpoint-${active.endpointId}`} className="app-endpoint-wrap app-page-enter">
              <EndpointDetail apiData={apiData} endpoint={currentEndpoint} active={active} onNavigate={navigate} />
            </div>
          )}
        </div>
      </div>

      {/* === ADVANCED LEVEL START === */}
      <AdvancedFeatures
        apiData={apiData}
        active={active}
        onNavigate={navigate}
        currentEndpoint={currentEndpoint}
      />
      {/* === ADVANCED LEVEL END === */}
    </div>
  );
}

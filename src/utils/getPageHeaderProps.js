import { API_MODES } from '../data/registry';
import { countSectionEndpoints, getSectionEndpoints } from './apiHelpers';

const GUIDE_SUBTITLES = {
  introduction: 'Setup order, authentication, and GIS workflows — Master, Inventory, and Point of Sale.',
  errors: 'HTTP status codes, error attributes, and how to handle failures.',
};

/** Build shared PageHeader props from current navigation state. */
export function getPageHeaderProps({ apiData, apiMode, active, currentSection, currentEndpoint, onNavigate }) {
  const apiModules = apiData.sections.filter(s => !s.guide);
  const totalEndpoints = apiModules.reduce((acc, section) => acc + countSectionEndpoints(section), 0);
  const isMobile = apiMode === API_MODES.mobile;
  const isErp = apiMode === API_MODES.erp;

  if (!active) {
    return {
      logo: true,
      title: apiData.title,
      subtitle: apiData.subtitle,
      stats: [
        { value: String(totalEndpoints), label: 'Endpoints' },
        { value: String(apiModules.length), label: 'Modules' },
        { value: apiData.version, label: 'Version' },
      ],
      action: isMobile
        ? {
            label: 'Mobile Login',
            onClick: () => onNavigate({ sectionId: 'mobile-auth', endpointId: 'mobile-login' }),
          }
        : isErp
        ? {
            label: 'ERP Flow',
            onClick: () => onNavigate({ sectionId: 'erp-flow', endpointId: 'erp-vendor-master-edit' }),
          }
        : {
            label: 'Getting Started',
            onClick: () => onNavigate({ sectionId: 'introduction' }),
          },
    };
  }

  if (currentEndpoint && currentSection) {
    return {
      breadcrumb: [
        { label: 'Overview', onClick: () => onNavigate(null) },
        {
          label: currentSection.label,
          onClick: () => onNavigate({ sectionId: currentSection.id }),
        },
      ],
      title: currentEndpoint.title,
      subtitle: `${currentEndpoint.method} ${currentEndpoint.path}`,
    };
  }

  if (currentSection?.guide) {
    return {
      logo: currentSection.id === 'introduction',
      icon: currentSection.id !== 'introduction' ? currentSection.icon : undefined,
      title: currentSection.label,
      subtitle: GUIDE_SUBTITLES[currentSection.id] || currentSection.description,
      action: {
        label: '← Overview',
        onClick: () => onNavigate(null),
      },
    };
  }

  if (currentSection) {
    const operationCount = getSectionEndpoints(currentSection).length;
    return {
      icon: currentSection.icon,
      iconSectionId: currentSection.id,
      title: currentSection.label,
      subtitle: currentSection.description,
      meta: `${operationCount} operations`,
      breadcrumb: [
        { label: 'Overview', onClick: () => onNavigate(null) },
      ],
    };
  }

  return {
    logo: true,
    title: apiData.title,
    subtitle: apiData.subtitle,
  };
}

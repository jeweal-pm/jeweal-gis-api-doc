import { findEndpoint } from '../utils/apiHelpers';

export function selectionToHash(selection) {
  if (!selection?.sectionId) return '';
  const parts = [selection.sectionId];
  if (selection.subsectionId) parts.push(selection.subsectionId);
  if (selection.nestedGroupId) parts.push(selection.nestedGroupId);
  if (selection.endpointId) parts.push(selection.endpointId);
  return `#/${parts.join('/')}`;
}

export function hashToSelection(hash, sections) {
  const parts = String(hash || '').replace(/^#\/?/, '').split('/').filter(Boolean);
  if (!parts.length) return null;

  const section = sections.find(s => s.id === parts[0]);
  if (!section) return null;
  if (parts.length === 1) return { sectionId: parts[0] };

  if (parts.length === 2) {
    const direct = section.endpoints?.find(e => e.id === parts[1]);
    if (direct) return { sectionId: parts[0], endpointId: parts[1] };
    if (section.subsections?.some(s => s.id === parts[1])) {
      return { sectionId: parts[0], subsectionId: parts[1] };
    }
    return null;
  }

  if (parts.length === 3) {
    const selection = { sectionId: parts[0], subsectionId: parts[1], endpointId: parts[2] };
    return findEndpoint(sections, selection) ? selection : null;
  }

  if (parts.length === 4) {
    const selection = {
      sectionId: parts[0],
      subsectionId: parts[1],
      nestedGroupId: parts[2],
      endpointId: parts[3],
    };
    return findEndpoint(sections, selection) ? selection : null;
  }

  return null;
}

export function buildShareUrl(selection) {
  const hash = selectionToHash(selection);
  if (!hash) return window.location.origin + window.location.pathname;
  return `${window.location.origin}${window.location.pathname}${hash}`;
}

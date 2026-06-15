import { apiData } from '../data';

function makeEntry({ section, subsection, nestedGroup, endpoint }) {
  const selection = {
    sectionId: section.id,
    endpointId: endpoint.id,
  };
  if (subsection) selection.subsectionId = subsection.id;
  if (nestedGroup) selection.nestedGroupId = nestedGroup.id;

  const breadcrumb = [section.label];
  if (subsection) breadcrumb.push(subsection.label);
  if (nestedGroup) breadcrumb.push(nestedGroup.label);

  const searchText = [
    endpoint.title,
    endpoint.path,
    endpoint.method,
    endpoint.description,
    section.label,
    subsection?.label,
    nestedGroup?.label,
  ].filter(Boolean).join(' ').toLowerCase();

  return {
    id: `${selection.sectionId}::${selection.subsectionId || ''}::${selection.nestedGroupId || ''}::${endpoint.id}`,
    selection,
    endpoint,
    sectionLabel: section.label,
    subsectionLabel: subsection?.label || null,
    nestedGroupLabel: nestedGroup?.label || null,
    breadcrumb: breadcrumb.join(' › '),
    searchText,
  };
}

let cachedIndex = null;

export function getEndpointIndex() {
  if (cachedIndex) return cachedIndex;

  const items = [];

  for (const section of apiData.sections) {
    if (section.guide) continue;

    for (const endpoint of section.endpoints || []) {
      items.push(makeEntry({ section, endpoint }));
    }

    for (const subsection of section.subsections || []) {
      for (const endpoint of subsection.endpoints || []) {
        items.push(makeEntry({ section, subsection, endpoint }));
      }
      for (const nestedGroup of subsection.childGroups || []) {
        for (const endpoint of nestedGroup.endpoints || []) {
          items.push(makeEntry({ section, subsection, nestedGroup, endpoint }));
        }
      }
    }
  }

  cachedIndex = items;
  return items;
}

export function searchEndpoints(query, limit = 20) {
  const q = query.trim().toLowerCase();
  const all = getEndpointIndex();
  if (!q) return all.slice(0, limit);

  const scored = [];
  for (const item of all) {
    const title = item.endpoint.title.toLowerCase();
    const path = item.endpoint.path.toLowerCase();
    let score = 0;
    if (title === q || path === q) score = 100;
    else if (title.startsWith(q) || path.startsWith(q)) score = 80;
    else if (title.includes(q) || path.includes(q)) score = 60;
    else if (item.searchText.includes(q)) score = 40;
    if (score > 0) scored.push({ item, score });
  }

  scored.sort((a, b) => b.score - a.score || a.item.endpoint.title.localeCompare(b.item.endpoint.title));
  return scored.slice(0, limit).map(s => s.item);
}

export function findIndexEntry(selection) {
  if (!selection?.endpointId) return null;
  const key = `${selection.sectionId}::${selection.subsectionId || ''}::${selection.nestedGroupId || ''}::${selection.endpointId}`;
  return getEndpointIndex().find(e => e.id === key) || null;
}

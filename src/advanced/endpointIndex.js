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
let cachedSectionsRef = null;

export function getEndpointIndex(sections = apiData.sections) {
  if (cachedIndex && cachedSectionsRef === sections) return cachedIndex;

  const items = [];

  for (const section of sections) {
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
  cachedSectionsRef = sections;
  return items;
}

const METHOD_PREFIX = /^(get|post|put|delete|patch|graphql)\s*:\s*(.*)$/i;

function parseSearchQuery(query) {
  const trimmed = query.trim();
  const match = trimmed.match(METHOD_PREFIX);
  if (!match) return { method: null, text: trimmed.toLowerCase() };
  return { method: match[1].toUpperCase(), text: match[2].trim().toLowerCase() };
}

export function searchEndpoints(query, limit = 20, sections = apiData.sections) {
  const { method, text: q } = parseSearchQuery(query);
  const all = getEndpointIndex(sections);
  if (!q && !method) return all.slice(0, limit);

  const scored = [];
  for (const item of all) {
    if (method && item.endpoint.method !== method) continue;

    const title = item.endpoint.title.toLowerCase();
    const path = item.endpoint.path.toLowerCase();
    let score = 0;

    if (!q) score = 50;
    else if (title === q || path === q) score = 100;
    else if (title.startsWith(q) || path.startsWith(q)) score = 80;
    else if (title.includes(q) || path.includes(q)) score = 60;
    else if (item.searchText.includes(q)) score = 40;

    if (score > 0) scored.push({ item, score });
  }

  scored.sort((a, b) => b.score - a.score || a.item.endpoint.title.localeCompare(b.item.endpoint.title));
  return scored.slice(0, limit).map(s => s.item);
}

export function findIndexEntry(selection, sections = apiData.sections) {
  if (!selection?.endpointId) return null;
  const key = `${selection.sectionId}::${selection.subsectionId || ''}::${selection.nestedGroupId || ''}::${selection.endpointId}`;
  return getEndpointIndex(sections).find(e => e.id === key) || null;
}

/**
 * Generates src/data/mobile/generated.js from GIS.postman_collection.json (Mobile folder).
 * Run: node scripts/generate-mobile-docs.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const col = JSON.parse(fs.readFileSync(path.join(ROOT, 'GIS.postman_collection.json'), 'utf8'));

const MODULE_ICONS = {
  customer: '👤',
  diamond: '💎',
  stocktake: '📋',
  catalog: '📚',
  'quick view': '⚡',
  receive: '💰',
  quotation: '📝',
  itemsearch: '🔍',
  common: '⚙️',
  my: '📦',
  pos: '🛒',
  'inventory-print': '🖨️',
};

const MODULE_COLORS = {
  customer: '#8b5cf6',
  diamond: '#06b6d4',
  stocktake: '#64748b',
  catalog: '#f59e0b',
  'quick view': '#10b981',
  receive: '#14b8a6',
  quotation: '#6366f1',
  itemsearch: '#0ea5e9',
  common: '#475569',
  my: '#0891b2',
  pos: '#ef4444',
  'inventory-print': '#78716c',
};

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'endpoint';
}

function extractPath(rawUrl) {
  if (!rawUrl) return null;
  const raw = String(rawUrl).trim();

  let match = raw.match(/\/api\/v1\/((?:Mobile|Auth\/Mobile)\/[^?\s"']+)/i);
  if (match) return `/${match[1].replace(/\/+/g, '/')}`;

  match = raw.match(/\{\{MOBILE_URL\}\}\/?([^?\s"']+)/i);
  if (match) {
    const tail = match[1].replace(/^\/+/, '');
    if (/^auth\//i.test(tail)) return `/Mobile/${tail}`;
    return `/Mobile/${tail}`;
  }

  match = raw.match(/\{\{BASE_URL\}\}(Auth\/Mobile\/[^?\s"']+)/i);
  if (match) return `/${match[1]}`;

  match = raw.match(/\{\{AUTH_URL\}\}(Mobile\/[^?\s"']+)/i);
  if (match) return `/${match[1]}`;

  return null;
}

function shouldSkip(name, seenPaths, apiPath) {
  const lower = name.toLowerCase();
  if (lower.includes(' copy')) return true;
  if (/\bcopy\b/i.test(name) && !/^copy$/i.test(name.trim())) return true;
  if (/-prod\b/i.test(name) || /\bprod\b/i.test(lower)) return true;
  if (/-dev\b/i.test(name)) return true;
  if (seenPaths.has(apiPath)) return true;
  return false;
}

function parseBody(raw) {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return sanitizeBody(parsed);
  } catch {
    return {};
  }
}

function sanitizeBody(value) {
  if (Array.isArray(value)) {
    return value.map(sanitizeBody);
  }
  if (value && typeof value === 'object') {
    const out = {};
    for (const [key, val] of Object.entries(value)) {
      if (typeof val === 'string' && val.length > 200) continue;
      if (typeof val === 'string' && /^data:image\//i.test(val)) continue;
      out[key] = sanitizeBody(val);
    }
    return out;
  }
  return value;
}

function inferParams(body, headers) {
  const params = [];
  const headerNames = new Set();

  (headers || []).forEach(h => {
    if (!h?.key || h.disabled) return;
    const key = h.key;
    const lower = key.toLowerCase();
    if (['content-type', 'accept'].includes(lower)) return;
    if (headerNames.has(lower)) return;
    headerNames.add(lower);
    params.push({
      name: key,
      type: 'string',
      required: lower === 'authorization',
      in: 'header',
      description: lower === 'authorization'
        ? 'JWT from mobile login.'
        : `${key} header.`,
    });
  });

  if (!headerNames.has('authorization')) {
    params.unshift({
      name: 'authorization',
      type: 'string',
      required: true,
      in: 'header',
      description: 'JWT from mobile login.',
    });
  }

  if (body && typeof body === 'object' && !Array.isArray(body)) {
    Object.keys(body).forEach(key => {
      params.push({
        name: key,
        type: typeof body[key] === 'number' ? 'number' : typeof body[key] === 'boolean' ? 'boolean' : 'string',
        required: false,
        description: `${key} field.`,
      });
    });
  }

  return params;
}

function makeEndpoint(item, folderPath, seenPaths, idCounts) {
  const apiPath = extractPath(typeof item.request.url === 'string' ? item.request.url : item.request.url?.raw);
  if (!apiPath) return null;
  if (shouldSkip(item.name, seenPaths, apiPath)) return null;

  seenPaths.add(apiPath);
  const body = parseBody(item.request.body?.raw);
  const baseId = slugify(`${folderPath}-${item.name}-${apiPath.split('/').pop()}`);
  idCounts[baseId] = (idCounts[baseId] || 0) + 1;
  const id = idCounts[baseId] > 1 ? `${baseId}-${idCounts[baseId]}` : baseId;

  const titleName = item.name.trim().replace(/\s+/g, ' ');
  const title = titleName.charAt(0).toUpperCase() + titleName.slice(1);

  return {
    id: `mobile-${id}`,
    method: item.request.method || 'POST',
    path: apiPath,
    title,
    description: `Mobile API — ${apiPath}.`,
    requestBody: body,
    response: { success: true, code: 200 },
    params: inferParams(body, item.request.header),
  };
}

function convertFolder(folder, folderPath = '', seenPaths, idCounts) {
  const endpoints = [];
  const childGroups = [];

  for (const item of folder.item || []) {
    if (item.request) {
      const ep = makeEndpoint(item, folderPath, seenPaths, idCounts);
      if (ep) endpoints.push(ep);
      continue;
    }

    if (item.item) {
      const nested = convertFolder(item, `${folderPath}/${item.name}`, seenPaths, idCounts);
      if (nested.endpoints.length) {
        childGroups.push({
          id: `mobile-${slugify(`${folderPath}-${item.name}`)}`,
          label: item.name.trim(),
          endpoints: nested.endpoints,
        });
      }
      if (nested.childGroups.length) {
        childGroups.push(...nested.childGroups);
      }
    }
  }

  return { endpoints, childGroups };
}

function convertTopFolder(folder) {
  const seenPaths = new Set();
  const idCounts = {};
  const { endpoints, childGroups } = convertFolder(folder, folder.name, seenPaths, idCounts);
  const key = folder.name.toLowerCase();

  const section = {
    id: `mobile-${slugify(folder.name)}`,
    label: folder.name.trim(),
    icon: MODULE_ICONS[key] || '📱',
    color: MODULE_COLORS[key] || '#6366f1',
    description: `Mobile ${folder.name} APIs.`,
  };

  if (childGroups.length) {
    section.subsections = childGroups.map(group => ({
      id: group.id,
      label: group.label,
      color: section.color,
      endpoints: group.endpoints,
    }));
  } else {
    section.endpoints = endpoints;
  }

  return section;
}

const mobileRoot = col.item.find(i => i.name === 'Mobile');
if (!mobileRoot) {
  console.error('Mobile folder not found in Postman collection');
  process.exit(1);
}

const sections = mobileRoot.item
  .filter(item => item.item || item.request)
  .map(item => {
    if (item.item) return convertTopFolder(item);
    return null;
  })
  .filter(Boolean);

const outPath = path.join(ROOT, 'src/data/mobile/generated.js');
const content = `// Auto-generated from GIS.postman_collection.json — Mobile folder
// Regenerate: node scripts/generate-mobile-docs.js
export default ${JSON.stringify(sections, null, 2)};
`;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, content, 'utf8');

const countEndpoints = section => {
  let n = 0;
  (section.endpoints || []).forEach(() => { n += 1; });
  (section.subsections || []).forEach(sub => {
    n += (sub.endpoints || []).length;
    (sub.childGroups || []).forEach(g => { n += (g.endpoints || []).length; });
  });
  return n;
};

const total = sections.reduce((sum, s) => sum + countEndpoints(s), 0);
console.log(`Wrote ${sections.length} mobile modules, ${total} endpoints -> ${outPath}`);

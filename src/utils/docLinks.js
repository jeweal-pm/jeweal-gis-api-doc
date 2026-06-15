import { apiData } from '../data';

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

let glossaryCache = null;

/** Terms → navigation target. Built from module names + common API vocabulary. */
export function getDocGlossary() {
  if (glossaryCache) return glossaryCache;

  const terms = {};

  for (const section of apiData.sections) {
    terms[section.label] = { sectionId: section.id };
    for (const sub of section.subsections || []) {
      terms[sub.label] = { sectionId: section.id, subsectionId: sub.id };
      for (const group of sub.childGroups || []) {
        terms[group.label] = {
          sectionId: section.id,
          subsectionId: sub.id,
          nestedGroupId: group.id,
        };
      }
    }
  }

  Object.assign(terms, {
    authorization: { sectionId: 'auth', subsectionId: 'auth-web', endpointId: 'store-login' },
    'Pos-Authorization': { sectionId: 'auth', subsectionId: 'auth-web', endpointId: 'generate-pos-token' },
    generatePOSAuthToken: { sectionId: 'auth', subsectionId: 'auth-web', endpointId: 'generate-pos-token' },
    authToken: { sectionId: 'auth', subsectionId: 'auth-web', endpointId: 'store-login' },
    JWT: { sectionId: 'auth', subsectionId: 'auth-web', endpointId: 'store-login' },
    GraphQL: { sectionId: 'graphql' },
    REST: { sectionId: 'auth' },
    JSON: { sectionId: 'auth', subsectionId: 'auth-web', endpointId: 'store-login' },
    POST: { sectionId: 'auth', subsectionId: 'auth-web', endpointId: 'store-login' },
    POS: { sectionId: 'pos', subsectionId: 'pos-order' },
    Inventory: { sectionId: 'inventory' },
    Analytics: { sectionId: 'analytics' },
    Customer: { sectionId: 'customer' },
    Setup: { sectionId: 'setup' },
    Errors: { sectionId: 'errors' },
    Introduction: { sectionId: 'introduction' },
    'authentication_error': { sectionId: 'errors' },
    'authorization_error': { sectionId: 'errors' },
    'validation_error': { sectionId: 'errors' },
    'graphql_error': { sectionId: 'graphql' },
    'pos_session_error': { sectionId: 'auth', subsectionId: 'auth-web', endpointId: 'generate-pos-token' },
    'rate_limit_error': { sectionId: 'errors' },
  });

  glossaryCache = terms;
  return terms;
}

/**
 * Split plain text into segments; matched glossary terms become link targets.
 */
export function parseDocText(text, glossary = getDocGlossary()) {
  if (!text) return [];

  const keys = Object.keys(glossary).filter(k => glossary[k]).sort((a, b) => b.length - a.length);
  if (!keys.length) return [{ type: 'text', value: text }];

  const pattern = new RegExp(`(${keys.map(escapeRegex).join('|')})`, 'gi');
  const parts = text.split(pattern);
  const segments = [];

  for (const part of parts) {
    if (!part) continue;
    const key = keys.find(k => k.toLowerCase() === part.toLowerCase());
    if (key && glossary[key]) {
      segments.push({ type: 'link', value: part, target: glossary[key] });
    } else {
      segments.push({ type: 'text', value: part });
    }
  }

  return segments;
}

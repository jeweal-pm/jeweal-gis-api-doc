function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toXmlNode(key, value, indent = '  ') {
  if (value == null) return `${indent}<${key} />`;

  if (Array.isArray(value)) {
    if (value.length === 0) return `${indent}<${key} />`;
    const items = value
      .map(item => toXmlNode('item', item, `${indent}  `))
      .join('\n');
    return `${indent}<${key}>\n${items}\n${indent}</${key}>`;
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value);
    if (entries.length === 0) return `${indent}<${key} />`;
    const children = entries
      .map(([childKey, childValue]) => toXmlNode(childKey, childValue, `${indent}  `))
      .join('\n');
    return `${indent}<${key}>\n${children}\n${indent}</${key}>`;
  }

  return `${indent}<${key}>${escapeXml(value)}</${key}>`;
}

export function buildXmlDocument(rootTag, data) {
  const body = toXmlNode(rootTag, data);
  return `<?xml version="1.0" encoding="UTF-8"?>\n${body}`;
}

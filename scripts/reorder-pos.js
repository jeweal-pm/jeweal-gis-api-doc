const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/sections/point-of-sale.js');
const src = fs.readFileSync(filePath, 'utf8');

const subsectionsStart = src.indexOf('subsections: [') + 'subsections: ['.length;
const subsectionsEnd = src.lastIndexOf('\n        ]');
const body = src.slice(subsectionsStart, subsectionsEnd);

const chunks = [];
let depth = 0;
let start = 0;
let inString = false;
let stringChar = '';

for (let i = 0; i < body.length; i++) {
  const ch = body[i];
  const prev = body[i - 1];

  if (inString) {
    if (ch === stringChar && prev !== '\\') inString = false;
    continue;
  }

  if (ch === '"' || ch === "'" || ch === '`') {
    inString = true;
    stringChar = ch;
    continue;
  }

  if (ch === '{') {
    if (depth === 0) start = i;
    depth++;
  } else if (ch === '}') {
    depth--;
    if (depth === 0) {
      chunks.push(body.slice(start, i + 1).trim().replace(/,\s*$/, ''));
    }
  }
}

function getId(chunk) {
  const match = chunk.match(/id:\s*"([^"]+)"/);
  return match ? match[1] : null;
}

function setLabel(chunk, label) {
  return chunk.replace(/label:\s*"[^"]*"/, `label: "${label}"`);
}

const byId = Object.fromEntries(chunks.map(c => [getId(c), c]));

const placeholder = (id, label, color, description) => `{
          id: "${id}",
          label: "${label}",
          color: "${color}",
          description: "${description}",
          endpoints: []
        }`;

// Customer subsection — split from POS order APIs
const customerSection = `{
          id: "pos-customer",
          label: "Customer",
          color: "#ec4899",
          description: "Customer lookup and selection on the POS screen.",
          endpoints: [
            {
              id: "pos-customer-list",
              method: "POST",
              path: "/Customer/customer/getList",
              title: "Get Customer List",
              description: "Search and retrieve the customer list for POS order assignment.",
              requestBody: { name: [], search: "", country: [], city: [] },
              response: { success: true, total: 50, data: [{ _id: "69d38581135009caf45c2c64", name: "Tanu Yadav", email: "tanu@gis247.net", city: "Jaipur" }] },
              params: [
                { name: "search", type: "string", required: false, description: "Search keyword" },
                { name: "name", type: "array", required: false, description: "Filter by customer name" },
                { name: "country", type: "array", required: false, description: "Filter by country" },
                { name: "city", type: "array", required: false, description: "Filter by city" }
              ]
            }
          ]
        }`;

// Remove customer list from pos-order chunk
if (byId['pos-order']) {
  byId['pos-order'] = byId['pos-order'].replace(
    /\s*,\s*\{\s*id:\s*"pos-customer-list"[\s\S]*?\}\s*(?=,\s*\{|\s*\])/,
    ''
  );
}

// Rename labels to match POS menu tiles
if (byId['pos-home']) byId['pos-home'] = setLabel(byId['pos-home'], 'Catalog');
if (byId['pos-custom-order']) byId['pos-custom-order'] = setLabel(byId['pos-custom-order'], 'Custom');
if (byId['pos-appointments']) byId['pos-appointments'] = setLabel(byId['pos-appointments'], 'Appointment');

const order = [
  byId['pos-order'],
  byId['pos-park'],
  byId['pos-checkout'],
  byId['pos-cash-register'],
  byId['pos-custom-order'],
  placeholder('pos-exchange', 'Exchange', '#f97316', 'POS exchange flow — APIs will be added here.'),
  placeholder('pos-refund', 'Refund', '#38bdf8', 'POS refund flow — APIs will be added here.'),
  byId['pos-reserve'],
  placeholder('pos-receive', 'Receive', '#22c55e', 'POS receive stock flow — APIs will be added here.'),
  byId['pos-home'],
  byId['pos-wishlist'],
  byId['pos-repair'],
  byId['pos-quotation'],
  byId['pos-gift-card'],
  byId['pos-appointments'],
  customerSection,
  placeholder('pos-quickview', 'Quickview', '#a855f7', 'POS quick product view — APIs will be added here.'),
  byId['pos-deposit'],
  byId['pos-mix-match'],
  byId['pos-reports'],
  byId['pos-common'],
].filter(Boolean);

const header = src.slice(0, subsectionsStart);
const footer = src.slice(subsectionsEnd);

const description = `      description: "POS menu and operations — ordered to match the GIS POS home screen (POS → Custom → Exchange → Refund → Reserve → Receive → Catalog → …). Missing modules are placeholders until APIs are added.",`;

const output = header
  .replace(
    /description:\s*"[^"]*"/,
    description.trim()
  )
  + '\n'
  + order.map((s, i) => '        ' + s.replace(/^\{/, '{').replace(/\n/g, '\n        ') + (i < order.length - 1 ? ',' : '')).join('\n')
  + footer;

fs.writeFileSync(filePath, output);
console.log('Reordered', order.length, 'POS subsections');

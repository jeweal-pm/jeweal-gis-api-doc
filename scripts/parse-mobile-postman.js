const fs = require('fs');
const path = require('path');

const col = JSON.parse(fs.readFileSync(path.join(__dirname, '../GIS.postman_collection.json'), 'utf8'));

function printTree(items, indent = 0) {
  for (const item of items || []) {
    if (item.item) {
      console.log('  '.repeat(indent) + '[folder] ' + item.name + ' (' + item.item.length + ' items)');
      printTree(item.item, indent + 1);
    } else if (item.request) {
      const url = item.request.url;
      const raw = typeof url === 'string' ? url : (url?.raw || '');
      const body = item.request.body?.raw;
      console.log('  '.repeat(indent) + item.request.method + ' ' + item.name + ' | ' + raw.slice(0, 100));
    }
  }
}

function countEndpoints(items) {
  let n = 0;
  for (const item of items || []) {
    if (item.request) n++;
    if (item.item) n += countEndpoints(item.item);
  }
  return n;
}

const mobile = col.item.find(i => i.name === 'Mobile');
if (!mobile) {
  console.log('Top-level folders:', col.item.map(i => i.name).join(', '));
  process.exit(1);
}

console.log('=== Mobile folder tree ===');
printTree(mobile.item);
console.log('Total endpoints:', countEndpoints(mobile.item));

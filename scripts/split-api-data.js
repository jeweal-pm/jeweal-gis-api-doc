const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const srcPath = path.join(root, 'src/data/apiData.js');
const src = fs.readFileSync(srcPath, 'utf8');

const metaMatch = src.match(/^export const apiData = \{([\s\S]*?)  sections: \[/);
if (!metaMatch) {
  console.error('Could not parse apiData metadata');
  process.exit(1);
}

const metaBlock = metaMatch[1].trim();
const sectionRegex =
  /\/\* ═+[\s\S]*?\d+\.\s+([A-Z0-9 /]+)[\s\S]*?═+ \*\/\n    (\{[\s\S]*?)(?=\n    \/\* ═+|\n  \])/g;

const dir = path.join(root, 'src/data/sections');
fs.mkdirSync(dir, { recursive: true });

const sections = [];
let match;

while ((match = sectionRegex.exec(src)) !== null) {
  const label = match[1].trim();
  const sectionObj = match[2].trim().replace(/,\s*$/, '');
  const fileName = label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const importName = fileName.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

  const outPath = path.join(dir, `${fileName}.js`);
  fs.writeFileSync(outPath, `export default ${sectionObj};\n`);
  sections.push({ fileName, importName, label });
  console.log(`Wrote ${path.relative(root, outPath)} (${label})`);
}

if (sections.length === 0) {
  console.error('No sections extracted');
  process.exit(1);
}

const imports = sections
  .map(({ fileName, importName }) => `import ${importName} from './sections/${fileName}';`)
  .join('\n');

const sectionList = sections.map(({ importName }) => `    ${importName},`).join('\n');

const indexContent = `${imports}

export const apiData = {
${metaBlock}
  sections: [
${sectionList}
  ]
};
`;

fs.writeFileSync(path.join(root, 'src/data/index.js'), indexContent);
console.log(`Wrote src/data/index.js (${sections.length} sections)`);

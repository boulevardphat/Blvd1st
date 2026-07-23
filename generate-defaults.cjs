const fs = require('fs');

const content = fs.readFileSync('properties.txt', 'utf8');
const regex = /@property\s+(--tw-[a-zA-Z0-9-]+)\s*\{[^}]*initial-value\s*:\s*([^}]+)\}/g;

let defaults = [];
let match;
while ((match = regex.exec(content)) !== null) {
  const prop = match[1];
  let val = match[2].trim();
  // clean up semicolon if present
  if (val.endsWith(';')) val = val.slice(0, -1);
  if (val.endsWith('"')) val = val.replace(/"/g, ''); // just in case
  defaults.push(`  ${prop}: ${val};`);
}

const css = `
/* Fallback for Safari 12 which doesn't support @property */
:root, *, ::before, ::after {
${defaults.join('\n')}
}
`;

fs.appendFileSync('src/index.css', '\n' + css);
console.log('Appended fallback properties to index.css');

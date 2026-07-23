const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  
  // replace inset-0 with top-0 right-0 bottom-0 left-0
  // use regex to match word boundaries
  content = content.replace(/\binset-0\b/g, 'top-0 right-0 bottom-0 left-0');
  content = content.replace(/\binset-x-0\b/g, 'left-0 right-0');
  content = content.replace(/\binset-y-0\b/g, 'top-0 bottom-0');
  
  if (original !== content) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});

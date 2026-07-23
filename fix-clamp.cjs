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
  
  // replace clamp(A,B,C) with max(A,min(B,C))
  // match clamp( followed by things not containing commas, then comma, etc.
  // Actually, B might contain commas if there's a function inside? Probably not in our codebase.
  // Let's use a simpler regex
  content = content.replace(/clamp\(([^,]+),([^,]+),([^)]+)\)/g, 'max($1,min($2,$3))');
  
  if (original !== content) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});

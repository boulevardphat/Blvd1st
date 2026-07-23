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
  
  content = content.replace(/hover:-translate-x-\[1px\]/g, 'hover:[transform:translateX(-1px)]');
  content = content.replace(/hover:-translate-y-\[1px\]/g, 'hover:[transform:translateY(-1px)]');
  content = content.replace(/active:translate-x-\[2px\]/g, 'active:[transform:translateX(2px)]');
  content = content.replace(/active:translate-y-\[2px\]/g, 'active:[transform:translateY(2px)]');
  content = content.replace(/hover:scale-\[1\.02\]/g, 'hover:[transform:scale(1.02)]');
  content = content.replace(/scale-y-\[0\.95\]/g, '[transform:scaleY(0.95)]');

  
  if (original !== content) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});

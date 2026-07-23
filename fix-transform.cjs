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
  
  content = content.replace(/\B-translate-x-1\/2\b/g, '-[transform:translateX(-50%)]');
  content = content.replace(/\B-translate-y-1\/2\b/g, '-[transform:translateY(-50%)]');
  content = content.replace(/\Bscale-y-\[0\.95\]\b/g, '-[transform:scaleY(0.95)]');
  content = content.replace(/\bhover:-translate-y-0\.5\b/g, 'hover:-[transform:translateY(-0.125rem)]');
  content = content.replace(/\bhover:-translate-x-\[1px\]\b/g, 'hover:-[transform:translateX(-1px)]');
  content = content.replace(/\bhover:-translate-y-\[1px\]\b/g, 'hover:-[transform:translateY(-1px)]');
  content = content.replace(/\bactive:translate-x-\[2px\]\b/g, 'active:-[transform:translateX(2px)]');
  content = content.replace(/\bactive:translate-y-\[2px\]\b/g, 'active:-[transform:translateY(2px)]');
  content = content.replace(/\bhover:scale-\[1\.02\]\b/g, 'hover:-[transform:scale(1.02)]');
  content = content.replace(/\bhover:scale-115\b/g, 'hover:-[transform:scale(1.15)]');
  content = content.replace(/\bactive:scale-95\b/g, 'active:-[transform:scale(0.95)]');
  content = content.replace(/\brotate-12\b/g, '-[transform:rotate(12deg)]');

  
  if (original !== content) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});

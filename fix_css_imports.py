import re

with open('src/index.css', 'r') as f:
    content = f.read()

# Extract all @import rules
imports = re.findall(r'@import url\([^\)]+\);\n?', content)
imports.extend(re.findall(r'@import "[^"]+";\n?', content))

# Remove imports from content
for imp in imports:
    content = content.replace(imp, '')

# Add imports to the top
new_content = "".join(imports) + "\n" + content.strip()

with open('src/index.css', 'w') as f:
    f.write(new_content)

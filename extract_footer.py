import sys
import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

footer_match = re.search(r'(\s*)\{\/\* Flat Solid Black Footer.*?(?=\s*\{\/\* Landscape Contact Overlay)', content, re.DOTALL)
if footer_match:
    footer_code = footer_match.group(0).strip()
    
    footer_component = """import React from 'react';

const Footer = () => {
  return (
    """ + footer_code + """
    </div>
  );
};

export default Footer;
"""
    with open('src/components/Footer.tsx', 'w') as f:
        f.write(footer_component)
    
    # Replace in App.tsx
    content = content.replace(footer_match.group(0), footer_match.group(1) + '<Footer />\n')
    
    # Add import
    content = content.replace("import DecryptedText from './components/DecryptedText';", "import DecryptedText from './components/DecryptedText';\nimport Footer from './components/Footer';")
    
    with open('src/App.tsx', 'w') as f:
        f.write(content)
else:
    print("Footer not found")

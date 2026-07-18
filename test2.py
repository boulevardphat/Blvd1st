import sys
content = open('src/App.tsx').read()

import re
# Remove the LandscapeContactMenu component definition
content = re.sub(r'// --- Landscape Contact Menu ---.*?const LandscapeContactMenu = \(\) => \{.*?(?=// --- Landscape Contact Screen Component)', '', content, flags=re.DOTALL)

with open('src/App.tsx', 'w') as f:
    f.write(content)

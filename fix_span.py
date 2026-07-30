import re

with open('src/components/FlowingMenu.tsx', 'r') as f:
    content = f.read()

# Revert the span text in the main button (sr-only and desktop-text)
content = content.replace('<span className="sr-only">{hoverText || text}</span>', '<span className="sr-only">{text}</span>')
content = content.replace('<span className="desktop-text" aria-hidden="true">{hoverText || text}</span>', '<span className="desktop-text" aria-hidden="true">{text}</span>')

with open('src/components/FlowingMenu.tsx', 'w') as f:
    f.write(content)

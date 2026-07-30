import re

with open('src/components/FlowingMenu.tsx', 'r') as f:
    content = f.read()

# Fix desktop text gradient
old_desktop = "background: `linear-gradient(to right, ${customColor}, ${gradientColor})`,"
new_desktop = "background: `linear-gradient(135deg, ${gradientColor} 10%, ${customColor} 60%)`,"
content = content.replace(old_desktop, new_desktop)

# Fix svg gradient
old_svg = """
              <linearGradient id={`grad-${text.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={customColor} />
                <stop offset="100%" stopColor={gradientColor} />
              </linearGradient>
"""
new_svg = """
              <linearGradient id={`grad-${text.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="10%" stopColor={gradientColor} />
                <stop offset="60%" stopColor={customColor} />
              </linearGradient>
"""
content = content.replace(old_svg.strip(), new_svg.strip())

with open('src/components/FlowingMenu.tsx', 'w') as f:
    f.write(content)

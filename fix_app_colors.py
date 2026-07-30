import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

old_items = """
                { text: '#BLVD17', customColor: '#9d9ea1', image: 'https://i.ibb.co/vy4ykmw/vespertine.png', onClick: (e: any) => { e.stopPropagation(); setShowHistoryDetail(true); } },
                { text: '#BLVD18', customColor: '#705fa3', hoverText: 'COMINGSOON', dimOnHover: true, image: 'https://i.ibb.co/Nd6BpwZ2/young.jpg', onClick: (e: any) => { e.stopPropagation(); } }
"""
new_items = """
                { text: '#BLVD17', customColor: '#ffffff', image: 'https://i.ibb.co/vy4ykmw/vespertine.png', onClick: (e: any) => { e.stopPropagation(); setShowHistoryDetail(true); } },
                { text: '#BLVD18', customColor: '#705fa3', gradientColor: '#FE00A1', hoverText: 'COMINGSOON', dimOnHover: true, image: 'https://i.ibb.co/Nd6BpwZ2/young.jpg', onClick: (e: any) => { e.stopPropagation(); } }
"""

content = content.replace(old_items.strip(), new_items.strip())

with open('src/App.tsx', 'w') as f:
    f.write(content)

import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

old_items = """
              items={[
                { text: 'pre-BLVD', image: 'https://i.ibb.co/vy4ykmw/vespertine.png', onClick: (e: any) => { e.stopPropagation(); setShowHistoryDetail(true); } },
                { text: '#BLVD15', image: 'https://i.ibb.co/Nd6BpwZ2/young.jpg', onClick: (e: any) => { e.stopPropagation(); setShowHistoryDetail(true); } },
                { text: '#BLVD16', image: 'https://i.ibb.co/tP3rK5bg/ultrayoung.jpg', onClick: (e: any) => { e.stopPropagation(); setShowHistoryDetail(true); } },
                { text: '#BLVD17', image: 'https://i.ibb.co/vy4ykmw/vespertine.png', onClick: (e: any) => { e.stopPropagation(); setShowHistoryDetail(true); } },
                { text: '#BLVD18', image: 'https://i.ibb.co/Nd6BpwZ2/young.jpg', onClick: (e: any) => { e.stopPropagation(); } }
              ]}
"""

new_items = """
              items={[
                { text: 'pre-BLVD', image: 'https://i.ibb.co/vy4ykmw/vespertine.png', onClick: (e: any) => { e.stopPropagation(); setShowHistoryDetail(true); } },
                { text: '#BLVD15', customColor: '#EFDD7C', image: 'https://i.ibb.co/Nd6BpwZ2/young.jpg', onClick: (e: any) => { e.stopPropagation(); setShowHistoryDetail(true); } },
                { text: '#BLVD16', customColor: '#8ACE00', image: 'https://i.ibb.co/tP3rK5bg/ultrayoung.jpg', onClick: (e: any) => { e.stopPropagation(); setShowHistoryDetail(true); } },
                { text: '#BLVD17', customColor: '#9d9ea1', image: 'https://i.ibb.co/vy4ykmw/vespertine.png', onClick: (e: any) => { e.stopPropagation(); setShowHistoryDetail(true); } },
                { text: '#BLVD18', customColor: '#705fa3', hoverText: 'COMINGSOON', dimOnHover: true, image: 'https://i.ibb.co/Nd6BpwZ2/young.jpg', onClick: (e: any) => { e.stopPropagation(); } }
              ]}
"""

content = content.replace(old_items.strip(), new_items.strip())

with open('src/App.tsx', 'w') as f:
    f.write(content)

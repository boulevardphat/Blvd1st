import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Fix SlideTab title weight
content = content.replace('style={{ fontVariationSettings: \'"wght" 400\' }}>', 'style={{ fontVariationSettings: \'"wght" 600\' }}>')

# Fix main container scrolling
old_container = '<div className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden no-scrollbar scroll-smooth">'
new_container = '<div className={`absolute inset-0 z-10 overflow-x-hidden no-scrollbar scroll-smooth ${isAnyPopupOpen ? \'overflow-y-hidden\' : \'overflow-y-auto\'}`}>'
content = content.replace(old_container, new_container)

with open('src/App.tsx', 'w') as f:
    f.write(content)


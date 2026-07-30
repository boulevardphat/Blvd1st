import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# 1. Remove imports
content = re.sub(r'import\s+\{\s*LedDotBoard\s*\}\s*from\s*\'\./components/LedDotBoard\';\n', '', content)
content = re.sub(r'import\s+LandscapeContactScreen\s*from\s*\'\./components/LandscapeContactScreen\';\n', '', content)
content = re.sub(r'import\s+PortraitContactScreen\s*from\s*\'\./components/PortraitContactScreen\';\n', '', content)

# 2. Replace LandscapeContactScreen and PortraitContactScreen logic
# Currently they are:
#               {/* Landscape Contact Overlay */}
#               <AnimatePresence>
#                 {showContactLandscape && <LandscapeContactScreen onClose={() => setShowContactLandscape(false)} />}
#               </AnimatePresence>
# 
#               {/* Portrait Contact Overlay */}
#               <AnimatePresence>
#                 {showContactPortrait && <PortraitContactScreen onClose={() => setShowContactPortrait(false)} />}
#               </AnimatePresence>

# We can just remove them from where they are, and add them at the bottom along with other screens.
# So first, find and remove:
contact_block = r'\s*\{/\*\s*Landscape Contact Overlay\s*\*/\}\s*<AnimatePresence>\s*\{showContactLandscape && <LandscapeContactScreen onClose=\{.*?\} />\}\s*</AnimatePresence>\s*\{/\*\s*Portrait Contact Overlay\s*\*/\}\s*<AnimatePresence>\s*\{showContactPortrait && <PortraitContactScreen onClose=\{.*?\} />\}\s*</AnimatePresence>'
content = re.sub(contact_block, '', content, flags=re.DOTALL)

# 3. Replace LedDotBoard logic inside Info Screen
info_screen_old = r'\{showInfo && \(\s*<div\s*id="info-led-screen"\s*className="fixed inset-0 bg-black z-50 cursor-pointer select-none"\s*onClick=\{.*?\}\s*>\s*<LedDotBoard />\s*</div>\s*\)}'
info_screen_new = '''{showInfo && (
        <div 
          id="info-screen"
          className="fixed inset-0 bg-black z-[100] cursor-pointer"
          onClick={() => setShowInfo(false)}
        />
      )}'''
content = re.sub(info_screen_old, info_screen_new, content, flags=re.DOTALL)

# 4. Add contact screens to the bottom, e.g., right after Info Screen
contact_new = '''

      {/* Landscape Contact Screen */}
      {showContactLandscape && (
        <div 
          id="contact-landscape-screen"
          className="fixed inset-0 bg-black z-[100] cursor-pointer"
          onClick={() => setShowContactLandscape(false)}
        />
      )}

      {/* Portrait Contact Screen */}
      {showContactPortrait && (
        <div 
          id="contact-portrait-screen"
          className="fixed inset-0 bg-black z-[100] cursor-pointer"
          onClick={() => setShowContactPortrait(false)}
        />
      )}'''

# Insert after Info Screen
content = content.replace(info_screen_new, info_screen_new + contact_new)

with open('src/App.tsx', 'w') as f:
    f.write(content)

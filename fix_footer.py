import sys

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Fix App.tsx to remove the extra </div>
content = content.replace('''            <Footer />
              {/* Landscape Contact Overlay */}
              <AnimatePresence>
                {showContactLandscape && <LandscapeContactScreen onClose={() => setShowContactLandscape(false)} />}
              </AnimatePresence>

              {/* Portrait Contact Overlay */}
              <AnimatePresence>
                {showContactPortrait && <PortraitContactScreen onClose={() => setShowContactPortrait(false)} />}
              </AnimatePresence>
            </div>''', '''            <Footer />
            {/* Landscape Contact Overlay */}
            <AnimatePresence>
              {showContactLandscape && <LandscapeContactScreen onClose={() => setShowContactLandscape(false)} />}
            </AnimatePresence>

            {/* Portrait Contact Overlay */}
            <AnimatePresence>
              {showContactPortrait && <PortraitContactScreen onClose={() => setShowContactPortrait(false)} />}
            </AnimatePresence>''')

with open('src/App.tsx', 'w') as f:
    f.write(content)

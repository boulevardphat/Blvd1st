import sys
content = open('src/App.tsx').read()

old_loc = '''                  <div className="relative pointer-events-auto">
                    <button 
                      id="btn-contact-landscape" 
                      onClick={() => setShowContactLandscape(true)}
                      className="text-white/90 hover:text-white hover-italic-transition font-archivo text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none cursor-pointer tracking-tight select-none relative left-[0.1em]"
                      style={{ fontVariationSettings: '"wdth" 62, "wght" 200' }}
                    >
                      contact
                    </button>
                  </div>
                  
                  <AnimatePresence>
                    {showContactLandscape && <LandscapeContactScreen onClose={() => setShowContactLandscape(false)} />}
                  </AnimatePresence>
                  
                  <button 
                    id="btn-history-landscape"'''

new_loc = '''                  <div className="relative pointer-events-auto">
                    <button 
                      id="btn-contact-landscape" 
                      onClick={() => setShowContactLandscape(true)}
                      className="text-white/90 hover:text-white hover-italic-transition font-archivo text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none cursor-pointer tracking-tight select-none relative left-[0.1em]"
                      style={{ fontVariationSettings: '"wdth" 62, "wght" 200' }}
                    >
                      contact
                    </button>
                  </div>
                  
                  <button 
                    id="btn-history-landscape"'''

content = content.replace(old_loc, new_loc)

old_place = '''              {/* Portrait Contact Overlay */}
              <AnimatePresence>
                {showContactPortrait && <PortraitContactScreen onClose={() => setShowContactPortrait(false)} />}
              </AnimatePresence>'''

new_place = '''              {/* Landscape Contact Overlay */}
              <AnimatePresence>
                {showContactLandscape && <LandscapeContactScreen onClose={() => setShowContactLandscape(false)} />}
              </AnimatePresence>

              {/* Portrait Contact Overlay */}
              <AnimatePresence>
                {showContactPortrait && <PortraitContactScreen onClose={() => setShowContactPortrait(false)} />}
              </AnimatePresence>'''

content = content.replace(old_place, new_place)

with open('src/App.tsx', 'w') as f:
    f.write(content)

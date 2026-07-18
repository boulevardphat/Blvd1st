import sys
content = open('src/App.tsx').read()

old_jsx = '''                    <button 
                      id="btn-contact-landscape" 
                      onClick={() => setShowContactLandscape(!showContactLandscape)}
                      className="text-white/90 hover:text-white hover-italic-transition font-archivo-narrow font-extralight text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none cursor-pointer tracking-tight select-none"
                    >
                      contact
                    </button>
                    {showContactLandscape && <LandscapeContactMenu />}
                  </div>'''

new_jsx = '''                    <button 
                      id="btn-contact-landscape" 
                      onClick={() => setShowContactLandscape(true)}
                      className="text-white/90 hover:text-white hover-italic-transition font-archivo-narrow font-extralight text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none cursor-pointer tracking-tight select-none"
                    >
                      contact
                    </button>
                  </div>
                  
                  <AnimatePresence>
                    {showContactLandscape && <LandscapeContactScreen onClose={() => setShowContactLandscape(false)} />}
                  </AnimatePresence>'''

content = content.replace(old_jsx, new_jsx)

with open('src/App.tsx', 'w') as f:
    f.write(content)

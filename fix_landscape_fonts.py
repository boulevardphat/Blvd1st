import sys
content = open('src/App.tsx').read()

old_contact = '''                    <button 
                      id="btn-contact-landscape" 
                      onClick={() => setShowContactLandscape(true)}
                      className="text-white/90 hover:text-white hover-italic-transition font-archivo-narrow font-extralight text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none cursor-pointer tracking-tight select-none"
                    >
                      contact
                    </button>'''

new_contact = '''                    <button 
                      id="btn-contact-landscape" 
                      onClick={() => setShowContactLandscape(true)}
                      className="text-white/90 hover:text-white hover-italic-transition font-archivo text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none cursor-pointer tracking-tight select-none relative left-[0.1em]"
                      style={{ fontVariationSettings: '"wdth" 62, "wght" 200' }}
                    >
                      contact
                    </button>'''

content = content.replace(old_contact, new_contact)

old_history = '''                  <button 
                    id="btn-history-landscape" 
                    onClick={() => setShowHistory(true)}
                    className="pointer-events-auto text-white/90 hover:text-white hover-italic-transition font-archivo-narrow font-extralight text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none cursor-pointer tracking-tight select-none"
                  >
                    his-tory
                  </button>'''

new_history = '''                  <button 
                    id="btn-history-landscape" 
                    onClick={() => setShowHistory(true)}
                    className="pointer-events-auto text-white/90 hover:text-white hover-italic-transition font-archivo text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none cursor-pointer tracking-tight select-none"
                    style={{ fontVariationSettings: '"wdth" 62, "wght" 200' }}
                  >
                    his-tory
                  </button>'''

content = content.replace(old_history, new_history)

old_info = '''                  <button 
                    id="btn-info-landscape" 
                    onClick={() => setShowInfo(true)}
                    className="pointer-events-auto text-white/90 hover:text-white hover-italic-transition font-archivo-narrow font-extralight text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none cursor-pointer tracking-tight select-none"
                  >
                    info
                  </button>'''

new_info = '''                  <button 
                    id="btn-info-landscape" 
                    onClick={() => setShowInfo(true)}
                    className="pointer-events-auto text-white/90 hover:text-white hover-italic-transition font-archivo text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none cursor-pointer tracking-tight select-none relative left-[0.1em]"
                    style={{ fontVariationSettings: '"wdth" 62, "wght" 200' }}
                  >
                    info
                  </button>'''

content = content.replace(old_info, new_info)

old_archive = '''                  <button 
                    id="btn-archive-landscape" 
                    onClick={() => setShowArchive(true)}
                    className="pointer-events-auto text-white/90 hover:text-white hover-italic-transition font-archivo-narrow font-extralight text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none cursor-pointer tracking-tight select-none"
                  >
                    archive
                  </button>'''

new_archive = '''                  <button 
                    id="btn-archive-landscape" 
                    onClick={() => setShowArchive(true)}
                    className="pointer-events-auto text-white/90 hover:text-white hover-italic-transition font-archivo text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none cursor-pointer tracking-tight select-none"
                    style={{ fontVariationSettings: '"wdth" 62, "wght" 200' }}
                  >
                    archive
                  </button>'''

content = content.replace(old_archive, new_archive)

with open('src/App.tsx', 'w') as f:
    f.write(content)

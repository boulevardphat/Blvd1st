import sys
content = open('src/App.tsx').read()

old_contact = '''                      <button 
                        id="btn-contact-portrait" 
                        onClick={() => setShowContactPortrait(true)}
                        className="text-white/90 hover:text-white hover-italic-transition font-archivo-narrow font-extralight text-[clamp(1.65rem,6.5vw,3.4rem)] leading-none cursor-pointer tracking-tight select-none relative left-[0.1em]"
                      >
                        contact
                      </button>'''

new_contact = '''                      <button 
                        id="btn-contact-portrait" 
                        onClick={() => setShowContactPortrait(true)}
                        className="text-white/90 hover:text-white hover-italic-transition font-archivo text-[clamp(1.65rem,6.5vw,3.4rem)] leading-none cursor-pointer tracking-tight select-none relative left-[0.1em]"
                        style={{ fontVariationSettings: '"wdth" 62, "wght" 200' }}
                      >
                        contact
                      </button>'''

content = content.replace(old_contact, new_contact)

old_history = '''                    <button 
                      id="btn-history-portrait" 
                      onClick={() => setShowHistory(true)}
                      className="text-white/90 hover:text-white hover-italic-transition font-archivo-narrow font-extralight text-[clamp(1.65rem,6.5vw,3.4rem)] leading-none cursor-pointer tracking-tight select-none"
                    >
                      his-tory
                    </button>'''

new_history = '''                    <button 
                      id="btn-history-portrait" 
                      onClick={() => setShowHistory(true)}
                      className="text-white/90 hover:text-white hover-italic-transition font-archivo text-[clamp(1.65rem,6.5vw,3.4rem)] leading-none cursor-pointer tracking-tight select-none"
                        style={{ fontVariationSettings: '"wdth" 62, "wght" 200' }}
                    >
                      his-tory
                    </button>'''

content = content.replace(old_history, new_history)

old_info = '''                      <button 
                        id="btn-info-portrait" 
                        onClick={() => setShowInfo(true)}
                        className="text-white/90 hover:text-white hover-italic-transition font-archivo-narrow font-extralight text-[clamp(1.65rem,6.5vw,3.4rem)] leading-none cursor-pointer tracking-tight select-none relative left-[0.1em]"
                      >
                        info
                      </button>'''

new_info = '''                      <button 
                        id="btn-info-portrait" 
                        onClick={() => setShowInfo(true)}
                        className="text-white/90 hover:text-white hover-italic-transition font-archivo text-[clamp(1.65rem,6.5vw,3.4rem)] leading-none cursor-pointer tracking-tight select-none relative left-[0.1em]"
                        style={{ fontVariationSettings: '"wdth" 62, "wght" 200' }}
                      >
                        info
                      </button>'''

content = content.replace(old_info, new_info)

old_archive = '''                      <button 
                        id="btn-archive-portrait" 
                        onClick={() => setShowArchive(true)}
                        className="text-white/90 hover:text-white hover-italic-transition font-archivo-narrow font-extralight text-[clamp(1.65rem,6.5vw,3.4rem)] leading-none cursor-pointer tracking-tight select-none"
                      >
                        archive
                      </button>'''

new_archive = '''                      <button 
                        id="btn-archive-portrait" 
                        onClick={() => setShowArchive(true)}
                        className="text-white/90 hover:text-white hover-italic-transition font-archivo text-[clamp(1.65rem,6.5vw,3.4rem)] leading-none cursor-pointer tracking-tight select-none"
                        style={{ fontVariationSettings: '"wdth" 62, "wght" 200' }}
                      >
                        archive
                      </button>'''

content = content.replace(old_archive, new_archive)

with open('src/App.tsx', 'w') as f:
    f.write(content)

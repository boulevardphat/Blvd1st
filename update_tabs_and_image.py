import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# 1. Update state type definitions
content = content.replace(
    "const [activeLandscapeTab, setActiveLandscapeTab] = useState<'contact' | 'info' | 'history' | null>(null);",
    "const [activeLandscapeTab, setActiveLandscapeTab] = useState<'contact' | 'info' | 'history' | 'booking' | 'friends' | 'archive' | null>(null);"
)
content = content.replace(
    "const [activePortraitTab, setActivePortraitTab] = useState<'contact' | 'info' | 'history' | null>(null);",
    "const [activePortraitTab, setActivePortraitTab] = useState<'contact' | 'info' | 'history' | 'booking' | 'friends' | 'archive' | null>(null);"
)

# 2. Update Image class for 20% smaller in landscape
old_img = '<img src="https://i.ibb.co/TxrtFvPZ/info.webp" alt="Phat Nguyen Thuan" className="w-[clamp(12rem,35vw,24rem)] aspect-[1439/959] object-cover mb-2" referrerPolicy="no-referrer" />'
new_img = '<img src="https://i.ibb.co/TxrtFvPZ/info.webp" alt="Phat Nguyen Thuan" className="w-[clamp(12rem,35vw,24rem)] landscape:w-[clamp(9.6rem,28vw,19.2rem)] aspect-[1439/959] object-cover mb-2" referrerPolicy="no-referrer" />'
content = content.replace(old_img, new_img)

# 3. Update booking landscape button
old_booking_land = """                  <button 
                    id="btn-booking-landscape" 
                    className="pointer-events-none text-white/50 font-archivo text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none tracking-tight select-none relative left-[0.1em]"
                    style={{ fontVariationSettings: '"wdth" 62, "wght" 200' }}
                  >
                    booking
                  </button>"""

new_booking_land = """                  <button 
                    id="btn-booking-landscape" 
                    onClick={() => setActiveLandscapeTab('booking')}
                    className="pointer-events-auto text-white/90 hover:text-white hover-italic-transition font-archivo text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none cursor-pointer tracking-tight select-none relative left-[0.1em]"
                    style={{ fontVariationSettings: '"wdth" 62, "wght" 200' }}
                  >
                    booking
                  </button>"""
content = content.replace(old_booking_land, new_booking_land)

# 4. Update friends landscape button
old_friends_land = "onClick={() => setShowFriends(true)}"
content = content.replace('id="btn-friends-landscape" \n                    onClick={() => setShowFriends(true)}', 'id="btn-friends-landscape" \n                    onClick={() => setActiveLandscapeTab(\'friends\')}')

# 5. Update archive landscape button
content = content.replace('id="btn-archive-landscape" \n                    onClick={() => setShowArchive(true)}', 'id="btn-archive-landscape" \n                    onClick={() => setActiveLandscapeTab(\'archive\')}')

# 6. Update booking portrait button
old_booking_port = """                    <button 
                      id="btn-booking-portrait"
                      className="absolute left-1/2 -translate-x-1/2 bottom-0 pointer-events-none text-white/50 font-archivo text-[clamp(1.65rem,6.5vw,3.4rem)] leading-none tracking-tight select-none"
                      style={{ fontVariationSettings: '"wdth" 62, "wght" 200' }}
                    >
                      booking
                    </button>"""

new_booking_port = """                    <button 
                      id="btn-booking-portrait"
                      onClick={() => setActivePortraitTab('booking')}
                      className="absolute left-1/2 -translate-x-1/2 bottom-0 pointer-events-auto text-white/90 hover:text-white hover-italic-transition font-archivo text-[clamp(1.65rem,6.5vw,3.4rem)] leading-none cursor-pointer tracking-tight select-none"
                      style={{ fontVariationSettings: '"wdth" 62, "wght" 200' }}
                    >
                      booking
                    </button>"""
content = content.replace(old_booking_port, new_booking_port)

# 7. Update friends portrait button
content = content.replace('id="btn-friends-portrait"\n                        onClick={() => setShowFriends(true)}', 'id="btn-friends-portrait"\n                        onClick={() => setActivePortraitTab(\'friends\')}')

# 8. Update archive portrait button
content = content.replace('id="btn-archive-portrait" \n                        onClick={() => setShowArchive(true)}', 'id="btn-archive-portrait" \n                        onClick={() => setActivePortraitTab(\'archive\')}')

# 9. Add new SlideTabs for booking, friends, archive
old_tabs_end = """      <SlideTab
        isOpenLandscape={activeLandscapeTab === 'history'}
        isOpenPortrait={activePortraitTab === 'history'}
        title="his-tory"
        onClose={() => {
          setActiveLandscapeTab(null);
          setActivePortraitTab(null);
        }}
      />"""

new_tabs_end = """      <SlideTab
        isOpenLandscape={activeLandscapeTab === 'history'}
        isOpenPortrait={activePortraitTab === 'history'}
        title="his-tory"
        onClose={() => {
          setActiveLandscapeTab(null);
          setActivePortraitTab(null);
        }}
      />

      <SlideTab
        isOpenLandscape={activeLandscapeTab === 'booking'}
        isOpenPortrait={activePortraitTab === 'booking'}
        title="booking"
        onClose={() => {
          setActiveLandscapeTab(null);
          setActivePortraitTab(null);
        }}
      />

      <SlideTab
        isOpenLandscape={activeLandscapeTab === 'friends'}
        isOpenPortrait={activePortraitTab === 'friends'}
        title="friends"
        onClose={() => {
          setActiveLandscapeTab(null);
          setActivePortraitTab(null);
        }}
      />

      <SlideTab
        isOpenLandscape={activeLandscapeTab === 'archive'}
        isOpenPortrait={activePortraitTab === 'archive'}
        title="archive"
        onClose={() => {
          setActiveLandscapeTab(null);
          setActivePortraitTab(null);
        }}
      />"""

content = content.replace(old_tabs_end, new_tabs_end)

with open('src/App.tsx', 'w') as f:
    f.write(content)


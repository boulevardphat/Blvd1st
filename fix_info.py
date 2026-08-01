import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

old_info = """      <SlideTab
        isOpenLandscape={activeLandscapeTab === 'info'}
        isOpenPortrait={activePortraitTab === 'info'}
        title="info"
        onClose={() => {
          setActiveLandscapeTab(null);
          setActivePortraitTab(null);
        }}
      />"""

new_info = """      <SlideTab
        isOpenLandscape={activeLandscapeTab === 'info'}
        isOpenPortrait={activePortraitTab === 'info'}
        title="info"
        onClose={() => {
          setActiveLandscapeTab(null);
          setActivePortraitTab(null);
        }}
      >
        <div className="absolute top-[25%] left-[6.5%] right-[6.5%] flex flex-col gap-[clamp(2rem,5vw,4rem)] overflow-y-auto no-scrollbar pb-10 max-h-[70%]">
          <div className="flex flex-col gap-1">
            <span className="font-sans text-white/50 text-[clamp(0.6rem,1.5vw,0.875rem)] uppercase tracking-[0.2em]">Location</span>
            <span className="font-archivo text-white text-[clamp(1.5rem,4.5vw,3.5rem)] leading-none tracking-tight">1st Boulevard Street, District 1, HCMC</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-sans text-white/50 text-[clamp(0.6rem,1.5vw,0.875rem)] uppercase tracking-[0.2em]">Hours</span>
            <span className="font-archivo text-white text-[clamp(1.5rem,4.5vw,3.5rem)] leading-none tracking-tight">18:00 — 02:00</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-sans text-white/50 text-[clamp(0.6rem,1.5vw,0.875rem)] uppercase tracking-[0.2em]">Music</span>
            <span className="font-archivo text-white text-[clamp(1.5rem,4.5vw,3.5rem)] leading-none tracking-tight">House / Techno / Open Format</span>
          </div>
        </div>
      </SlideTab>"""

content = content.replace(old_info, new_info)

with open('src/App.tsx', 'w') as f:
    f.write(content)

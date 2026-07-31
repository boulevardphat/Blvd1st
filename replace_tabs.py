import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Define SlideTab component
slide_tab_component = """
function SlideTab({ 
  isOpenLandscape, 
  isOpenPortrait, 
  title, 
  onClose, 
  children 
}: { 
  isOpenLandscape: boolean, 
  isOpenPortrait: boolean, 
  title: string, 
  onClose: () => void, 
  children?: React.ReactNode 
}) {
  return (
    <>
      <AnimatePresence>
        {isOpenLandscape && (
          <motion.div 
            className="fixed top-0 right-0 h-full w-[50vw] bg-[#000000] z-[100] border-l border-white/20 flex flex-col hidden landscape:flex"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute top-[6.5%] left-[6.5%] z-20">
              <span className="font-archivo text-2xl tracking-tighter leading-none text-white/90" style={{ fontVariationSettings: '"wght" 400' }}>
                {title}
              </span>
            </div>
            <div className="absolute top-[6.5%] right-[6.5%] z-20">
              <button 
                onClick={onClose}
                className="text-white/90 hover:text-white hover-italic-transition transition-colors cursor-pointer"
              >
                <span className="font-archivo text-2xl tracking-tighter leading-none" style={{ fontVariationSettings: '"wght" 300' }}>close</span>
              </button>
            </div>
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpenPortrait && (
          <motion.div 
            className="fixed bottom-0 left-0 w-full h-[50vh] bg-[#000000] z-[100] border-t border-white/20 flex flex-col hidden portrait:flex"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute top-[6.5%] left-[6.5%] z-20">
              <span className="font-archivo text-2xl tracking-tighter leading-none text-white/90" style={{ fontVariationSettings: '"wght" 400' }}>
                {title}
              </span>
            </div>
            <div className="absolute top-[6.5%] right-[6.5%] z-20">
              <button 
                onClick={onClose}
                className="text-white/90 hover:text-white hover-italic-transition transition-colors cursor-pointer"
              >
                <span className="font-archivo text-2xl tracking-tighter leading-none" style={{ fontVariationSettings: '"wght" 300' }}>close</span>
              </button>
            </div>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
"""

# Insert SlideTab component after imports
content = content.replace("export default function App() {", slide_tab_component + "\nexport default function App() {")

# Regex to remove old Info Screen
content = re.sub(r'\{\/\* Info Screen: LED Dot Matrix board, clicking anywhere exits \*\/}.*?\{\/\* Contact Tab - Landscape \*\/}', '{/* Contact Tab - Landscape */}', content, flags=re.DOTALL)

# Regex to remove old Contact Tabs and History Screen
# Let's just find everything from Contact Tab - Landscape to the end of History Detail Screen
content = re.sub(r'\{\/\* Contact Tab - Landscape \*\/}.*?\{\/\* History Detail Screen: Completely blank black screen \*\/}', '{/* History Detail Screen: Completely blank black screen */}', content, flags=re.DOTALL)

# Add our new tabs before History Detail Screen
new_tabs = """
      <SlideTab
        isOpenLandscape={activeLandscapeTab === 'contact'}
        isOpenPortrait={activePortraitTab === 'contact'}
        title="contact"
        onClose={() => {
          setActiveLandscapeTab(null);
          setActivePortraitTab(null);
        }}
      />
      
      <SlideTab
        isOpenLandscape={activeLandscapeTab === 'info'}
        isOpenPortrait={activePortraitTab === 'info'}
        title="info"
        onClose={() => {
          setActiveLandscapeTab(null);
          setActivePortraitTab(null);
        }}
      />

      <SlideTab
        isOpenLandscape={activeLandscapeTab === 'history'}
        isOpenPortrait={activePortraitTab === 'history'}
        title="history"
        onClose={() => {
          setActiveLandscapeTab(null);
          setActivePortraitTab(null);
        }}
      />
"""

content = content.replace('{/* History Detail Screen: Completely blank black screen */}', new_tabs + '\n      {/* History Detail Screen: Completely blank black screen */}')

with open('src/App.tsx', 'w') as f:
    f.write(content)


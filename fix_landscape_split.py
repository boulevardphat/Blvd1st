import sys
content = open('src/App.tsx').read()

# For LandscapeContactScreen: remove renderTextContent from halves and put it outside.
# Let's see the renderTextContent placement.
import re

old_top_half = '''        <div className="absolute inset-0">
          <img
            src="https://i.ibb.co/vy4ykmw/vespertine.png"
            className="w-full h-full object-cover object-[49%_center]"
          />
          {/* #89CC04 Tint Overlays */}
          <div className="absolute inset-0 bg-[#89CC04] mix-blend-color opacity-95 pointer-events-none" />
          <div className="absolute inset-0 bg-[#89CC04]/35 mix-blend-multiply pointer-events-none" />
          
          {/* Dim Overlay to make the split feel smoother */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitionProps}
            className="absolute inset-0 bg-black/60 pointer-events-none"
          />

          {/* Landscape Layout content aligned precisely with the main app */}
          {renderTextContent()}

          {/* Subtle border line at the split edge */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitionProps}
            className="absolute top-1/2 left-0 right-0 border-b border-white/10 pointer-events-none" 
          />
        </div>'''

new_top_half = '''        <div className="absolute inset-0">
          <img
            src="https://i.ibb.co/vy4ykmw/vespertine.png"
            className="w-full h-full object-cover object-[49%_center]"
          />
          {/* #89CC04 Tint Overlays */}
          <div className="absolute inset-0 bg-[#89CC04] mix-blend-color opacity-95 pointer-events-none" />
          <div className="absolute inset-0 bg-[#89CC04]/35 mix-blend-multiply pointer-events-none" />
          
          {/* Dim Overlay to make the split feel smoother */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitionProps}
            className="absolute inset-0 bg-black/60 pointer-events-none"
          />

          {/* Subtle border line at the split edge */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitionProps}
            className="absolute top-1/2 left-0 right-0 border-b border-white/10 pointer-events-none" 
          />
        </div>'''

content = content.replace(old_top_half, new_top_half)

old_bot_half = '''        <div className="absolute inset-0">
          <img
            src="https://i.ibb.co/vy4ykmw/vespertine.png"
            className="w-full h-full object-cover object-[49%_center]"
          />
          {/* #89CC04 Tint Overlays */}
          <div className="absolute inset-0 bg-[#89CC04] mix-blend-color opacity-95 pointer-events-none" />
          <div className="absolute inset-0 bg-[#89CC04]/35 mix-blend-multiply pointer-events-none" />

          {/* Dim Overlay to make the split feel smoother */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitionProps}
            className="absolute inset-0 bg-black/60 pointer-events-none"
          />

          {/* Landscape Layout content aligned precisely with the main app */}
          {renderTextContent()}

          {/* Subtle border line at the split edge */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitionProps}
            className="absolute top-1/2 left-0 right-0 border-t border-white/10 pointer-events-none" 
          />
        </div>'''

new_bot_half = '''        <div className="absolute inset-0">
          <img
            src="https://i.ibb.co/vy4ykmw/vespertine.png"
            className="w-full h-full object-cover object-[49%_center]"
          />
          {/* #89CC04 Tint Overlays */}
          <div className="absolute inset-0 bg-[#89CC04] mix-blend-color opacity-95 pointer-events-none" />
          <div className="absolute inset-0 bg-[#89CC04]/35 mix-blend-multiply pointer-events-none" />

          {/* Dim Overlay to make the split feel smoother */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitionProps}
            className="absolute inset-0 bg-black/60 pointer-events-none"
          />

          {/* Subtle border line at the split edge */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitionProps}
            className="absolute top-1/2 left-0 right-0 border-t border-white/10 pointer-events-none" 
          />
        </div>'''

content = content.replace(old_bot_half, new_bot_half)

old_return = '''      {/* Bottom Half of the Split */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: 'calc(var(--vh, 1vh) * 8)' }}
        exit={{ y: 0 }}
        transition={transitionProps}
        onClick={onClose}
        style={{ clipPath: 'inset(50% 0px 0px 0px)' }}
        className="absolute inset-0 overflow-hidden z-20 cursor-pointer"
      >'''

new_return = '''      {/* Landscape Layout content aligned precisely with the main app */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {renderTextContent()}
      </div>

      {/* Bottom Half of the Split */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: 'calc(var(--vh, 1vh) * 8)' }}
        exit={{ y: 0 }}
        transition={transitionProps}
        onClick={onClose}
        style={{ clipPath: 'inset(50% 0px 0px 0px)' }}
        className="absolute inset-0 overflow-hidden z-20 cursor-pointer"
      >'''

content = content.replace(old_return, new_return)

with open('src/App.tsx', 'w') as f:
    f.write(content)

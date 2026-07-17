import sys
content = open('src/App.tsx').read()

old_top = '''          {/* Portrait Layout content aligned precisely with the main app */}
          {renderTextContent()}

          {/* Dim Overlay to make the split feel smoother */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitionProps}
            className="absolute inset-0 bg-black/60 pointer-events-none z-10"
          />'''

new_top = '''          {/* Dim Overlay to make the split feel smoother */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitionProps}
            className="absolute inset-0 bg-black/60 pointer-events-none"
          />

          {/* Portrait Layout content aligned precisely with the main app */}
          {renderTextContent()}'''

content = content.replace(old_top, new_top)

old_bot = '''          {/* Portrait Layout content aligned precisely with the main app */}
          {renderTextContent()}

          {/* Dim Overlay to make the split feel smoother */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitionProps}
            className="absolute inset-0 bg-black/60 pointer-events-none z-10"
          />'''

new_bot = '''          {/* Dim Overlay to make the split feel smoother */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitionProps}
            className="absolute inset-0 bg-black/60 pointer-events-none"
          />

          {/* Portrait Layout content aligned precisely with the main app */}
          {renderTextContent()}'''

content = content.replace(old_bot, new_bot)

with open('src/App.tsx', 'w') as f:
    f.write(content)

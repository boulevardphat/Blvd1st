import sys
content = open('src/App.tsx').read()

old_top_line = '''          {/* Subtle border line at the split edge */}
          <div className="absolute top-[calc(var(--vh,1vh)*66.5)] left-0 right-0 border-b border-white/10 pointer-events-none" />'''

new_top_line = '''          {/* Subtle border line at the split edge */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitionProps}
            className="absolute top-[calc(var(--vh,1vh)*66.5)] left-0 right-0 border-b border-white/10 pointer-events-none" 
          />'''

content = content.replace(old_top_line, new_top_line)

old_bot_line = '''          {/* Subtle border line at the split edge */}
          <div className="absolute top-[calc(var(--vh,1vh)*66.5)] left-0 right-0 border-t border-white/10 pointer-events-none" />'''

new_bot_line = '''          {/* Subtle border line at the split edge */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitionProps}
            className="absolute top-[calc(var(--vh,1vh)*66.5)] left-0 right-0 border-t border-white/10 pointer-events-none" 
          />'''

content = content.replace(old_bot_line, new_bot_line)

with open('src/App.tsx', 'w') as f:
    f.write(content)

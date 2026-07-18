import sys
content = open('src/App.tsx').read()

old_info_span = '''      {/* Bottom Row */}
      <div className="relative flex justify-between items-baseline w-full">
        <motion.span 
          variants={otherVariants}
          initial="initial"
          animate="animate"
          exit="initial"
          transition={transitionProps}
          className="font-archivo text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none tracking-tight select-none"
          style={{ fontVariationSettings: '"wdth" var(--font-wdth), "wght" var(--font-wght)' } as any}
        >
          info
        </motion.span>'''

new_info_span = '''      {/* Bottom Row */}
      <div className="relative flex justify-between items-baseline w-full">
        <motion.span 
          variants={otherVariants}
          initial="initial"
          animate="animate"
          exit="initial"
          transition={transitionProps}
          className="font-archivo text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none tracking-tight select-none relative left-[0.1em]"
          style={{ fontVariationSettings: '"wdth" var(--font-wdth), "wght" var(--font-wght)' } as any}
        >
          info
        </motion.span>'''

content = content.replace(old_info_span, new_info_span)

with open('src/App.tsx', 'w') as f:
    f.write(content)

import sys
content = open('src/App.tsx').read()

old_contact_block = '''      <div className="flex justify-between items-start w-full">
        <motion.span 
          variants={contactVariants}
          initial="initial"
          animate="animate"
          exit="initial"
          transition={transitionProps}
          className="font-archivo hover-italic-transition text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none tracking-tight select-none relative z-20 left-[0.1em]"
          style={{ fontVariationSettings: '"wdth" var(--font-wdth), "wght" var(--font-wght)' } as any}
        >
          contact
        </motion.span>'''

new_contact_block = '''      <div className="flex justify-between items-start w-full">
        <div className="relative">
          <motion.span 
            variants={contactVariants}
            initial="initial"
            animate="animate"
            exit="initial"
            transition={transitionProps}
            className="block font-archivo hover-italic-transition text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none tracking-tight select-none relative z-20 left-[0.1em]"
            style={{ fontVariationSettings: '"wdth" var(--font-wdth), "wght" var(--font-wght)' } as any}
          >
            contact
          </motion.span>
        </div>'''

content = content.replace(old_contact_block, new_contact_block)

old_history_block = '''        <motion.span 
          variants={otherVariants}
          initial="initial"
          animate="animate"
          exit="initial"
          transition={transitionProps}
          className="font-archivo text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none tracking-tight select-none"
          style={{ fontVariationSettings: '"wdth" var(--font-wdth), "wght" var(--font-wght)' } as any}
        >
          his-tory
        </motion.span>'''

new_history_block = '''        <motion.span 
          variants={otherVariants}
          initial="initial"
          animate="animate"
          exit="initial"
          transition={transitionProps}
          className="block font-archivo text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none tracking-tight select-none"
          style={{ fontVariationSettings: '"wdth" var(--font-wdth), "wght" var(--font-wght)' } as any}
        >
          his-tory
        </motion.span>'''

content = content.replace(old_history_block, new_history_block)

old_info_block = '''        <motion.span 
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

new_info_block = '''        <motion.span 
          variants={otherVariants}
          initial="initial"
          animate="animate"
          exit="initial"
          transition={transitionProps}
          className="block font-archivo text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none tracking-tight select-none relative left-[0.1em]"
          style={{ fontVariationSettings: '"wdth" var(--font-wdth), "wght" var(--font-wght)' } as any}
        >
          info
        </motion.span>'''

content = content.replace(old_info_block, new_info_block)

old_archive_block = '''        <motion.span 
          variants={otherVariants}
          initial="initial"
          animate="animate"
          exit="initial"
          transition={transitionProps}
          className="font-archivo text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none tracking-tight select-none"
          style={{ fontVariationSettings: '"wdth" var(--font-wdth), "wght" var(--font-wght)' } as any}
        >
          archive
        </motion.span>'''

new_archive_block = '''        <motion.span 
          variants={otherVariants}
          initial="initial"
          animate="animate"
          exit="initial"
          transition={transitionProps}
          className="block font-archivo text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none tracking-tight select-none"
          style={{ fontVariationSettings: '"wdth" var(--font-wdth), "wght" var(--font-wght)' } as any}
        >
          archive
        </motion.span>'''

content = content.replace(old_archive_block, new_archive_block)

with open('src/App.tsx', 'w') as f:
    f.write(content)

import sys
content = open('src/App.tsx').read()

old_contact = '''          <motion.span 
            variants={contactVariants}
            initial="initial"
            animate="animate"
            exit="initial"
            transition={transitionProps}
            className="block font-archivo hover-italic-transition text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none tracking-tight select-none relative z-20 left-[0.1em]"
            style={{ fontVariationSettings: '"wdth" var(--font-wdth), "wght" var(--font-wght)' } as any}
          >'''

new_contact = '''          <motion.span 
            variants={contactVariants}
            initial="initial"
            animate="animate"
            exit="initial"
            transition={transitionProps}
            onClick={onClose}
            className="block font-archivo hover-italic-transition text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none tracking-tight select-none relative z-20 left-[0.1em] cursor-pointer pointer-events-auto"
            style={{ fontVariationSettings: '"wdth" var(--font-wdth), "wght" var(--font-wght)' } as any}
          >'''
content = content.replace(old_contact, new_contact)

old_history = '''        <motion.span 
          variants={otherVariants}
          initial="initial"
          animate="animate"
          exit="initial"
          transition={transitionProps}
          className="block font-archivo text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none tracking-tight select-none"
          style={{ fontVariationSettings: '"wdth" var(--font-wdth), "wght" var(--font-wght)' } as any}
        >'''

new_history = '''        <motion.span 
          variants={otherVariants}
          initial="initial"
          animate="animate"
          exit="initial"
          transition={transitionProps}
          onClick={onClose}
          className="block font-archivo text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none tracking-tight select-none cursor-pointer pointer-events-auto"
          style={{ fontVariationSettings: '"wdth" var(--font-wdth), "wght" var(--font-wght)' } as any}
        >'''
content = content.replace(old_history, new_history)

old_info = '''        <motion.span 
          variants={otherVariants}
          initial="initial"
          animate="animate"
          exit="initial"
          transition={transitionProps}
          className="block font-archivo text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none tracking-tight select-none relative left-[0.1em]"
          style={{ fontVariationSettings: '"wdth" var(--font-wdth), "wght" var(--font-wght)' } as any}
        >'''

new_info = '''        <motion.span 
          variants={otherVariants}
          initial="initial"
          animate="animate"
          exit="initial"
          transition={transitionProps}
          onClick={onClose}
          className="block font-archivo text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none tracking-tight select-none relative left-[0.1em] cursor-pointer pointer-events-auto"
          style={{ fontVariationSettings: '"wdth" var(--font-wdth), "wght" var(--font-wght)' } as any}
        >'''
content = content.replace(old_info, new_info)

old_archive = '''        <motion.span 
          variants={otherVariants}
          initial="initial"
          animate="animate"
          exit="initial"
          transition={transitionProps}
          className="block font-archivo text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none tracking-tight select-none"
          style={{ fontVariationSettings: '"wdth" var(--font-wdth), "wght" var(--font-wght)' } as any}
        >'''

new_archive = '''        <motion.span 
          variants={otherVariants}
          initial="initial"
          animate="animate"
          exit="initial"
          transition={transitionProps}
          onClick={onClose}
          className="block font-archivo text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none tracking-tight select-none cursor-pointer pointer-events-auto"
          style={{ fontVariationSettings: '"wdth" var(--font-wdth), "wght" var(--font-wght)' } as any}
        >'''
content = content.replace(old_archive, new_archive)

with open('src/App.tsx', 'w') as f:
    f.write(content)

import sys
content = open('src/App.tsx').read()

old_contact_span = '''        <motion.span 
          variants={contactVariants}
          initial="initial"
          animate="animate"
          exit="initial"
          transition={transitionProps}
          className="font-archivo hover-italic-transition text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none tracking-tight select-none relative z-20"
          style={{ fontVariationSettings: '"wdth" var(--font-wdth), "wght" var(--font-wght)' } as any}
        >'''

new_contact_span = '''        <motion.span 
          variants={contactVariants}
          initial="initial"
          animate="animate"
          exit="initial"
          transition={transitionProps}
          className="font-archivo hover-italic-transition text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none tracking-tight select-none relative z-20 left-[0.1em]"
          style={{ fontVariationSettings: '"wdth" var(--font-wdth), "wght" var(--font-wght)' } as any}
        >'''

content = content.replace(old_contact_span, new_contact_span)

with open('src/App.tsx', 'w') as f:
    f.write(content)

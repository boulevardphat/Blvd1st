import sys
content = open('src/App.tsx').read()

old_contact = '''          <motion.span 
            variants={contactVariants}
            initial="initial"
            animate="animate"
            exit="initial"
            transition={transitionProps}
            className="font-archivo hover-italic-transition text-[clamp(1.65rem,6.5vw,3.4rem)] leading-none tracking-tight select-none relative left-[0.1em]"'''

new_contact = '''          <motion.span 
            variants={contactVariants}
            initial="initial"
            animate="animate"
            exit="initial"
            transition={transitionProps}
            className="font-archivo hover-italic-transition text-[clamp(1.65rem,6.5vw,3.4rem)] leading-none tracking-tight select-none relative left-[0.1em] z-20"'''

content = content.replace(old_contact, new_contact)

old_dim = '''          {/* Dim Overlay to make the split feel smoother */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitionProps}
            className="absolute inset-0 bg-black/60 pointer-events-none"
          />'''

new_dim = '''          {/* Dim Overlay to make the split feel smoother */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitionProps}
            className="absolute inset-0 bg-black/60 pointer-events-none z-10"
          />'''

content = content.replace(old_dim, new_dim)

old_exit = '''    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed top-0 left-0 w-full h-[calc(var(--vh,1vh)*100)] mountaineer-overlay z-[100] items-center justify-center hidden portrait:flex"
    >'''

new_exit = '''    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed top-0 left-0 w-full h-[calc(var(--vh,1vh)*100)] mountaineer-overlay z-[100] items-center justify-center hidden portrait:flex"
    >'''

content = content.replace(old_exit, new_exit)

with open('src/App.tsx', 'w') as f:
    f.write(content)

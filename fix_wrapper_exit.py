import sys

content = """import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Facebook, Instagram, AtSign, Copy } from 'lucide-react';

const LandscapeContactScreen = ({ onClose }: { onClose: () => void }) => {
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const handleCopy = (email: string, label: string) => {
    navigator.clipboard.writeText(email).then(() => {
      setCopyFeedback(label);
      setTimeout(() => setCopyFeedback(null), 2000);
    });
  };

  const contactVariants = {
    initial: { 
      "--font-wght": 200, 
      "--font-wdth": 62, 
      color: "rgba(255, 255, 255, 0.9)" 
    } as any,
    animate: { 
      "--font-wght": 600, 
      "--font-wdth": 100, 
      color: "rgba(255, 255, 255, 1)" 
    } as any,
  };

  const otherVariants = {
    initial: { 
      "--font-wght": 200, 
      "--font-wdth": 62, 
      color: "rgba(255, 255, 255, 0.9)" 
    } as any,
    animate: { 
      "--font-wght": 100, 
      "--font-wdth": 62, 
      color: "rgba(255, 255, 255, 0.4)" 
    } as any,
  };

  const transitionProps = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };

  const renderTextContent = () => (
    <div className="absolute inset-0 flex flex-col justify-between p-[6.5%] pointer-events-none hidden landscape:flex z-30">
      {/* Top Row */}
      <div className="flex justify-between items-start w-full">
        <div className="relative">
          <motion.span 
            variants={contactVariants}
            initial="initial"
            animate="animate"
            exit="initial"
            transition={transitionProps}
            onClick={onClose}
            className="block font-archivo hover-italic-transition text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none tracking-tight select-none relative z-20 left-[0.1em] cursor-pointer pointer-events-auto"
            style={{ fontVariationSettings: '"wdth" var(--font-wdth), "wght" var(--font-wght)' } as any}
          >
            contact
          </motion.span>
          
          {/* 3 Cards Layout directly below contact */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="absolute top-[100%] left-[0.1em] mt-4 flex flex-col gap-2.5 pointer-events-auto select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Card 1: Socials */}
            <div className="w-[15.5rem] h-12 bg-black rounded-lg flex items-center justify-center gap-6 border border-transparent hover:border-white/20 transition-colors">
              <a 
                href="https://www.facebook.com/hellothisisBLVD17/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-white/80 transition-colors cursor-pointer"
              >
                <Facebook strokeWidth={1.5} className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/endenogatai_dah" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-white/80 transition-colors cursor-pointer"
              >
                <Instagram strokeWidth={1.5} className="w-5 h-5" />
              </a>
              <a 
                href="https://www.threads.com/@endenogatai_dah" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-white/80 transition-colors cursor-pointer"
              >
                <AtSign strokeWidth={1.5} className="w-5 h-5" />
              </a>
            </div>

            {/* Card 2: Personal Email */}
            <div 
              onClick={() => handleCopy('thuanphat26092008@gmail.com', 'EMAIL CÁ NHÂN')}
              className="w-[15.5rem] h-12 bg-black rounded-lg flex items-center justify-between px-5 cursor-pointer border border-transparent hover:border-[#89CC04] transition-colors group"
            >
              <span className="font-sans text-white text-[15px] font-medium tracking-wide">Email cá nhân</span>
              <Copy strokeWidth={1.5} className="w-[18px] h-[18px] text-white group-hover:text-[#89CC04] transition-colors" />
            </div>

            {/* Card 3: School Email */}
            <div 
              onClick={() => handleCopy('phatnt.a2.2326@gmail.com', 'EMAIL HỌC TẬP')}
              className="w-[15.5rem] h-12 bg-black rounded-lg flex items-center justify-between px-5 cursor-pointer border border-transparent hover:border-[#89CC04] transition-colors group"
            >
              <span className="font-sans text-white text-[15px] font-medium tracking-wide">Email học tập</span>
              <Copy strokeWidth={1.5} className="w-[18px] h-[18px] text-white group-hover:text-[#89CC04] transition-colors" />
            </div>
          </motion.div>
        </div>
        
        <motion.span 
          variants={otherVariants}
          initial="initial"
          animate="animate"
          exit="initial"
          transition={transitionProps}
          onClick={onClose}
          className="block font-archivo text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none tracking-tight select-none cursor-pointer pointer-events-auto"
          style={{ fontVariationSettings: '"wdth" var(--font-wdth), "wght" var(--font-wght)' } as any}
        >
          his-tory
        </motion.span>
      </div>

      {/* Bottom Row */}
      <div className="relative flex justify-between items-baseline w-full">
        <motion.span 
          variants={otherVariants}
          initial="initial"
          animate="animate"
          exit="initial"
          transition={transitionProps}
          onClick={onClose}
          className="block font-archivo text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none tracking-tight select-none relative left-[0.1em] cursor-pointer pointer-events-auto"
          style={{ fontVariationSettings: '"wdth" var(--font-wdth), "wght" var(--font-wght)' } as any}
        >
          info
        </motion.span>

        {/* Centered Logo aligned with bottom baseline */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 flex items-end justify-center">
          <h1 className="font-archivo text-white font-black text-[clamp(2rem,7.6vw,9.125rem)] leading-[0.85] tracking-tighter select-none whitespace-nowrap">
            Boulevard1st
          </h1>
        </div>

        <motion.span 
          variants={otherVariants}
          initial="initial"
          animate="animate"
          exit="initial"
          transition={transitionProps}
          onClick={onClose}
          className="block font-archivo text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none tracking-tight select-none cursor-pointer pointer-events-auto"
          style={{ fontVariationSettings: '"wdth" var(--font-wdth), "wght" var(--font-wght)' } as any}
        >
          archive
        </motion.span>
      </div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1, transition: { duration: 0.8 } }}
      className="fixed top-0 left-0 w-full h-[calc(var(--vh,1vh)*100)] z-[100] items-center justify-center hidden landscape:flex pointer-events-none"
    >
      {/* Background container: Image is solid instantly so it completely covers the old text seamlessly */}
      <div 
        className="absolute inset-0 z-0 cursor-pointer pointer-events-auto"
        onClick={onClose}
      >
        <img
          src="https://i.ibb.co/vy4ykmw/vespertine.png"
          className="w-full h-full object-cover object-[49%_center]"
        />
        {/* Overlays fade in smoothly */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transitionProps}
          className="absolute inset-0 bg-[#89CC04] mix-blend-color opacity-95 pointer-events-none" 
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transitionProps}
          className="absolute inset-0 bg-[#89CC04]/35 mix-blend-multiply pointer-events-none" 
        />
        
        {/* Dim Overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transitionProps}
          className="absolute inset-0 bg-black/60 pointer-events-none"
        />
      </div>

      {/* 4 Corner Texts and Cards */}
      {renderTextContent()}

      {/* Copy Notification Toast */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 h-8 flex items-center justify-center pointer-events-none z-50">
        <AnimatePresence>
          {copyFeedback && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white text-black text-[12px] font-mono tracking-widest px-6 py-2 uppercase font-bold rounded-sm whitespace-nowrap shadow-lg"
            >
              ĐÃ SAO CHÉP {copyFeedback}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LandscapeContactScreen;
"""

with open('src/components/LandscapeContactScreen.tsx', 'w') as f:
    f.write(content)

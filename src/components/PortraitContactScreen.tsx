import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Facebook, Instagram, AtSign, Copy, Check } from 'lucide-react';

const PortraitContactScreen = ({ onClose }: { onClose: () => void }) => {
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
    <div className="absolute inset-0 pointer-events-none">
      {/* Anchor point exactly at 66.5vh, centered horizontally */}
      <div className="absolute left-1/2 -translate-x-1/2 w-fit flex flex-col items-center" style={{ top: 'calc(var(--vh, 1vh) * 66.5)' }}>
        
        {/* Top Row - positioned absolute above the center */}
        <div className="absolute bottom-full mb-[3px] w-full flex justify-between items-end">
          <motion.span 
            variants={contactVariants}
            initial="initial"
            animate="animate"
            exit="initial"
            transition={transitionProps}
            className="font-archivo hover-italic-transition text-[clamp(1.65rem,6.5vw,3.4rem)] leading-none tracking-tight select-none relative left-[0.1em] z-20"
            style={{ fontVariationSettings: '"wdth" var(--font-wdth), "wght" var(--font-wght)' } as any}
          >
            contact
          </motion.span>
          <motion.span 
            variants={otherVariants}
            initial="initial"
            animate="animate"
            exit="initial"
            transition={transitionProps}
            className="font-archivo text-[clamp(1.65rem,6.5vw,3.4rem)] leading-none tracking-tight select-none"
            style={{ fontVariationSettings: '"wdth" var(--font-wdth), "wght" var(--font-wght)' } as any}
          >
            his-tory
          </motion.span>
        </div>

        {/* Logo and Bottom Row - normal flow, just pushed down by 3px */}
        <div className="mt-[3px] flex flex-col w-full">
          <h1 className="font-archivo text-white font-black text-[clamp(2.5rem,11.5vw,6rem)] leading-none tracking-tighter select-none whitespace-nowrap">
            Boulevard1st
          </h1>
          
          {/* Bottom Row - spaced below logo by 6px */}
          <div className="mt-[6px] w-full flex justify-between items-start">
            <motion.span 
              variants={otherVariants}
              initial="initial"
              animate="animate"
              exit="initial"
              transition={transitionProps}
              className="font-archivo text-[clamp(1.65rem,6.5vw,3.4rem)] leading-none tracking-tight select-none relative left-[0.1em]"
              style={{ fontVariationSettings: '"wdth" var(--font-wdth), "wght" var(--font-wght)' } as any}
            >
              info
            </motion.span>
            <motion.span 
              variants={otherVariants}
              initial="initial"
              animate="animate"
              exit="initial"
              transition={transitionProps}
              className="font-archivo text-[clamp(1.65rem,6.5vw,3.4rem)] leading-none tracking-tight select-none"
              style={{ fontVariationSettings: '"wdth" var(--font-wdth), "wght" var(--font-wght)' } as any}
            >
              archive
            </motion.span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed top-0 left-0 w-full h-[calc(var(--vh,1vh)*100)] mountaineer-overlay z-[100] items-center justify-center hidden portrait:flex"
    >
      {/* Background container that is pure black to show through the gap */}
      <div 
        className="absolute inset-0 bg-black z-0" 
        onClick={onClose} 
      />

      {/* Middle black band with social and email icons (revealed when screen tears) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute inset-x-0 top-[calc(var(--vh,1vh)*66.5)] -translate-y-1/2 h-[calc(var(--vh,1vh)*9.5)] bg-black border-y border-white/10 flex flex-col justify-center items-center z-10 select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Copy Notification Toast */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 h-8 flex items-center justify-center pointer-events-none">
          <AnimatePresence>
            {copyFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white text-black text-[11px] font-mono tracking-widest px-4 py-1.5 uppercase font-bold rounded-sm whitespace-nowrap"
              >
                ĐÃ SAO CHÉP {copyFeedback}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Icons Row */}
        <div className="flex items-center gap-10 px-8">
          {/* Social MXH Group */}
          <div className="flex items-center gap-6">
            <a 
              href="https://www.facebook.com/hellothisisBLVD17/" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={(e) => e.stopPropagation()}
              className="text-white hover:scale-115 transition-transform active:scale-95 cursor-pointer"
            >
              <Facebook strokeWidth={1.5} size={28} />
            </a>
            <a 
              href="https://www.instagram.com/endenogatai_dah" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={(e) => e.stopPropagation()}
              className="text-white hover:scale-115 transition-transform active:scale-95 cursor-pointer"
            >
              <Instagram strokeWidth={1.5} size={28} />
            </a>
            <a 
              href="https://www.threads.com/@endenogatai_dah" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={(e) => e.stopPropagation()}
              className="text-white hover:scale-115 transition-transform active:scale-95 cursor-pointer"
            >
              <AtSign strokeWidth={1.5} size={28} />
            </a>
          </div>

          {/* Elegant Divider */}
          <div className="w-[1px] h-8 bg-white/20" />

          {/* Email Group */}
          <div className="flex items-center gap-6">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleCopy('thuanphat26092008@gmail.com', 'EMAIL CÁ NHÂN');
              }}
              className="text-white hover:scale-115 transition-transform active:scale-95 cursor-pointer flex flex-col items-center"
            >
              <Copy strokeWidth={1.5} size={28} />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleCopy('phatnt.a2.2326@gmail.com', 'EMAIL HỌC TẬP');
              }}
              className="text-white hover:scale-115 transition-transform active:scale-95 cursor-pointer flex flex-col items-center"
            >
              <Copy strokeWidth={1.5} size={28} className="rotate-12" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Top Half of the Split */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: 'calc(var(--vh, 1vh) * -4.75)' }}
        exit={{ y: 0 }}
        transition={transitionProps}
        onClick={onClose}
        style={{ clipPath: 'inset(0px 0px 33.5% 0px)' }}
        className="absolute inset-0 overflow-hidden z-20 cursor-pointer"
      >
        <div className="absolute inset-0">
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

          {/* Portrait Layout content aligned precisely with the main app */}
          {renderTextContent()}
          
          {/* Subtle border line at the split edge */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitionProps}
            className="absolute top-[calc(var(--vh,1vh)*66.5)] left-0 right-0 border-b border-white/10 pointer-events-none" 
          />
        </div>
      </motion.div>

      {/* Bottom Half of the Split */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: 'calc(var(--vh, 1vh) * 4.75)' }}
        exit={{ y: 0 }}
        transition={transitionProps}
        onClick={onClose}
        style={{ clipPath: 'inset(66.5% 0px 0px 0px)' }}
        className="absolute inset-0 overflow-hidden z-20 cursor-pointer"
      >
        <div className="absolute inset-0">
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

          {/* Portrait Layout content aligned precisely with the main app */}
          {renderTextContent()}

          {/* Subtle border line at the split edge */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitionProps}
            className="absolute top-[calc(var(--vh,1vh)*66.5)] left-0 right-0 border-t border-white/10 pointer-events-none" 
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PortraitContactScreen;

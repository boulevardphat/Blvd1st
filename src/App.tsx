/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LedDotBoard } from './components/LedDotBoard';
import { Facebook, Instagram, AtSign, Check, Copy } from 'lucide-react';

// --- Decrypted Text Component ---
const CHARS = '!<>-_\\/[]{}—=+*^?#________';

const DecryptedText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    let interval: any;
    const maxIterations = 20;
    let iterations = 0;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        if (iterations >= maxIterations) {
          clearInterval(interval);
          setDisplay(text);
        } else {
          setDisplay(text.split('').map((char, index) => {
            if (char === ' ') return ' ';
            if (index < (iterations / maxIterations) * text.length) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join(''));
        }
        iterations++;
      }, 30);
    }, delay);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [text, delay]);

  return <span>{display || '\u00A0'}</span>;
};

// --- Landscape Contact Menu ---
const LandscapeContactMenu = () => {
  const [copiedPersonal, setCopiedPersonal] = useState(false);
  const [copiedSchool, setCopiedSchool] = useState(false);

  const handleCopy = (email: string, type: 'personal' | 'school') => {
    navigator.clipboard.writeText(email).then(() => {
      if (type === 'personal') {
        setCopiedPersonal(true);
        setTimeout(() => setCopiedPersonal(false), 2000);
      } else {
        setCopiedSchool(true);
        setTimeout(() => setCopiedSchool(false), 2000);
      }
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -12, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.25,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="absolute top-[103%] left-0 flex flex-col gap-[clamp(0.24rem,0.48vw,0.6rem)] select-none z-50 w-[clamp(175px,19.25vw,240px)] pointer-events-auto"
    >
      {/* Social Card */}
      <motion.div 
        variants={itemVariants}
        className="bg-black border border-white/20 shadow-lg rounded-md flex flex-row justify-center items-center gap-[clamp(1.0rem,1.5vw,1.8rem)] px-[clamp(0.6rem,0.9vw,1.3rem)] py-[clamp(0.55rem,0.8vw,1.0rem)] w-full"
      >
        <a 
          href="https://www.facebook.com/hellothisisBLVD17/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-white hover:text-white/80 transition-colors cursor-pointer"
        >
          <Facebook strokeWidth={2} className="w-[clamp(21px,2.1vw,27px)] h-[clamp(21px,2.1vw,27px)]" />
        </a>
        <a 
          href="https://www.instagram.com/endenogatai_dah" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-white hover:text-white/80 transition-colors cursor-pointer"
        >
          <Instagram strokeWidth={2} className="w-[clamp(21px,2.1vw,27px)] h-[clamp(21px,2.1vw,27px)]" />
        </a>
        <a 
          href="https://www.threads.com/@endenogatai_dah" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-white hover:text-white/80 transition-colors cursor-pointer"
        >
          <AtSign strokeWidth={2} className="w-[clamp(21px,2.1vw,27px)] h-[clamp(21px,2.1vw,27px)]" />
        </a>
      </motion.div>

      {/* Email Cá Nhân Card */}
      <motion.button
        variants={itemVariants}
        onClick={() => handleCopy('thuanphat26092008@gmail.com', 'personal')}
        className="bg-black border border-white/20 shadow-lg rounded-md flex items-center justify-between gap-2 px-[clamp(0.6rem,0.9vw,1.3rem)] py-[clamp(0.55rem,0.8vw,1.0rem)] hover:border-white/40 hover:bg-white/10 transition-colors cursor-pointer text-left w-full"
      >
        <span className="text-white font-sans font-medium text-[clamp(1.1rem,1.25vw,1.4rem)] tracking-wide whitespace-nowrap">
          Email cá nhân
        </span>
        <span className="text-white">
          {copiedPersonal ? (
            <Check className="w-[clamp(18px,2.0vw,24px)] h-[clamp(18px,2.0vw,24px)] text-white" />
          ) : (
            <Copy className="w-[clamp(18px,2.0vw,24px)] h-[clamp(18px,2.0vw,24px)] text-white" />
          )}
        </span>
      </motion.button>

      {/* Email Học Tập Card */}
      <motion.button
        variants={itemVariants}
        onClick={() => handleCopy('phatnt.a2.2326@gmail.com', 'school')}
        className="bg-black border border-white/20 shadow-lg rounded-md flex items-center justify-between gap-2 px-[clamp(0.6rem,0.9vw,1.3rem)] py-[clamp(0.55rem,0.8vw,1.0rem)] hover:border-white/40 hover:bg-white/10 transition-colors cursor-pointer text-left w-full"
      >
        <span className="text-white font-sans font-medium text-[clamp(1.1rem,1.25vw,1.4rem)] tracking-wide whitespace-nowrap">
          Email học tập
        </span>
        <span className="text-white">
          {copiedSchool ? (
            <Check className="w-[clamp(18px,2.0vw,24px)] h-[clamp(18px,2.0vw,24px)] text-white" />
          ) : (
            <Copy className="w-[clamp(18px,2.0vw,24px)] h-[clamp(18px,2.0vw,24px)] text-white" />
          )}
        </span>
      </motion.button>
    </motion.div>
  );
};

// --- Portrait Contact Screen Component (Split Screen Horizontal Effect) ---
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

interface SplitFlapProps {
  id?: string;
  width?: string | number;
  height?: string | number;
  duration?: string | number;
  children?: React.ReactNode;
}

const SplitFlapBoard: React.FC<SplitFlapProps> = ({ id, width, height, duration, children }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const innerRef = React.useRef<HTMLDivElement>(null);
  const flapRef = React.useRef<HTMLElement>(null);
  const [scale, setScale] = React.useState({ x: 1, y: 1, ready: false });

  React.useEffect(() => {
    if (flapRef.current) {
      if (width !== undefined) {
        flapRef.current.setAttribute('width', String(width));
      }
      if (height !== undefined) {
        flapRef.current.setAttribute('height', String(height));
      }
      if (duration !== undefined) {
        flapRef.current.setAttribute('duration', String(duration));
      }
    }
  }, [width, height, duration, children]);

  React.useEffect(() => {
    let active = true;

    const updateScale = () => {
      if (!active) return;
      if (!containerRef.current || !innerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;

      const innerWidth = innerRef.current.offsetWidth;
      const innerHeight = innerRef.current.offsetHeight;

      if (containerWidth > 0 && containerHeight > 0 && innerWidth > 10 && innerHeight > 10) {
        const scaleX = containerWidth / innerWidth;
        const scaleY = containerHeight / innerHeight;
        setScale({ x: scaleX, y: scaleY, ready: true });
      } else {
        // If not measured yet, retry next frame
        requestAnimationFrame(updateScale);
      }
    };

    updateScale();

    // Use ResizeObserver on both the container (screen resizing) and the inner container (when custom elements load)
    const observer = new ResizeObserver(() => {
      updateScale();
    });

    if (containerRef.current) observer.observe(containerRef.current);
    if (innerRef.current) observer.observe(innerRef.current);

    window.addEventListener('resize', updateScale);

    // Run some delayed updates to catch shadow DOM initialization
    const timers = [
      setTimeout(updateScale, 50),
      setTimeout(updateScale, 150),
      setTimeout(updateScale, 300),
      setTimeout(updateScale, 600),
    ];

    return () => {
      active = false;
      observer.disconnect();
      window.removeEventListener('resize', updateScale);
      timers.forEach(clearTimeout);
    };
  }, [children]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full flex items-center justify-center overflow-hidden relative"
    >
      <div
        ref={innerRef}
        style={{
          display: 'block',
          width: 'fit-content',
          height: 'fit-content',
          transform: `scale(${scale.x}, ${scale.y})`,
          transformOrigin: 'center center',
          opacity: scale.ready ? 1 : 0,
          transition: scale.ready ? 'opacity 0.2s ease-out' : 'none',
        }}
      >
        {React.createElement('hotfx-split-flap', { 
          id, 
          ref: flapRef,
        } as any, children)}
      </div>
    </div>
  );
};

type SceneState = 'intro-play' | 'intro-blvd' | 'intro-clock' | 'intro-image-1' | 'intro-image-2' | 'intro-image-3' | 'main-app';

export default function App() {
  const [scene, setScene] = useState<SceneState>('intro-play');
  const [timeStr, setTimeStr] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [showContactLandscape, setShowContactLandscape] = useState(false);
  const [showContactPortrait, setShowContactPortrait] = useState(false);
  
  const bgAudioRef = React.useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let lastWidth = window.innerWidth;
    const setVh = () => {
      if (window.innerWidth !== lastWidth || !document.documentElement.style.getPropertyValue('--vh')) {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        lastWidth = window.innerWidth;
      }
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  useEffect(() => {
    if (scene === 'main-app' && bgAudioRef.current) {
      bgAudioRef.current.volume = 0.6;
      bgAudioRef.current.play().catch(() => {});
    } else if (scene !== 'main-app' && bgAudioRef.current) {
      bgAudioRef.current.pause();
      bgAudioRef.current.currentTime = 0;
    }
  }, [scene]);

  const handleBgAudioEnded = () => {
    setTimeout(() => {
      if (bgAudioRef.current && scene === 'main-app') {
        bgAudioRef.current.play().catch(() => {});
      }
    }, 5000);
  };

  useEffect(() => {
    // Disable right-click context menu globally
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Disable text selection globally via JS events for full coverage
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('selectstart', handleSelectStart);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('selectstart', handleSelectStart);
    };
  }, []);

// Handle high-speed clock ticking for Scene 3 (KC3)
class ClockAudio {
  private ctx: AudioContext | null = null;

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    } catch (e) {
      console.error("Failed to initialize clock audio context", e);
    }
  }

  public resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public playHungUpTick(isTock: boolean) {
    if (!this.ctx) {
      this.init();
    }
    this.resume();
    if (!this.ctx || this.ctx.state === 'suspended') return;

    try {
      const t = this.ctx.currentTime;
      
      // 1. High-frequency crisp metallic bandpassed noise (the spring escapement action)
      const bufferSize = this.ctx.sampleRate * 0.02; // 20ms of noise
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      
      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(isTock ? 4200 : 5200, t);
      noiseFilter.Q.setValueAtTime(12, t); // High resonance for crisp metallic click
      
      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.18, t); // Audible gain level
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.008); // Sharp 8ms decay
      
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noise.start(t);
      
      // 2. High frequency micro ring/tinkle (escapement tooth impact)
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(isTock ? 2400 : 3100, t);
      
      oscGain.gain.setValueAtTime(0.12, t); // Audible sine click
      oscGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.015); // Fast 15ms decay for bright, distinct tinkle
      
      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.02);

      // 3. Wooden escapement hollow body resonance click (adds body & fullness to the tick so it's not thin)
      const bodyOsc = this.ctx.createOscillator();
      const bodyGain = this.ctx.createGain();
      
      bodyOsc.type = 'triangle';
      bodyOsc.frequency.setValueAtTime(isTock ? 600 : 850, t);
      
      bodyGain.gain.setValueAtTime(0.15, t);
      bodyGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.01); // 10ms body decay
      
      bodyOsc.connect(bodyGain);
      bodyGain.connect(this.ctx.destination);
      bodyOsc.start(t);
      bodyOsc.stop(t + 0.015);

    } catch (e) {
      // Catch blocks for initial gesture requirements
    }
  }
}

  // Handle high-speed clock ticking for Scene 3 (KC3)
  useEffect(() => {
    if (scene !== 'intro-clock') return;

    const clockAudio = new ClockAudio();
    clockAudio.init();

    // Setup interactive events to resume the context safely
    const handleInteraction = () => {
      clockAudio.init();
      clockAudio.resume();
    };
    window.addEventListener('click', handleInteraction, { passive: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true });

    let lastTickStep = -1;

    const updateClock = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      const ms = String(now.getMilliseconds()).padStart(3, '0');
      setTimeStr(`${hrs} : ${mins} : ${secs} : ${ms}`);

      // Rapid mechanical stopwatch ticking: every 125ms (8 ticks per second) for a frantic, high-beat retro gear aesthetic
      const nowMs = now.getTime();
      const currentTickStep = Math.floor(nowMs / 125);

      if (currentTickStep !== lastTickStep) {
        lastTickStep = currentTickStep;
        const isTock = (currentTickStep % 2 === 1);
        // clockAudio.playHungUpTick(isTock); // Removed clock tick audio per user request
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 16); // ~60fps high speed update

    return () => {
      clearInterval(interval);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [scene]);

  // Handle automatic transitions between scenes (Custom sequence timing)
  useEffect(() => {
    if (scene === 'intro-play') {
      const t = setTimeout(() => {
        setScene('intro-blvd');
      }, 500); // 0.5s for KC1 ("phát")
      return () => clearTimeout(t);
    }
    if (scene === 'intro-blvd') {
      const t = setTimeout(() => {
        setScene('intro-clock');
      }, 500); // 0.5s for KC2 ("BLVD")
      return () => clearTimeout(t);
    }
    if (scene === 'intro-clock') {
      const t = setTimeout(() => {
        setScene('intro-image-1');
      }, 800); // 2.0s for KC3 (clock ticks) to be easily visible
      return () => clearTimeout(t);
    }
    if (scene === 'intro-image-1') {
      const t = setTimeout(() => {
        setScene('intro-image-2');
      }, 500); // 0.5s for KC4 (tinted background #89CC04)
      return () => clearTimeout(t);
    }
    if (scene === 'intro-image-2') {
      const t = setTimeout(() => {
        setScene('intro-image-3');
      }, 500); // 0.5s for KC5 (tinted background #C54EAA)
      return () => clearTimeout(t);
    }
    if (scene === 'intro-image-3') {
      const t = setTimeout(() => {
        setScene('main-app');
      }, 500); // 0.5s for KC6 (tinted background #8375B3)
      return () => clearTimeout(t);
    }
  }, [scene]);

  return (
    <main 
      className="relative w-screen h-[calc(var(--vh,1vh)*100)] overflow-hidden bg-black flex items-center justify-center select-none" 
      id="main-container"
    >
      <audio 
        ref={bgAudioRef}
        src="https://files.catbox.moe/op8yd3.mp3"
        onEnded={handleBgAudioEnded}
      />
      
      {/* Preloaded Background Images (Always active at z-0, hidden behind black scenes 1-3, visible in scenes 4-6 and main app) */}
      <img
        id="preload-ultrayoung"
        src="https://i.ibb.co/tP3rK5bg/ultrayoung.jpg"
        alt="Boulevard1st Ultrayoung Background"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover portrait:object-[49%_center] z-0 opacity-0 pointer-events-none"
      />
      <img
        id="preload-young"
        src="https://i.ibb.co/Nd6BpwZ2/young.jpg"
        alt="Boulevard1st Young Background"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover portrait:object-[49%_center] z-0 opacity-0 pointer-events-none"
      />
      <img
        id="reference-image"
        src="https://i.ibb.co/vy4ykmw/vespertine.png"
        alt="Boulevard1st Background"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover portrait:object-[49%_center] z-0"
      />

      {/* KC1: Start Screen ("phát") */}
      {scene === 'intro-play' && (
        <div 
          id="scene-play"
          className="absolute inset-0 flex items-center justify-center bg-black z-50 select-none"
        >
          <div
            id="intro-phat-text"
            className="font-phat text-[clamp(1rem,3.2vw,1.4rem)] text-white/90 uppercase select-none tracking-[-0.12em]"
          >
            phát
          </div>
        </div>
      )}

      {/* KC2: BLVD Hollow / Stretched Text Screen */}
      {scene === 'intro-blvd' && (
        <div 
          id="scene-blvd"
          className="absolute inset-0 flex items-center justify-center bg-black z-40 overflow-hidden select-none w-full h-full"
        >
          <svg 
            viewBox="0 0 400 100" 
            className="w-full h-full" 
            preserveAspectRatio="none"
          >
            <text
              x="50%"
              y="50%"
              dominantBaseline="central"
              textAnchor="middle"
              className="font-archivo font-black select-none pointer-events-none"
              fontSize="110"
              fill="none"
              stroke="rgba(255, 255, 255, 0.95)"
              strokeWidth="3.2"
            >
              BLVD
            </text>
          </svg>
        </div>
      )}

      {/* KC3: High-frequency live ticking clock */}
      {scene === 'intro-clock' && (
        <div 
          id="scene-clock"
          className="absolute inset-0 flex items-center justify-center bg-black z-30 select-none"
        >
          <div 
            id="clock-display"
            className="font-archivo font-normal text-[clamp(1.4rem,4.2vw,3.8rem)] text-white/95 tracking-[0.05em] select-none pointer-events-none tabular-nums"
          >
            {timeStr}
          </div>
        </div>
      )}

      {/* KC4: Background Image with #8375B3 tint */}
      {scene === 'intro-image-1' && (
        <div 
          id="scene-intro-image-1"
          className="absolute inset-0 z-20 select-none pointer-events-none"
        >
          {/* Sibling image to ensure perfect mix-blend-mode rendering */}
          <img
            src="https://i.ibb.co/tP3rK5bg/ultrayoung.jpg"
            alt="Intro Background Reference 1"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover portrait:object-[49%_center]"
          />
          {/* #8375B3 Tint Overlays */}
          <div className="absolute inset-0 bg-[#8375B3] mix-blend-color opacity-95 pointer-events-none" />
          <div className="absolute inset-0 bg-[#8375B3]/35 mix-blend-multiply pointer-events-none" />
        </div>
      )}

      {/* KC5: Background Image with #C54EAA tint */}
      {scene === 'intro-image-2' && (
        <div 
          id="scene-intro-image-2"
          className="absolute inset-0 z-15 select-none pointer-events-none"
        >
          {/* Sibling image to ensure perfect mix-blend-mode rendering */}
          <img
            src="https://i.ibb.co/Nd6BpwZ2/young.jpg"
            alt="Intro Background Reference 2"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover portrait:object-[49%_center]"
          />
          {/* #C54EAA Tint Overlays */}
          <div className="absolute inset-0 bg-[#C54EAA] mix-blend-color opacity-95 pointer-events-none" />
          <div className="absolute inset-0 bg-[#C54EAA]/35 mix-blend-multiply pointer-events-none" />
        </div>
      )}

      {/* KC6: Background Image with #89CC04 tint */}
      {scene === 'intro-image-3' && (
        <div 
          id="scene-intro-image-3"
          className="absolute inset-0 z-10 select-none pointer-events-none"
        >
          {/* Sibling image to ensure perfect mix-blend-mode rendering */}
          <img
            src="https://i.ibb.co/vy4ykmw/vespertine.png"
            alt="Intro Background Reference 3"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover portrait:object-[49%_center]"
          />
          {/* #89CC04 Tint Overlays */}
          <div className="absolute inset-0 bg-[#89CC04] mix-blend-color opacity-95 pointer-events-none" />
          <div className="absolute inset-0 bg-[#89CC04]/35 mix-blend-multiply pointer-events-none" />
        </div>
      )}

      {/* Main App Screen (Background Image & Interactive Interface Layouts) */}
      {scene === 'main-app' && (
        <div className="absolute inset-0 z-10 overflow-y-auto no-scrollbar scroll-smooth snap-y snap-mandatory">
          <div className="w-full flex flex-col">
            {/* The 100vh Main Screen View */}
            <div className="relative w-full h-[calc(var(--vh,1vh)*100)] shrink-0 flex items-center justify-center overflow-hidden snap-start snap-always">
              {/* Background Image */}
              <img
                id="reference-image"
                src="https://i.ibb.co/vy4ykmw/vespertine.png"
                alt="Vespertine Design Reference"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover portrait:object-[49%_center]"
              />

              {/* Landscape Layout (Visible only in landscape / horizontal viewports) */}
              <div 
                id="safezone-overlay-landscape" 
                className="hidden landscape:flex absolute inset-0 flex-col justify-between p-[6.5%] pointer-events-none"
              >
                {/* Top Row */}
                <div className="flex justify-between items-start w-full">
                  <div className="relative pointer-events-auto">
                    <button 
                      id="btn-contact-landscape" 
                      onClick={() => setShowContactLandscape(!showContactLandscape)}
                      className="text-white/90 hover:text-white hover-italic-transition font-archivo-narrow font-extralight text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none cursor-pointer tracking-tight select-none"
                    >
                      contact
                    </button>
                    {showContactLandscape && <LandscapeContactMenu />}
                  </div>
                  
                  <button 
                    id="btn-history-landscape" 
                    onClick={() => setShowHistory(true)}
                    className="pointer-events-auto text-white/90 hover:text-white hover-italic-transition font-archivo-narrow font-extralight text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none cursor-pointer tracking-tight select-none"
                  >
                    his-tory
                  </button>
                </div>

                {/* Bottom Row */}
                <div className="relative flex justify-between items-baseline w-full">
                  <button 
                    id="btn-info-landscape" 
                    onClick={() => setShowInfo(true)}
                    className="pointer-events-auto text-white/90 hover:text-white hover-italic-transition font-archivo-narrow font-extralight text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none cursor-pointer tracking-tight select-none"
                  >
                    info
                  </button>

                  {/* Centered Logo aligned with bottom baseline */}
                  <div 
                    id="logo-container"
                    className="absolute left-1/2 bottom-0 -translate-x-1/2 flex items-end justify-center pointer-events-auto"
                  >
                    <h1 
                      id="logo-text-landscape"
                      className="font-archivo text-white font-black text-[clamp(2rem,7.6vw,9.125rem)] leading-[0.85] tracking-tighter select-none whitespace-nowrap"
                    >
                      Boulevard1st
                    </h1>
                  </div>

                  <button 
                    id="btn-archive-landscape" 
                    onClick={() => setShowArchive(true)}
                    className="pointer-events-auto text-white/90 hover:text-white hover-italic-transition font-archivo-narrow font-extralight text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none cursor-pointer tracking-tight select-none"
                  >
                    archive
                  </button>
                </div>
              </div>

              {/* Portrait Layout (Visible only in portrait / vertical viewports) */}
              <div 
                id="safezone-overlay-portrait" 
                className="hidden portrait:flex absolute inset-0 pointer-events-none"
              >
                {/* Anchor point exactly at 66.5vh, centered horizontally */}
                <div className="absolute left-1/2 -translate-x-1/2 w-fit pointer-events-auto flex flex-col items-center" style={{ top: 'calc(var(--vh, 1vh) * 66.5)' }}>
                  
                  {/* Top Row - positioned absolute above the center */}
                  <div className="absolute bottom-full mb-[3px] w-full flex justify-between items-end">
                    <div className="relative pointer-events-auto">
                      <button 
                        id="btn-contact-portrait" 
                        onClick={() => setShowContactPortrait(true)}
                        className="text-white/90 hover:text-white hover-italic-transition font-archivo text-[clamp(1.65rem,6.5vw,3.4rem)] leading-none cursor-pointer tracking-tight select-none relative left-[0.1em]"
                        style={{ fontVariationSettings: '"wdth" 62, "wght" 200' }}
                      >
                        contact
                      </button>
                    </div>
                    <button 
                      id="btn-history-portrait" 
                      onClick={() => setShowHistory(true)}
                      className="text-white/90 hover:text-white hover-italic-transition font-archivo text-[clamp(1.65rem,6.5vw,3.4rem)] leading-none cursor-pointer tracking-tight select-none"
                        style={{ fontVariationSettings: '"wdth" 62, "wght" 200' }}
                    >
                      his-tory
                    </button>
                  </div>

                  {/* Logo and Bottom Row - normal flow, just pushed down by 3px */}
                  <div className="mt-[3px] flex flex-col w-full">
                    <h1 
                      id="logo-text-portrait"
                      className="font-archivo text-white font-black text-[clamp(2.5rem,11.5vw,6rem)] leading-none tracking-tighter select-none whitespace-nowrap"
                    >
                      Boulevard1st
                    </h1>
                    
                    {/* Bottom Row - spaced below logo by 6px */}
                    <div className="mt-[6px] w-full flex justify-between items-start">
                      <button 
                        id="btn-info-portrait" 
                        onClick={() => setShowInfo(true)}
                        className="text-white/90 hover:text-white hover-italic-transition font-archivo text-[clamp(1.65rem,6.5vw,3.4rem)] leading-none cursor-pointer tracking-tight select-none relative left-[0.1em]"
                        style={{ fontVariationSettings: '"wdth" 62, "wght" 200' }}
                      >
                        info
                      </button>
                      <button 
                        id="btn-archive-portrait" 
                        onClick={() => setShowArchive(true)}
                        className="text-white/90 hover:text-white hover-italic-transition font-archivo text-[clamp(1.65rem,6.5vw,3.4rem)] leading-none cursor-pointer tracking-tight select-none"
                        style={{ fontVariationSettings: '"wdth" 62, "wght" 200' }}
                      >
                        archive
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Flat Solid Black Footer (Thinner, tight, black layout with snug logos and prominent dark black hint shadow) */}
            <div
              id="app-footer"
              className="relative w-full min-h-[calc(var(--vh,1vh)*15)] bg-black border-t border-white/10 shrink-0 z-20 flex items-center justify-center py-6 shadow-[0_-8px_30px_rgba(0,0,0,0.9)] snap-end snap-always"
            >
              <div className="flex flex-row flex-nowrap items-center justify-center gap-[clamp(6px,2vw,24px)] px-4 md:px-6 max-w-5xl w-full">
                {/* Logo 1: BlvdGuestBook (Kích thước thống nhất, font Arial Medium chuẩn) */}
                <a 
                  id="footer-logo-guestbook"
                  href="https://blvdguestbook.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-[clamp(96px,28vw,240px)] h-[clamp(32px,8.5vw,54px)] bg-white border border-black md:border-2 rounded-none shadow-[2px_2px_0px_0px_#8ace00] md:shadow-[3px_3px_0px_0px_#8ace00] hover:shadow-[4px_4px_0px_0px_#8ace00] hover:-translate-x-[1px] hover:-translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-150 select-none cursor-pointer"
                >
                  <span 
                    className="text-[clamp(9px,2.5vw,20px)] font-medium text-black tracking-tighter leading-none select-none"
                    style={{ fontFamily: "Arial, sans-serif" }}
                  >
                    BlvdGuestBook
                  </span>
                </a>

                {/* Logo 2: Boulevard1st (nền trắng text đen, khung vuông vức, ở giữa, kích thước thống nhất) */}
                <a 
                  id="footer-logo-blvd1st"
                  href="https://boulevard1st.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-[clamp(96px,28vw,240px)] h-[clamp(32px,8.5vw,54px)] bg-white border border-black md:border-2 rounded-none cursor-pointer select-none transition-all duration-300 hover:bg-black group"
                >
                  <span 
                    className="font-archivo text-black font-black text-[clamp(9px,2.5vw,20px)] tracking-tighter leading-none whitespace-nowrap group-hover:text-white transition-colors duration-300"
                  >
                    Boulevard1st
                  </span>
                </a>

                {/* Logo 3: BlvdMusicSpace (Hiệu ứng đèn LED đa trạng thái chuẩn, vuông vức, kích thước thống nhất) */}
                <a 
                  id="footer-logo-musicspace"
                  href="https://blvdmusicspace.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-[clamp(96px,28vw,240px)] h-[clamp(32px,8.5vw,54px)] bg-white rounded-none border border-white/95 md:border-2 transition-all duration-300 ease-out hover:bg-slate-950 hover:border-[#0066ff] hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(0,102,255,0.9),0_0_50px_rgba(0,102,255,0.5)] group cursor-pointer animate-led-flicker select-none"
                >
                  <h1 
                    className="text-[clamp(8.5px,2.2vw,18px)] font-black text-black tracking-tighter leading-none text-center transition-colors duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(0,102,255,0.8)] font-be-vietnam whitespace-nowrap"
                    style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                  >
                    BlvdMusicSpace
                  </h1>
                </a>
              </div>
              {/* Portrait Contact Overlay */}
              <AnimatePresence>
                {showContactPortrait && <PortraitContactScreen onClose={() => setShowContactPortrait(false)} />}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}

      {/* Info Screen: LED Dot Matrix board, clicking anywhere exits */}
      {showInfo && (
        <div 
          id="info-led-screen"
          className="fixed inset-0 bg-black z-50 cursor-pointer select-none"
          onClick={() => setShowInfo(false)}
        >
          <LedDotBoard />
        </div>
      )}

      {/* History Screen: Completely blank black screen */}
      {showHistory && (
        <div 
          id="history-screen"
          className="fixed inset-0 bg-black z-50 cursor-pointer"
          onClick={() => setShowHistory(false)}
        />
      )}

      {/* Archive Screen: Completely blank black screen */}
      {showArchive && (
        <div 
          id="archive-screen"
          className="fixed inset-0 bg-black z-50 cursor-pointer"
          onClick={() => setShowArchive(false)}
        />
      )}
    </main>
  );
}

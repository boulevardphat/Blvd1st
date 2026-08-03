/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import Footer from './components/Footer';
import { ViewingZone } from './components/ViewingZone';



import { IntroClock } from './components/IntroClock';

import { VespertineBackground } from './components/VespertineBackground';

type SceneState = 'pre-intro' | 'intro-play' | 'intro-blvd' | 'intro-clock' | 'intro-image-1' | 'intro-image-2' | 'intro-image-3' | 'main-app';


function SlideTab({ 
  isOpenLandscape, 
  isOpenPortrait, 
  title, 
  onClose, 
  children 
}: { 
  isOpenLandscape: boolean, 
  isOpenPortrait: boolean, 
  title: string, 
  onClose: () => void, 
  children?: React.ReactNode 
}) {
  const getVnTitle = (t: string) => {
    const lower = t.toLowerCase();
    if (lower === 'contact') return 'liên hệ';
    if (lower === 'info') return 'thông tin';
    if (lower === 'his-tory' || lower === 'history') return 'tiểu sử';
    if (lower === 'friends') return 'bạn bè';
    if (lower === 'archive') return 'lưu trữ';
    if (lower === 'booking') return 'đặt lịch';
    return null;
  };
  const vnTitle = getVnTitle(title);

  return (
    <>
      <AnimatePresence>
        {isOpenLandscape && (
          <motion.div 
            className="fixed top-0 right-0 h-full w-[50vw] bg-[#000000] z-[100] border-l border-white/20 flex flex-col hidden landscape:flex"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute top-[6.5%] left-[6.5%] z-20 flex items-baseline select-none">
              <span className="font-archivo text-2xl tracking-tighter leading-none text-white/90" style={{ fontVariationSettings: '"wght" 600' }}>
                {title}
              </span>
              {vnTitle && (
                <span className="font-archivo text-2xl tracking-tighter leading-none text-white/40 ml-1.5" style={{ fontVariationSettings: '"wght" 600' }}>
                  ({vnTitle})
                </span>
              )}
            </div>
            <div className="absolute top-[6.5%] right-[6.5%] z-20">
              <button 
                onClick={onClose}
                className="text-white/90 hover:text-white hover-italic-transition transition-colors cursor-pointer"
              >
                <span className="font-archivo text-2xl tracking-tighter leading-none" style={{ fontVariationSettings: '"wght" 300' }}>close</span>
              </button>
            </div>
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpenPortrait && (
          <motion.div 
            className="fixed bottom-0 left-0 w-full h-[80vh] bg-[#000000] z-[100] border-t border-white/20 flex flex-col hidden portrait:flex"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute top-[6.5%] left-[6.5%] z-20 flex items-baseline select-none">
              <span className="font-archivo text-2xl tracking-tighter leading-none text-white/90" style={{ fontVariationSettings: '"wght" 600' }}>
                {title}
              </span>
              {vnTitle && (
                <span className="font-archivo text-2xl tracking-tighter leading-none text-white/40 ml-1.5" style={{ fontVariationSettings: '"wght" 600' }}>
                  ({vnTitle})
                </span>
              )}
            </div>
            <div className="absolute top-[6.5%] right-[6.5%] z-20">
              <button 
                onClick={onClose}
                className="text-white/90 hover:text-white hover-italic-transition transition-colors cursor-pointer"
              >
                <span className="font-archivo text-2xl tracking-tighter leading-none" style={{ fontVariationSettings: '"wght" 300' }}>close</span>
              </button>
            </div>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function HistoryStretchedItem({ item }: { item: any, key?: React.Key }) {
  const textRef = React.useRef<SVGTextElement>(null);
  const [viewBox, setViewBox] = useState('0 0 1000 100'); // Fallback

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const updateBBox = () => {
      if (textRef.current) {
        const bbox = textRef.current.getBBox();
        if (bbox.width > 0 && bbox.height > 0) {
          // Exactly map the viewBox to the visual bounding box of the text
          // to eliminate any internal padding of the font
          const trimLeft = 2; 
          const trimRight = 2;
          const trimTop = 15;
          const trimBottom = 12;
          setViewBox(`${bbox.x + trimLeft} ${bbox.y + trimTop} ${bbox.width - trimLeft - trimRight} ${bbox.height - trimTop - trimBottom}`);
        }
      }
    };

    if ('fonts' in document) {
      document.fonts.ready.then(updateBBox);
    }
    updateBBox();
    
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(updateBBox, 150);
      setTimeout(updateBBox, 400); // Safari fallback
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [item]);

  return (
    <div className="flex-1 border-b border-white/40 relative overflow-hidden flex items-center justify-center p-0 text-[#a6a6a6]">
      <svg 
        viewBox={viewBox} 
        className="w-full h-full pointer-events-none block overflow-visible" 
        preserveAspectRatio="none"
      >
        {item.gradient && (
          <defs>
            <linearGradient id={`grad-${item.match2}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="10%" stopColor={item.gradient} />
              <stop offset="60%" stopColor={item.color} />
            </linearGradient>
          </defs>
        )}
        <text
          ref={textRef}
          x="50%"
          y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          className="font-archivo uppercase"
          fontSize="100"
          fill="currentColor"
          style={{ fontVariationSettings: '"wght" 900', color: item.defaultColor }}
        >
          {item.text ? (
            <tspan fill="currentColor">{item.text}</tspan>
          ) : (
            <>
              <tspan>{item.match1}</tspan>
              <tspan fill={item.gradient ? `url(#grad-${item.match2})` : item.color}>{item.match2}</tspan>
            </>
          )}
        </text>
      </svg>
    </div>
  );
}

export default function App() {

  const [scene, setScene] = useState<SceneState>('pre-intro');
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);
  const [activeTab, setActiveTab] = useState<'contact' | 'info' | 'history' | 'booking' | 'friends' | 'archive' | null>(null);
  const [showHistoryDetail, setShowHistoryDetail] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
  
  const bgAudioRef = React.useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const imageUrls = [
      "https://i.ibb.co/JFvk9wzr/vespertine-bg.png",
      "https://i.ibb.co/jPHPJSG7/vespertine-sj.png",
      "https://i.ibb.co/vy4ykmw/vespertine.png",
      "https://i.ibb.co/Nd6BpwZ2/young.jpg",
      "https://i.ibb.co/tP3rK5bg/ultrayoung.jpg"
    ];

    let loadedCount = 0;
    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === imageUrls.length) {
        setImagesLoaded(true);
      }
    };

    imageUrls.forEach(url => {
      const img = new Image();
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad;
      img.src = url;
    });
  }, []);

  // Background preloading for secondary tab images (info, contact, etc.) right after main page images finish loading
  useEffect(() => {
    if (imagesLoaded) {
      const secondaryImageUrls = [
        "https://i.ibb.co/ycXZb8vq/contact.webp",
        "https://i.ibb.co/TxrtFvPZ/info.webp"
      ];

      secondaryImageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
      });
    }
  }, [imagesLoaded]);

  useEffect(() => {
    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;
    const setVh = () => {
      // Recalculate if width changes (rotation/resize) OR height changes significantly (split-screen/keyboard > 150px)
      // but ignore small height changes (URL bar hide/show)
      if (
        window.innerWidth !== lastWidth ||
        Math.abs(window.innerHeight - lastHeight) > 150 ||
        !document.documentElement.style.getPropertyValue('--vh')
      ) {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        lastWidth = window.innerWidth;
        lastHeight = window.innerHeight;
        setIsLandscape(window.innerWidth > window.innerHeight);
      }
    };
    setVh();
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);
    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
    };
  }, []);

  const isAnyPopupOpen = activeTab !== null || showArchive || showFriends || showHistoryDetail;

  useEffect(() => {
    if (scene === 'main-app' && !isAnyPopupOpen && bgAudioRef.current) {
      bgAudioRef.current.volume = 0.6;
      bgAudioRef.current.play().catch(() => {});
    } else if (bgAudioRef.current) {
      bgAudioRef.current.pause();
      if (scene !== 'main-app') {
        bgAudioRef.current.currentTime = 0;
      }
    }
  }, [scene, isAnyPopupOpen]);

  // Ensure audio plays upon user interaction in main-app
  useEffect(() => {
    const handleGlobalInteraction = () => {
      if (scene === 'main-app' && !isAnyPopupOpen && bgAudioRef.current) {
        bgAudioRef.current.play().catch(() => {});
      }
    };
    window.addEventListener('click', handleGlobalInteraction, { passive: true });
    window.addEventListener('touchstart', handleGlobalInteraction, { passive: true });
    return () => {
      window.removeEventListener('click', handleGlobalInteraction);
      window.removeEventListener('touchstart', handleGlobalInteraction);
    };
  }, [scene, isAnyPopupOpen]);

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

  // Handle automatic transitions between scenes (Custom sequence timing)
  useEffect(() => {
    if (scene === 'pre-intro' && imagesLoaded) {
      const t = setTimeout(() => {
        setScene('intro-play');
      }, 1500); // Wait 1.5s to finish the black fade animation before starting intro
      return () => clearTimeout(t);
    }
    if (scene === 'intro-play') {
      const t = setTimeout(() => {
        setScene('intro-blvd');
      }, 500); // 0.5s for KC1 ("phát")
      return () => clearTimeout(t);
    }
    if (scene === 'intro-blvd') {
      const t = setTimeout(() => {
        setScene('intro-clock-normal');
      }, 500); // 0.5s for KC2 ("BLVD")
      return () => clearTimeout(t);
    }
    if (scene === 'intro-clock-normal') {
      const t = setTimeout(() => {
        setScene('intro-clock-reverse-mirrored');
      }, 600); // KC3
      return () => clearTimeout(t);
    }
    if (scene === 'intro-clock-reverse-mirrored') {
      const t = setTimeout(() => {
        setScene('intro-clock-multiple');
      }, 600); // KC4
      return () => clearTimeout(t);
    }
    if (scene === 'intro-clock-multiple') {
      const t = setTimeout(() => {
        setScene('intro-image-1');
      }, 600); // KC6
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
  }, [scene, imagesLoaded]);

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
      
      {/* Pre-intro overlay */}
      {scene === 'pre-intro' && (
        <motion.div
          key="pre-intro"
          initial={{ backgroundColor: '#ffffff' }}
          animate={{ backgroundColor: imagesLoaded ? '#000000' : '#ffffff' }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0 z-[100]"
        />
      )}

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
      <VespertineBackground />

      {/* KC1: Start Screen ("phát") */}
      {scene === 'intro-play' && (
        <div 
          id="scene-play"
          className="absolute inset-0 flex items-center justify-center bg-black z-50 select-none"
        >
          <div
            id="intro-phat-text"
            className="font-sans text-[clamp(2.5rem,8vw,5rem)] text-white/90 select-none tracking-normal font-normal"
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
      {scene === 'intro-clock-normal' && <IntroClock mode="normal" />}
      {/* KC4: Reverse and mirrored clock */}
      {scene === 'intro-clock-reverse-mirrored' && <IntroClock mode="reverse-mirrored" />}
      {/* KC6: Multiple clocks */}
      {scene === 'intro-clock-multiple' && <IntroClock mode="multiple" />}

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
          <VespertineBackground />
          {/* #89CC04 Tint Overlays */}
          <div className="absolute inset-0 bg-[#89CC04] mix-blend-color opacity-95 pointer-events-none" />
          <div className="absolute inset-0 bg-[#89CC04]/35 mix-blend-multiply pointer-events-none" />
        </div>
      )}

      {/* Main App Screen (Background Image & Interactive Interface Layouts) */}
      {scene === 'main-app' && (
        <div className={`absolute inset-0 z-10 overflow-x-hidden no-scrollbar scroll-smooth ${isAnyPopupOpen ? 'overflow-y-hidden' : 'overflow-y-auto'}`}>
          <div className="w-full flex flex-col overflow-x-hidden">
            {/* The 100vh Main Screen View */}
            <div className="relative w-full h-[calc(var(--vh,1vh)*100)] shrink-0 flex items-center justify-center overflow-hidden ">
              {/* Background Image */}
              <VespertineBackground shiftLeft={activeTab !== null && isLandscape} />

              <AnimatePresence>
                {activeTab !== null && (
                  <motion.div
                    className="absolute inset-0 bg-black/60 z-10 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  />
                )}
              </AnimatePresence>

              {/* Landscape Layout (Visible only in landscape / horizontal viewports) */}
              {!(activeTab !== null) && (
                <div 
                  id="safezone-overlay-landscape" 
                  className="hidden landscape:flex absolute inset-0 flex-col justify-between p-[6.5%] pointer-events-none"
                >
                {/* Top Row */}
                <div className="flex justify-between items-start w-full">
                  <div className="relative pointer-events-auto">
                    <button 
                      id="btn-contact-landscape" 
                      onClick={() => setActiveTab('contact')}
                      className="text-white/90 hover:text-white hover-italic-transition font-archivo text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none cursor-pointer tracking-tight select-none relative left-[0.1em]"
                      style={{ fontVariationSettings: '"wdth" 62, "wght" 200' }}
                    >
                      contact
                    </button>
                  </div>
                  
                  <button 
                    id="btn-history-landscape" 
                    onClick={() => setActiveTab('history')}
                    className="pointer-events-auto text-white/90 hover:text-white hover-italic-transition font-archivo text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none cursor-pointer tracking-tight select-none"
                    style={{ fontVariationSettings: '"wdth" 62, "wght" 200' }}
                  >
                    his-tory
                  </button>
                </div>

                {/* Middle Row */}
                <div className="flex justify-between items-center w-full pointer-events-none">
                  <button 
                    id="btn-booking-landscape" 
                    onClick={() => setActiveTab('booking')}
                    className="pointer-events-auto text-white/90 hover:text-white hover-italic-transition font-archivo text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none cursor-pointer tracking-tight select-none relative left-[0.1em]"
                    style={{ fontVariationSettings: '"wdth" 62, "wght" 200' }}
                  >
                    booking
                  </button>
                  <button 
                    id="btn-friends-landscape" 
                    onClick={() => setActiveTab('friends')}
                    className="pointer-events-auto text-white/90 hover:text-white hover-italic-transition font-archivo text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none cursor-pointer tracking-tight select-none"
                    style={{ fontVariationSettings: '"wdth" 62, "wght" 200' }}
                  >
                    friends
                  </button>
                </div>

                {/* Bottom Row */}
                <div className="relative flex justify-between items-baseline w-full">
                  <button 
                    id="btn-info-landscape" 
                    onClick={() => setActiveTab('info')}
                    className="pointer-events-auto text-white/90 hover:text-white hover-italic-transition font-archivo text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none cursor-pointer tracking-tight select-none relative left-[0.1em]"
                    style={{ fontVariationSettings: '"wdth" 62, "wght" 200' }}
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
                    onClick={() => setActiveTab('archive')}
                    className="pointer-events-auto text-white/90 hover:text-white hover-italic-transition font-archivo text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none cursor-pointer tracking-tight select-none"
                    style={{ fontVariationSettings: '"wdth" 62, "wght" 200' }}
                  >
                    archive
                  </button>
                </div>
              </div>
              )}

              {/* Portrait Layout (Visible only in portrait / vertical viewports) */}
              {!(activeTab !== null) && (
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
                        onClick={() => setActiveTab('contact')}
                        className="text-white/90 hover:text-white hover-italic-transition font-archivo text-[clamp(1.65rem,6.5vw,3.4rem)] leading-none cursor-pointer tracking-tight select-none relative left-[0.1em]"
                        style={{ fontVariationSettings: '"wdth" 62, "wght" 200' }}
                      >
                        contact
                      </button>
                    </div>

                    <button 
                      id="btn-booking-portrait"
                      onClick={() => setActiveTab('booking')}
                      className="absolute left-1/2 -translate-x-1/2 bottom-0 pointer-events-auto text-white/90 hover:text-white hover-italic-transition font-archivo text-[clamp(1.65rem,6.5vw,3.4rem)] leading-none cursor-pointer tracking-tight select-none"
                      style={{ fontVariationSettings: '"wdth" 62, "wght" 200' }}
                    >
                      booking
                    </button>

                    <button 
                      id="btn-history-portrait" 
                      onClick={() => setActiveTab('history')}
                      className="text-white/90 hover:text-white hover-italic-transition font-archivo text-[clamp(1.65rem,6.5vw,3.4rem)] leading-none cursor-pointer tracking-tight select-none"  
                      style={{ fontVariationSettings: '"wdth" 62, "wght" 200' }}
                    >
                      his-tory
                    </button>
                  </div>

                  {/* Logo and Bottom Row - normal flow, just pushed down by 3px */}
                  <div className="mt-[3px] flex flex-col w-full relative">
                    <h1 
                      id="logo-text-portrait"
                      className="font-archivo text-white font-black text-[clamp(2.5rem,11.5vw,6rem)] leading-none tracking-tighter select-none whitespace-nowrap"
                    >
                      Boulevard1st
                    </h1>
                    
                    {/* Bottom Row - spaced below logo by 6px */}
                    <div className="mt-[6px] w-full flex justify-between items-start relative">
                      <button 
                        id="btn-info-portrait" 
                        onClick={() => setActiveTab('info')}
                        className="text-white/90 hover:text-white hover-italic-transition font-archivo text-[clamp(1.65rem,6.5vw,3.4rem)] leading-none cursor-pointer tracking-tight select-none relative left-[0.1em]"
                        style={{ fontVariationSettings: '"wdth" 62, "wght" 200' }}
                      >
                        info
                      </button>

                      <button 
                        id="btn-friends-portrait"
                        onClick={() => setActiveTab('friends')}
                        className="absolute left-1/2 -translate-x-1/2 top-0 pointer-events-auto text-white/90 hover:text-white hover-italic-transition font-archivo text-[clamp(1.65rem,6.5vw,3.4rem)] leading-none cursor-pointer tracking-tight select-none"
                        style={{ fontVariationSettings: '"wdth" 62, "wght" 200' }}
                      >
                        friends
                      </button>

                      <button 
                        id="btn-archive-portrait" 
                        onClick={() => setActiveTab('archive')}
                        className="text-white/90 hover:text-white hover-italic-transition font-archivo text-[clamp(1.65rem,6.5vw,3.4rem)] leading-none cursor-pointer tracking-tight select-none"
                        style={{ fontVariationSettings: '"wdth" 62, "wght" 200' }}
                      >
                        archive
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              )}
            </div>

            <Footer isPopupOpen={isAnyPopupOpen} />
          </div>
        </div>
      )}

      
      <SlideTab
        isOpenLandscape={activeTab === 'contact'}
        isOpenPortrait={activeTab === 'contact'}
        title="contact"
        onClose={() => {
          setActiveTab(null);
        }}
      >
        <div className="absolute top-[calc(13%+1.5rem)] left-[6.5%] right-[6.5%] bottom-[6.5%]">
          <ViewingZone showBorder={true} imageSrc="https://i.ibb.co/ycXZb8vq/contact.webp" />
        </div>
      </SlideTab>
      
      <SlideTab
        isOpenLandscape={activeTab === 'info'}
        isOpenPortrait={activeTab === 'info'}
        title="info"
        onClose={() => {
          setActiveTab(null);
        }}
      >
        <div className="absolute top-[calc(13%+1.5rem)] left-[6.5%] right-[6.5%] flex flex-col gap-[clamp(1.2rem,3vw,2.5rem)] items-start overflow-y-auto no-scrollbar pb-10 max-h-[80%]">
          {/* Image placeholder */}
          <img src="https://i.ibb.co/TxrtFvPZ/info.webp" alt="Phat Nguyen Thuan" className="w-[clamp(12rem,35vw,24rem)] landscape:w-[clamp(9.6rem,28vw,19.2rem)] aspect-[1439/959] object-cover mb-2" referrerPolicy="no-referrer" />
          <div className="flex flex-col gap-1 items-start">
            <span className="font-sans text-white/50 text-[clamp(0.6rem,1.5vw,0.875rem)] uppercase tracking-[0.2em]">name</span>
            <span className="font-archivo text-white text-[clamp(1.5rem,4.5vw,3.5rem)] leading-none tracking-tight">Phat Nguyen Thuan</span>
          </div>
          <div className="flex flex-col gap-1 items-start">
            <span className="font-sans text-white/50 text-[clamp(0.6rem,1.5vw,0.875rem)] uppercase tracking-[0.2em]">birth</span>
            <span className="font-archivo text-white text-[clamp(1.5rem,4.5vw,3.5rem)] leading-none tracking-tight">26/09/2008</span>
          </div>
          <div className="flex flex-col gap-1 items-start">
            <span className="font-sans text-white/50 text-[clamp(0.6rem,1.5vw,0.875rem)] uppercase tracking-[0.2em]">zodiac</span>
            <span className="font-archivo text-white text-[clamp(1.5rem,4.5vw,3.5rem)] leading-none tracking-tight">Libra</span>
          </div>
          <div className="flex flex-col gap-1 items-start">
            <span className="font-sans text-white/50 text-[clamp(0.6rem,1.5vw,0.875rem)] uppercase tracking-[0.2em]">mbti</span>
            <span className="font-archivo text-white text-[clamp(1.5rem,4.5vw,3.5rem)] leading-none tracking-tight">INFP-T</span>
          </div>
        </div>
      </SlideTab>

      <SlideTab
        isOpenLandscape={activeTab === 'history'}
        isOpenPortrait={activeTab === 'history'}
        title="his-tory"
        onClose={() => {
          setActiveTab(null);
        }}
      >
        <div className="absolute top-[calc(13%+1.5rem)] left-[6.5%] right-[6.5%] bottom-[6.5%] border-t border-l border-r border-white/40 pointer-events-auto rounded-none flex flex-col">
          {[
            { text: 'pre-BLVD', defaultColor: '#a6a6a6' },
            { match1: '#BLVD', match2: '15', color: '#EFDD7C', defaultColor: '#a6a6a6' },
            { match1: '#BLVD', match2: '16', color: '#8ACE00', defaultColor: '#a6a6a6' },
            { match1: '#BLVD', match2: '17', color: '#ffffff', defaultColor: '#a6a6a6' },
            { match1: '#BLVD', match2: '18', color: '#705fa3', gradient: '#FE00A1', defaultColor: '#a6a6a6' }
          ].map((item, idx) => (
            <HistoryStretchedItem key={idx} item={item} />
          ))}
        </div>
      </SlideTab>

      <SlideTab
        isOpenLandscape={activeTab === 'booking'}
        isOpenPortrait={activeTab === 'booking'}
        title="booking"
        onClose={() => {
          setActiveTab(null);
        }}
      />

      <SlideTab
        isOpenLandscape={activeTab === 'friends'}
        isOpenPortrait={activeTab === 'friends'}
        title="friends"
        onClose={() => {
          setActiveTab(null);
        }}
      />

      <SlideTab
        isOpenLandscape={activeTab === 'archive'}
        isOpenPortrait={activeTab === 'archive'}
        title="archive"
        onClose={() => {
          setActiveTab(null);
        }}
      />

      {/* History Detail Screen: Completely blank black screen */}
      {showHistoryDetail && (
        <div 
          id="history-detail-screen"
          className="fixed inset-0 bg-black z-[60] cursor-pointer"
          onClick={() => setShowHistoryDetail(false)}
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

      {/* Friends Screen: Completely blank black screen */}
      {showFriends && (
        <div 
          id="friends-screen"
          className="fixed inset-0 bg-black z-50 cursor-pointer"
          onClick={() => setShowFriends(false)}
        />
      )}
    </main>
  );
}

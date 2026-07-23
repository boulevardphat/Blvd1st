/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import FlowingMenu from './components/FlowingMenu';
import { LedDotBoard } from './components/LedDotBoard';
import LandscapeContactScreen from './components/LandscapeContactScreen';
import PortraitContactScreen from './components/PortraitContactScreen';
import Footer from './components/Footer';



import { IntroClock } from './components/IntroClock';

import { VespertineBackground } from './components/VespertineBackground';

type SceneState = 'intro-play' | 'intro-image-1' | 'intro-image-2' | 'intro-image-3' | 'main-app';

export default function App() {

  const [scene, setScene] = useState<SceneState>('intro-play');
  const [showInfo, setShowInfo] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showHistoryDetail, setShowHistoryDetail] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
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

  const isAnyPopupOpen = showInfo || showHistory || showArchive || showFriends || showContactLandscape || showContactPortrait;

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
      {scene === 'intro-clock' && <IntroClock />}

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
        <div className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden no-scrollbar scroll-smooth">
          <div className="w-full flex flex-col overflow-x-hidden">
            {/* The 100vh Main Screen View */}
            <div className="relative w-full h-[calc(var(--vh,1vh)*100)] shrink-0 flex items-center justify-center overflow-hidden ">
              {/* Background Image */}
              <VespertineBackground />
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
                      onClick={() => setShowContactLandscape(true)}
                      className="text-white/90 hover:text-white hover-italic-transition font-archivo text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none cursor-pointer tracking-tight select-none relative left-[0.1em]"
                      style={{ fontVariationSettings: '"wdth" 62, "wght" 200' }}
                    >
                      contact
                    </button>
                  </div>
                  
                  <button 
                    id="btn-history-landscape" 
                    onClick={() => setShowHistory(true)}
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
                    className="pointer-events-none text-white/50 font-archivo text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none tracking-tight select-none relative left-[0.1em]"
                    style={{ fontVariationSettings: '"wdth" 62, "wght" 200' }}
                  >
                    booking
                  </button>
                  <button 
                    id="btn-friends-landscape" 
                    onClick={() => setShowFriends(true)}
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
                    onClick={() => setShowInfo(true)}
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
                    onClick={() => setShowArchive(true)}
                    className="pointer-events-auto text-white/90 hover:text-white hover-italic-transition font-archivo text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none cursor-pointer tracking-tight select-none"
                    style={{ fontVariationSettings: '"wdth" 62, "wght" 200' }}
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
                      id="btn-booking-portrait"
                      className="absolute left-1/2 -translate-x-1/2 bottom-0 pointer-events-none text-white/50 font-archivo text-[clamp(1.65rem,6.5vw,3.4rem)] leading-none tracking-tight select-none"
                      style={{ fontVariationSettings: '"wdth" 62, "wght" 200' }}
                    >
                      booking
                    </button>

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
                        onClick={() => setShowInfo(true)}
                        className="text-white/90 hover:text-white hover-italic-transition font-archivo text-[clamp(1.65rem,6.5vw,3.4rem)] leading-none cursor-pointer tracking-tight select-none relative left-[0.1em]"
                        style={{ fontVariationSettings: '"wdth" 62, "wght" 200' }}
                      >
                        info
                      </button>

                      <button 
                        id="btn-friends-portrait"
                        onClick={() => setShowFriends(true)}
                        className="absolute left-1/2 -translate-x-1/2 top-0 pointer-events-auto text-white/90 hover:text-white hover-italic-transition font-archivo text-[clamp(1.65rem,6.5vw,3.4rem)] leading-none cursor-pointer tracking-tight select-none"
                        style={{ fontVariationSettings: '"wdth" 62, "wght" 200' }}
                      >
                        friends
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

            <Footer isPopupOpen={isAnyPopupOpen} />

              {/* Landscape Contact Overlay */}
              <AnimatePresence>
                {showContactLandscape && <LandscapeContactScreen onClose={() => setShowContactLandscape(false)} />}
              </AnimatePresence>

              {/* Portrait Contact Overlay */}
              <AnimatePresence>
                {showContactPortrait && <PortraitContactScreen onClose={() => setShowContactPortrait(false)} />}
              </AnimatePresence>
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

      {/* History Screen */}
      {showHistory && (
        <div 
          id="history-screen"
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
        >
          <div className="absolute top-[6.5%] right-[6.5%] z-20">
            <button 
              onClick={() => setShowHistory(false)}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full p-3 transition-colors shadow-lg border border-white/10"
            >
              <X size={24} strokeWidth={2} />
            </button>
          </div>
          <div className="w-full h-full relative">
            <FlowingMenu
              items={[
                { text: 'pre-BLVD', image: 'https://i.ibb.co/vy4ykmw/vespertine.png', onClick: (e: any) => { e.stopPropagation(); setShowHistoryDetail(true); } },
                { text: '#BLVD15', image: 'https://i.ibb.co/Nd6BpwZ2/young.jpg', onClick: (e: any) => { e.stopPropagation(); setShowHistoryDetail(true); } },
                { text: '#BLVD16', image: 'https://i.ibb.co/tP3rK5bg/ultrayoung.jpg', onClick: (e: any) => { e.stopPropagation(); setShowHistoryDetail(true); } },
                { text: '#BLVD17', image: 'https://i.ibb.co/vy4ykmw/vespertine.png', onClick: (e: any) => { e.stopPropagation(); setShowHistoryDetail(true); } },
                { text: '#BLVD18', image: 'https://i.ibb.co/Nd6BpwZ2/young.jpg', onClick: (e: any) => { e.stopPropagation(); } }
              ]}
              speed={4}
              textColor="#a6a6a6"
              marqueeTextColor="#ffffff"
              marqueeBgColor="#1a1a1a"
              borderColor="rgba(255,255,255,0.1)"
            />
          </div>
        </div>
      )}

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

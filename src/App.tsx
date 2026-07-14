/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { LedDotBoard } from './components/LedDotBoard';

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
  useEffect(() => {
    if (scene !== 'intro-clock') return;

    const updateClock = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      const ms = String(now.getMilliseconds()).padStart(3, '0');
      setTimeStr(`${hrs} : ${mins} : ${secs} : ${ms}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 16); // ~60fps high speed update

    return () => clearInterval(interval);
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
      className="relative w-screen h-screen overflow-hidden bg-black flex items-center justify-center select-none" 
      id="main-container"
    >
      
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
        <div className="absolute inset-0 z-10 overflow-y-auto no-scrollbar scroll-smooth">
          <div className="w-full flex flex-col">
            {/* The 100vh Main Screen View */}
            <div className="relative w-full h-screen shrink-0 flex items-center justify-center overflow-hidden">
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
                  <button 
                    id="btn-contact-landscape" 
                    className="pointer-events-auto text-white/90 hover:text-white hover-italic-transition font-archivo-narrow font-extralight text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none cursor-pointer tracking-tight select-none"
                  >
                    contact
                  </button>
                  
                  <button 
                    id="btn-history-landscape" 
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
                    className="pointer-events-auto text-white/90 hover:text-white hover-italic-transition font-archivo-narrow font-extralight text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none cursor-pointer tracking-tight select-none"
                  >
                    archive
                  </button>
                </div>
              </div>

              {/* Portrait Layout (Visible only in portrait / vertical viewports) */}
              <div 
                id="safezone-overlay-portrait" 
                className="hidden portrait:flex absolute inset-0 flex-col items-center justify-end pb-[18vh] p-[6%] pointer-events-none"
              >
                <div className="relative w-fit pointer-events-auto flex flex-col justify-center pt-[clamp(2rem,7.5vw,3.8rem)] pb-[clamp(2rem,7.5vw,3.8rem)]">
                  {/* Top Row */}
                  <div className="absolute top-0 left-0 right-0 flex justify-between items-end">
                    <button 
                      id="btn-contact-portrait" 
                      className="text-white/90 hover:text-white hover-italic-transition font-archivo-narrow font-extralight text-[clamp(1.65rem,6.5vw,3.4rem)] leading-none cursor-pointer tracking-tight select-none relative left-[0.1em]"
                    >
                      contact
                    </button>
                    <button 
                      id="btn-history-portrait" 
                      className="text-white/90 hover:text-white hover-italic-transition font-archivo-narrow font-extralight text-[clamp(1.65rem,6.5vw,3.4rem)] leading-none cursor-pointer tracking-tight select-none"
                    >
                      his-tory
                    </button>
                  </div>

                  {/* Centered Logo (defines width of parent) */}
                  <h1 
                    id="logo-text-portrait"
                    className="font-archivo text-white font-black text-[clamp(2.5rem,11.5vw,6rem)] leading-[0.8] tracking-tighter select-none whitespace-nowrap"
                  >
                    Boulevard1st
                  </h1>

                  {/* Bottom Row */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between items-start">
                    <button 
                      id="btn-info-portrait" 
                      onClick={() => setShowInfo(true)}
                      className="text-white/90 hover:text-white hover-italic-transition font-archivo-narrow font-extralight text-[clamp(1.65rem,6.5vw,3.4rem)] leading-none cursor-pointer tracking-tight select-none relative left-[0.1em]"
                    >
                      info
                    </button>
                    <button 
                      id="btn-archive-portrait" 
                      className="text-white/90 hover:text-white hover-italic-transition font-archivo-narrow font-extralight text-[clamp(1.65rem,6.5vw,3.4rem)] leading-none cursor-pointer tracking-tight select-none"
                    >
                      archive
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Flat Solid Black Footer (Thinner, tight, black layout with snug logos and prominent dark black hint shadow) */}
            <div
              id="app-footer"
              className="relative w-full min-h-[15vh] bg-black border-t border-white/10 shrink-0 z-20 flex items-center justify-center py-6 shadow-[0_-8px_30px_rgba(0,0,0,0.9)]"
            >
              <div className="flex flex-row flex-wrap items-center justify-center gap-6 md:gap-8 px-6 max-w-5xl w-full">
                {/* Logo 1: BlvdGuestBook (Kích thước thống nhất, font Arial Medium chuẩn) */}
                <a 
                  id="footer-logo-guestbook"
                  href="https://blvdguestbook.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-[240px] h-[54px] bg-white border-2 border-black rounded-none shadow-[3px_3px_0px_0px_#8ace00] hover:shadow-[4px_4px_0px_0px_#8ace00] hover:-translate-x-[1px] hover:-translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-150 select-none cursor-pointer"
                >
                  <span 
                    className="text-xl font-medium text-black tracking-tighter leading-none select-none"
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
                  className="flex items-center justify-center w-[240px] h-[54px] bg-white border-2 border-black rounded-none cursor-pointer select-none transition-all duration-300 hover:bg-black group"
                >
                  <span 
                    className="font-archivo text-black font-black text-xl tracking-tighter leading-none whitespace-nowrap group-hover:text-white transition-colors duration-300"
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
                  className="flex items-center justify-center w-[240px] h-[54px] bg-white rounded-none border-2 border-white/95 transition-all duration-300 ease-out hover:bg-slate-950 hover:border-[#0066ff] hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(0,102,255,0.9),0_0_50px_rgba(0,102,255,0.5)] group cursor-pointer animate-led-flicker select-none"
                >
                  <h1 
                    className="text-lg font-black text-black tracking-tighter leading-none text-center transition-colors duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(0,102,255,0.8)] font-be-vietnam whitespace-nowrap"
                    style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                  >
                    BlvdMusicSpace
                  </h1>
                </a>
              </div>
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
    </main>
  );
}

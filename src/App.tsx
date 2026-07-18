/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LedDotBoard } from './components/LedDotBoard';
import { Facebook, Instagram, AtSign, Check, Copy } from 'lucide-react';
import LandscapeContactScreen from './components/LandscapeContactScreen';
import PortraitContactScreen from './components/PortraitContactScreen';
import DecryptedText from './components/DecryptedText';
import Footer from './components/Footer';



type SceneState = 'intro-play' | 'intro-image-1' | 'intro-image-2' | 'intro-image-3' | 'main-app';

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
        <div className="absolute inset-0 z-10 overflow-y-auto no-scrollbar scroll-smooth">
          <div className="w-full flex flex-col">
            {/* The 100vh Main Screen View */}
            <div className="relative w-full h-[calc(var(--vh,1vh)*100)] shrink-0 flex items-center justify-center overflow-hidden ">
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

            <Footer />

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

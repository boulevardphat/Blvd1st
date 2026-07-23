import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const TEXT = "THUANPHAT";
const MAX_OPACITY = 0.12;

export const ThuanPhatVisual = () => {
  const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);
  const [mode, setMode] = useState<'thuanphat' | 'blvd'>('thuanphat');
  const [phase, setPhase] = useState<'appearing' | 'disappearing' | 'hidden'>('hidden');

  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const numRows = isLandscape ? 7 : 22;

  useEffect(() => {
    let active = true;
    let t: NodeJS.Timeout;

    const runSequence = () => {
      if (!active) return;
      
      // Step 1: ThuanPhat Appearing
      setMode('thuanphat');
      setPhase('appearing');
      
      t = setTimeout(() => {
        if (!active) return;
        // Step 2: ThuanPhat Disappearing
        setPhase('disappearing');
        
        t = setTimeout(() => {
          if (!active) return;
          // Step 3: ThuanPhat Hidden
          setPhase('hidden');
          
          t = setTimeout(() => {
            if (!active) return;
            // Step 4: BLVD Appearing (no fade)
            setMode('blvd');
            setPhase('appearing');
            
            t = setTimeout(() => {
              if (!active) return;
              // Step 5: BLVD Hidden (instant, no fade)
              setPhase('hidden');
              
              t = setTimeout(() => {
                if (!active) return;
                // Loop back
                runSequence();
              }, 150);
            }, 500); // Display BLVD for 0.5s
          }, 150); // Wait before BLVD
        }, numRows * 20 + 50); // fade duration for THUANPHAT
      }, numRows * 20 + 300); // stay duration for THUANPHAT
    };

    runSequence();

    return () => {
      active = false;
      clearTimeout(t);
    };
  }, [numRows]);

  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 z-10 pointer-events-none">
      
      {mode === 'thuanphat' && (
        <div className="absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center overflow-hidden space-y-[1.8vh] landscape:space-y-[4.5vh]">
          {Array.from({ length: numRows }).map((_, index) => {
            let opacity = 0;
            let delay = 0;
            
            if (phase === 'appearing') {
              opacity = MAX_OPACITY;
              delay = (numRows - 1 - index) * 0.02;
            } else if (phase === 'disappearing') {
              opacity = 0;
              delay = index * 0.02;
            } else {
              opacity = 0;
              delay = 0;
            }

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity }}
                transition={{ duration: 0.03, delay: delay }}
                className="font-archivo text-[12.5vw] landscape:text-[max(4.5rem,min(10.5vw,8rem))] leading-[0.7] text-[#111111] uppercase whitespace-nowrap [transform:scaleY(0.95)] origin-center tracking-[-0.04em]"
                style={{ fontVariationSettings: '"wdth" 100, "wght" 500' }}
              >
                {TEXT}
              </motion.div>
            );
          })}
        </div>
      )}

      {mode === 'blvd' && (
        <div className="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center py-[8vh] landscape:py-[4.5vh]">
          <div className="relative flex justify-center items-center h-full w-max">
            <div className="invisible font-archivo text-[12.5vw] landscape:text-[max(4.5rem,min(10.5vw,8rem))] leading-[0.7] uppercase whitespace-nowrap [transform:scaleY(0.95)] tracking-[-0.04em]"
                 style={{ fontVariationSettings: '"wdth" 100, "wght" 500' }}>
              {TEXT}
            </div>
            
            {phase === 'appearing' && (
              <svg 
                viewBox="0 0 400 100" 
                className="absolute top-0 right-0 bottom-0 left-0 w-full h-full" 
                preserveAspectRatio="none"
              >
                <text 
                  x="50%" y="54%" 
                  textLength="400"
                  lengthAdjust="spacingAndGlyphs"
                  style={{ fontFamily: 'Archivo, sans-serif', fontVariationSettings: '"wdth" 100, "wght" 500' }}
                  dominantBaseline="middle" 
                  textAnchor="middle" 
                  fontSize="110" 
                  fill="none" 
                  stroke="rgba(255, 255, 255, 0.95)" 
                  strokeWidth="3.2"
                >
                  BLVD
                </text>
              </svg>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

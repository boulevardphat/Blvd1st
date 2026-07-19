import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const TEXT = "THUANPHAT";
const MAX_OPACITY = 0.12;

export const ThuanPhatVisual = () => {
  const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);
  const [phase, setPhase] = useState<'appearing' | 'disappearing' | 'hidden'>('appearing');

  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const numRows = isLandscape ? 7 : 13;

  useEffect(() => {
    let t1: NodeJS.Timeout;
    let t2: NodeJS.Timeout;
    let t3: NodeJS.Timeout;
    
    const startDisappearing = () => {
      setPhase('disappearing');
      
      t2 = setTimeout(() => {
        setPhase('hidden');
        t3 = setTimeout(runSequence, 600);
      }, numRows * 20 + 50);
    };

    const runSequence = () => {
      setPhase('appearing');
      t1 = setTimeout(startDisappearing, numRows * 20 + 400);
    };
    
    // Start by scheduling the disappearance of the instantly rendered text
    t1 = setTimeout(startDisappearing, numRows * 20 + 400);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [numRows]);

  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center overflow-hidden z-10 pointer-events-none gap-[1.2vh] landscape:gap-[4.5vh]">
      {Array.from({ length: numRows }).map((_, index) => {
        // index 0 is top, index numRows - 1 is bottom
        
        let opacity = 0;
        let delay = 0;
        
        if (phase === 'appearing') {
          opacity = MAX_OPACITY;
          // Appear from bottom to top
          delay = (numRows - 1 - index) * 0.02;
        } else if (phase === 'disappearing') {
          opacity = 0;
          // Disappear from top to bottom
          delay = index * 0.02;
        } else {
          opacity = 0;
          delay = 0;
        }

        return (
          <motion.div
            key={index}
            initial={{ opacity: MAX_OPACITY }}
            animate={{ opacity }}
            transition={{ 
              duration: 0.03,
              delay: delay,
            }}
            className="font-archivo text-[12.5vw] landscape:text-[clamp(4.5rem,10.5vw,8rem)] leading-[0.7] text-[#111111] uppercase whitespace-nowrap scale-y-[0.95] origin-center tracking-[-0.04em]"
            style={{ 
              fontVariationSettings: '"wdth" 100, "wght" 500' 
            }}
          >
            {TEXT}
          </motion.div>
        );
      })}
    </div>
  );
};

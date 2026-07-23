import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ThuanPhatVisual } from './ThuanPhatVisual';

export const VespertineBackground = () => {
  const [bgLoaded, setBgLoaded] = useState(false);
  const [sjLoaded, setSjLoaded] = useState(false);
  
  const isLoaded = bgLoaded && sjLoaded;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      {/* Background Layer */}
      <img
        src="https://i.ibb.co/JFvk9wzr/vespertine-bg.png"
        alt="Background layer"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover portrait:object-[49%_center] pointer-events-none"
        onLoad={() => setBgLoaded(true)}
      />
      
      {/* Middle empty layer (for future use) */}
      <div className="absolute inset-0 pointer-events-none z-0" id="middle-layer">
        <ThuanPhatVisual />
      </div>

      {/* Subject Layer */}
      <img
        src="https://i.ibb.co/jPHPJSG7/vespertine-sj.png"
        alt="Subject layer"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover portrait:object-[49%_center] pointer-events-none"
        onLoad={() => setSjLoaded(true)}
      />

      {/* Fallback / Original Image (On top, fades out when others load) */}
      <motion.img 
        src="https://i.ibb.co/vy4ykmw/vespertine.png" 
        alt="Fallback background"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover portrait:object-[49%_center] pointer-events-none z-10"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 0 }}
      />
    </div>
  );
};

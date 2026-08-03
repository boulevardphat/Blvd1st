import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

const StretchedLabel = ({ text }: { text: string }) => (
  <div className="absolute inset-0 overflow-hidden flex items-center justify-center p-[4px] md:p-[6px]">
    <svg 
      viewBox="0 0 400 100" 
      className="w-full h-full pointer-events-none" 
      preserveAspectRatio="none"
    >
      <text
        x="50%"
        y="52%"
        dominantBaseline="central"
        textAnchor="middle"
        textLength="400"
        lengthAdjust="spacingAndGlyphs"
        className="font-archivo uppercase"
        fontSize="110"
        fill="currentColor"
        style={{ fontVariationSettings: '"wght" 800' }}
      >
        {text.toUpperCase()}
      </text>
    </svg>
  </div>
);

interface ViewingZoneProps {
  showBorder?: boolean;
  imageSrc?: string;
  topButtons?: string[];
  bottomButtons?: string[];
  onButtonClick?: (btnName: string) => void;
}

export const ViewingZone: React.FC<ViewingZoneProps> = ({
  showBorder = true,
  imageSrc = "https://i.ibb.co/ycXZb8vq/contact.webp",
  topButtons = ["facebook", "instagram", "threads"],
  bottomButtons = ["locket", "phone/zalo", "email"],
  onButtonClick
}) => {
  const [emailExpanded, setEmailExpanded] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);
  const [copiedType, setCopiedType] = useState<'personal' | 'school' | null>(null);
  const [phoneCopied, setPhoneCopied] = useState(false);

  const textRef = useRef<SVGTextElement>(null);
  const [viewBox, setViewBox] = useState('0 0 535 82'); // Fallback

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const updateBBox = () => {
      if (textRef.current) {
        const bbox = textRef.current.getBBox();
        if (bbox.width > 0 && bbox.height > 0) {
          // Exactly map the viewBox to the visual bounding box of the text
          // Apply manual trims to eliminate the font's built-in sidebearing and baseline padding
          const trimLeft = 6; // Cắt bỏ khoảng trắng thừa bên trái của chữ B
          const trimBottom = 10; // Cắt bỏ khoảng trắng thừa dưới đáy (baseline padding) nhích xuống sát mép
          setViewBox(`${bbox.x + trimLeft} ${bbox.y} ${bbox.width - trimLeft} ${bbox.height - trimBottom}`);
        }
      }
    };

    if ('fonts' in document) {
      document.fonts.ready.then(updateBBox);
    }
    updateBBox();
    
    const handleResize = () => {
      updateBBox();
      // On mobile devices, orientation changes can take a bit to finish relayouting
      clearTimeout(timeout);
      timeout = setTimeout(updateBBox, 150);
      setTimeout(updateBBox, 400);
    };

    // Add resize listener to recalculate on orientation/size changes
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    // Also use ResizeObserver on the document body or SVG container to catch any layout shifts
    const observer = new ResizeObserver(() => {
      handleResize();
    });
    
    if (textRef.current?.parentElement) {
       observer.observe(textRef.current.parentElement);
    }
    
    timeout = setTimeout(updateBBox, 150);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      observer.disconnect();
    };
  }, []);

  const handleButtonClick = (btn: string) => {
    onButtonClick?.(btn);

    const btnLower = btn.toLowerCase();
    if (btnLower === 'facebook') {
      window.open('https://www.facebook.com/hellothisisBLVD17/', '_blank');
    } else if (btnLower === 'instagram') {
      window.open('https://www.instagram.com/endenogatai_dah', '_blank');
    } else if (btnLower === 'threads') {
      window.open('https://www.threads.com/@endenogatai_dah', '_blank');
    } else if (btnLower === 'locket') {
      window.open('https://locket.cam/endenogatai_dah', '_blank');
    } else if (btnLower === 'sdt' || btnLower === 'phone' || btnLower.includes('phone') || btnLower.includes('zalo')) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText('0833939468').catch(() => {});
      }
      setPhoneCopied(true);
      setTimeout(() => {
        setPhoneCopied(false);
      }, 2000);
    } else if (btnLower === 'email') {
      setEmailExpanded(true);
    }
  };

  const getHoverLabel = (btnName: string) => {
    const lower = btnName.toLowerCase();
    if (lower === 'facebook') return 'Have';
    if (lower === 'instagram') return 'you';
    if (lower === 'threads') return 'confessed?';
    if (lower === 'locket') return 'MY SINS';
    if (lower === 'sdt' || lower === 'phone' || lower.includes('phone') || lower.includes('zalo')) return 'ARE';
    if (lower === 'email') return 'MY SAVIOR';
    return btnName;
  };

  const getButtonStyleClass = (btnName: string) => {
    const lower = btnName.toLowerCase();
    if (lower === 'facebook') {
      return 'hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] active:bg-[#0c59be] active:text-white';
    }
    if (lower === 'instagram') {
      return 'hover:bg-gradient-to-r hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white active:bg-gradient-to-r active:from-[#d87c1e] active:via-[#b81b34] active:to-[#910d68] active:text-white';
    }
    if (lower === 'threads') {
      return 'hover:bg-white hover:text-black hover:border-white active:bg-zinc-300 active:text-black';
    }
    if (lower === 'locket') {
      return 'hover:bg-[#FFC700] hover:text-black hover:border-[#FFC700] active:bg-[#d9a700] active:text-black';
    }
    if (lower === 'sdt' || lower === 'phone' || lower.includes('phone') || lower.includes('zalo')) {
      return 'hover:bg-[#10B981] hover:text-black hover:border-[#10B981] active:bg-[#047857] active:text-white';
    }
    if (lower === 'email') {
      return 'hover:bg-[#EA4335] hover:text-white hover:border-[#EA4335] active:bg-[#b31412] active:text-white';
    }
    return 'hover:bg-black/90 hover:text-white active:bg-white active:text-black';
  };

  const handleEmailChoice = (type: 'personal' | 'school') => {
    const email = type === 'personal' ? 'thuanphat26092008@gmail.com' : 'phatnt.a2.2326@gmail.com';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).catch(() => {});
    }
    
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
    }, 2000);

    window.location.href = `mailto:${email}`;
    onButtonClick?.(`email-${type}`);
  };

  return (
    <div className={`relative w-full h-full flex flex-col justify-between overflow-hidden rounded-none ${showBorder ? 'border border-white/40' : ''}`}>
      {/* Image Layer in the Zone */}
      <div 
        className={`absolute inset-0 z-0 overflow-hidden ${emailExpanded ? 'cursor-pointer' : ''}`}
        onClick={() => {
          if (emailExpanded) {
            setEmailExpanded(false);
          }
        }}
      >
        <img 
          src={imageSrc} 
          alt="Viewing Zone Graphic" 
          className="w-full h-full object-cover rounded-none select-none"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Top 3 Rectangular Buttons */}
      <div className="relative z-10 w-full grid grid-cols-3 gap-0">
        {topButtons.map((btn, idx) => (
          <button
            key={`top-${idx}`}
            onClick={() => handleButtonClick(btn)}
            onMouseEnter={() => setHoveredBtn(btn)}
            onMouseLeave={() => setHoveredBtn(null)}
            onTouchStart={() => setHoveredBtn(btn)}
            onTouchEnd={() => setHoveredBtn(null)}
            onTouchCancel={() => setHoveredBtn(null)}
            className={`relative overflow-hidden w-full py-2.5 md:py-3.5 bg-black/70 text-white/90 font-archivo text-sm md:text-lg tracking-tight transition-all cursor-pointer border-b border-r last:border-r-0 border-white/30 rounded-none select-none ${getButtonStyleClass(btn)}`}
            style={{ fontVariationSettings: '"wght" 600' }}
          >
            <span className={hoveredBtn === btn ? 'opacity-0' : 'opacity-100 transition-opacity'}>{btn}</span>
            {hoveredBtn === btn && (
              <StretchedLabel text={getHoverLabel(btn)} />
            )}
          </button>
        ))}
      </div>

      {/* Logo and Bottom Buttons Container */}
      <div className="relative z-10 w-full flex flex-col">
        {/* Boulevard1st Logo (Scaled proportionally to fill width, no distortion) */}
        <div className="w-full pointer-events-none select-none opacity-95 flex items-end translate-y-[4px]">
          <svg 
            viewBox={viewBox} 
            className="w-full h-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] overflow-visible"
          >
            <text
              ref={textRef}
              x="50%"
              y="79"
              textAnchor="middle"
              className="font-archivo fill-white font-black tracking-tighter"
              fontSize="90"
            >
              {"Boulevard1st"}
            </text>
          </svg>
        </div>

        {/* Bottom 3 Rectangular Buttons */}
        <div className="w-full grid grid-cols-3 gap-0">
          {bottomButtons.map((btn, idx) => {
          if (btn.toLowerCase() === 'email' && emailExpanded) {
            const isSchoolCopied = copiedType === 'school';
            const isSchoolHovered = hoveredBtn === 'email_school';
            const isPersonalCopied = copiedType === 'personal';
            const isPersonalHovered = hoveredBtn === 'email_personal';

            return (
              <div key={`bottom-${idx}`} className="w-full h-full relative">
                <div className="absolute bottom-0 left-0 w-full flex flex-col gap-0 z-20">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleEmailChoice('school'); }}
                    onMouseEnter={() => setHoveredBtn('email_school')}
                    onMouseLeave={() => setHoveredBtn(null)}
                    onTouchStart={() => setHoveredBtn('email_school')}
                    onTouchEnd={() => setHoveredBtn(null)}
                    onTouchCancel={() => setHoveredBtn(null)}
                    className="relative overflow-hidden w-full py-2.5 md:py-3.5 bg-black/70 text-white/90 font-archivo text-sm md:text-lg tracking-tight transition-all cursor-pointer border-t border-l border-white/30 rounded-none select-none hover:bg-[#1877F2] hover:text-white active:bg-[#0c59be] active:text-white"
                    style={{ fontVariationSettings: '"wght" 600' }}
                  >
                    <span className={(isSchoolHovered || isSchoolCopied) ? 'opacity-0' : 'opacity-100 transition-opacity'}>
                      {isSchoolCopied ? 'copied' : 'school'}
                    </span>
                    {(isSchoolHovered || isSchoolCopied) && (
                      <StretchedLabel text={isSchoolCopied ? "COPIED" : "SCHOOL"} />
                    )}
                  </button>

                  <button
                    onClick={(e) => { e.stopPropagation(); handleEmailChoice('personal'); }}
                    onMouseEnter={() => setHoveredBtn('email_personal')}
                    onMouseLeave={() => setHoveredBtn(null)}
                    onTouchStart={() => setHoveredBtn('email_personal')}
                    onTouchEnd={() => setHoveredBtn(null)}
                    onTouchCancel={() => setHoveredBtn(null)}
                    className="relative overflow-hidden w-full py-2.5 md:py-3.5 bg-black/70 text-white/90 font-archivo text-sm md:text-lg tracking-tight transition-all cursor-pointer border-t border-l border-white/30 rounded-none select-none hover:bg-[#EA4335] hover:text-white active:bg-[#b31412] active:text-white"
                    style={{ fontVariationSettings: '"wght" 600' }}
                  >
                    <span className={(isPersonalHovered || isPersonalCopied) ? 'opacity-0' : 'opacity-100 transition-opacity'}>
                      {isPersonalCopied ? 'copied' : 'personal'}
                    </span>
                    {(isPersonalHovered || isPersonalCopied) && (
                      <StretchedLabel text={isPersonalCopied ? "COPIED" : "PERSONAL"} />
                    )}
                  </button>

                  <button
                    onClick={(e) => { e.stopPropagation(); setEmailExpanded(false); setHoveredBtn(null); }}
                    onMouseEnter={() => setHoveredBtn('email_close')}
                    onMouseLeave={() => setHoveredBtn(null)}
                    onTouchStart={() => setHoveredBtn('email_close')}
                    onTouchEnd={() => setHoveredBtn(null)}
                    onTouchCancel={() => setHoveredBtn(null)}
                    className="relative overflow-hidden w-full py-2.5 md:py-3.5 bg-black/70 text-white/90 font-archivo text-sm md:text-lg tracking-tight transition-all cursor-pointer border-t border-l border-white/30 rounded-none select-none hover:bg-black/90 hover:text-white active:bg-white active:text-black"
                    style={{ fontVariationSettings: '"wght" 600' }}
                  >
                    <span className={hoveredBtn === 'email_close' ? 'opacity-0' : 'opacity-100 transition-opacity'}>email</span>
                    {hoveredBtn === 'email_close' && <StretchedLabel text="CLOSE" />}
                  </button>
                </div>
              </div>
            );
          }

          const isPhoneBtn = btn.toLowerCase().includes('phone') || btn.toLowerCase().includes('zalo') || btn.toLowerCase() === 'sdt';

          return (
            <button
              key={`bottom-${idx}`}
              onClick={() => handleButtonClick(btn)}
              onMouseEnter={() => setHoveredBtn(btn)}
              onMouseLeave={() => setHoveredBtn(null)}
              onTouchStart={() => setHoveredBtn(btn)}
              onTouchEnd={() => setHoveredBtn(null)}
              onTouchCancel={() => setHoveredBtn(null)}
              className={`relative overflow-hidden w-full py-2.5 md:py-3.5 bg-black/70 text-white/90 font-archivo text-sm md:text-lg tracking-tight transition-all cursor-pointer border-t border-r last:border-r-0 border-white/30 rounded-none select-none ${getButtonStyleClass(btn)}`}
              style={{ fontVariationSettings: '"wght" 600' }}
            >
              <span className={(hoveredBtn === btn || (isPhoneBtn && phoneCopied)) ? 'opacity-0' : 'opacity-100 transition-opacity'}>
                {isPhoneBtn && phoneCopied ? 'copied' : btn}
              </span>
              {(hoveredBtn === btn || (isPhoneBtn && phoneCopied)) && (
                <StretchedLabel text={(isPhoneBtn && phoneCopied) ? "COPIED" : getHoverLabel(btn)} />
              )}
            </button>
          );
        })}
      </div>
      </div>
    </div>
  );
};



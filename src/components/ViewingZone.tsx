import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ViewingZoneProps {
  showBorder?: boolean;
  imageSrc?: string;
  topButtons?: string[];
  bottomButtons?: string[];
  onButtonClick?: (btnName: string) => void;
}

export const ViewingZone: React.FC<ViewingZoneProps> = ({
  showBorder = true,
  imageSrc = "https://i.ibb.co/TxrtFvPZ/info.webp",
  topButtons = ["facebook", "instagram", "threads"],
  bottomButtons = ["locket", "phone", "email"],
  onButtonClick
}) => {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

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
    } else if (btnLower === 'sdt' || btnLower === 'phone') {
      window.location.href = 'tel:0901234567';
    } else if (btnLower === 'email') {
      setShowEmailModal(true);
    }
  };

  const getHoverLabel = (btnName: string) => {
    const lower = btnName.toLowerCase();
    if (lower === 'facebook') return 'Have';
    if (lower === 'instagram') return 'you';
    if (lower === 'threads') return 'confessed?';
    if (lower === 'locket') return 'I am';
    if (lower === 'sdt' || lower === 'phone') return 'no one';
    if (lower === 'email') return 'but ME';
    return btnName;
  };

  const getHoverStyleClass = (btnName: string) => {
    const lower = btnName.toLowerCase();
    if (lower === 'facebook') {
      return 'hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]';
    }
    if (lower === 'instagram') {
      return 'hover:bg-gradient-to-r hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white';
    }
    if (lower === 'threads') {
      return 'hover:bg-white hover:text-black hover:border-white';
    }
    if (lower === 'locket') {
      return 'hover:bg-[#FFC700] hover:text-black hover:border-[#FFC700]';
    }
    if (lower === 'sdt' || lower === 'phone') {
      return 'hover:bg-[#10B981] hover:text-black hover:border-[#10B981]';
    }
    if (lower === 'email') {
      return 'hover:bg-[#EA4335] hover:text-white hover:border-[#EA4335]';
    }
    return 'hover:bg-black/90 hover:text-white';
  };

  const handleEmailChoice = (type: 'personal' | 'school') => {
    if (type === 'personal') {
      window.location.href = 'mailto:thuanphat26092008@gmail.com';
    } else if (type === 'school') {
      window.location.href = 'mailto:phatnt.a2.2326@gmail.com';
    }
    onButtonClick?.(`email-${type}`);
  };

  return (
    <div className={`relative w-full h-full flex flex-col justify-between overflow-hidden rounded-none ${showBorder ? 'border border-white/40' : ''}`}>
      {/* Image Layer in the Zone */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src={imageSrc} 
          alt="Viewing Zone Graphic" 
          className="w-full h-full object-cover rounded-none"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Email Selection Panel Overlay */}
      {showEmailModal && (
        <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center p-4">
          <div className="relative flex flex-col items-center gap-3">
            {/* Header label & Close button */}
            <div className="w-full flex items-center justify-between pb-1 px-1">
              <span 
                className="font-archivo text-white/80 text-xs md:text-sm tracking-tight lowercase"
                style={{ fontVariationSettings: '"wght" 500' }}
              >
                select email
              </span>
              <button
                onClick={() => setShowEmailModal(false)}
                className="text-white/60 hover:text-white transition-colors p-1 cursor-pointer"
                title="close"
              >
                <X className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>

            {/* 2 Email Bars (nằm sát nhau không gap, kích thước i chang 1 nút) */}
            <div className="flex items-center gap-0 border border-white/30 rounded-none overflow-hidden bg-black/80">
              <button
                onClick={() => handleEmailChoice('personal')}
                className="px-6 md:px-10 py-2.5 md:py-3.5 bg-black/80 hover:bg-white hover:text-black text-white font-archivo text-sm md:text-lg tracking-tight lowercase border-r border-white/30 rounded-none transition-colors cursor-pointer select-none"
                style={{ fontVariationSettings: '"wght" 600' }}
              >
                personal
              </button>
              <button
                onClick={() => handleEmailChoice('school')}
                className="px-6 md:px-10 py-2.5 md:py-3.5 bg-black/80 hover:bg-white hover:text-black text-white font-archivo text-sm md:text-lg tracking-tight lowercase rounded-none transition-colors cursor-pointer select-none"
                style={{ fontVariationSettings: '"wght" 600' }}
              >
                school
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top 3 Rectangular Buttons */}
      <div className="relative z-10 w-full grid grid-cols-3 gap-0">
        {topButtons.map((btn, idx) => (
          <button
            key={`top-${idx}`}
            onClick={() => handleButtonClick(btn)}
            onMouseEnter={() => setHoveredBtn(btn)}
            onMouseLeave={() => setHoveredBtn(null)}
            className={`w-full py-2.5 md:py-3.5 bg-black/70 active:bg-white active:text-black text-white/90 font-archivo text-sm md:text-lg tracking-tight transition-colors cursor-pointer border-b border-r last:border-r-0 border-white/30 rounded-none select-none ${getHoverStyleClass(btn)}`}
            style={{ fontVariationSettings: '"wght" 600' }}
          >
            {hoveredBtn === btn ? getHoverLabel(btn) : btn}
          </button>
        ))}
      </div>

      {/* Bottom 3 Rectangular Buttons */}
      <div className="relative z-10 w-full grid grid-cols-3 gap-0">
        {bottomButtons.map((btn, idx) => (
          <button
            key={`bottom-${idx}`}
            onClick={() => handleButtonClick(btn)}
            onMouseEnter={() => setHoveredBtn(btn)}
            onMouseLeave={() => setHoveredBtn(null)}
            className={`w-full py-2.5 md:py-3.5 bg-black/70 active:bg-white active:text-black text-white/90 font-archivo text-sm md:text-lg tracking-tight transition-colors cursor-pointer border-t border-r last:border-r-0 border-white/30 rounded-none select-none ${getHoverStyleClass(btn)}`}
            style={{ fontVariationSettings: '"wght" 600' }}
          >
            {hoveredBtn === btn ? getHoverLabel(btn) : btn}
          </button>
        ))}
      </div>
    </div>
  );
};



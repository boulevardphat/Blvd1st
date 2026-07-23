import React from 'react';
import { motion } from 'motion/react';

const Footer = ({ isPopupOpen = false }: { isPopupOpen?: boolean }) => {
  return (
    <>
      {/* Flat Solid Black Footer (Thinner, tight, black layout with snug logos and prominent dark black hint shadow) */}
            <div
              id="app-footer"
              className="relative w-[150vw] left-1/2 -translate-x-1/2 min-h-[calc(var(--vh,1vh)*15)] bg-black border-t border-white/10 shrink-0 z-20 flex items-center justify-center py-6"
            >
              {/* Animated shadow overlay for smooth entry */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isPopupOpen ? 0 : 1 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: isPopupOpen ? 0 : 0.3 }}
                className="absolute inset-0 pointer-events-none shadow-[0_-12px_40px_rgba(0,0,0,1)] z-10"
              />

              <div className="flex flex-row flex-nowrap items-center justify-center gap-[clamp(6px,2vw,24px)] px-4 md:px-6 max-w-5xl w-full relative z-20">
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
    </div>
    </>
  );
};

export default Footer;

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function App() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black flex items-center justify-center select-none" id="main-container">
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
            className="pointer-events-auto text-white/90 hover:text-white hover:italic transition-all duration-300 font-archivo-narrow font-extralight text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none cursor-pointer tracking-tight"
          >
            contact
          </button>
          
          <button 
            id="btn-history-landscape" 
            className="pointer-events-auto text-white/90 hover:text-white hover:italic transition-all duration-300 font-archivo-narrow font-extralight text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none cursor-pointer tracking-tight"
          >
            his-tory
          </button>
        </div>

        {/* Bottom Row */}
        <div className="relative flex justify-between items-baseline w-full">
          <button 
            id="btn-info-landscape" 
            className="pointer-events-auto text-white/90 hover:text-white hover:italic transition-all duration-300 font-archivo-narrow font-extralight text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none cursor-pointer tracking-tight"
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
              className="font-archivo text-white font-black text-[clamp(2rem,7.6vw,9.125rem)] leading-[0.85] tracking-tighter select-all whitespace-nowrap"
            >
              Boulevard1st
            </h1>
          </div>

          <button 
            id="btn-archive-landscape" 
            className="pointer-events-auto text-white/90 hover:text-white hover:italic transition-all duration-300 font-archivo-narrow font-extralight text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none cursor-pointer tracking-tight"
          >
            archive
          </button>
        </div>
      </div>

      {/* Portrait Layout (Visible only in portrait / vertical viewports) */}
      <div 
        id="safezone-overlay-portrait" 
        className="hidden portrait:flex absolute inset-0 flex-col items-center justify-end pb-[18vh] p-[6%] pointer-events-none animate-fade-in"
      >
        <div className="w-fit flex flex-col items-stretch gap-2.5 pointer-events-auto">
          {/* Top Row */}
          <div className="flex justify-between items-end w-full">
            <button 
              id="btn-contact-portrait" 
              className="text-white/90 hover:text-white hover:italic transition-all duration-300 font-archivo-narrow font-extralight text-[clamp(1.4rem,5.5vw,3rem)] leading-none cursor-pointer tracking-tight"
            >
              contact
            </button>
            <button 
              id="btn-history-portrait" 
              className="text-white/90 hover:text-white hover:italic transition-all duration-300 font-archivo-narrow font-extralight text-[clamp(1.4rem,5.5vw,3rem)] leading-none cursor-pointer tracking-tight"
            >
              his-tory
            </button>
          </div>

          {/* Centered Logo */}
          <div className="flex items-center justify-center w-full">
            <h1 
              id="logo-text-portrait"
              className="font-archivo text-white font-black text-[clamp(2.5rem,11.5vw,6rem)] leading-[0.8] tracking-tighter select-all whitespace-nowrap"
            >
              Boulevard1st
            </h1>
          </div>

          {/* Bottom Row */}
          <div className="flex justify-between items-start w-full">
            <button 
              id="btn-info-portrait" 
              className="text-white/90 hover:text-white hover:italic transition-all duration-300 font-archivo-narrow font-extralight text-[clamp(1.4rem,5.5vw,3rem)] leading-none cursor-pointer tracking-tight"
            >
              info
            </button>
            <button 
              id="btn-archive-portrait" 
              className="text-white/90 hover:text-white hover:italic transition-all duration-300 font-archivo-narrow font-extralight text-[clamp(1.4rem,5.5vw,3rem)] leading-none cursor-pointer tracking-tight"
            >
              archive
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}


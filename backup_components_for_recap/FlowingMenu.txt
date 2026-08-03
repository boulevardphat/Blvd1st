import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

import './FlowingMenu.css';

function FlowingMenu({
  items = [],
  speed = 15,
  textColor = '#fff',
  bgColor = '#000000',
  marqueeBgColor = '#fff',
  marqueeTextColor = '#000000',
  borderColor = '#333'
}: any) {
  const menuRef = useRef(null);

  useEffect(() => {
    if (menuRef.current) {
      const menuItems = (menuRef.current as any).querySelectorAll('.menu__item');
      gsap.fromTo(
        menuItems,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
      );
    }
  }, []);

  return (
    <div className="menu-wrap" style={{ backgroundColor: bgColor }}>
      <nav className="menu" ref={menuRef}>
        {items.map((item: any, idx: number) => (
          <MenuItem
            key={idx}
            {...item}
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
          />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({ link, text, image, onClick, speed, textColor, marqueeBgColor, marqueeTextColor, borderColor, customColor, gradientColor, hoverText, dimOnHover }: any) {
  const itemRef = useRef(null);
  const marqueeRef = useRef(null);
  const marqueeInnerRef = useRef(null);
  const animationRef = useRef(null);
  const [repetitions, setRepetitions] = useState(4);

  const animationDefaults = { duration: 0.6, ease: 'expo' };

  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number) => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const distMetric = (x: number, y: number, x2: number, y2: number) => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };

  useEffect(() => {
    const calculateRepetitions = () => {
      if (!marqueeInnerRef.current) return;

      const marqueeContent = (marqueeInnerRef.current as any).querySelector('.marquee__part');
      if (!marqueeContent) return;

      const contentWidth = marqueeContent.offsetWidth;
      const viewportWidth = window.innerWidth;

      const needed = Math.ceil(viewportWidth / contentWidth) + 2;
      setRepetitions(Math.max(4, needed));
    };

    calculateRepetitions();
    window.addEventListener('resize', calculateRepetitions);
    return () => window.removeEventListener('resize', calculateRepetitions);
  }, [text, image]);

  useEffect(() => {
    const setupMarquee = () => {
      if (!marqueeInnerRef.current) return;

      const marqueeContent = (marqueeInnerRef.current as any).querySelector('.marquee__part');
      if (!marqueeContent) return;

      const contentWidth = marqueeContent.offsetWidth;
      if (contentWidth === 0) return;

      if (animationRef.current) {
        (animationRef.current as any).kill();
      }

      animationRef.current = gsap.to(marqueeInnerRef.current, {
        x: -contentWidth,
        duration: speed,
        ease: 'none',
        repeat: -1
      }) as any;
    };

    const timer = setTimeout(setupMarquee, 50);

    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        (animationRef.current as any).kill();
      }
    };
  }, [text, image, repetitions, speed]);

  const lastTouchTime = useRef(0);

  const handleMouseEnter = (ev: any) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    
    if (ev.type.startsWith('touch')) {
      lastTouchTime.current = Date.now();
    } else if (Date.now() - lastTouchTime.current < 500) {
      // Ignore simulated mouse events right after touch
      return;
    }

    const rect = (itemRef.current as any).getBoundingClientRect();
    let clientX = ev.clientX;
    let clientY = ev.clientY;

    if (ev.touches && ev.touches.length > 0) {
      clientX = ev.touches[0].clientX;
      clientY = ev.touches[0].clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    // Always use 'bottom' for touch devices to ensure consistent animation direction
    // regardless of where on the item the user tapped.
    const isTouch = ev.type.startsWith('touch') || window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    const edge = isTouch ? 'bottom' : findClosestEdge(x, y, rect.width, rect.height);

    if (dimOnHover) {
      gsap.to(itemRef.current, { opacity: 0.5, duration: 0 });
    }

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };

  const handleMouseLeave = (ev: any) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    
    if (ev.type.startsWith('mouse') && Date.now() - lastTouchTime.current < 500) {
      // Ignore simulated mouse events right after touch
      return;
    }

    const rect = (itemRef.current as any).getBoundingClientRect();
    let clientX = ev.clientX;
    let clientY = ev.clientY;

    if (ev.changedTouches && ev.changedTouches.length > 0) {
      clientX = ev.changedTouches[0].clientX;
      clientY = ev.changedTouches[0].clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    const isTouch = ev.type.startsWith('touch') || window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    const edge = isTouch ? 'bottom' : findClosestEdge(x, y, rect.width, rect.height);

    if (dimOnHover) {
      gsap.to(itemRef.current, { opacity: 1, duration: 0 });
    }

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  const match = typeof text === 'string' ? text.match(/^(#BLVD)(\d+)$/) : null;

  return (
    <div className="menu__item" ref={itemRef} style={{ borderColor, '--char-count': text.length } as React.CSSProperties}>
      <button
        className="menu__item-link font-archivo"
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseEnter}
        onTouchEnd={handleMouseLeave}
        style={{ color: textColor }}
      >
        <span className="sr-only">{text}</span>
        <span className="desktop-text" aria-hidden="true">
          {match && customColor ? (
            <>
              <span>{match[1]}</span>
              <span style={gradientColor ? {
                background: `linear-gradient(135deg, ${gradientColor} 10%, ${customColor} 60%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              } : { color: customColor }}>{match[2]}</span>
            </>
          ) : (
            <span style={{ color: textColor }}>{text}</span>
          )}
        </span>
        <svg 
          className="w-full h-full block mobile-svg" 
          preserveAspectRatio="none" 
          viewBox="0 0 1000 100"
          aria-hidden="true"
        >
          {gradientColor && (
            <defs>
              <linearGradient id={`grad-${text.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="10%" stopColor={gradientColor} />
                <stop offset="60%" stopColor={customColor} />
              </linearGradient>
            </defs>
          )}
          <text 
            x="50%" 
            y="54%" 
            dominantBaseline="middle" 
            textAnchor="middle" 
            fill="currentColor" 
            fontWeight="900" 
            fontSize="100"
            textLength="900"
            lengthAdjust="spacingAndGlyphs"
          >
            {match && customColor ? (
              <>
                <tspan>{match[1]}</tspan>
                <tspan fill={gradientColor ? `url(#grad-${text.replace('#', '')})` : customColor}>{match[2]}</tspan>
              </>
            ) : (
              <tspan fill="currentColor">{text}</tspan>
            )}
          </text>
        </svg>
      </button>
      <div className="marquee" ref={marqueeRef} style={{ backgroundColor: marqueeBgColor }}>
        <div className="marquee__inner-wrap">
          <div className="marquee__inner" ref={marqueeInnerRef} aria-hidden="true">
            {[...Array(repetitions)].map((_, idx) => (
              <div className="marquee__part font-archivo" key={idx} style={{ color: marqueeTextColor }}>
                <span className="marquee-text-inner">
                  <span>{hoverText || text}</span>
                </span>
                <div className="marquee__img" style={{ backgroundImage: `url(${image})` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowingMenu;

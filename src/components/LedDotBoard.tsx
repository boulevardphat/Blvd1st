import React, { useEffect, useRef, useState } from 'react';

// 5x7 Font Bitmap representation for A-Z, a-z, 0-9, and symbols.
// Each character is 5 dots wide and 7 dots tall.
const LED_FONT: Record<string, number[][]> = {
  'A': [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1]
  ],
  'B': [
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,0]
  ],
  'C': [
    [0,1,1,1,1],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [0,1,1,1,1]
  ],
  'D': [
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,0]
  ],
  'E': [
    [1,1,1,1,1],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,1]
  ],
  'F': [
    [1,1,1,1,1],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,1,1,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0]
  ],
  'G': [
    [0,1,1,1,1],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,1,1,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,1]
  ],
  'H': [
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1]
  ],
  'I': [
    [0,1,1,1,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,1,1,1,0]
  ],
  'J': [
    [0,0,1,1,1],
    [0,0,0,1,0],
    [0,0,0,1,0],
    [0,0,0,1,0],
    [1,0,0,1,0],
    [1,0,0,1,0],
    [0,1,1,0,0]
  ],
  'K': [
    [1,0,0,0,1],
    [1,0,0,1,0],
    [1,0,1,0,0],
    [1,1,0,0,0],
    [1,0,1,0,0],
    [1,0,0,1,0],
    [1,0,0,0,1]
  ],
  'L': [
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,1]
  ],
  'M': [
    [1,0,0,0,1],
    [1,1,0,1,1],
    [1,0,1,0,1],
    [1,0,1,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1]
  ],
  'N': [
    [1,0,0,0,1],
    [1,1,0,0,1],
    [1,0,1,0,1],
    [1,0,1,0,1],
    [1,0,0,1,1],
    [1,0,0,0,1],
    [1,0,0,0,1]
  ],
  'O': [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0]
  ],
  'P': [
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0]
  ],
  'Q': [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,1,0,1],
    [1,0,0,1,0],
    [0,1,1,0,1]
  ],
  'R': [
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,0],
    [1,0,1,0,0],
    [1,0,0,1,0],
    [1,0,0,0,1]
  ],
  'S': [
    [0,1,1,1,1],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [0,1,1,1,0],
    [0,0,0,0,1],
    [0,0,0,0,1],
    [1,1,1,1,0]
  ],
  'T': [
    [1,1,1,1,1],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0]
  ],
  'U': [
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0]
  ],
  'V': [
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,0,1,0],
    [0,0,1,0,0]
  ],
  'W': [
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,1,0,1],
    [1,0,1,0,1],
    [1,0,1,0,1],
    [1,1,0,1,1],
    [1,0,0,0,1]
  ],
  'X': [
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,0,1,0],
    [0,0,1,0,0],
    [0,1,0,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1]
  ],
  'Y': [
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,0,1,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0]
  ],
  'Z': [
    [1,1,1,1,1],
    [0,0,0,0,1],
    [0,0,0,1,0],
    [0,0,1,0,0],
    [0,1,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,1]
  ],
  'a': [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,1,1,1,0],
    [0,0,0,0,1],
    [0,1,1,1,1],
    [1,0,0,0,1],
    [0,1,1,1,1]
  ],
  'b': [
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,0]
  ],
  'c': [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,1,1,1,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [0,1,1,1,0]
  ],
  'd': [
    [0,0,0,0,1],
    [0,0,0,0,1],
    [0,1,1,1,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,1]
  ],
  'e': [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,1,1,1,1],
    [1,0,0,0,0],
    [0,1,1,1,0]
  ],
  'f': [
    [0,0,1,1,0],
    [0,1,0,0,0],
    [1,1,1,0,0],
    [0,1,0,0,0],
    [0,1,0,0,0],
    [0,1,0,0,0],
    [0,1,0,0,0]
  ],
  'g': [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,1,1,1,1],
    [1,0,0,0,1],
    [0,1,1,1,1],
    [0,0,0,0,1],
    [0,1,1,1,0]
  ],
  'h': [
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1]
  ],
  'i': [
    [0,0,1,0,0],
    [0,0,0,0,0],
    [0,1,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,1,1,1,0]
  ],
  'j': [
    [0,0,0,1,0],
    [0,0,0,0,0],
    [0,0,1,1,0],
    [0,0,0,1,0],
    [0,0,0,1,0],
    [1,0,0,1,0],
    [0,1,1,0,0]
  ],
  'k': [
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,1,0],
    [1,0,1,0,0],
    [1,1,0,0,0],
    [1,0,1,0,0],
    [1,0,0,1,0]
  ],
  'l': [
    [0,1,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,0,1,1]
  ],
  'm': [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [1,1,0,1,0],
    [1,0,1,0,1],
    [1,0,1,0,1],
    [1,0,1,0,1],
    [1,0,1,0,1]
  ],
  'n': [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1]
  ],
  'o': [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0]
  ],
  'p': [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,1,1,1,0],
    [1,0,0,0,0],
    [1,0,0,0,0]
  ],
  'q': [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,1,1,1,1],
    [1,0,0,0,1],
    [0,1,1,1,1],
    [0,0,0,0,1],
    [0,0,0,0,1]
  ],
  'r': [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [1,0,1,1,0],
    [1,1,0,0,1],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0]
  ],
  's': [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,1,1,1,1],
    [1,0,0,0,0],
    [0,1,1,1,0],
    [0,0,0,0,1],
    [1,1,1,1,0]
  ],
  't': [
    [0,0,1,0,0],
    [0,0,1,0,0],
    [1,1,1,1,1],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,1],
    [0,0,0,1,1]
  ],
  'u': [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,1,1],
    [0,1,1,0,1]
  ],
  'v': [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,0,1,0],
    [0,0,1,0,0]
  ],
  'w': [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [1,0,0,0,1],
    [1,0,1,0,1],
    [1,0,1,0,1],
    [1,1,0,1,1],
    [1,0,0,0,1]
  ],
  'x': [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [1,0,0,0,1],
    [0,1,0,1,0],
    [0,0,1,0,0],
    [0,1,0,1,0],
    [1,0,0,0,1]
  ],
  'y': [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,1],
    [0,0,0,0,1],
    [0,1,1,1,0]
  ],
  'z': [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [1,1,1,1,1],
    [0,0,0,1,0],
    [0,0,1,0,0],
    [0,1,0,0,0],
    [1,1,1,1,1]
  ],
  '0': [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,1,1],
    [1,0,1,0,1],
    [1,1,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0]
  ],
  '1': [
    [0,0,1,0,0],
    [0,1,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,1,1,1,0]
  ],
  '2': [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [0,0,0,0,1],
    [0,0,1,1,0],
    [0,1,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,1]
  ],
  '3': [
    [1,1,1,1,1],
    [0,0,0,1,0],
    [0,0,1,0,0],
    [0,0,0,1,0],
    [0,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0]
  ],
  '4': [
    [0,0,0,1,0],
    [0,0,1,1,0],
    [0,1,0,1,0],
    [1,0,0,1,0],
    [1,1,1,1,1],
    [0,0,0,1,0],
    [0,0,0,1,0]
  ],
  '5': [
    [1,1,1,1,1],
    [1,0,0,0,0],
    [1,1,1,1,0],
    [0,0,0,0,1],
    [0,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0]
  ],
  '6': [
    [0,1,1,1,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0]
  ],
  '7': [
    [1,1,1,1,1],
    [0,0,0,0,1],
    [0,0,0,1,0],
    [0,0,1,0,0],
    [0,1,0,0,0],
    [0,1,0,0,0],
    [0,1,0,0,0]
  ],
  '8': [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0]
  ],
  '9': [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,1],
    [0,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0]
  ],
  '/': [
    [0,0,0,0,1],
    [0,0,0,1,0],
    [0,0,1,0,0],
    [0,1,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0]
  ],
  '-': [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,1,1,1,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
  ],
  ' ': [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
  ]
};

// Return standard 5x7 bitmap.
const getCharBitmap = (char: string): number[][] => {
  return LED_FONT[char] || LED_FONT[char.toUpperCase()] || LED_FONT[' '];
};

// Horizontal font scaling helper to widen ("rộng ra, không béo ra") characters.
// This scales the width of the bitmap columns to a custom size, keeping strokes clean.
const getScaledBitmap = (char: string, targetW: number, targetH: number): number[][] => {
  const original = getCharBitmap(char);
  const result: number[][] = Array.from({ length: targetH }, () => new Array(targetW).fill(0));
  for (let r = 0; r < targetH; r++) {
    const origR = Math.min(6, Math.floor((r / targetH) * 7));
    for (let c = 0; c < targetW; c++) {
      const origC = Math.min(4, Math.floor((c / targetW) * 5));
      result[r][c] = original[origR][origC];
    }
  }
  return result;
};

// Generates an outline/hollow ("rỗng") version of any input bitmap
const getOutlineBitmap = (bitmap: number[][]): number[][] => {
  const h = bitmap.length;
  const w = bitmap[0].length;
  const outline = Array.from({ length: h }, () => new Array(w).fill(0));
  for (let r = 0; r < h; r++) {
    for (let c = 0; c < w; c++) {
      if (bitmap[r][c] === 1) {
        let isBoundary = false;
        if (r === 0 || r === h - 1 || c === 0 || c === w - 1) {
          isBoundary = true;
        } else {
          if (
            bitmap[r - 1][c] === 0 ||
            bitmap[r + 1][c] === 0 ||
            bitmap[r][c - 1] === 0 ||
            bitmap[r][c + 1] === 0
          ) {
            isBoundary = true;
          }
        }
        if (isBoundary) {
          outline[r][c] = 1;
        }
      }
    }
  }
  return outline;
};

export const LedDotBoard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPortrait, setIsPortrait] = useState(false);

  // Track orientation dynamically
  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const startTime = performance.now();

    // Standard Grid Specifications
    // Landscape: 112 cols x 40 rows
    // Portrait: 64 cols x 72 rows
    const cols = isPortrait ? 64 : 112;
    const rows = isPortrait ? 72 : 40;

    // Resize canvas handler
    const resizeCanvas = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      const containerWidth = rect?.width || window.innerWidth;
      const containerHeight = rect?.height || window.innerHeight;

      canvas.width = containerWidth * window.devicePixelRatio;
      canvas.height = containerHeight * window.devicePixelRatio;
      canvas.style.width = `${containerWidth}px`;
      canvas.style.height = `${containerHeight}px`;

      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Predetermined 8 states for KC3 to ensure exactly 1 lowercase "phat" flickering in different corners with custom sizes
    const kc3States = [
      { scaleW: 6, scaleH: 7, xPct: 0.1, yPct: 0.2 },
      { scaleW: 8, scaleH: 9, xPct: 0.6, yPct: 0.5 },
      { scaleW: 5, scaleH: 6, xPct: 0.25, yPct: 0.75 },
      { scaleW: 9, scaleH: 10, xPct: 0.05, yPct: 0.4 },
      { scaleW: 7, scaleH: 8, xPct: 0.5, yPct: 0.1 },
      { scaleW: 10, scaleH: 12, xPct: 0.15, yPct: 0.6 },
      { scaleW: 5, scaleH: 5, xPct: 0.7, yPct: 0.15 },
      { scaleW: 8, scaleH: 8, xPct: 0.35, yPct: 0.35 }
    ];

    // Main render loop
    const render = (time: number) => {
      const elapsed = time - startTime;

      // New Keyframes transition timeline precisely aligned with instructions:
      // KC1: 0ms - 400ms (400ms) -> chữ "phat" viết thường, nhỏ, nằm giữa màn hình
      // KC2: 400ms - 800ms (400ms) -> "BLVD" to, đậm, rỗng, fill cả màn hình
      // KC3: 800ms - 1600ms (800ms) -> đúng 1 chữ "phat" viết thường, nháy nhiều góc, size thay đổi liên tục
      // KC4: 1600ms - 3400ms (1800ms) -> "BLVD" to, đậm, rỗng, tự quyết thời gian chạy từ trái qua phải (lâu hơn, 1.8s)
      // KC5: 3400ms - 4600ms (1200ms) -> chữ "name", "birth", "zodiac", "mbti" nhỏ mono viết thường, chớp nháy liên tục ở vị trí tương ứng để báo hiệu
      // Main Content: 4600ms+ -> từ từ xuất hiện (fade in), căn lề trái, chính giữa màn hình, tự động wrap để hiển thị đủ trên giao diện dọc/tab

      const kc1_end = 400;
      const kc2_end = 800;
      const kc3_end = 1600;
      const kc4_end = 3400;
      const kc5_end = 4600;

      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;

      // 1. Draw solid dark background
      ctx.fillStyle = '#060606';
      ctx.fillRect(0, 0, w, h);

      // 2. Compute dynamic grids
      const activeGrid = Array.from({ length: rows }, () => new Uint8Array(cols));
      let currentScreenOpacity = 1;

      // ==========================================
      // LAYOUT CALCULATION: Shared across KC5 & MAIN CONTENT
      // ==========================================
      let linesToDraw = [
        "Phat Nguyen Thuan",
        "26/09/2008",
        "Libra",
        "INFP-T"
      ];

      // Responsive formatting to avoid overflow on Portrait or narrow layout
      if (isPortrait) {
        // Portrait has rows = 72 and cols = 64.
        // Break "Phat Nguyen Thuan" into three distinct lines so it is narrow and wide!
        linesToDraw = [
          "Phat",
          "Nguyen",
          "Thuan",
          "26/09/2008",
          "Libra",
          "INFP-T"
        ];
      } else {
        // Landscape has rows = 40 and cols = 112.
        // If cols < 110, break "Phat Nguyen Thuan" into two lines so we can keep the font wide!
        if (cols < 110) {
          linesToDraw = [
            "Phat Nguyen",
            "Thuan",
            "26/09/2008",
            "Libra",
            "INFP-T"
          ];
        }
      }

      const maxLen = Math.max(...linesToDraw.map(l => l.length));
      
      // Dynamically compute the maximum available character width to stretch/widen it perfectly!
      let charW = Math.floor((cols - 6) / maxLen) - 1;
      if (charW < 5) charW = 5;
      if (charW > 9) charW = 9; // Cap maximum width so it stays classy and legible

      const charH = 7;
      
      // Dynamically compute perfect row spacing to fill height without overflowing
      let rowGap = Math.floor((rows - (linesToDraw.length * charH)) / (linesToDraw.length - 1));
      if (rowGap < 1) rowGap = 1;
      if (rowGap > 5) rowGap = 5;

      const blockWidth = maxLen * (charW + 1) - 1;
      const blockHeight = linesToDraw.length * charH + (linesToDraw.length - 1) * rowGap;

      // Horizontally center the entire block, but lines themselves are left-aligned inside!
      const startX = Math.floor((cols - blockWidth) / 2);
      const startY = Math.floor((rows - blockHeight) / 2);

      // Mapping utility to associate a layout line index with a label name, birth, zodiac or mbti
      const getLabelForLineIndex = (index: number) => {
        if (isPortrait) {
          if (index === 0) return "name";
          if (index === 3) return "birth";
          if (index === 4) return "zodiac";
          if (index === 5) return "mbti";
        } else {
          if (cols < 110) {
            if (index === 0) return "name";
            if (index === 2) return "birth";
            if (index === 3) return "zodiac";
            if (index === 4) return "mbti";
          } else {
            if (index === 0) return "name";
            if (index === 1) return "birth";
            if (index === 2) return "zodiac";
            if (index === 3) return "mbti";
          }
        }
        return null;
      };

      if (elapsed < kc1_end) {
        // ==========================================
        // KC1: chữ "phat" viết thường nhỏ, nằm giữa màn hình (400ms)
        // ==========================================
        const word = "phat";
        const w_width = word.length * 6 - 1;
        const startCol = Math.floor((cols - w_width) / 2);
        const startRow = Math.floor((rows - 7) / 2);

        for (let charIdx = 0; charIdx < word.length; charIdx++) {
          const char = word[charIdx];
          const bitmap = getCharBitmap(char);
          const colOffset = startCol + charIdx * 6;

          for (let r = 0; r < 7; r++) {
            for (let c = 0; c < 5; c++) {
              if (bitmap[r][c] === 1) {
                const gr = startRow + r;
                const gc = colOffset + c;
                if (gr >= 0 && gr < rows && gc >= 0 && gc < cols) {
                  activeGrid[gr][gc] = 1;
                }
              }
            }
          }
        }

      } else if (elapsed < kc2_end) {
        // ==========================================
        // KC2: "BLVD" to, đậm nhưng rỗng (hollow), fill cả màn hình (400ms)
        // ==========================================
        const word = "BLVD";
        const giantW = Math.floor(cols / 5);
        const giantH = Math.floor(rows * 0.7);
        const startRow = Math.floor((rows - giantH) / 2);
        const spacing = Math.floor((cols - (giantW * 4)) / 5);

        for (let charIdx = 0; charIdx < word.length; charIdx++) {
          const char = word[charIdx];
          const scaled = getScaledBitmap(char, giantW, giantH);
          const outline = getOutlineBitmap(scaled);
          const colOffset = spacing + charIdx * (giantW + spacing);

          for (let r = 0; r < giantH; r++) {
            for (let c = 0; c < giantW; c++) {
              if (outline[r][c] === 1) {
                const gr = startRow + r;
                const gc = colOffset + c;
                if (gr >= 0 && gr < rows && gc >= 0 && gc < cols) {
                  activeGrid[gr][gc] = 1;
                }
              }
            }
          }
        }

      } else if (elapsed < kc3_end) {
        // ==========================================
        // KC3: đúng 1 chữ "phat" viết thường nháy nhiều góc, size thay đổi liên tục (800ms)
        // ==========================================
        const step = Math.floor((elapsed - kc2_end) / 100);
        const state = kc3States[Math.abs(step) % kc3States.length];
        
        const word = "phat";
        const scaleW = state.scaleW;
        const scaleH = state.scaleH;
        
        const wordWidth = word.length * (scaleW + 1) - 1;
        const startCol = Math.floor(state.xPct * (cols - wordWidth));
        const startRow = Math.floor(state.yPct * (rows - scaleH));

        for (let charIdx = 0; charIdx < word.length; charIdx++) {
          const char = word[charIdx];
          const bitmap = getScaledBitmap(char, scaleW, scaleH);
          const colOffset = startCol + charIdx * (scaleW + 1);

          for (let r = 0; r < scaleH; r++) {
            for (let c = 0; c < scaleW; c++) {
              if (bitmap[r][c] === 1) {
                const gr = startRow + r;
                const gc = colOffset + c;
                if (gr >= 0 && gr < rows && gc >= 0 && gc < cols) {
                  activeGrid[gr][gc] = 1;
                }
              }
            }
          }
        }

      } else if (elapsed < kc4_end) {
        // ==========================================
        // KC4: chữ "BLVD" to, đậm nhưng rỗng, chạy ngang từ trái qua phải (1.8s)
        // ==========================================
        const word = "BLVD";
        const giantW = Math.floor(cols / 5);
        const giantH = Math.floor(rows * 0.75);
        const startRow = Math.floor((rows - giantH) / 2);

        const progress = (elapsed - kc3_end) / (kc4_end - kc3_end);
        const spacing = 3;
        const wordWidth = giantW * 4 + spacing * 3;
        
        // Fully scrolling left-to-right (from -wordWidth fully out to cols fully offscreen)
        const scrollX = Math.floor(-wordWidth + progress * (cols + wordWidth));

        for (let charIdx = 0; charIdx < word.length; charIdx++) {
          const char = word[charIdx];
          const scaled = getScaledBitmap(char, giantW, giantH);
          const outline = getOutlineBitmap(scaled);
          const colOffset = scrollX + charIdx * (giantW + spacing);

          for (let r = 0; r < giantH; r++) {
            for (let c = 0; c < giantW; c++) {
              if (outline[r][c] === 1) {
                const gr = startRow + r;
                const gc = colOffset + c;
                if (gr >= 0 && gr < rows && gc >= 0 && gc < cols) {
                  activeGrid[gr][gc] = 1;
                }
              }
            }
          }
        }

      } else if (elapsed < kc5_end) {
        // ==========================================
        // KC5: name, birth, zodiac, mbti chữ thường nhỏ mono, chớp nháy liên tục (1200ms)
        // ==========================================
        // Continuous flashing state (e.g., every 120ms)
        const isFlashOn = Math.floor((elapsed - kc4_end) / 120) % 2 === 0;

        if (isFlashOn) {
          linesToDraw.forEach((_, lineIdx) => {
            const labelText = getLabelForLineIndex(lineIdx);
            if (!labelText) return;

            const lineRow = startY + lineIdx * (charH + rowGap);
            
            // Render label text with small standard 5x7 mono characters
            for (let charIdx = 0; charIdx < labelText.length; charIdx++) {
              const char = labelText[charIdx];
              const bitmap = getCharBitmap(char);
              const charCol = startX + charIdx * 6; // standard 5 columns wide + 1 column spacing

              for (let r = 0; r < 7; r++) {
                for (let c = 0; c < 5; c++) {
                  if (bitmap[r][c] === 1) {
                    const gr = lineRow + r;
                    const gc = charCol + c;
                    if (gr >= 0 && gr < rows && gc >= 0 && gc < cols) {
                      activeGrid[gr][gc] = 1;
                    }
                  }
                }
              }
            }
          });
        }

      } else {
        // ==========================================
        // MAIN CONTENT: custom responsive left-aligned centered block
        // ==========================================
        const finalGrid = Array.from({ length: rows }, () => new Uint8Array(cols));

        linesToDraw.forEach((line, lineIdx) => {
          const lineRow = startY + lineIdx * (charH + rowGap);
          for (let charIdx = 0; charIdx < line.length; charIdx++) {
            const char = line[charIdx];
            const bitmap = getScaledBitmap(char, charW, charH);
            const charCol = startX + charIdx * (charW + 1);

            for (let r = 0; r < charH; r++) {
              for (let c = 0; c < charW; c++) {
                const gridRow = lineRow + r;
                const gridCol = charCol + c;
                if (gridRow >= 0 && gridRow < rows && gridCol >= 0 && gridCol < cols) {
                  finalGrid[gridRow][gridCol] = bitmap[r][c];
                }
              }
            }
          }
        });

        // Copy final grid over
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            activeGrid[r][c] = finalGrid[r][c];
          }
        }

        // Smooth fade-in over 600ms
        currentScreenOpacity = Math.min(1, (elapsed - kc5_end) / 600);
      }

      // Render the LED grid
      const marginX = w * 0.05;
      const marginY = h * 0.05;
      const availableW = w - marginX * 2;
      const availableH = h - marginY * 2;

      const cellW = availableW / cols;
      const cellH = availableH / rows;
      const dotRadius = Math.min(cellW, cellH) * 0.44;

      const gridW = cols * cellW;
      const gridH = rows * cellH;
      const startXDraw = marginX + (availableW - gridW) / 2 + cellW / 2;
      const startYDraw = marginY + (availableH - gridH) / 2 + cellH / 2;

      // Render faint, structured backplate grid holes
      ctx.fillStyle = '#101010';
      ctx.strokeStyle = '#141414';
      ctx.lineWidth = 0.5;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cx = startXDraw + c * cellW;
          const cy = startYDraw + r * cellH;
          ctx.beginPath();
          ctx.arc(cx, cy, dotRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
      }

      // Render glowing White LEDs
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (activeGrid[r][c] === 1) {
            const cx = startXDraw + c * cellW;
            const cy = startYDraw + r * cellH;

            ctx.save();
            ctx.beginPath();
            ctx.arc(cx, cy, dotRadius, 0, Math.PI * 2);

            // Calculate organic flicker factor and apply opacity
            const flicker = 0.94 + Math.random() * 0.06;
            const finalAlpha = currentScreenOpacity * flicker;

            ctx.fillStyle = `rgba(255, 255, 255, ${finalAlpha})`;
            ctx.shadowColor = `rgba(255, 255, 255, ${currentScreenOpacity * 0.9})`;
            ctx.shadowBlur = dotRadius * 2.2;
            ctx.fill();

            // Inner hot center
            ctx.beginPath();
            ctx.arc(cx, cy, dotRadius * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${finalAlpha})`;
            ctx.fill();

            ctx.restore();
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isPortrait]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full bg-black flex items-stretch justify-stretch overflow-hidden relative select-none"
    >
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full"
      />
    </div>
  );
};

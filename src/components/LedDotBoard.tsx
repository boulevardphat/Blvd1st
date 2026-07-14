import React, { useEffect, useRef, useState } from 'react';

// 5x7 Font Bitmap representation for A-Z, 0-9, and symbols.
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
  const c = char.toUpperCase();
  return LED_FONT[c] || LED_FONT[' '];
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

    // Define the final target text lines (broadened, left-aligned)
    const finalLines = isPortrait 
      ? [
          "PHAT NGUYEN THUAN",
          "26/09/2008",
          "LIBRA",
          "INFP-T"
        ]
      : [
          "PHAT NGUYEN THUAN",
          "26/09/2008",
          "LIBRA",
          "INFP-T"
        ];

    // Build the final main screen text grid
    const mainGrid = Array.from({ length: rows }, () => new Uint8Array(cols));

    // To broaden the font nicely without bloating it:
    // We scale each character to 8 columns wide and 7 columns tall! (This spreads/widens the glyph perfectly)
    const charW = 8;
    const charH = 7;
    const spacingX = charW + 1; // 1 column spacing between characters
    const leftMargin = isPortrait ? 4 : 8;

    if (isPortrait) {
      // Centered or spaced vertically
      const rowOffsets = [12, 24, 36, 48];
      finalLines.forEach((line, lineIdx) => {
        const lineRow = rowOffsets[lineIdx];
        for (let charIdx = 0; charIdx < line.length; charIdx++) {
          const char = line[charIdx];
          const bitmap = getScaledBitmap(char, charW, charH);
          const charCol = leftMargin + charIdx * spacingX;

          for (let r = 0; r < charH; r++) {
            for (let c = 0; c < charW; c++) {
              const gridRow = lineRow + r;
              const gridCol = charCol + c;
              if (gridRow < rows && gridCol < cols) {
                mainGrid[gridRow][gridCol] = bitmap[r][c];
              }
            }
          }
        }
      });
    } else {
      // Landscape rows
      const rowOffsets = [6, 14, 22, 30];
      finalLines.forEach((line, lineIdx) => {
        const lineRow = rowOffsets[lineIdx];
        for (let charIdx = 0; charIdx < line.length; charIdx++) {
          const char = line[charIdx];
          const bitmap = getScaledBitmap(char, charW, charH);
          const charCol = leftMargin + charIdx * spacingX;

          for (let r = 0; r < charH; r++) {
            for (let c = 0; c < charW; c++) {
              const gridRow = lineRow + r;
              const gridCol = charCol + c;
              if (gridRow < rows && gridCol < cols) {
                mainGrid[gridRow][gridCol] = bitmap[r][c];
              }
            }
          }
        }
      });
    }

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

    // Dynamic generator for randomized KC3 positions (flexible sized "phat" words)
    const kc3Words: Array<{ x: number; y: number; text: string; scaleW: number; scaleH: number }> = [];
    for (let i = 0; i < 8; i++) {
      kc3Words.push({
        x: Math.floor(Math.random() * (cols - 25)),
        y: Math.floor(Math.random() * (rows - 10)),
        text: "PHAT",
        scaleW: 4 + Math.floor(Math.random() * 8), // 4 to 11 width
        scaleH: 5 + Math.floor(Math.random() * 5)  // 5 to 9 height
      });
    }

    // Main render loop
    const render = (time: number) => {
      const elapsed = time - startTime;

      // 4 Keyframes transition timeline precisely aligned with requirements:
      // KC1: 0ms - 250ms (0.25s) -> "phat" nhỏ centered
      // KC2: 250ms - 500ms (0.25s) -> "BLVD" to, đậm rỗng, fill screen
      // KC3: 500ms - 1000ms (0.5s) -> "phat" nhỏ, chớp nháy loạn xạ khắp màn hình, size linh hoạt
      // KC4: 1000ms - 1500ms (0.5s) -> "BLVD" to, đậm rỗng, chạy ngang màn hình
      // Main App: 1500ms+ -> Final content fades in smoothly (no linked flying animation)

      const kc1_end = 250;
      const kc2_end = 500;
      const kc3_end = 1000;
      const kc4_end = 1500;

      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;

      // 1. Draw solid dark background
      ctx.fillStyle = '#060606';
      ctx.fillRect(0, 0, w, h);

      // 2. Compute dynamic grids
      const activeGrid = Array.from({ length: rows }, () => new Uint8Array(cols));
      let currentScreenOpacity = 1;

      if (elapsed < kc1_end) {
        // ==========================================
        // KC1: "PHAT" nhỏ style mono, nằm giữa màn hình (0.25s)
        // ==========================================
        const word = "PHAT";
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
                if (gr < rows && gc < cols) {
                  activeGrid[gr][gc] = 1;
                }
              }
            }
          }
        }

      } else if (elapsed < kc2_end) {
        // ==========================================
        // KC2: "BLVD" to, đậm nhưng rỗng (hollow/outline), fill cả màn hình (0.25s)
        // ==========================================
        const word = "BLVD";
        // To fill screen, let's make characters super giant
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
        // KC3: chữ "phat" nhỏ chớp nháy loạn xạ khắp màn hình, size linh hoạt (0.5s)
        // ==========================================
        // Render 4-5 randomly sized words per frame cycle (rapid flickering)
        const frameSeed = Math.floor(elapsed / 80); // shift positions every 80ms for natural rapid flicker
        const seededRandom = (seed: number) => {
          const x = Math.sin(seed) * 10000;
          return x - Math.floor(x);
        };

        for (let i = 0; i < 6; i++) {
          const rSeed = frameSeed * 10 + i;
          const randW = 4 + Math.floor(seededRandom(rSeed) * 10); // 4 to 13 cols
          const randH = 5 + Math.floor(seededRandom(rSeed + 1) * 7);  // 5 to 11 rows
          const randX = Math.floor(seededRandom(rSeed + 2) * (cols - randW * 4 - 4));
          const randY = Math.floor(seededRandom(rSeed + 3) * (rows - randH - 2));

          const word = "PHAT";
          for (let charIdx = 0; charIdx < word.length; charIdx++) {
            const char = word[charIdx];
            const bitmap = getScaledBitmap(char, randW, randH);
            const colOffset = randX + charIdx * (randW + 1);

            for (let r = 0; r < randH; r++) {
              for (let c = 0; c < randW; c++) {
                if (bitmap[r][c] === 1) {
                  const gr = randY + r;
                  const gc = colOffset + c;
                  if (gr >= 0 && gr < rows && gc >= 0 && gc < cols) {
                    activeGrid[gr][gc] = 1;
                  }
                }
              }
            }
          }
        }

      } else if (elapsed < kc4_end) {
        // ==========================================
        // KC4: chữ "BLVD" to, đậm nhưng rỗng, chạy ngang qua màn hình (0.5s)
        // ==========================================
        const word = "BLVD";
        const giantW = Math.floor(cols / 5);
        const giantH = Math.floor(rows * 0.75);
        const startRow = Math.floor((rows - giantH) / 2);

        // Compute horizontal scroll offset based on elapsed progress (moving right to left or left to right)
        const progress = (elapsed - kc3_end) / (kc4_end - kc3_end);
        // Scroll from right to left fully
        const scrollWidth = giantW * 4 + 30;
        const scrollX = Math.floor(cols - progress * (cols + scrollWidth));

        for (let charIdx = 0; charIdx < word.length; charIdx++) {
          const char = word[charIdx];
          const scaled = getScaledBitmap(char, giantW, giantH);
          const outline = getOutlineBitmap(scaled);
          const colOffset = scrollX + charIdx * (giantW + 3);

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

      } else {
        // ==========================================
        // MAIN APP: final lines fade in gently
        // ==========================================
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            activeGrid[r][c] = mainGrid[r][c];
          }
        }
        // Smooth fade-in over 600ms
        currentScreenOpacity = Math.min(1, (elapsed - kc4_end) / 600);
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
      const startX = marginX + (availableW - gridW) / 2 + cellW / 2;
      const startY = marginY + (availableH - gridH) / 2 + cellH / 2;

      // Render faint, structured backplate grid holes
      ctx.fillStyle = '#101010';
      ctx.strokeStyle = '#141414';
      ctx.lineWidth = 0.5;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cx = startX + c * cellW;
          const cy = startY + r * cellH;
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
            const cx = startX + c * cellW;
            const cy = startY + r * cellH;

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

import React, { useEffect, useState } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

const DecryptedText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    let interval: any;
    const maxIterations = 20;
    let iterations = 0;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        if (iterations >= maxIterations) {
          clearInterval(interval);
          setDisplay(text);
        } else {
          setDisplay(text.split('').map((char, index) => {
            if (char === ' ') return ' ';
            if (index < (iterations / maxIterations) * text.length) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join(''));
        }
        iterations++;
      }, 30);
    }, delay);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [text, delay]);

  return <span>{display || '\u00A0'}</span>;
};

export default DecryptedText;

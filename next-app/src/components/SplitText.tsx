import React from 'react';

interface SplitTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  charClassName?: string;
  type?: 'words' | 'chars';
}

export default function SplitText({ text, className = "", wordClassName = "", charClassName = "split-char", type = 'chars' }: SplitTextProps) {
  const words = text.split(' ');

  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className={`inline-block whitespace-nowrap overflow-hidden ${wordClassName}`}>
          {type === 'chars' ? (
            word.split('').map((char, charIndex) => (
              <span 
                key={charIndex} 
                className={`inline-block translate-y-[110%] opacity-0 ${charClassName}`}
                style={{ willChange: 'transform, opacity' }}
              >
                {char}
              </span>
            ))
          ) : (
             <span 
                className={`inline-block translate-y-[110%] opacity-0 ${charClassName}`}
                style={{ willChange: 'transform, opacity' }}
              >
                {word}
              </span>
          )}
          {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

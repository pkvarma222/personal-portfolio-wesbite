import React, { useEffect, useRef } from 'react';
import './Hero.css';

function Hero() {
  const headerRef = useRef(null);
  const paraRef = useRef(null);

  useEffect(() => {
    // Split header text into individual letters and add animation classes with delays
    const header = headerRef.current;
    if (header) {
      const text = header.textContent;
      header.innerHTML = ''; // Clear the content
      text.split('').forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter === ' ' ? '\u00A0' : letter; // Use non-breaking space for spaces
        span.className = 'header-letter';
        span.style.animationDelay = `${index * 0.03}s`; // 0.1s delay per letter for a staggered effect
        header.appendChild(span);
      });
    }

    // Trigger animation for paragraph (delayed after header)
    const para = paraRef.current;
    if (para) {
      para.classList.add('animate-para');
    }
  }, []); // Empty dependency array ensures this runs only on mount

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 ref={headerRef}>Hi, I'm Pramod</h1>
        <p ref={paraRef}>
          Filmmaker & Graphic Designer
        </p>
      </div>
    </section>
  );
}

export default Hero;
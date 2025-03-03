import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';

function Hero() {
  const headerRef = useRef(null);
  const paraRef = useRef(null);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true); // State to track mute/unmute status
  const hasAnimated = useRef(false); // Ref to track if header has animated
  const maxFontSize = 5;   // starting size in rem
  const minFontSize = 1.5; // sticky header size in rem
  const transitionDistance = 290; // pixels over which the transition occurs

  const [fontSize, setFontSize] = useState(maxFontSize);
  const [isSticky, setIsSticky] = useState(false);
  // Use a ref to hold the current font size for smooth lerping
  const currentFontSizeRef = useRef(maxFontSize);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let animationFrameId;

    // Base damping values – tweak these to fine‑tune responsiveness.
    const dampingBase = 0.1;
    const dampingVelocityMultiplier = 0.1;
    const minDamping = 0.05;
    const maxDamping = 0.3;

    const animate = () => {
      const currentScrollY = window.scrollY;
      const now = performance.now();
      const dt = now - lastTime || 16; // ms
      // Calculate scroll velocity (pixels per ms)
      const velocity = dt > 0 ? Math.abs(currentScrollY - lastScrollY) / dt : 0;
      // Compute progress (0 at top, 1 when scrolled at or beyond transitionDistance)
      const progress = Math.min(currentScrollY / transitionDistance, 1);
      const targetFontSize = maxFontSize - progress * (maxFontSize - minFontSize);
      // Compute damping factor that increases with scroll velocity
      let damping = dampingBase + dampingVelocityMultiplier * velocity;
      damping = Math.min(Math.max(damping, minDamping), maxDamping);
      // Smoothly update the font size using linear interpolation (lerp)
      const newFontSize = currentFontSizeRef.current + (targetFontSize - currentFontSizeRef.current) * damping;
      currentFontSizeRef.current = newFontSize;
      setFontSize(newFontSize);
      // Determine sticky state once we pass the transition distance
      setIsSticky(currentScrollY >= transitionDistance);
      lastScrollY = currentScrollY;
      lastTime = now;
      animationFrameId = requestAnimationFrame(animate);
    };

    // Split header text into individual letters and add animation classes with delays only on first load
    const header = headerRef.current;
    if (header && !hasAnimated.current) {
      const text = header.textContent;
      header.innerHTML = ''; // Clear the content
      text.split('').forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter === ' ' ? '\u00A0' : letter; // Use non-breaking space for spaces
        span.className = 'header-letter';
        span.style.animationDelay = `${index * 0.025}s`; // 0.025s delay per letter for a staggered effect
        header.appendChild(span);
      });
      hasAnimated.current = true; // Mark as animated to prevent re-animation
    }

    // Trigger animation for paragraph (fade in and rise together)
    const para = paraRef.current;
    if (para) {
      para.classList.add('animate-para'); // Apply animation for entire paragraph
    }

    // Ensure video plays automatically and starts muted
    const video = videoRef.current;
    if (video) {
      video.muted = isMuted; // Set initial muted state
      video.play().catch(error => console.log('Video play error:', error)); // Handle autoplay policy
    }

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [maxFontSize, minFontSize, transitionDistance, isMuted]);

  // Toggle mute/unmute state
  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted; // Toggle muted state
      setIsMuted(video.muted); // Update state to reflect new muted status
    }
  };

  return (
    <section className="hero">
      <video
        ref={videoRef}
        className="hero-video"
        autoPlay
        loop
        playsInline
      >
        <source src={`${process.env.PUBLIC_URL}/videos/showreel.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* When sticky, render a fixed header background */}
      {isSticky && <div className="sticky-header-bg"></div>}
      <div className="hero-content">
        <h1
          ref={headerRef}
          style={{
            fontSize: `${fontSize}rem`,
            position: isSticky ? 'fixed' : 'relative',
            top: isSticky ? '-5px' : 'initial',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        >
          Manthena Pramod Kumar Varma
        </h1>
        <p className="hero-subtitle">Filmmaker &amp; Graphic Designer</p>
      </div>
      <button className="mute-button" onClick={toggleMute} aria-label={isMuted ? 'Unmute video' : 'Mute video'}>
        {isMuted ? '🔇' : '🔊'} {/* Mute (speaker with slash) and Unmute (speaker) Unicode icons */}
      </button>
    </section>
  );
}

export default Hero;

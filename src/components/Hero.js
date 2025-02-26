import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';

function Hero() {
  const headerRef = useRef(null);
  const paraRef = useRef(null);
  const videoRef = useRef(null); // Ref for the video element
  const [isMuted, setIsMuted] = useState(true); // State to track mute/unmute status
  const hasAnimated = useRef(false); // Ref to track if header has animated

  useEffect(() => {
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
  }, [isMuted]); // Re-run effect when isMuted changes, but animations only trigger on mount

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
      <div className="hero-content">
        <h1 ref={headerRef}>Hi, I am Pramod</h1>
        <p ref={paraRef} className="animate-para">
          Filmmaker & Graphic Designer
        </p>
      </div>
      <button className="mute-button" onClick={toggleMute} aria-label={isMuted ? 'Unmute video' : 'Mute video'}>
        {isMuted ? '🔇' : '🔊'} {/* Mute (speaker with slash) and Unmute (speaker) Unicode icons */}
      </button>
    </section>
  );
}

export default Hero;

import React, { useEffect, useRef } from 'react';
import './Portfolio.css';

function Portfolio() {
  const sectionRef = useRef(null);
  const leftImageRef = useRef(null);
  const rightImageRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      const leftImage = leftImageRef.current;
      const rightImage = rightImageRef.current;
      if (!section || !leftImage || !rightImage) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;

      // Use the section's vertical midpoint to control progress:
      // When the midpoint is at 70% of the viewport, progress = 0 (images fully cover text)
      // When the midpoint is at 50% (center), progress = 1 (images slid aside)
      const upperThreshold = windowHeight * 0.70;
      const lowerThreshold = windowHeight / 2;
      const sectionMid = rect.top + rect.height / 2;
      let progress = 0;
      if (sectionMid <= lowerThreshold) {
        progress = 1;
      } else if (sectionMid >= upperThreshold) {
        progress = 0;
      } else {
        progress = (upperThreshold - sectionMid) / (upperThreshold - lowerThreshold);
      }

      // Calculate maximum translation so that at progress=1 each image slides out enough 
      // to reveal the text (with a 15% margin)
      const imageWidth = leftImage.offsetWidth;
      const margin = windowWidth * 0.15;
      const maxTranslate = (((windowWidth / 2) - margin) - (imageWidth / 2)) / windowWidth * 100;

      leftImage.style.transform = `translateX(-${progress * maxTranslate}vw)`;
      rightImage.style.transform = `translateX(${progress * maxTranslate}vw)`;
      leftImage.style.zIndex = '10';
      rightImage.style.zIndex = '10';
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="portfolio">
      {/* Combined text container for all headings/text */}
      <div className="text-content">
        <h2>FILMMAKER</h2>
        <p>I was often told that I have been narrating my own stories since I have been 10. Years later I picked up films as my choice of visualizing these stories</p>
        <button>Featured Works</button>
      </div>
      {/* Image overlay that covers the text initially */}
      <div className="portfolio-content">
        <div ref={leftImageRef} className="image-container left-image">
          <img src="https://cdn.prod.website-files.com/60eeb025115a75902b86a796/647e3cc83822b06137a15c00_Header%201%20Left.jpg" alt="Project 1" />
        </div>
        <div ref={rightImageRef} className="image-container right-image">
          <img src="https://cdn.prod.website-files.com/60eeb025115a75902b86a796/647e3cc83822b06137a15c00_Header%201%20Left.jpg" alt="Project 2" />
        </div>
      </div>
    </section>
  );
}

export default Portfolio;

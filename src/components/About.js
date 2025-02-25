import React, { useEffect, useRef } from 'react';
import './About.css';

function About() {
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
      // When the midpoint is at 70% of the viewport, progress = 0 (images together, 0deg rotation)
      // When the midpoint is at 50% (center), progress = 1 (images apart, 30deg rotation)
      const upperThreshold = windowHeight * 0.90;
      const lowerThreshold = windowHeight * 0.70;
      const sectionMid = rect.top + rect.height / 2;
      let progress = 0;
      if (sectionMid <= lowerThreshold) {
        progress = 1;
      } else if (sectionMid >= upperThreshold) {
        progress = 0;
      } else {
        progress = (upperThreshold - sectionMid) / (upperThreshold - lowerThreshold);
      }

      // New condition added (inserted before or after the above, depending on context)
      const documentHeight = document.documentElement.scrollHeight; // Total height of the webpage
      const scrollPosition = window.scrollY + windowHeight; // Current scroll position plus viewport height
      const atPageEnd = scrollPosition >= documentHeight - 100; // Check if within 100px of the bottom

      if (atPageEnd || sectionMid <= lowerThreshold) {
        progress = 1; // Fully slide and rotate when at center or page end
      } else if (sectionMid >= upperThreshold) {
        progress = 0; // Images together, no slide or rotation at top
      } else {
        progress = (upperThreshold - sectionMid) / (upperThreshold - lowerThreshold);
      }
      
      // Calculate maximum translation so that at progress=1 each image slides out enough 
      // to reveal the text (with a 15% margin)
      const imageWidth = leftImage.offsetWidth;
      const margin = windowWidth * 0.15;
      const maxTranslate = (((windowWidth / 2) - margin) - (imageWidth / 2)) / windowWidth * 100;
      
      // Calculate rotation angle (0deg to 15deg based on progress)
      const rotationAngle = progress * 2.5; // Linear interpolation from 0deg to 30deg

      // Apply both translation (slide) and rotation (rotate) to images
      // Left image slides left and rotates counterclockwise (0deg to -30deg)
      leftImage.style.transform = `translateX(-${progress * maxTranslate}vw) rotate(-${rotationAngle}deg)`;
      // Right image slides right and rotates clockwise (0deg to 30deg)
      rightImage.style.transform = `translateX(${progress * maxTranslate}vw) rotate(${rotationAngle}deg)`;
      leftImage.style.zIndex = '10';
      rightImage.style.zIndex = '10';
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="about">
      {/* Combined text container for all headings/text */}
      <div className="text-content">
        <h2>GRAPHIC DESIGNER</h2>
        <p>Thanks to my cousin, I joined in a class to learn Photoshop and Illustrator during a summer in high school. Thus began my journey on making logos, graphics and posters.</p>
        <button>Featured Designs</button>
      </div>
      {/* Image overlay that covers the text initially */}
      <div className="about-content">
        <div ref={leftImageRef} className="image-container left-image">
          <img src="https://cdn.prod.website-files.com/60eeb025115a75902b86a796/647e3cc83822b06137a15c00_Header%201%20Left.jpg" alt="About Left" />
        </div>
        <div ref={rightImageRef} className="image-container right-image">
          <img src="https://cdn.prod.website-files.com/60eeb025115a75902b86a796/647e3cc83822b06137a15c00_Header%201%20Left.jpg" alt="About Right" />
        </div>
      </div>
    </section>
  );
}

export default About;
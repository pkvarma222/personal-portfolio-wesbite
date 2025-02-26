import React, { useEffect, useRef } from 'react';
import './FeaturedWorks.css'; // We’ll update this CSS file next
import { useNavigate } from 'react-router-dom'; // For navigation

function FeaturedWorks() {
  const navigate = useNavigate(); // For navigating back to the homepage
  const headingRef = useRef(null); // Ref for the heading opacity animation
  const videoRefs = useRef([]); // Refs for video elements to manage playback

  const projects = [
    {
      title: 'Voicemail',
      subtitle: 'writer | director | editor | cinematographer | sound designer | colorist',
      video: '/videos/Voicemail - Teaser.mp4', // Local video from public/videos/
      poster: '/images/ninnu-cheraga.jpg', // Fallback poster from public/images/
    },
    {
      title: 'Knock Knock Bang',
      subtitle: 'writer | director | editor | sound designer | colorist',
      video: '/videos/KKB-Trailer.mp4', // video from google drive
      poster: '/images/knock-knock-bang.jpg', // Fallback poster from public/images/
    },
    {
      title: 'Prema Prathipadhana Prayasa',
      subtitle: 'writer | director | editor | cinematographer | sound mixer | colorist',
      video: '/videos/showreel.mp4', // Local video from public/videos/
      poster: '/images/ninnu-cheraga.jpg', // Fallback poster from public/images/
    },
    {
      title: 'Shine on Us',
      subtitle: 'writer | director | editor | sound mixer | colorist',
      video: '/videos/showreel.mp4', // Local video from public/videos/
      poster: '/images/knock-knock-bang.jpg', // Fallback poster from public/images/
    },
    {
      title: 'Alright',
      subtitle: 'writer | director | editor | cinematographer | sound designer | colorist',
      video: '/videos/ninnu-cheraga.mp4', // Local video from public/videos/
      poster: '/images/ninnu-cheraga.jpg', // Fallback poster from public/images/
    },
    {
      title: 'El Amigo Perdido',
      subtitle: 'writer | director | editor',
      video: '/videos/knock-knock-bang.mp4', // Local video from public/videos/
      poster: '/images/knock-knock-bang.jpg', // Fallback poster from public/images/
    },
    {
      title: 'Finds You',
      subtitle: 'writer | director | editor | cinematographer',
      video: '/videos/FindsYou-teaser.mp4', // Local video from public/videos/
      poster: '/images/ninnu-cheraga.jpg', // Fallback poster from public/images/
    },
    {
      title: 'Lockdown Conversation',
      subtitle: 'writer | director | editor',
      video: '/videos/silent-shadows.mp4', // Local video from public/videos/
      poster: '/images/knock-knock-bang.jpg', // Fallback poster from public/images/
    },
    {
      title: 'Oke Oo Roopam - Unfinished',
      subtitle: 'writer | director | editor | cinematographer | sound designer | colorist',
      video: '/videos/ninnu-cheraga.mp4', // Local video from public/videos/
      poster: '/images/ninnu-cheraga.jpg', // Fallback poster from public/images/
    },
    {
      title: 'Ninnu Cheraga - Shelved',
      subtitle: 'writer | director | editor | cinematographer | sound designer | colorist',
      video: '/videos/NC-teaser2.mp4', // Local video from public/videos/
      poster: '/images/knock-knock-bang.jpg', // Fallback poster from public/images/
    },
    // Add more projects as needed
  ];

  useEffect(() => {
    const handleScroll = () => {
      const heading = headingRef.current;
      if (!heading) return;

      const rect = heading.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      // Calculate opacity based on scroll position (fade from 1 to 0.3 as user scrolls down)
      const startFade = 0; // Start fading at top
      const endFade = windowHeight * 0.5; // End fading at 50% of viewport
      const scrollDistance = Math.max(0, scrollTop - rect.top + windowHeight * 0.1); // Offset for visibility
      const opacity = Math.max(0.10, 1 - (scrollDistance / endFade)); // Decrease to 0.3, not 0

      heading.style.opacity = opacity;

      // Handle video playback as they enter/exit viewport
      videoRefs.current.forEach((video, index) => {
        if (video) {
          const videoRect = video.getBoundingClientRect();
          const isInView = videoRect.top >= 0 && videoRect.top <= windowHeight;

          if (isInView && !video.playing) {
            // Pause previous videos and play this one sequentially
            videoRefs.current.forEach((prevVideo, prevIndex) => {
              if (prevVideo && prevIndex < index && prevVideo.playing) {
                prevVideo.pause();
                prevVideo.playing = false;
              }
            });
            video.play().catch(error => console.log('Video play error:', error));
            video.playing = true;
          } else if (!isInView && video.playing) {
            video.pause();
            video.playing = false;
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="featured-works" role="main">
      <header className="featured-works-header" ref={headingRef}>
        <h1>FILMMAKER</h1>
        <h2>Writer | Director | Editor | Cinematographer | Colorist | Sound Mixer</h2>
      </header>
      <div className="projects-queue" role="list">
        {projects.map((project, index) => (
          <article key={index} className="project-card" role="listitem">
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={project.video}
              poster={project.poster}
              autoPlay={false}
              loop={false}
              muted
              playsInline
              className="project-video"
            >
              <source src={project.video} type="video/mp4" />
              <source src={`${project.video.replace('.mp4', '.webm')}`} type="video/webm" />
              <source src={`${project.video.replace('.mp4', '.ogv')}`} type="video/ogg" />
              Your browser does not support the video tag.
              <img src={project.poster} alt={`${project.title} poster`} className="project-poster" />
            </video>
            {/* Wrap text inside a div for better styling */}
            <div className="text-container">
              <h2 className="project-title">{project.title}</h2>
              <p className="project-subtitle">{project.subtitle}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default FeaturedWorks;
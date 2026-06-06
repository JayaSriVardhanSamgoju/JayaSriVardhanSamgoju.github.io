import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: onComplete,
        });
      },
    });

    // Slow zoom on the text
    tl.fromTo(
      textRef.current,
      { scale: 0.85, opacity: 0 },
      {
        scale: 1.05,
        opacity: 1,
        duration: 2.8,
        ease: 'power1.inOut',
      }
    );

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div className="preloader" ref={containerRef}>
      <div className="preloader-text" ref={textRef}>
        Initialising Portfolio...
      </div>
    </div>
  );
};

export default Preloader;

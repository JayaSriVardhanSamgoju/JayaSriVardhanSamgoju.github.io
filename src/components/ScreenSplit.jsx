import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ScreenSplit = ({ onComplete }) => {
  const overlayRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create sparkle particles
    const particles = [];
    const particleCount = 50;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
      const speed = 2 + Math.random() * 4;
      particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 1 + Math.random() * 2.5,
        opacity: 0.8 + Math.random() * 0.2,
        life: 1,
      });
    }

    let animFrame;
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let allDead = true;

      particles.forEach((p) => {
        if (p.life <= 0) return;
        allDead = false;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.018;
        p.opacity = p.life * 0.9;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();

        // Glow effect
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 255, 218, ${p.opacity * 0.15})`;
        ctx.fill();
      });

      if (!allDead) {
        animFrame = requestAnimationFrame(animateParticles);
      }
    };

    // GSAP timeline for split + rotate
    const tl = gsap.timeline({
      onComplete: () => {
        cancelAnimationFrame(animFrame);
        if (onComplete) onComplete();
      },
    });

    tl.to(
      [topRef.current, bottomRef.current],
      {
        duration: 0.1,
        opacity: 1,
      }
    );

    tl.to(
      topRef.current,
      {
        y: '-60%',
        rotation: -10,
        opacity: 0,
        duration: 1.3,
        ease: 'power3.inOut',
      },
      0.1
    );

    tl.to(
      bottomRef.current,
      {
        y: '60%',
        rotation: 10,
        opacity: 0,
        duration: 1.3,
        ease: 'power3.inOut',
      },
      0.1
    );

    // Start particles at the same time
    tl.call(animateParticles, [], 0.1);

    return () => {
      tl.kill();
      cancelAnimationFrame(animFrame);
    };
  }, [onComplete]);

  return (
    <>
      <div className="screen-split-overlay" ref={overlayRef}>
        <div className="screen-split-top" ref={topRef} />
        <div className="screen-split-bottom" ref={bottomRef} />
      </div>
      <canvas className="sparkle-canvas" ref={canvasRef} />
    </>
  );
};

export default ScreenSplit;

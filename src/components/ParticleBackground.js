import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let shapes = [];
    let W, H;
    let mouseX = -1000, mouseY = -1000;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    /* ── PARTICLES ── */
    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.r = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.colorType = Math.random();
      }
      update() {
        // Mouse repulsion
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && dist > 0) {
          const force = (150 - dist) / 150 * 0.8;
          this.vx += (dx / dist) * force * 0.3;
          this.vy += (dy / dist) * force * 0.3;
        }

        // Damping
        this.vx *= 0.99;
        this.vy *= 0.99;

        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > W) this.vx *= -1;
        if (this.y < 0 || this.y > H) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        let color;
        if (this.colorType < 0.4) color = `rgba(0,212,255,${this.opacity})`;
        else if (this.colorType < 0.7) color = `rgba(124,58,237,${this.opacity})`;
        else if (this.colorType < 0.85) color = `rgba(16,185,129,${this.opacity})`;
        else color = `rgba(45,212,160,${this.opacity * 0.6})`;
        ctx.fillStyle = color;
        ctx.fill();
      }
    }

    /* ── FLOATING GEOMETRIC SHAPES ── */
    class FloatingShape {
      constructor() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.size = Math.random() * 30 + 15;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.005;
        this.vx = (Math.random() - 0.5) * 0.15;
        this.vy = (Math.random() - 0.5) * 0.15;
        this.opacity = Math.random() * 0.04 + 0.01;
        this.type = Math.floor(Math.random() * 3); // 0=hex, 1=triangle, 2=diamond
        this.colorType = Math.random();
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;
        if (this.x < -50 || this.x > W + 50) this.vx *= -1;
        if (this.y < -50 || this.y > H + 50) this.vy *= -1;
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        let color;
        if (this.colorType < 0.4) color = `rgba(0,212,255,${this.opacity})`;
        else if (this.colorType < 0.7) color = `rgba(124,58,237,${this.opacity})`;
        else color = `rgba(45,212,160,${this.opacity})`;

        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.beginPath();

        if (this.type === 0) {
          // Hexagon
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const px = this.size * Math.cos(angle);
            const py = this.size * Math.sin(angle);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
        } else if (this.type === 1) {
          // Triangle
          for (let i = 0; i < 3; i++) {
            const angle = (Math.PI * 2 / 3) * i - Math.PI / 2;
            const px = this.size * Math.cos(angle);
            const py = this.size * Math.sin(angle);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
        } else {
          // Diamond
          ctx.moveTo(0, -this.size);
          ctx.lineTo(this.size * 0.6, 0);
          ctx.lineTo(0, this.size);
          ctx.lineTo(-this.size * 0.6, 0);
          ctx.closePath();
        }
        ctx.stroke();
        ctx.restore();
      }
    }

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const init = () => {
      resize();
      particles = [];
      shapes = [];
      const particleCount = Math.min(90, Math.floor((W * H) / 12000));
      for (let i = 0; i < particleCount; i++) particles.push(new Particle());

      const shapeCount = Math.min(12, Math.floor((W * H) / 100000));
      for (let i = 0; i < shapeCount; i++) shapes.push(new FloatingShape());
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Draw shapes first (behind particles)
      shapes.forEach(s => { s.update(); s.draw(); });

      // Draw particles
      particles.forEach(p => { p.update(); p.draw(); });

      // Draw neural network connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const alpha = 0.1 * (1 - dist / 140);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,212,255,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Mouse glow
      if (mouseX > 0 && mouseY > 0) {
        const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 120);
        gradient.addColorStop(0, 'rgba(0,212,255,0.03)');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(mouseX - 120, mouseY - 120, 240, 240);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener('resize', init);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default ParticleBackground;

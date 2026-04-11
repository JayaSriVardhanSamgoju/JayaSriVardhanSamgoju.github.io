import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const stats = [
  { id: 1, target: 8, label: 'ML Projects', suffix: '+', decimals: 0 },
  { id: 2, target: 3, label: 'NLP Projects', suffix: '+', decimals: 0 },
  { id: 3, target: 6, label: 'Deep Learning', suffix: '+', decimals: 0 },
  { id: 4, target: 9.1, label: 'CGPA', suffix: '', decimals: 1 },
];

const TypeWriter = ({ texts }) => {
  const [display, setDisplay] = useState('');
  const [idx, setIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const current = texts[idx % texts.length];
    const speed = isDeleting ? 40 : 80;
    const timer = setTimeout(() => {
      if (!isDeleting && charIdx < current.length) {
        setDisplay(current.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      } else if (!isDeleting && charIdx === current.length) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && charIdx > 0) {
        setDisplay(current.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
      } else {
        setIsDeleting(false);
        setIdx(i => (i + 1) % texts.length);
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, idx, texts]);

  return (
    <span style={{ color: '#00d4ff' }}>
      {display}
      <span style={{ animation: 'blink 1s infinite', borderRight: '2px solid #00d4ff', marginLeft: 2 }} />
    </span>
  );
};

const Counter = ({ target, decimals, suffix, started }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const duration = 1600;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target]);

  return (
    <span>
      {decimals ? count.toFixed(decimals) : Math.floor(count)}{suffix}
    </span>
  );
};

const Hero = () => {
  const heroRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '100px 8% 80px',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        pointerEvents: 'none',
      }} />

      {/* Radial glow */}
      <div style={{
        position: 'absolute', top: '20%', left: '40%',
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Floating 3D elements */}
      <motion.div
        animate={{ y: [0, -15, 0], rotateZ: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '15%', right: '12%',
          width: 80, height: 80, zIndex: 0,
          border: '1px solid rgba(124,58,237,0.15)',
          borderRadius: 16,
          background: 'linear-gradient(135deg, rgba(124,58,237,0.05), rgba(0,212,255,0.03))',
          transform: 'rotate(45deg)',
        }}
      />
      <motion.div
        animate={{ y: [0, 12, 0], rotateZ: [0, -3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        style={{
          position: 'absolute', bottom: '25%', right: '20%',
          width: 50, height: 50, zIndex: 0,
          border: '1px solid rgba(0,212,255,0.12)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.06), transparent)',
        }}
      />
      <motion.div
        animate={{ y: [0, -10, 0], rotateZ: [0, 8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute', top: '60%', right: '8%',
          width: 0, height: 0, zIndex: 0,
          borderLeft: '20px solid transparent',
          borderRight: '20px solid transparent',
          borderBottom: '35px solid rgba(45,212,160,0.06)',
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ maxWidth: 780, position: 'relative', zIndex: 1 }}
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'rgba(0,212,255,0.06)',
            border: '1px solid rgba(0,212,255,0.2)',
            borderRadius: 30, padding: '7px 18px',
            fontSize: 11, color: '#00d4ff',
            letterSpacing: 2, fontFamily: 'Oxanium, sans-serif',
            fontWeight: 600, marginBottom: 24,
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: '#00d4ff',
              animation: 'pulse-glow 2s infinite',
              display: 'inline-block',
            }} />
            AVAILABLE FOR OPPORTUNITIES
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          style={{
            fontFamily: 'Oxanium, sans-serif',
            fontSize: 'clamp(36px, 6vw, 68px)',
            fontWeight: 800,
            lineHeight: 1.05,
            marginBottom: 18,
            background: 'linear-gradient(135deg, #ffffff 0%, #00d4ff 50%, #7c3aed 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Jaya Sri Vardhan<br />Samgoju
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          variants={itemVariants}
          style={{
            fontFamily: 'Oxanium, sans-serif',
            fontSize: 'clamp(13px, 2vw, 18px)',
            fontWeight: 500,
            letterSpacing: 1.5,
            marginBottom: 22,
            color: '#94a3b8',
          }}
        >
          <TypeWriter texts={[
            'Machine Learning Enthusiast',
            'Aspiring Data Scientist',
            'AI Developer',
            'Deep Learning Engineer',
          ]} />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          style={{
            fontSize: 15,
            color: '#94a3b8',
            lineHeight: 1.9,
            marginBottom: 40,
            maxWidth: 580,
          }}
        >
          A passionate Computer Science engineering student specializing in Machine Learning,
          Artificial Intelligence, and Natural Language Processing. Building intelligent systems
          that solve real-world problems through data-driven approaches and deep learning.
        </motion.p>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 14,
            marginBottom: 40,
          }}
        >
          {stats.map(s => (
            <motion.div
              key={s.id}
              whileHover={{ scale: 1.05, borderColor: '#00d4ff' }}
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid #1e3a5f',
                borderRadius: 12,
                padding: '16px 12px',
                textAlign: 'center',
                transition: 'all 0.3s',
                cursor: 'default',
              }}
            >
              <div style={{
                fontFamily: 'Oxanium, sans-serif',
                fontSize: 26,
                fontWeight: 800,
                background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                <Counter target={s.target} decimals={s.decimals} suffix={s.suffix} started={started} />
              </div>
              <div style={{ fontSize: 10, color: '#4b6282', letterSpacing: 1, marginTop: 5, fontFamily: 'Oxanium, sans-serif' }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div variants={itemVariants} style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <motion.a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 30px rgba(0,212,255,0.35)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
              color: '#fff', border: 'none',
              padding: '14px 32px', borderRadius: 8,
              fontSize: 14, fontWeight: 700,
              fontFamily: 'Oxanium, sans-serif',
              cursor: 'pointer', letterSpacing: 0.5,
              textDecoration: 'none',
            }}
          >
            View My Work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </motion.a>
          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            whileHover={{ borderColor: '#00d4ff', color: '#00d4ff', scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'transparent', color: '#94a3b8',
              border: '1px solid #1e3a5f',
              padding: '14px 28px', borderRadius: 8,
              fontSize: 14, fontFamily: 'Oxanium, sans-serif',
              cursor: 'pointer', letterSpacing: 0.5,
              textDecoration: 'none', transition: 'all 0.2s',
            }}
          >
            Get In Touch
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: 'absolute', bottom: 32, left: '50%',
          transform: 'translateX(-50%)', display: 'flex',
          flexDirection: 'column', alignItems: 'center', gap: 6,
          color: '#4b6282', fontSize: 11,
          fontFamily: 'Oxanium, sans-serif', letterSpacing: 2,
          zIndex: 1,
        }}
      >
        <span>SCROLL</span>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(180deg, #4b6282, transparent)' }} />
      </motion.div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse-glow {
          0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(0,212,255,0.4)}
          50%{opacity:0.7;box-shadow:0 0 0 10px transparent}
        }
        @media (max-width: 600px) {
          [style*="repeat(4, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;

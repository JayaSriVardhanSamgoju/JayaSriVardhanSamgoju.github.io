import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Navigation } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { personalInfo } from '../data/portfolioData';

/* Inline social SVGs since lucide-react no longer ships brand icons */
const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const Hero = ({ onViewWork }) => {
  const photoRef = useRef(null);
  const [showNavHint, setShowNavHint] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!photoRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      photoRef.current.style.transform = `scale(1.05) translate(${x}px, ${y}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Show "scroll blocked" hint when user tries to scroll on hero
  useEffect(() => {
    let timeout;
    const handleWheel = (e) => {
      if (e.deltaY > 0) {
        setShowNavHint(true);
        clearTimeout(timeout);
        timeout = setTimeout(() => setShowNavHint(false), 3000);
      }
    };
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(timeout);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section className="hero-section" id="hero">
      {/* Left Side — Info */}
      <motion.div
        className="hero-left"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            color: 'var(--accent)',
            marginBottom: '16px',
            letterSpacing: '2px',
          }}
        >
          HELLO, I'M
        </motion.p>

        <motion.h1 className="hero-name" variants={itemVariants}>
          {personalInfo.name}
        </motion.h1>

        <motion.h2 className="hero-role" variants={itemVariants} style={{ color: 'var(--accent)' }}>
          <TypeAnimation
            sequence={[
              'AI Engineer',
              1500,
              'Data Scientist',
              1500,
              'ML Engineer',
              1500,
              'Works on LLMs',
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </motion.h2>

        {/* Mobile Photo */}
        <motion.div className="hero-photo-mobile" variants={itemVariants}>
          <img
            src="/assets/profile_photo.png"
            alt="Portrait"
          />
        </motion.div>

        <motion.p className="hero-bio" variants={itemVariants} style={{ color: '#c1c7d0' }}>
          {personalInfo.bio}
        </motion.p>

        <motion.div className="hero-socials" variants={itemVariants}>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social-link"
            aria-label="GitHub"
          >
            <GithubIcon />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social-link"
            aria-label="LinkedIn"
          >
            <LinkedinIcon />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social-link"
            aria-label="Twitter"
          >
            <TwitterIcon />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="hero-social-link"
            aria-label="Email"
          >
            <MailIcon />
          </a>
        </motion.div>

        <motion.button
          className="hero-cta hero-cta-compact"
          variants={itemVariants}
          onClick={onViewWork}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          View My Work <ArrowRight size={16} />
        </motion.button>
      </motion.div>

      {/* Right Side — Photo */}
      <div className="hero-right">
        <img
          ref={photoRef}
          src="/assets/profile_photo.png"
          alt="Portrait"
          className="hero-photo"
          style={{ transition: 'transform 0.3s ease-out' }}
        />
        <div className="hero-photo-vignette" />
      </div>

      {/* "Use the navbar" scroll hint */}
      <AnimatePresence>
        {showNavHint && (
          <motion.div
            className="navbar-hint"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Navigation size={16} />
            <span>Use the navbar to navigate through sections</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';

import Preloader from './components/Preloader';
import ScreenSplit from './components/ScreenSplit';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import About from './components/About';
import Projects from './components/Projects';
import Education from './components/Education';
import SkillsSection from './components/SkillsSection';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

/*
  Phase flow:
  PRELOADER → SCREEN_SPLIT → HERO (navbar center) → SCROLLABLE (navbar left)
  Home click → SCREEN_SPLIT → HERO (navbar center)
*/

const scrollVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

function App() {
  const [phase, setPhase] = useState('PRELOADER');
  const [activeSection, setActiveSection] = useState('home');
  const [navPosition, setNavPosition] = useState('center'); // 'center' | 'left'
  const [navVisible, setNavVisible] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const scrollContainerRef = useRef(null);

  // Phase 1 complete → trigger screen split
  const handlePreloaderDone = useCallback(() => {
    setPhase('SCREEN_SPLIT');
  }, []);

  // Phase 2 complete → show hero + navbar
  const handleSplitDone = useCallback(() => {
    setPhase('HERO');
    setActiveSection('home');
    setNavPosition('center');
    setTimeout(() => setNavVisible(true), 600);
    // Show navbar hint for 3 seconds
    setShowHint(true);
    setTimeout(() => setShowHint(false), 3000);
  }, []);

  // Navigation handler
  const handleNavigate = useCallback(
    (sectionId) => {
      if (sectionId === 'home') {
        setNavVisible(false);
        setPhase('SCREEN_SPLIT');
        setActiveSection('home');
        return;
      }

      // Transition to scrollable page if coming from hero
      if (phase === 'HERO') {
        setNavPosition('left');
        setPhase('SCROLLABLE');
        setActiveSection(sectionId);
        // Scroll to section after mount
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return;
      }

      // Already on scrollable page — just scroll
      setActiveSection(sectionId);
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    },
    [phase]
  );

  // View My Work button in hero
  const handleViewWork = useCallback(() => {
    handleNavigate('about');
  }, [handleNavigate]);

  // Track active section on scroll
  useEffect(() => {
    if (phase !== 'SCROLLABLE') return;

    const sectionIds = ['about', 'projects', 'education', 'skills', 'certifications', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [phase]);

  // Show hint when trying to scroll on the Hero section (mobile)
  useEffect(() => {
    if (phase !== 'HERO') return;

    let hintTimeout;
    const handleScroll = () => {
      if (window.innerWidth <= 768) {
        setShowHint(true);
        if (hintTimeout) clearTimeout(hintTimeout);
        hintTimeout = setTimeout(() => setShowHint(false), 2500);
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      if (hintTimeout) clearTimeout(hintTimeout);
    };
  }, [phase]);

  return (
    <div className="App">
      {/* Phase 1 — Preloader */}
      {phase === 'PRELOADER' && <Preloader onComplete={handlePreloaderDone} />}

      {/* Phase 2 — Screen Split Transition */}
      {phase === 'SCREEN_SPLIT' && <ScreenSplit onComplete={handleSplitDone} />}

      {/* Hero is always behind — visible when not loading other sections */}
      {(phase === 'HERO' || phase === 'SCREEN_SPLIT') && (
        <Hero onViewWork={handleViewWork} />
      )}

      {/* Scrollable page with all sections */}
      <AnimatePresence>
        {phase === 'SCROLLABLE' && (
          <motion.div
            ref={scrollContainerRef}
            variants={scrollVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="scrollable-page"
          >
            <About onNavigate={handleNavigate} />
            <Projects />
            <Education />
            <div id="skills">
              <SkillsSection />
            </div>
            <Certifications />
            <Contact />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <Navbar
        visible={navVisible}
        position={navPosition}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isHero={phase === 'HERO'}
      />

      {/* Chatbot — always visible after preloader */}
      {(phase === 'HERO' || phase === 'SCROLLABLE') && (
        <Chatbot onNavigate={handleNavigate} phase={phase} />
      )}

      {/* Navbar hint — auto-dismisses after 3s */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            className="navbar-hint"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
          >
            <span>↑</span>
            Use the navbar to navigate between sections
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

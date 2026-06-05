import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';

import Preloader from './components/Preloader';
import ScreenSplit from './components/ScreenSplit';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

/*
  Phase flow:
  PRELOADER → SCREEN_SPLIT → HERO (navbar center) → NAVIGATING (navbar left)
  Home click → SCREEN_SPLIT → HERO (navbar center)
*/

const sectionComponents = {
  about: About,
  projects: Projects,
  skills: Skills,
  contact: Contact,
};

const sectionVariants = {
  initial: { opacity: 0, x: 60 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    x: -40,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

function App() {
  const [phase, setPhase] = useState('PRELOADER');
  const [activeSection, setActiveSection] = useState('home');
  const [navPosition, setNavPosition] = useState('center'); // 'center' | 'left'
  const [navVisible, setNavVisible] = useState(false);

  // Phase 1 complete → trigger screen split
  const handlePreloaderDone = useCallback(() => {
    setPhase('SCREEN_SPLIT');
  }, []);

  // Phase 2 complete → show hero + navbar
  const handleSplitDone = useCallback(() => {
    setPhase('HERO');
    setActiveSection('home');
    setNavPosition('center');
    // Show navbar after a brief delay for the hero to settle
    setTimeout(() => setNavVisible(true), 600);
  }, []);

  // Navigation handler
  const handleNavigate = useCallback(
    (sectionId) => {
      if (sectionId === 'home') {
        // Replay transition: hide navbar, trigger screen split, then hero
        setNavVisible(false);
        setPhase('SCREEN_SPLIT');
        setActiveSection('home');
        return;
      }

      // First time clicking a section — move navbar to left
      if (navPosition === 'center') {
        setNavPosition('left');
      }

      setActiveSection(sectionId);
      setPhase('NAVIGATING');
    },
    [navPosition]
  );

  // View My Work button in hero
  const handleViewWork = useCallback(() => {
    handleNavigate('projects');
  }, [handleNavigate]);

  // Determine which section to render
  const ActiveSectionComponent = sectionComponents[activeSection] || null;

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

      {/* Sections — shown when nav is in left position */}
      {phase === 'NAVIGATING' && (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ minHeight: '100vh' }}
          >
            {ActiveSectionComponent && <ActiveSectionComponent onNavigate={handleNavigate} />}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Navbar */}
      <Navbar
        visible={navVisible}
        position={navPosition}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

export default App;

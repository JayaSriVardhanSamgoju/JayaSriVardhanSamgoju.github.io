import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, Code2, Award, Mail } from 'lucide-react';

const navItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'about', icon: User, label: 'About' },
  { id: 'projects', icon: Briefcase, label: 'Projects' },
  { id: 'skills', icon: Code2, label: 'Skills' },
  { id: 'certifications', icon: Award, label: 'Certifications' },
  { id: 'contact', icon: Mail, label: 'Contact' },
];

const Navbar = ({ visible, position, activeSection, onNavigate, isHero }) => {
  if (!visible) return null;

  // position: 'center' or 'left'
  const positionStyles =
    position === 'center'
      ? {
          top: '30%',
          left: '50%',
          x: '-50%',
          y: '-50%',
        }
      : {
          top: '30%',
          left: '24px',
          x: '0%',
          y: '-50%',
        };

  return (
    <AnimatePresence>
      <motion.nav
        className={`vertical-navbar ${isHero ? 'navbar-hero-highlight' : ''}`}
        layout
        initial={{ opacity: 0, y: 20, ...positionStyles }}
        animate={{
          opacity: 1,
          y: 0,
          top: positionStyles.top,
          left: positionStyles.left,
          x: positionStyles.x,
        }}
        transition={{
          layout: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
          opacity: { duration: 0.5 },
          y: { duration: 0.5 },
        }}
        style={{
          position: 'fixed',
          transform: `translate(${positionStyles.x}, ${positionStyles.y})`,
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <motion.button
              key={item.id}
              className={`nav-icon-btn ${isActive ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              aria-label={item.label}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
              <span className="nav-tooltip">{item.label}</span>
            </motion.button>
          );
        })}
      </motion.nav>
    </AnimatePresence>
  );
};

export default Navbar;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#research' },
  { label: 'Goals', href: '#goals' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Detect when section is in the middle of viewport
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(`#${entry.target.id}`);
        }
      });
    }, options);

    // Observe all sections
    const sectionIds = ['hero', ...navLinks.map((l) => l.href.replace('#', ''))];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNav = (href) => {
    setActive(href);
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        background: scrolled ? 'rgba(5,10,18,0.92)' : 'transparent',
        borderBottom: scrolled ? '1px solid #1e3a5f' : '1px solid transparent',
        padding: '0 8%',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{
            fontFamily: 'Oxanium, sans-serif',
            fontSize: 20,
            fontWeight: 800,
            background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            cursor: 'pointer',
            letterSpacing: 2,
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          JSV
        </motion.div>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}
          className="nav-desktop">
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
              whileHover={{ color: '#00d4ff' }}
              style={{
                color: active === link.href ? '#00d4ff' : '#94a3b8',
                textDecoration: 'none',
                fontSize: 13,
                fontFamily: 'Oxanium, sans-serif',
                fontWeight: 500,
                letterSpacing: 0.5,
                transition: 'color 0.2s',
              }}
            >
              {link.label}
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNav('#contact'); }}
            whileHover={{ scale: 1.05 }}
            style={{
              background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
              color: '#fff',
              padding: '7px 20px',
              borderRadius: 6,
              fontSize: 12,
              fontFamily: 'Oxanium, sans-serif',
              fontWeight: 600,
              textDecoration: 'none',
              letterSpacing: 0.5,
            }}
          >
            Hire Me
          </motion.a>
        </div>

        {/* Hamburger for mobile */}
        <div
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ cursor: 'pointer', display: 'none', flexDirection: 'column', gap: 5 }}
          className="nav-mobile"
        >
          {[0,1,2].map(i => (
            <div key={i} style={{
              width: 24, height: 2,
              background: menuOpen ? '#00d4ff' : '#94a3b8',
              borderRadius: 2,
              transition: 'all 0.3s',
              transform: menuOpen
                ? i === 0 ? 'rotate(45deg) translateY(7px)' : i === 2 ? 'rotate(-45deg) translateY(-7px)' : 'opacity: 0'
                : 'none',
            }} />
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'rgba(5,10,18,0.97)',
            borderTop: '1px solid #1e3a5f',
            padding: '20px 0',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
              style={{
                color: '#94a3b8',
                textDecoration: 'none',
                padding: '10px 20px',
                fontFamily: 'Oxanium, sans-serif',
                fontSize: 14,
              }}
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;

import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => (
  <footer style={{
    background: '#060e1c',
    borderTop: '1px solid #1e3a5f',
    padding: '40px 8%',
    textAlign: 'center',
    position: 'relative', zIndex: 1,
  }}>
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div style={{
        fontFamily: 'Oxanium, sans-serif',
        fontSize: 22, fontWeight: 800,
        background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: 8,
      }}>JSV</div>

      <p style={{ fontSize: 13, color: '#4b6282', marginBottom: 20 }}>
        Jaya Sri Vardhan Samgoju · Machine Learning Enthusiast · Aspiring Data Scientist
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 24 }}>
        {['About', 'Skills', 'Projects', 'Research', 'Contact'].map(link => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            onClick={(e) => { e.preventDefault(); document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' }); }}
            style={{ color: '#4b6282', textDecoration: 'none', fontSize: 12, fontFamily: 'Oxanium, sans-serif', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#00d4ff'}
            onMouseLeave={e => e.target.style.color = '#4b6282'}
          >
            {link}
          </a>
        ))}
      </div>

      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #1e3a5f, transparent)', marginBottom: 20 }} />

      <p style={{ fontSize: 12, color: '#4b6282', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
        Designed & built with
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#ef4444" stroke="none">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        by <span style={{ color: '#00d4ff' }}>Jaya Sri Vardhan Samgoju</span> · © 2025 All rights reserved.
      </p>
    </motion.div>
  </footer>
);

export default Footer;

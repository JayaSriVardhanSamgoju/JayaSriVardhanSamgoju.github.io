import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';

const Footer = () => (
  <footer style={{
    background: 'var(--bg-primary)',
    borderTop: '1px solid var(--border-subtle)',
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
        fontFamily: 'var(--font-heading)',
        fontSize: 22, fontWeight: 700,
        background: 'linear-gradient(135deg, var(--accent), #7c3aed)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: 8,
      }}>JSV</div>

      <p style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 20, fontFamily: 'var(--font-body)' }}>
        {personalInfo.name} · Machine Learning Enthusiast · Aspiring Data Scientist
      </p>

      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--border-accent), transparent)', marginBottom: 20 }} />

      <p style={{ fontSize: 12, color: 'var(--text-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontFamily: 'var(--font-body)' }}>
        Designed & built with
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#ef4444" stroke="none">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        by <span style={{ color: 'var(--accent)' }}>{personalInfo.name}</span> · © {new Date().getFullYear()} All rights reserved.
      </p>
    </motion.div>
  </footer>
);

export default Footer;

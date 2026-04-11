import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/* ── SVG ICONS ── */
const CategoryIcons = {
  ml: (color) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  ),
  security: (color) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  nlp: (color) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  dl: (color) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
    </svg>
  ),
  webapp: (color) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  cv: (color) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
};

const GithubSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.472-4.041-1.472-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const ExternalLinkSvg = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const projects = [
  {
    id: 1, num: '01',
    title: 'Student Performance Prediction',
    category: 'MACHINE LEARNING',
    iconKey: 'ml',
    description: 'ML model predicting student academic performance using historical data. Implements multiple classification algorithms with comprehensive model evaluation and feature engineering.',
    tech: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Matplotlib'],
    accent: '#00d4ff',
    github: '#',
    demo: '#',
  },
  {
    id: 2, num: '02',
    title: 'Phishing URL Detection',
    category: 'CYBERSECURITY · ML',
    iconKey: 'security',
    description: 'Machine learning model detecting phishing websites based on URL characteristics. Feature extraction from URL patterns with high accuracy binary classification.',
    tech: ['Python', 'Machine Learning', 'Feature Engineering', 'Scikit-Learn'],
    accent: '#ec4899',
    github: '#',
    demo: '#',
  },
  {
    id: 3, num: '03',
    title: 'Movie Review Sentiment Analysis',
    category: 'NLP · DEEP LEARNING',
    iconKey: 'nlp',
    description: 'Sentiment classification model using Recurrent Neural Networks to determine positive or negative movie reviews. Trained on IMDB dataset with preprocessing pipeline.',
    tech: ['Python', 'RNN', 'NLP', 'Keras', 'TensorFlow'],
    accent: '#f59e0b',
    github: '#',
    demo: '#',
  },
  {
    id: 4, num: '04',
    title: 'Next Word Prediction (LSTM)',
    category: 'DEEP LEARNING · NLP',
    iconKey: 'dl',
    description: 'Deep learning model predicting the next word in a sentence using LSTM neural networks. Trained on text corpora with sequence modeling and embedding layers.',
    tech: ['Python', 'LSTM', 'Keras', 'Deep Learning', 'Word Embeddings'],
    accent: '#7c3aed',
    github: '#',
    demo: '#',
  },
  {
    id: 5, num: '05',
    title: 'Disease Prediction Web App',
    category: 'ML · WEB APPLICATION',
    iconKey: 'webapp',
    description: 'ML-powered web application predicting diseases based on symptoms and recommending nearby hospitals. Interactive UI built with Streamlit.',
    tech: ['Python', 'Streamlit', 'Machine Learning', 'Scikit-Learn', 'Pandas'],
    accent: '#10b981',
    github: '#',
    demo: '#',
  },
  {
    id: 6, num: '06',
    title: 'CNN Image Classification Suite',
    category: 'COMPUTER VISION',
    iconKey: 'cv',
    description: 'Three CNN-based classifiers — Garbage Classification, Plant Disease Detection, and Skin Disease Detection — using transfer learning and custom architectures.',
    tech: ['CNN', 'TensorFlow', 'Keras', 'Deep Learning', 'Transfer Learning'],
    accent: '#6366f1',
    github: '#',
    demo: '#',
  },
];

const ProjectCard = ({ project, index, inView }) => {
  const [expanded, setExpanded] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setExpanded(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setExpanded(!expanded)}
      style={{
        background: '#0d1e38',
        border: '1px solid #1e3a5f',
        borderRadius: 18,
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex', flexDirection: 'column',
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease-out, border-color 0.3s, box-shadow 0.3s',
        boxShadow: expanded
          ? `0 25px 60px rgba(0,0,0,0.5), 0 0 40px ${project.accent}15, inset 0 0 30px ${project.accent}05`
          : '0 4px 20px rgba(0,0,0,0.3)',
        borderColor: expanded ? project.accent + '55' : '#1e3a5f',
        position: 'relative',
      }}
    >
      {/* Top accent bar */}
      <div style={{
        height: 3,
        background: `linear-gradient(90deg, ${project.accent}, ${project.accent}44, transparent)`,
      }} />

      <div style={{ padding: '24px 24px 0' }}>
        {/* Category with SVG icon */}
        <div style={{
          fontSize: 10, color: project.accent,
          letterSpacing: 2, fontFamily: 'Oxanium, sans-serif',
          fontWeight: 600, marginBottom: 12,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          {CategoryIcons[project.iconKey](project.accent)}
          {project.num} — {project.category}
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'Oxanium, sans-serif',
          fontSize: 18, fontWeight: 700,
          color: '#fff', marginBottom: 12, lineHeight: 1.3,
        }}>
          {project.title}
        </h3>
      </div>

      {/* Description */}
      <p style={{
        color: '#94a3b8', fontSize: 13, lineHeight: 1.7,
        padding: '0 24px 16px', flex: 1,
      }}>
        {project.description}
      </p>

      {/* Tech stack */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 6,
        padding: '0 24px 16px',
      }}>
        {project.tech.map((t, i) => (
          <span key={i} style={{
            background: `${project.accent}12`,
            border: `1px solid ${project.accent}25`,
            borderRadius: 5, padding: '3px 9px',
            fontSize: 11, color: project.accent + 'cc',
            fontFamily: 'Oxanium, sans-serif',
          }}>
            {t}
          </span>
        ))}
      </div>

      {/* Expandable action buttons */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              display: 'flex', gap: 12,
              padding: '0 24px 22px',
              borderTop: `1px solid ${project.accent}20`,
              paddingTop: 16,
            }}>
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: '0 4px 15px rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 8, padding: '10px 20px',
                  color: '#e2e8f0', fontSize: 13,
                  fontFamily: 'Oxanium, sans-serif', fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  flex: 1, justifyContent: 'center',
                }}
              >
                <GithubSvg /> View Code
              </motion.a>
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: `0 4px 15px ${project.accent}33` }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: `linear-gradient(135deg, ${project.accent}, ${project.accent}aa)`,
                  border: 'none',
                  borderRadius: 8, padding: '10px 20px',
                  color: '#fff', fontSize: 13,
                  fontFamily: 'Oxanium, sans-serif', fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  flex: 1, justifyContent: 'center',
                }}
              >
                <ExternalLinkSvg /> Live Demo
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click hint */}
      <div style={{
        textAlign: 'center',
        padding: expanded ? '0' : '0 0 14px',
        fontSize: 10,
        color: '#4b6282',
        fontFamily: 'Oxanium, sans-serif',
        letterSpacing: 1,
        transition: 'opacity 0.3s',
        opacity: expanded ? 0 : 0.7,
      }}>
        {expanded ? '' : 'CLICK TO EXPLORE'}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="projects" className="section section-alt" ref={ref}>
      <div className="section-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-tag"
        >WORK SHOWCASE</motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }} className="section-title"
        >Projects</motion.h2>
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }} className="section-subtitle"
        >Real-world AI solutions built from scratch
        </motion.p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: 28,
      }}>
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
};

export default Projects;

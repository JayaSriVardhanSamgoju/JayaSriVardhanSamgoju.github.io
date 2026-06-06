import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const interests = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    title: 'Machine Learning Systems',
    description: 'Scalable ML architectures, AutoML, hyperparameter optimization, and production deployment strategies.',
    color: '#00d4ff',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    title: 'Deep Learning Architectures',
    description: 'Transformer models, GANs, attention mechanisms, and novel neural network designs.',
    color: '#7c3aed',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: 'Natural Language Processing',
    description: 'Language understanding, text generation, semantic search, and large language model fine-tuning.',
    color: '#ec4899',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    title: 'Computer Vision Applications',
    description: 'Object detection, image segmentation, medical imaging AI, and real-time visual recognition systems.',
    color: '#10b981',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    title: 'AI for Smart Cities',
    description: 'AI-driven solutions for urban infrastructure, traffic optimization, energy management, and public safety.',
    color: '#f59e0b',
  },
];

const Research = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="research" className="section" ref={ref} style={{ background: 'var(--bg-primary)' }}>
      <div className="section-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-tag"
        >ACADEMIC INTERESTS</motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }} className="section-title"
        >Research Interests</motion.h2>
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }} className="section-subtitle"
        >Areas I'm passionate about exploring and contributing to
        </motion.p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 20,
      }}>
        {interests.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{
              y: -6,
              borderColor: item.color + '55',
              boxShadow: `0 0 25px ${item.color}18`,
            }}
            style={{
              background: '#0d1e38',
              border: '1px solid #1e3a5f',
              borderRadius: 16,
              padding: 28,
              textAlign: 'center',
              transition: 'all 0.3s ease',
              cursor: 'default',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Bottom glow */}
            <div style={{
              position: 'absolute',
              bottom: 0, left: '50%',
              transform: 'translateX(-50%)',
              width: '60%', height: 1,
              background: `linear-gradient(90deg, transparent, ${item.color}44, transparent)`,
            }} />

            <div style={{ marginBottom: 14, display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
            <h3 style={{
              fontFamily: 'Oxanium, sans-serif',
              fontSize: 14, fontWeight: 700,
              color: '#fff', marginBottom: 10,
            }}>{item.title}</h3>
            <p style={{
              fontSize: 12, color: '#94a3b8',
              lineHeight: 1.65,
            }}>{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Research;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const projects = [
  {
    id: 1, num: '01',
    title: 'Student Performance Prediction',
    category: 'MACHINE LEARNING',
    description: 'ML model predicting student academic performance using historical data. Implements multiple classification algorithms with comprehensive model evaluation and feature engineering.',
    tech: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Matplotlib'],
    accent: '#00d4ff',
    icon: '📊',
  },
  {
    id: 2, num: '02',
    title: 'Phishing URL Detection',
    category: 'CYBERSECURITY · ML',
    description: 'Machine learning model detecting phishing websites based on URL characteristics. Feature extraction from URL patterns with high accuracy binary classification.',
    tech: ['Python', 'Machine Learning', 'Feature Engineering', 'Scikit-Learn'],
    accent: '#ec4899',
    icon: '🔐',
  },
  {
    id: 3, num: '03',
    title: 'Movie Review Sentiment Analysis',
    category: 'NLP · DEEP LEARNING',
    description: 'Sentiment classification model using Recurrent Neural Networks to determine positive or negative movie reviews. Trained on IMDB dataset with preprocessing pipeline.',
    tech: ['Python', 'RNN', 'NLP', 'Keras', 'TensorFlow'],
    accent: '#f59e0b',
    icon: '🎬',
  },
  {
    id: 4, num: '04',
    title: 'Next Word Prediction (LSTM)',
    category: 'DEEP LEARNING · NLP',
    description: 'Deep learning model predicting the next word in a sentence using LSTM neural networks. Trained on text corpora with sequence modeling and embedding layers.',
    tech: ['Python', 'LSTM', 'Keras', 'Deep Learning', 'Word Embeddings'],
    accent: '#7c3aed',
    icon: '🔮',
  },
  {
    id: 5, num: '05',
    title: 'Disease Prediction Web App',
    category: 'ML · WEB APPLICATION',
    description: 'ML-powered web application predicting diseases based on symptoms and recommending nearby hospitals. Interactive UI built with Streamlit.',
    tech: ['Python', 'Streamlit', 'Machine Learning', 'Scikit-Learn', 'Pandas'],
    accent: '#10b981',
    icon: '🏥',
  },
  {
    id: 6, num: '06',
    title: 'CNN Image Classification Suite',
    category: 'COMPUTER VISION',
    description: 'Three CNN-based classifiers — Garbage Classification, Plant Disease Detection, and Skin Disease Detection — using transfer learning and custom architectures.',
    tech: ['CNN', 'TensorFlow', 'Keras', 'Deep Learning', 'Transfer Learning'],
    accent: '#6366f1',
    icon: '🖼️',
  },
];

const ProjectCard = ({ project, index, inView }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, delay: index * 0.08 }}
    whileHover={{ y: -8, borderColor: project.accent + '55', boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${project.accent}15` }}
    style={{
      background: '#0d1e38',
      border: '1px solid #1e3a5f',
      borderRadius: 16,
      overflow: 'hidden',
      transition: 'all 0.4s ease',
      cursor: 'default',
      display: 'flex', flexDirection: 'column',
    }}
  >
    {/* Top accent bar */}
    <div style={{
      height: 3,
      background: `linear-gradient(90deg, ${project.accent}, ${project.accent}44, transparent)`,
    }} />

    <div style={{ padding: '22px 22px 0' }}>
      {/* Category */}
      <div style={{
        fontSize: 10, color: project.accent,
        letterSpacing: 2, fontFamily: 'Oxanium, sans-serif',
        fontWeight: 600, marginBottom: 10,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span>{project.icon}</span> {project.num} — {project.category}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'Oxanium, sans-serif',
        fontSize: 17, fontWeight: 700,
        color: '#fff', marginBottom: 12, lineHeight: 1.3,
      }}>
        {project.title}
      </h3>
    </div>

    {/* Description */}
    <p style={{
      color: '#94a3b8', fontSize: 13, lineHeight: 1.7,
      padding: '0 22px 16px', flex: 1,
    }}>
      {project.description}
    </p>

    {/* Tech stack */}
    <div style={{
      display: 'flex', flexWrap: 'wrap', gap: 6,
      padding: '0 22px 22px',
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
  </motion.div>
);

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
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 24,
      }}>
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
};

export default Projects;

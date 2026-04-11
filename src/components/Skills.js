import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skillGroups = [
  {
    title: 'Programming Languages',
    icon: '⌨️',
    color: '#00d4ff',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'Java', level: 70 },
    ],
  },
  {
    title: 'Machine Learning',
    icon: '🤖',
    color: '#7c3aed',
    skills: [
      { name: 'Scikit-Learn', level: 90 },
      { name: 'Classification Models', level: 88 },
      { name: 'Regression Models', level: 85 },
      { name: 'Model Evaluation', level: 87 },
    ],
  },
  {
    title: 'Deep Learning',
    icon: '🧠',
    color: '#10b981',
    skills: [
      { name: 'TensorFlow / Keras', level: 85 },
      { name: 'CNN', level: 82 },
      { name: 'RNN', level: 78 },
      { name: 'LSTM', level: 80 },
    ],
  },
  {
    title: 'Natural Language Processing',
    icon: '💬',
    color: '#ec4899',
    tags: ['Text Preprocessing', 'Sentiment Analysis', 'Text Classification', 'Language Modeling', 'Tokenization'],
  },
  {
    title: 'Computer Vision',
    icon: '👁️',
    color: '#f59e0b',
    tags: ['Image Classification', 'CNN Architectures', 'Object Detection', 'Transfer Learning'],
  },
  {
    title: 'Tools & Platforms',
    icon: '🛠️',
    color: '#6366f1',
    tags: ['Git', 'GitHub', 'Streamlit', 'Google Colab', 'Jupyter Notebook', 'VS Code'],
  },
];

const SkillBar = ({ name, level, color, inView }) => (
  <div style={{ marginBottom: 14 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
      <span style={{ fontSize: 12, color: '#94a3b8', fontFamily: 'Oxanium, sans-serif' }}>{name}</span>
      <span style={{ fontSize: 11, color: '#4b6282', fontFamily: 'Oxanium, sans-serif' }}>{level}%</span>
    </div>
    <div style={{ height: 4, background: 'rgba(255,255,255,0.04)', borderRadius: 2, overflow: 'hidden' }}>
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: `${level}%` } : { width: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        style={{
          height: '100%',
          borderRadius: 2,
          background: `linear-gradient(90deg, ${color}, ${color}99)`,
        }}
      />
    </div>
  </div>
);

const Skills = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="section section-alt" ref={ref}>
      <div className="section-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-tag"
        >TECHNICAL EXPERTISE</motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }} className="section-title"
        >Skills & Technologies</motion.h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 24,
      }}>
        {skillGroups.map((group, gi) => (
          <motion.div
            key={gi}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: gi * 0.1 }}
            whileHover={{ borderColor: group.color + '44', boxShadow: `0 0 20px ${group.color}18` }}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid #1e3a5f',
              borderRadius: 16,
              padding: '24px',
              transition: 'all 0.3s ease',
            }}
          >
            {/* Group header */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              marginBottom: 20,
              paddingBottom: 14,
              borderBottom: '1px solid #1e3a5f',
            }}>
              <span style={{ fontSize: 18 }}>{group.icon}</span>
              <span style={{
                fontFamily: 'Oxanium, sans-serif',
                fontSize: 13, fontWeight: 700,
                color: group.color, letterSpacing: 0.5,
              }}>{group.title}</span>
            </div>

            {/* Bars or tags */}
            {group.skills ? (
              group.skills.map((skill, si) => (
                <SkillBar key={si} {...skill} color={group.color} inView={inView} />
              ))
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {group.tags.map((tag, ti) => (
                  <motion.span
                    key={ti}
                    whileHover={{ scale: 1.05 }}
                    style={{
                      background: `${group.color}12`,
                      border: `1px solid ${group.color}28`,
                      borderRadius: 6,
                      padding: '5px 11px',
                      fontSize: 11,
                      color: group.color + 'cc',
                      fontFamily: 'Oxanium, sans-serif',
                      cursor: 'default',
                      transition: 'all 0.2s',
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const educationData = [
  {
    degree: 'Bachelor of Technology — Computer Science Engineering',
    institution: 'Rajiv Gandhi University of Knowledge and Technologies (RGUKT), Ongole',
    period: '2022 – Present',
    cgpa: '9.1 / 10.0',
    highlight: true,
    description: 'Specializing in Artificial Intelligence, Machine Learning, and Data Science. Active participant in research projects and technical competitions.',
    icon: '🎓',
  },
  {
    degree: 'Pre-University Course',
    institution: 'RGUKT',
    period: '2020 – 2022',
    cgpa: '9.2 / 10.0',
    highlight: false,
    description: 'Strong foundation in Mathematics, Physics, Chemistry, and Computer Science.',
    icon: '📚',
  },
  {
    degree: 'Secondary Education — Class X',
    institution: 'Jawahar Navodaya Vidyalaya, Maddirala',
    period: 'Completed',
    cgpa: null,
    highlight: false,
    description: 'A central government residential school with focus on academic excellence and holistic development.',
    icon: '🏫',
  },
];

const Education = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="education" className="section" ref={ref} style={{ background: 'var(--bg-primary)' }}>
      <div className="section-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }} className="section-tag"
        >ACADEMIC BACKGROUND</motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }} className="section-title"
        >Education</motion.h2>
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }} className="section-subtitle"
        >Academic journey and achievements</motion.p>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative', paddingLeft: 36 }}>
        {/* Timeline line */}
        <motion.div
          initial={{ height: 0 }} animate={inView ? { height: '100%' } : {}}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          style={{
            position: 'absolute', left: 10, top: 0, bottom: 0,
            width: 2,
            background: 'linear-gradient(180deg, #00d4ff, #7c3aed, rgba(124,58,237,0))',
          }}
        />

        {educationData.map((edu, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
            style={{ position: 'relative', marginBottom: i < educationData.length - 1 ? 32 : 0 }}
          >
            {/* Dot */}
            <div style={{
              position: 'absolute', left: -32, top: 24,
              width: 16, height: 16, borderRadius: '50%',
              background: edu.highlight ? '#00d4ff' : '#1e3a5f',
              border: `2px solid ${edu.highlight ? '#00d4ff' : '#2d5a8f'}`,
              boxShadow: edu.highlight ? '0 0 12px rgba(0,212,255,0.6)' : 'none',
              zIndex: 2,
            }} />

            {/* Card */}
            <motion.div
              whileHover={{ x: 6, borderColor: '#00d4ff', boxShadow: '0 0 25px rgba(0,212,255,0.1)' }}
              style={{
                background: 'var(--bg-card)',
                border: `1px solid ${edu.highlight ? 'rgba(0,212,255,0.3)' : '#1e3a5f'}`,
                borderRadius: 16,
                padding: '24px 28px',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {edu.highlight && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  height: 3,
                  background: 'linear-gradient(90deg, #00d4ff, #7c3aed)',
                }} />
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 20 }}>{edu.icon}</span>
                    <h3 style={{
                      fontFamily: 'Oxanium, sans-serif',
                      fontSize: 16, fontWeight: 700, color: '#fff',
                    }}>{edu.degree}</h3>
                  </div>
                  <div style={{
                    color: '#00d4ff', fontSize: 13, marginBottom: 8,
                    fontFamily: 'Oxanium, sans-serif',
                  }}>{edu.institution}</div>
                  <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>
                    {edu.description}
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                  <div style={{
                    background: 'rgba(0,212,255,0.08)',
                    border: '1px solid rgba(0,212,255,0.15)',
                    borderRadius: 6, padding: '3px 10px',
                    fontSize: 11, color: '#4b6282',
                    fontFamily: 'Oxanium, sans-serif',
                  }}>{edu.period}</div>
                  {edu.cgpa && (
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 5,
                      background: 'rgba(16,185,129,0.1)',
                      border: '1px solid rgba(16,185,129,0.25)',
                      borderRadius: 20, padding: '4px 12px',
                      fontSize: 12, color: '#10b981',
                      fontFamily: 'Oxanium, sans-serif', fontWeight: 600,
                    }}>
                      ★ CGPA: {edu.cgpa}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Education;

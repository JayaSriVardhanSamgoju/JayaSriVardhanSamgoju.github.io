import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const goals = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
      </svg>
    ),
    label: 'SHORT TERM',
    title: 'Master Advanced ML',
    description: 'Master advanced Machine Learning and Deep Learning architectures including Transformers, GANs, and reinforcement learning.',
    color: '#00d4ff',
    items: ['Transformer architectures', 'Generative AI', 'MLOps basics', 'Research publications'],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
      </svg>
    ),
    label: 'MID TERM',
    title: 'Scalable AI Systems',
    description: 'Build scalable AI systems and advanced NLP applications for production environments with real impact.',
    color: '#7c3aed',
    items: ['Production ML pipelines', 'Advanced NLP apps', 'Open source contributions', 'Industry internships'],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    label: 'LONG TERM',
    title: 'Professional Data Scientist',
    description: 'Become a professional Data Scientist developing impactful AI-driven solutions that make a real-world difference.',
    color: '#10b981',
    items: ['Lead AI research', 'Mentor others', 'Build AI products', 'Global impact projects'],
  },
];

const Goals = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="goals" className="section section-alt" ref={ref}>
      <div className="section-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-tag"
        >FUTURE ROADMAP</motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }} className="section-title"
        >Future Goals</motion.h2>
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }} className="section-subtitle"
        >A roadmap for the journey ahead
        </motion.p>
      </div>

      {/* Connector line (desktop) */}
      <div style={{ position: 'relative' }}>
        <div className="goals-connector" style={{
          position: 'absolute',
          top: 60, left: '16%', right: '16%',
          height: 2,
          background: 'linear-gradient(90deg, #00d4ff, #7c3aed, #10b981)',
          zIndex: 0,
        }} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 32,
          position: 'relative', zIndex: 1,
        }}>
          {goals.map((goal, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              style={{ textAlign: 'center' }}
            >
              {/* Icon circle */}
              <motion.div
                whileHover={{ scale: 1.1, boxShadow: `0 0 30px ${goal.color}55` }}
                style={{
                  width: 80, height: 80, borderRadius: '50%',
                  background: '#0d1e38',
                  border: `2px solid ${goal.color}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                  position: 'relative', zIndex: 2,
                  transition: 'all 0.3s ease',
                  boxShadow: `0 0 20px ${goal.color}22`,
                }}
              >
                {goal.icon}
              </motion.div>

              <div style={{
                fontSize: 10, color: goal.color,
                letterSpacing: 2, fontFamily: 'Oxanium, sans-serif',
                fontWeight: 700, marginBottom: 8,
              }}>{goal.label}</div>

              <h3 style={{
                fontFamily: 'Oxanium, sans-serif',
                fontSize: 17, fontWeight: 800,
                color: '#fff', marginBottom: 12,
              }}>{goal.title}</h3>

              <p style={{
                fontSize: 13, color: '#94a3b8',
                lineHeight: 1.7, marginBottom: 20,
                maxWidth: 280, margin: '0 auto 20px',
              }}>{goal.description}</p>

              {/* Checklist */}
              <div style={{
                background: '#0d1e38',
                border: `1px solid ${goal.color}25`,
                borderRadius: 12,
                padding: '16px 20px',
                textAlign: 'left',
              }}>
                {goal.items.map((item, ii) => (
                  <div key={ii} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    fontSize: 12, color: '#94a3b8',
                    fontFamily: 'Oxanium, sans-serif',
                    padding: '4px 0',
                  }}>
                    <div style={{
                      width: 5, height: 5, borderRadius: '50%',
                      background: goal.color, flexShrink: 0,
                    }} />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .goals-connector { display: none; }
        }
      `}</style>
    </section>
  );
};

export default Goals;

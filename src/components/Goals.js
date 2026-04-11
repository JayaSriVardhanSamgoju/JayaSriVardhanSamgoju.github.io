import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const goals = [
  {
    icon: '🎯',
    label: 'SHORT TERM',
    title: 'Master Advanced ML',
    description: 'Master advanced Machine Learning and Deep Learning architectures including Transformers, GANs, and reinforcement learning.',
    color: '#00d4ff',
    items: ['Transformer architectures', 'Generative AI', 'MLOps basics', 'Research publications'],
  },
  {
    icon: '🚀',
    label: 'MID TERM',
    title: 'Scalable AI Systems',
    description: 'Build scalable AI systems and advanced NLP applications for production environments with real impact.',
    color: '#7c3aed',
    items: ['Production ML pipelines', 'Advanced NLP apps', 'Open source contributions', 'Industry internships'],
  },
  {
    icon: '⭐',
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
        <div style={{
          position: 'absolute',
          top: 60, left: '16%', right: '16%',
          height: 2,
          background: 'linear-gradient(90deg, #00d4ff, #7c3aed, #10b981)',
          zIndex: 0,
          display: window.innerWidth > 768 ? 'block' : 'none',
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
                  fontSize: 28,
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
    </section>
  );
};

export default Goals;

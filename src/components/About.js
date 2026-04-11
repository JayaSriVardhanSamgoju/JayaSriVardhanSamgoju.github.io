import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const focusTags = [
  'Machine Learning', 'Deep Learning', 'Natural Language Processing',
  'Computer Vision', 'AI Applications', 'Data Science',
];

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section id="about" className="section section-alt" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Header */}
        <div className="section-header">
          <motion.div variants={itemVariants} className="section-tag">WHO I AM</motion.div>
          <motion.h2 variants={itemVariants} className="section-title">About Me</motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle">
            Passionate about building intelligent systems that make a difference
          </motion.p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.6fr)',
          gap: '64px',
          alignItems: 'center',
        }}>
          {/* Visual side */}
          <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: 300, height: 300 }}>
              {/* Orbit rings */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                width: 280, height: 280, borderRadius: '50%',
                border: '1px solid rgba(0,212,255,0.12)',
                transform: 'translate(-50%,-50%)',
                animation: 'spin-slow 25s linear infinite',
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: '50%',
                  width: 8, height: 8, borderRadius: '50%',
                  background: '#00d4ff',
                  transform: 'translate(-50%,-50%)',
                  boxShadow: '0 0 10px #00d4ff',
                }} />
              </div>
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                width: 340, height: 340, borderRadius: '50%',
                border: '1px solid rgba(124,58,237,0.1)',
                transform: 'translate(-50%,-50%)',
                animation: 'spin-slow 35s linear reverse infinite',
              }}>
                <div style={{
                  position: 'absolute', bottom: 0, right: '20%',
                  width: 8, height: 8, borderRadius: '50%',
                  background: '#7c3aed',
                  transform: 'translate(50%,50%)',
                  boxShadow: '0 0 10px #7c3aed',
                }} />
              </div>

              {/* Avatar Photo */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                width: 200, height: 200, borderRadius: '50%',
                background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                padding: 3,
                boxShadow: '0 0 30px rgba(0,212,255,0.2)',
                overflow: 'hidden',
              }}>
                <div style={{
                  width: '100%', height: '100%', borderRadius: '50%',
                  overflow: 'hidden',
                  background: '#0a1628',
                  position: 'relative',
                }}>
                  <img 
                    src="/profile_placeholder.png" 
                    alt="Profile" 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'contrast(1.1) brightness(0.9)',
                    }}
                  />
                  {/* Overlay for tech feel */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(rgba(0,212,255,0.1), transparent)',
                    pointerEvents: 'none'
                  }} />
                </div>
              </div>

              {/* Floating badges */}
              {[
                { label: '🤖 AI Dev', top: '5%', right: '-10%', delay: 0 },
                { label: '📊 Data Science', bottom: '10%', left: '-15%', delay: 0.5 },
                { label: '🧠 Deep Learning', top: '45%', right: '-20%', delay: 1 },
              ].map((badge, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3 + i, repeat: Infinity, delay: badge.delay }}
                  style={{
                    position: 'absolute',
                    top: badge.top, bottom: badge.bottom,
                    left: badge.left, right: badge.right,
                    background: 'rgba(13,30,56,0.9)',
                    border: '1px solid #1e3a5f',
                    borderRadius: 8,
                    padding: '6px 12px',
                    fontSize: 11, color: '#94a3b8',
                    whiteSpace: 'nowrap',
                    fontFamily: 'Oxanium, sans-serif',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  {badge.label}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div variants={itemVariants}>
            <h3 style={{
              fontFamily: 'Oxanium, sans-serif',
              fontSize: 26, fontWeight: 800,
              background: 'linear-gradient(135deg, #fff, #00d4ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: 18,
            }}>
              Building Intelligent Systems<br />for Tomorrow's Challenges
            </h3>

            <p style={{ color: '#94a3b8', lineHeight: 1.85, marginBottom: 16, fontSize: 15 }}>
              I am a third-year Computer Science Engineering student at Rajiv Gandhi University of
              Knowledge and Technologies, Ongole. Deeply passionate about Artificial Intelligence,
              Machine Learning, and Data Science.
            </p>

            <p style={{ color: '#94a3b8', lineHeight: 1.85, marginBottom: 24, fontSize: 15 }}>
              My goal is to become a professional Data Scientist capable of designing intelligent
              systems that help people solve complex problems. I enjoy transforming data into
              meaningful insights and building real-world AI solutions with measurable impact.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {focusTags.map(tag => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.05, borderColor: '#00d4ff' }}
                  className="tag"
                  style={{ cursor: 'default', transition: 'all 0.2s' }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <style>{`
        @keyframes spin-slow {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to { transform: translate(-50%,-50%) rotate(360deg); }
        }
        @media (max-width: 768px) {
          #about .section > div > div[style*="grid"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default About;

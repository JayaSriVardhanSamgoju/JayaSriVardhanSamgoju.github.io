import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  const highlights = [
    { label: 'Age', value: '21' },
    { label: 'Location', value: 'Ongole, India' },
    { label: 'Focus', value: 'AI / ML / DS' },
  ];

  const services = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2dd4a0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      title: 'ML Development',
      desc: 'Building custom ML models and pipelines for classification, regression, and clustering.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2dd4a0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
      title: 'Data Analysis',
      desc: 'Transforming raw data into actionable insights with statistical methods and visualization.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2dd4a0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
      title: 'NLP Solutions',
      desc: 'Text preprocessing, sentiment analysis, language modeling, and text generation systems.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2dd4a0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      title: 'Computer Vision',
      desc: 'Image classification, object detection, and visual recognition using CNNs and transfer learning.',
    },
  ];

  const socialLinks = [
    {
      href: 'https://github.com/jsvardhan',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.472-4.041-1.472-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
    },
    {
      href: 'https://linkedin.com/in/jsvardhan',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
    },
    {
      href: 'mailto:srivardhansamgoju@gmail.com',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
  ];

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
        </div>

        {/* Split Layout inspired by reference */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          gap: 0,
          maxWidth: 1100,
          margin: '0 auto',
          borderRadius: 20,
          overflow: 'hidden',
          border: '1px solid rgba(45,212,160,0.15)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
        }}>
          {/* LEFT — Photo Panel */}
          <motion.div
            variants={itemVariants}
            style={{
              background: 'linear-gradient(180deg, #0a0f18 0%, #0d1520 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '48px 32px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Subtle gradient overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, transparent 40%, rgba(45,212,160,0.03) 100%)',
              pointerEvents: 'none',
            }} />

            {/* Photo */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
              style={{
                width: 220, height: 280,
                borderRadius: 16,
                overflow: 'hidden',
                border: '2px solid rgba(45,212,160,0.2)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.6), 0 0 40px rgba(45,212,160,0.08)',
                marginBottom: 28,
                position: 'relative',
              }}
            >
              <img
                src="/profile.jpg"
                alt="Jaya Sri Vardhan Samgoju"
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                }}
              />
              {/* Bottom gradient overlay for blending */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: '40%',
                background: 'linear-gradient(transparent, rgba(10,15,24,0.7))',
                pointerEvents: 'none',
              }} />
            </motion.div>

            {/* Name */}
            <h3 style={{
              fontFamily: 'Oxanium, sans-serif',
              fontSize: 22, fontWeight: 800,
              color: '#fff',
              marginBottom: 6,
              textAlign: 'center',
              position: 'relative', zIndex: 1,
            }}>
              Jaya Sri Vardhan
            </h3>
            <div style={{
              color: '#2dd4a0',
              fontSize: 13,
              fontFamily: 'Oxanium, sans-serif',
              fontWeight: 600,
              letterSpacing: 1.5,
              marginBottom: 20,
              position: 'relative', zIndex: 1,
            }}>
              AI / ML Developer
            </div>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: 14, position: 'relative', zIndex: 1 }}>
              {socialLinks.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, color: '#2dd4a0' }}
                  style={{
                    color: '#64748b',
                    width: 36, height: 36,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.3s',
                  }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Content Panel */}
          <motion.div
            variants={itemVariants}
            style={{
              background: 'linear-gradient(180deg, #111827 0%, #0f172a 100%)',
              padding: '48px 40px',
            }}
          >
            <h2 style={{
              fontFamily: 'Oxanium, sans-serif',
              fontSize: 32, fontWeight: 800,
              color: '#fff',
              marginBottom: 20,
            }}>
              about <span style={{ color: '#2dd4a0' }}>me</span>
            </h2>

            {/* Highlights row */}
            <div style={{
              display: 'flex', gap: 24,
              marginBottom: 20,
              fontSize: 13, color: '#94a3b8',
              fontFamily: 'Oxanium, sans-serif',
            }}>
              {highlights.map((h, i) => (
                <span key={i}>
                  <span style={{ color: '#2dd4a0', fontWeight: 600 }}>{h.value}</span>
                  {i < highlights.length - 1 && <span style={{ margin: '0 0 0 24px', color: '#334155' }}>/</span>}
                </span>
              ))}
            </div>

            {/* Bio */}
            <p style={{ color: '#94a3b8', lineHeight: 1.85, marginBottom: 14, fontSize: 14 }}>
              I am a third-year Computer Science Engineering student at Rajiv Gandhi University of
              Knowledge and Technologies, Ongole. Deeply passionate about Artificial Intelligence,
              Machine Learning, and Data Science.
            </p>
            <p style={{ color: '#94a3b8', lineHeight: 1.85, marginBottom: 28, fontSize: 14 }}>
              My goal is to become a professional Data Scientist capable of designing intelligent
              systems that help people solve complex problems. I enjoy transforming data into
              meaningful insights and building real-world AI solutions with measurable impact.
            </p>

            {/* My Services */}
            <h3 style={{
              fontFamily: 'Oxanium, sans-serif',
              fontSize: 22, fontWeight: 800,
              color: '#fff',
              marginBottom: 24,
            }}>
              my <span style={{ color: '#2dd4a0' }}>services</span>
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 20,
            }}>
              {services.map((svc, i) => (
                <motion.div
                  key={i}
                  whileHover={{
                    y: -4,
                    borderColor: 'rgba(45,212,160,0.3)',
                    boxShadow: '0 8px 25px rgba(45,212,160,0.08)',
                  }}
                  style={{
                    padding: '18px',
                    borderRadius: 12,
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                  }}
                >
                  <div style={{ marginBottom: 10 }}>{svc.icon}</div>
                  <h4 style={{
                    fontFamily: 'Oxanium, sans-serif',
                    fontSize: 14, fontWeight: 700,
                    color: '#fff', marginBottom: 6,
                  }}>{svc.title}</h4>
                  <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.6 }}>
                    {svc.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          #about [style*="grid-template-columns: 1fr 1.5fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default About;

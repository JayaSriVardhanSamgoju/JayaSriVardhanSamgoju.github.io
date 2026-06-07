/** EducationSection — AI/ML Portfolio · Alternating center-spine timeline · Framer Motion scroll animations */
import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation, useMotionValue, animate, useTransform } from 'framer-motion';

const educationData = [
  {
    id: 'btech',
    side: 'left',
    icon: '🎓',
    accentColor: 'cyan',
    degree: 'B.Tech — Computer Science Engineering',
    institution: 'Rajiv Gandhi University of Knowledge Technologies, Ongole',
    period: '2022 – 2026',
    stage: '3rd Year',
    cgpa: 9.1,
    highlights: [
      'Strong foundation in AI/ML and Software Engineering',
      'Multiple deployed Machine Learning & Deep Learning projects',
      'Consistent top academic performance (9.1 CGPA)'
    ],
    coursework: ['DSA','Machine Learning','Deep Learning','NLP','DBMS','Operating Systems','Computer Networks','OOP','System Design']
  },
  {
    id: 'puc',
    side: 'right',
    icon: '⚛️',
    accentColor: 'indigo',
    degree: 'Pre-University Course (PUC)',
    institution: 'RGUKT Pre-University, Ongole',
    period: '2020 – 2022',
    stage: null,
    cgpa: 9.2,
    highlights: [
      'Mastered Mathematics, Physics & Chemistry fundamentals',
      'Early exposure to Programming Foundations'
    ],
    coursework: []
  },
  {
    id: 'class10',
    side: 'left',
    icon: '📚',
    accentColor: 'emerald',
    degree: 'Secondary Education — Class X',
    institution: 'Jawahar Navodaya Vidyalaya, Maddirala',
    period: 'Until 2020',
    stage: null,
    cgpa: null,
    highlights: [
      'Strong academic foundation at a premier national residential school',
      'Selected via Navodaya entrance — highly competitive national exam'
    ],
    coursework: []
  }
];

const accentMap = {
  cyan: {
    border: 'rgba(100, 255, 218, 0.2)',
    borderHover: 'rgba(100, 255, 218, 0.5)',
    topBar: 'linear-gradient(90deg, transparent, #64ffda, transparent)',
    dotBorder: '#64ffda',
    dotGlow: 'rgba(100, 255, 218, 0.4)',
    cgpaText: '#64ffda',
    cgpaBg: 'rgba(100, 255, 218, 0.08)',
    pill: '#64ffda',
    hiBullet: '#64ffda',
    tagText: '#64ffda',
    tagBg: 'rgba(100, 255, 218, 0.06)',
  },
  indigo: {
    border: 'rgba(124, 58, 237, 0.2)',
    borderHover: 'rgba(124, 58, 237, 0.5)',
    topBar: 'linear-gradient(90deg, transparent, #7c3aed, transparent)',
    dotBorder: '#7c3aed',
    dotGlow: 'rgba(124, 58, 237, 0.4)',
    cgpaText: '#7c3aed',
    cgpaBg: 'rgba(124, 58, 237, 0.08)',
    pill: '#7c3aed',
    hiBullet: '#7c3aed',
    tagText: '#7c3aed',
    tagBg: 'rgba(124, 58, 237, 0.06)',
  },
  emerald: {
    border: 'rgba(16, 185, 129, 0.2)',
    borderHover: 'rgba(16, 185, 129, 0.5)',
    topBar: 'linear-gradient(90deg, transparent, #10b981, transparent)',
    dotBorder: '#10b981',
    dotGlow: 'rgba(16, 185, 129, 0.4)',
    cgpaText: '#10b981',
    cgpaBg: 'rgba(16, 185, 129, 0.08)',
    pill: '#10b981',
    hiBullet: '#10b981',
    tagText: '#10b981',
    tagBg: 'rgba(16, 185, 129, 0.06)',
  }
};

const EduCard = ({ item, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const variants = prefersReduced ? { hidden: {}, visible: {} } : {
    hidden: { opacity: 0, x: isMobile ? (item.side === 'left' ? -40 : 40) : (item.side === 'left' ? -60 : 60), y: 20 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.12 } }
  };

  const motionValue = useMotionValue(0);
  const cgpaDisplay = useTransform(motionValue, v => v.toFixed(1));

  useEffect(() => {
    if (inView && item.cgpa !== null && !prefersReduced) {
      animate(motionValue, item.cgpa, { duration: 1.4, ease: 'easeOut' });
    } else if (prefersReduced && item.cgpa !== null) {
      motionValue.set(item.cgpa);
    }
  }, [inView, item.cgpa, motionValue, prefersReduced]);

  const accent = accentMap[item.accentColor];
  const isLeft = item.side === 'left';

  return (
    <div ref={ref} className={`edu-row ${isLeft ? 'edu-left' : 'edu-right'}`}>
      
      {/* Spacer for desktop layout */}
      {!isMobile && <div className="edu-spacer"></div>}

      {/* Center Dot */}
      <div className="edu-dot-container">
        {/* Pulsing ring */}
        {!prefersReduced && !isMobile && (
          <motion.div
            className="edu-pulse-ring"
            style={{ border: `2px solid ${accent.dotBorder}` }}
            animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
          />
        )}
        
        <motion.div
          className="edu-dot"
          style={{ borderColor: accent.dotBorder }}
          whileInView={prefersReduced ? {} : { scale: [0, 1.2, 1], opacity: [0, 1, 1] }}
          transition={{ duration: 0.5, delay: index * 0.12 }}
          whileHover={prefersReduced ? {} : { scale: 1.15 }}
        >
          <span>{item.icon}</span>
        </motion.div>
      </div>

      {/* Horizontal Connector Line (Desktop Only) */}
      {!isMobile && (
        <motion.div 
          className={`edu-connector ${isLeft ? 'connector-left' : 'connector-right'}`}
          style={{ backgroundColor: accent.dotBorder, transformOrigin: isLeft ? 'right' : 'left' }}
          whileInView={prefersReduced ? {} : { scaleX: [0, 1] }}
          transition={{ duration: 0.5, delay: index * 0.12 }}
        />
      )}

      {/* Card Content */}
      <div className={`edu-card-wrapper ${isLeft ? 'wrapper-left' : 'wrapper-right'}`}>
        <motion.div
          className="edu-card"
          variants={variants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          whileHover={prefersReduced ? {} : { y: -5 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            borderColor: isHovered ? accent.borderHover : accent.border,
          }}
        >
          {/* Top Accent Bar */}
          <div 
            className="edu-top-bar" 
            style={{ background: accent.topBar, opacity: isHovered ? 1 : 0 }} 
          />
          
          {/* Shimmer Overlay */}
          {!prefersReduced && <div className="edu-shimmer" />}

          {/* Header */}
          <div className="edu-card-header">
            <div className="edu-card-titles">
              <h3>{item.degree}</h3>
              <h4>{item.institution}</h4>
            </div>
            {item.cgpa !== null && (
              <div className="edu-cgpa-badge" style={{ backgroundColor: accent.cgpaBg, color: accent.cgpaText, border: `1px solid ${accent.borderHover}` }}>
                <span>CGPA: </span>
                <motion.span>{cgpaDisplay}</motion.span>
              </div>
            )}
          </div>

          <div className="edu-period" style={{ color: accent.pill }}>{item.period} {item.stage && `• ${item.stage}`}</div>

          {/* Highlights */}
          <div className="edu-highlights">
            {item.highlights.map((hl, i) => (
              <div key={i} className="edu-highlight-item">
                <div className="edu-bullet" style={{ backgroundColor: accent.hiBullet }} />
                <p>{hl}</p>
              </div>
            ))}
          </div>

          {/* Coursework Tags */}
          {item.coursework.length > 0 && (
            <div className="edu-coursework">
              <span className="edu-coursework-label">Coursework:</span>
              <div className="edu-tags">
                {item.coursework.map((course, i) => (
                  <motion.span 
                    key={i} 
                    className="edu-tag"
                    style={{ backgroundColor: accent.tagBg, color: accent.tagText, border: `1px solid ${accent.borderHover}` }}
                    whileInView={prefersReduced ? {} : { opacity: [0, 1], y: [10, 0] }}
                    transition={{ delay: 0.2 + (i * 0.04) }}
                  >
                    {course}
                  </motion.span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const EducationSection = () => {
  const sectionRef = useRef(null);
  const spineRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !spineRef.current || isMobile) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const vh = window.innerHeight;
      
      // Calculate how far we've scrolled into the section
      const scrolledPast = vh * 0.8 - rect.top;
      const totalScrollable = sectionHeight;
      
      let progress = scrolledPast / totalScrollable;
      progress = Math.max(0, Math.min(1, progress));
      
      spineRef.current.style.height = `${progress * 100}%`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  useEffect(() => {
    // Inject custom fonts & animations
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      .edu-section {
        position: relative;
        width: 100%;
        background: var(--bg-primary, #080808);
        padding: 100px 20px;
        color: #fff;
        overflow: hidden;
      }
      .edu-grid-texture {
        position: absolute;
        inset: 0;
        background-image: linear-gradient(rgba(100,255,218,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(100,255,218,0.03) 1px, transparent 1px);
        background-size: 48px 48px;
        pointer-events: none;
      }
      .edu-orb-1, .edu-orb-2 {
        position: absolute;
        border-radius: 50%;
        filter: blur(80px);
        pointer-events: none;
        opacity: 0.15;
      }
      .edu-orb-1 { width: 400px; height: 400px; background: #64ffda; top: -100px; left: -100px; }
      .edu-orb-2 { width: 500px; height: 500px; background: #7c3aed; bottom: -100px; right: -100px; }
      
      .edu-container {
        max-width: 1000px;
        margin: 0 auto;
        position: relative;
      }
      
      /* Spine Styles */
      .edu-spine-track {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 0;
        bottom: 0;
        width: 2px;
        background: rgba(255,255,255,0.05);
        border-radius: 2px;
        overflow: hidden;
        z-index: 1;
      }
      .edu-spine-fill {
        width: 100%;
        background: linear-gradient(to bottom, #64ffda, #7c3aed, #10b981);
        transition: height 0.1s ease-out;
      }
      .edu-spine-shimmer {
        position: absolute;
        inset: 0;
        background: linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%);
        background-size: 100% 60px;
        animation: scanAnim 2.5s ease-in-out infinite;
      }

      /* Row Layout */
      .edu-row {
        display: flex;
        align-items: flex-start;
        position: relative;
        margin-bottom: 4rem;
        width: 100%;
      }
      .edu-left { flex-direction: row-reverse; }
      .edu-right { flex-direction: row; }
      
      .edu-spacer {
        width: calc(50% - 36px);
      }
      
      .edu-dot-container {
        width: 72px;
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        z-index: 10;
        position: relative;
      }
      .edu-dot {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: #0d1320;
        border: 2px solid;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        z-index: 2;
        box-shadow: 0 4px 15px rgba(0,0,0,0.4);
      }
      .edu-pulse-ring {
        position: absolute;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        z-index: 1;
      }

      .edu-connector {
        position: absolute;
        top: 24px;
        width: 2rem;
        height: 1px;
        z-index: 0;
      }
      .connector-left { right: calc(50% + 10px); }
      .connector-right { left: calc(50% + 10px); }

      .edu-card-wrapper {
        width: calc(50% - 36px);
        display: flex;
        flex-direction: column;
      }
      .wrapper-left { items-align: flex-end; text-align: right; }
      .wrapper-right { items-align: flex-start; text-align: left; }
      
      .wrapper-left .edu-card { align-self: flex-end; text-align: left; }

      .edu-card {
        position: relative;
        overflow: hidden;
        border-radius: 16px;
        border: 1px solid;
        background: rgba(13, 19, 32, 0.7);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        padding: 24px;
        transition: border-color 0.3s ease;
        width: 100%;
        max-width: 450px;
      }

      .edu-top-bar {
        position: absolute;
        top: 0; left: 0; right: 0; height: 2px;
        transition: opacity 0.3s ease;
      }
      .edu-shimmer {
        position: absolute;
        inset: 0;
        background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.03) 50%, transparent 70%);
        animation: shimmerAnim 5s ease-in-out infinite;
        pointer-events: none;
      }

      .edu-card-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 12px;
        gap: 16px;
      }
      .edu-card-titles h3 {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1.1rem;
        font-weight: 700;
        margin: 0 0 6px 0;
      }
      .edu-card-titles h4 {
        font-family: 'Inter', sans-serif;
        font-size: 0.9rem;
        color: #8892b0;
        font-weight: 400;
        margin: 0;
      }
      
      .edu-cgpa-badge {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.8rem;
        padding: 4px 10px;
        border-radius: 20px;
        font-weight: 600;
        white-space: nowrap;
      }

      .edu-period {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.8rem;
        margin-bottom: 16px;
      }

      .edu-highlights {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 16px;
      }
      .edu-highlight-item {
        display: flex;
        align-items: flex-start;
        gap: 10px;
      }
      .edu-bullet {
        width: 5px; height: 5px;
        border-radius: 50%;
        margin-top: 8px;
        flex-shrink: 0;
      }
      .edu-highlight-item p {
        font-size: 0.9rem;
        color: #a8b2d1;
        margin: 0;
        line-height: 1.5;
      }

      .edu-coursework {
        margin-top: 20px;
      }
      .edu-coursework-label {
        display: block;
        font-size: 0.85rem;
        color: #8892b0;
        margin-bottom: 8px;
      }
      .edu-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .edu-tag {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.75rem;
        padding: 4px 10px;
        border-radius: 6px;
      }

      @keyframes shimmerAnim {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      @keyframes scanAnim {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100%); }
      }

      /* Mobile Overrides */
      @media (max-width: 768px) {
        .edu-spine-track { display: none; }
        .edu-row { flex-direction: column; align-items: center; margin-bottom: 3rem; gap: 16px; }
        .edu-spacer { display: none; }
        .edu-connector { display: none; }
        .edu-dot-container { width: auto; margin-bottom: -10px; }
        .edu-card-wrapper { width: 100%; align-items: center; }
        .edu-card { max-width: 100%; }
        .wrapper-left .edu-card { align-self: center; }
      }
    `;
    document.head.appendChild(styleTag);

    return () => {
      document.head.removeChild(fontLink);
      document.head.removeChild(styleTag);
    };
  }, []);

  return (
    <section id="education" ref={sectionRef} className="edu-section">
      <div className="edu-grid-texture" />
      <div className="edu-orb-1" />
      <div className="edu-orb-2" />

      <div className="section-header" style={{ position: 'relative', zIndex: 5, textAlign: 'center', marginBottom: '60px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }} className="section-tag"
        >
          ACADEMIC BACKGROUND
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="section-title"
          style={{ display: 'inline-block' }}
        >
          Education
        </motion.h2>
      </div>

      <div className="edu-container">
        {!isMobile && (
          <div className="edu-spine-track">
            <div ref={spineRef} className="edu-spine-fill" style={{ height: '0%' }}>
              <div className="edu-spine-shimmer" />
            </div>
          </div>
        )}

        {educationData.map((item, index) => (
          <EduCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
};

export default EducationSection;

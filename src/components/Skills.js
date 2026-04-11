import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/* ── SVG ICON COMPONENTS ── */
const PythonIcon = () => (
  <svg viewBox="0 0 128 128" width="36" height="36">
    <linearGradient id="py-a" x1="70.252" x2="170.659" y1="1237.476" y2="1151.089" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#5a9fd4"/><stop offset="1" stopColor="#306998"/></linearGradient>
    <linearGradient id="py-b" x1="209.474" x2="173.62" y1="1098.811" y2="1149.537" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#ffd43b"/><stop offset="1" stopColor="#ffe873"/></linearGradient>
    <path fill="url(#py-a)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137h-33.961c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491v-11.282c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548v-23.513c0-6.693-5.646-11.72-12.346-12.836-4.244-.706-8.645-1.027-12.866-1.008zm-13.354 7.569c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z"/>
    <path fill="url(#py-b)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655h-24.665c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412h-24.664v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zm-13.872 59.547c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z"/>
  </svg>
);

const JavaIcon = () => (
  <svg viewBox="0 0 128 128" width="36" height="36">
    <path fill="#0074BD" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"/>
    <path fill="#EA2D2E" d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.793 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z"/>
    <path fill="#0074BD" d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.952-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zm40.697 22.747c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z"/>
    <path fill="#EA2D2E" d="M76.491 1.587s12.968 12.976-12.303 32.923c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815 8.548-12.834 32.229-19.059 26.998-39.667z"/>
  </svg>
);

const TensorFlowIcon = () => (
  <svg viewBox="0 0 128 128" width="36" height="36">
    <path fill="#FF6F00" d="M64 2.5L17.4 28.7v52.3L64 107.2l46.6-26.2V28.7L64 2.5zm0 10.4l37 20.8v6.5L64 61.2 27 40.2v-6.5l37-20.8z"/>
    <path fill="#FF6F00" d="M64 12.9L27 33.7v41.6L64 96.1l37-20.8V33.7L64 12.9zM37.3 69.2V41l26.7 15v28.2L37.3 69.2zm53.4 0L64 84.2V56l26.7-15v28.2z"/>
  </svg>
);

const ScikitIcon = () => (
  <svg viewBox="0 0 128 128" width="36" height="36">
    <path fill="#F7931E" d="M64 10c-29.8 0-54 24.2-54 54s24.2 54 54 54 54-24.2 54-54-24.2-54-54-54zm0 96c-23.2 0-42-18.8-42-42s18.8-42 42-42 42 18.8 42 42-18.8 42-42 42z"/>
    <path fill="#29ABE2" d="M64 28c-19.9 0-36 16.1-36 36s16.1 36 36 36 36-16.1 36-36-16.1-36-36-36zm0 60c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24z"/>
    <circle cx="64" cy="64" r="12" fill="#F7931E"/>
  </svg>
);

const KerasIcon = () => (
  <svg viewBox="0 0 128 128" width="36" height="36">
    <path fill="#D00000" d="M21.5 10v108h17V78.5l9.7-10L72 118h21.3L61.8 61.3 91.5 28H71L38.5 63.4V10z"/>
  </svg>
);

const PandasIcon = () => (
  <svg viewBox="0 0 128 128" width="36" height="36">
    <rect fill="#130754" x="38" y="10" width="14" height="35" rx="2"/>
    <rect fill="#130754" x="38" y="52" width="14" height="35" rx="2"/>
    <rect fill="#130754" x="76" y="25" width="14" height="35" rx="2"/>
    <rect fill="#130754" x="76" y="67" width="14" height="35" rx="2"/>
    <rect fill="#E70488" x="57" y="35" width="14" height="58" rx="2"/>
    <rect fill="#130754" x="38" y="93" width="14" height="25" rx="2"/>
    <rect fill="#130754" x="76" y="10" width="14" height="10" rx="2"/>
  </svg>
);

const NumPyIcon = () => (
  <svg viewBox="0 0 128 128" width="36" height="36">
    <path fill="#4DABCF" d="M63.5 2L14 28v64l49.5 26L114 92V28L63.5 2zm0 12L100 38v48L63.5 110 27 86V38L63.5 14z"/>
    <path fill="#4D77CF" d="M63.5 14L27 38v48l36.5 24L100 86V38L63.5 14zM50 48l14 8v32l-14-8V48zm28 0v32l-14 8V56l14-8z"/>
  </svg>
);

const GitIcon = () => (
  <svg viewBox="0 0 128 128" width="36" height="36">
    <path fill="#F34F29" d="M124.737 58.378L69.621 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.68 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.461 6.607 2.294 9.993l13.992 13.993c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 01-13.683 0 9.677 9.677 0 01-2.105-10.521L68.574 47.933l-.002 34.341a9.708 9.708 0 012.559 1.828c3.778 3.777 3.778 9.898 0 13.683-3.779 3.777-9.904 3.777-13.679 0-3.778-3.784-3.778-9.905 0-13.683a9.65 9.65 0 013.167-2.11V47.333a9.581 9.581 0 01-3.167-2.111c-2.862-2.86-3.551-7.06-2.083-10.576L41.056 20.333 3.264 58.123a8.133 8.133 0 000 11.5l55.117 55.114c3.174 3.174 8.32 3.174 11.499 0l54.858-54.858a8.135 8.135 0 00-.001-11.501z"/>
  </svg>
);

const VSCodeIcon = () => (
  <svg viewBox="0 0 128 128" width="36" height="36">
    <path fill="#0065A9" d="M96 10.3l-28.8 27L38 14.2 10 26.1v76.4l28 12 29.2-23.2L96 118.3l22-12.5V22.8L96 10.3zM38 86.4V42.2l28 22.1L38 86.4zM96 97L75 75.3 96 52V97z"/>
  </svg>
);

const JupyterIcon = () => (
  <svg viewBox="0 0 128 128" width="36" height="36">
    <circle cx="64" cy="14" r="8" fill="#F37726"/>
    <circle cx="20" cy="108" r="6" fill="#989898"/>
    <circle cx="108" cy="108" r="6" fill="#F37726"/>
    <path fill="#4E4E4E" d="M64 30c-24 0-44 14.3-50 34h100c-6-19.7-26-34-50-34zM64 98c24 0 44-14.3 50-34H14c6 19.7 26 34 50 34z"/>
  </svg>
);

const StreamlitIcon = () => (
  <svg viewBox="0 0 128 128" width="36" height="36">
    <path fill="#FF4B4B" d="M64 10L14 45l50 30 50-30L64 10zM14 55l50 30 50-30M14 70l50 30 50-30"/>
    <path fill="#7D353B" d="M14 55l50 30 50-30"/>
    <path fill="#BD4043" d="M14 70l50 30 50-30"/>
  </svg>
);

const MatplotlibIcon = () => (
  <svg viewBox="0 0 128 128" width="36" height="36">
    <circle cx="64" cy="64" r="50" fill="none" stroke="#11557C" strokeWidth="6"/>
    <path fill="#11557C" d="M64 22a42 42 0 0142 42H64V22z"/>
    <path fill="#E8D44D" d="M64 22v42h42a42 42 0 01-12.3 29.7L64 64z" opacity=".8"/>
    <path fill="#9B59B6" d="M93.7 93.7A42 42 0 0164 106V64z" opacity=".8"/>
    <path fill="#E74C3C" d="M64 106a42 42 0 01-42-42h42z" opacity=".8"/>
  </svg>
);

const OpenCVIcon = () => (
  <svg viewBox="0 0 128 128" width="36" height="36">
    <circle cx="40" cy="46" r="20" fill="none" stroke="#FF0000" strokeWidth="8"/>
    <circle cx="88" cy="46" r="20" fill="none" stroke="#008000" strokeWidth="8"/>
    <circle cx="64" cy="88" r="20" fill="none" stroke="#0000FF" strokeWidth="8"/>
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" width="36" height="36" fill="#e2e8f0">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.472-4.041-1.472-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const ColabIcon = () => (
  <svg viewBox="0 0 128 128" width="36" height="36">
    <path fill="#E8710A" d="M64 20c-24.3 0-44 19.7-44 44s19.7 44 44 44 44-19.7 44-44-19.7-44-44-44zm-8 66c-12.1 0-22-9.9-22-22s9.9-22 22-22 22 9.9 22 22-9.9 22-22 22z"/>
    <path fill="#F9AB00" d="M72 42c12.1 0 22 9.9 22 22s-9.9 22-22 22"/>
  </svg>
);

const skillCategories = [
  {
    title: 'Programming',
    color: '#00d4ff',
    skills: [
      { name: 'Python', Icon: PythonIcon, level: 95 },
      { name: 'Java', Icon: JavaIcon, level: 70 },
    ],
  },
  {
    title: 'ML / DL Frameworks',
    color: '#7c3aed',
    skills: [
      { name: 'TensorFlow', Icon: TensorFlowIcon, level: 85 },
      { name: 'Keras', Icon: KerasIcon, level: 85 },
      { name: 'Scikit-Learn', Icon: ScikitIcon, level: 90 },
    ],
  },
  {
    title: 'Data Science',
    color: '#10b981',
    skills: [
      { name: 'Pandas', Icon: PandasIcon, level: 88 },
      { name: 'NumPy', Icon: NumPyIcon, level: 88 },
      { name: 'Matplotlib', Icon: MatplotlibIcon, level: 82 },
      { name: 'OpenCV', Icon: OpenCVIcon, level: 78 },
    ],
  },
  {
    title: 'Tools & Platforms',
    color: '#f59e0b',
    skills: [
      { name: 'Git', Icon: GitIcon, level: 85 },
      { name: 'GitHub', Icon: GitHubIcon, level: 88 },
      { name: 'VS Code', Icon: VSCodeIcon, level: 90 },
      { name: 'Jupyter', Icon: JupyterIcon, level: 88 },
      { name: 'Streamlit', Icon: StreamlitIcon, level: 82 },
      { name: 'Colab', Icon: ColabIcon, level: 85 },
    ],
  },
];

const SkillCard = ({ skill, color, index, inView }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        padding: '18px 10px',
        borderRadius: 14,
        background: hovered ? `${color}0a` : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? color + '40' : 'rgba(255,255,255,0.06)'}`,
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'default',
        transform: hovered ? 'translateY(-6px) scale(1.05)' : 'translateY(0) scale(1)',
        boxShadow: hovered ? `0 12px 30px ${color}18` : 'none',
        position: 'relative',
        overflow: 'hidden',
        minWidth: 85,
      }}
    >
      {/* Glow effect */}
      {hovered && (
        <div style={{
          position: 'absolute',
          top: '-50%', left: '-50%',
          width: '200%', height: '200%',
          background: `radial-gradient(circle at center, ${color}08 0%, transparent 60%)`,
          pointerEvents: 'none',
        }} />
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>
        <skill.Icon />
      </div>
      <span style={{
        fontSize: 11,
        fontFamily: 'Oxanium, sans-serif',
        fontWeight: 600,
        color: hovered ? color : '#94a3b8',
        transition: 'color 0.3s',
        textAlign: 'center',
        position: 'relative', zIndex: 1,
      }}>
        {skill.name}
      </span>

      {/* Progress bar */}
      <div style={{
        width: '80%', height: 3,
        background: 'rgba(255,255,255,0.06)',
        borderRadius: 2, overflow: 'hidden',
        position: 'relative', zIndex: 1,
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 + index * 0.06 }}
          style={{
            height: '100%', borderRadius: 2,
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
          }}
        />
      </div>
    </motion.div>
  );
};

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
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 28,
        maxWidth: 1100,
        margin: '0 auto',
      }}>
        {skillCategories.map((cat, ci) => (
          <motion.div
            key={ci}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: ci * 0.12 }}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid #1e3a5f',
              borderRadius: 18,
              padding: '28px 24px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Top accent */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 3,
              background: `linear-gradient(90deg, ${cat.color}, ${cat.color}44, transparent)`,
            }} />

            {/* Category title */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              marginBottom: 22, paddingBottom: 14,
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: cat.color,
                boxShadow: `0 0 10px ${cat.color}66`,
              }} />
              <span style={{
                fontFamily: 'Oxanium, sans-serif',
                fontSize: 14, fontWeight: 700,
                color: cat.color, letterSpacing: 0.5,
              }}>{cat.title}</span>
            </div>

            {/* Skill icons grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(auto-fill, minmax(85px, 1fr))`,
              gap: 10,
            }}>
              {cat.skills.map((skill, si) => (
                <SkillCard
                  key={si}
                  skill={skill}
                  color={cat.color}
                  index={ci * 3 + si}
                  inView={inView}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;

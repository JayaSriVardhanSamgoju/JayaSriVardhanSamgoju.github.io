import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Stars, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Code, Brain, Network, MessageSquare, Database, Image, PenTool, LayoutTemplate, X } from 'lucide-react';

const skillCategories = [
  {
    id: 1,
    title: 'Programming Languages',
    icon: <Code size={24} color="var(--accent)" />,
    skills: ['Python', 'C', 'C++'],
    highlight: ['Python'],
    description: 'Core languages for system design, algorithm development, and low-level optimization.',
    viz: 'spheres'
  },
  {
    id: 2,
    title: 'Machine Learning',
    icon: <Brain size={24} color="var(--accent)" />,
    skills: ['Regression & Classification', 'Feature Engineering', 'Model Evaluation', 'Anomaly Detection'],
    highlight: ['Anomaly Detection'],
    description: 'Developing predictive models and statistical algorithms for complex data analysis.',
    viz: 'bars'
  },
  {
    id: 3,
    title: 'Deep Learning',
    icon: <Network size={24} color="var(--accent)" />,
    skills: ['Artificial Neural Networks (ANN)', 'Convolutional Neural Networks (CNN)', 'Recurrent Neural Networks (RNN)', 'Long Short-Term Memory (LSTM)'],
    highlight: [],
    description: 'Designing deep neural architectures for advanced pattern recognition.',
    viz: 'nodes'
  },
  {
    id: 4,
    title: 'NLP & LLMs',
    icon: <MessageSquare size={24} color="var(--accent)" />,
    skills: ['Transformers', 'Embeddings & Vectors', 'Prompt Engineering', 'Retrieval-Augmented Generation (RAG)', 'Contextual Language Modeling'],
    highlight: ['Retrieval-Augmented Generation (RAG)', 'Transformers'],
    description: 'Building intelligent text processing systems and integrating large language models.',
    viz: 'particles'
  },
  {
    id: 5,
    title: 'Vector Search',
    icon: <Database size={24} color="var(--accent)" />,
    skills: ['FAISS', 'Vector Databases', 'Approximate Nearest Neighbor (ANN)', 'Embedding Indexing'],
    highlight: ['FAISS'],
    description: 'Architecting high-speed similarity search and retrieval systems for unstructured data.',
    viz: 'nodes'
  },
  {
    id: 6,
    title: 'Computer Vision',
    icon: <Image size={24} color="var(--accent)" />,
    skills: ['OpenCV', 'Image Classification', 'Feature Extraction (CNNs)'],
    highlight: [],
    description: 'Extracting meaningful features from images and video streams for real-time analysis.',
    viz: 'bars'
  },
  {
    id: 7,
    title: 'Tools & Frameworks',
    icon: <PenTool size={24} color="var(--accent)" />,
    skills: ['Scikit-learn', 'TensorFlow', 'Keras', 'Pandas', 'NumPy', 'MLflow', 'Streamlit', 'FastAPI', 'Git & GitHub'],
    highlight: ['MLflow', 'FastAPI'],
    description: 'Ecosystem of libraries for experiment tracking, deployment, and data manipulation.',
    viz: 'cloud'
  },
  {
    id: 8,
    title: 'System Design & Engineering',
    icon: <LayoutTemplate size={24} color="var(--accent)" />,
    skills: ['End-to-End ML Pipeline Design', 'Real-Time Streaming (Kafka)', 'Scalable Inference Systems', 'Model Monitoring & Drift Detection', 'Production Deployment & APIs'],
    highlight: ['End-to-End ML Pipeline Design', 'Real-Time Streaming (Kafka)'],
    description: 'Architecting robust, scalable, and production-ready machine learning systems.',
    viz: 'particles'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const Visualizer = ({ type }) => {
  // Renders different SVG animations based on type
  if (type === 'bars') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
        {[0.8, 0.6, 0.9].map((w, i) => (
          <div key={i} style={{ width: '100%', height: '4px', background: 'var(--border-subtle)', borderRadius: '2px', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${w * 100}%` }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: i * 0.2 }}
              style={{ height: '100%', background: 'var(--accent)' }}
            />
          </div>
        ))}
      </div>
    );
  }
  if (type === 'nodes') {
    return (
      <div style={{ position: 'relative', height: '40px', marginTop: '16px' }}>
        <svg width="100%" height="100%" viewBox="0 0 100 40">
          <motion.path d="M10,20 L40,10 L40,30 Z" fill="none" stroke="var(--border-accent)" strokeWidth="1" />
          <motion.path d="M40,10 L80,20 L40,30 Z" fill="none" stroke="var(--border-accent)" strokeWidth="1" />
          {[
            { x: 10, y: 20 }, { x: 40, y: 10 }, { x: 40, y: 30 }, { x: 80, y: 20 }
          ].map((pos, i) => (
            <motion.circle
              key={i}
              cx={pos.x}
              cy={pos.y}
              r="3"
              fill="var(--accent)"
              animate={{ r: [3, 5, 3], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </svg>
      </div>
    );
  }
  if (type === 'particles') {
    return (
      <div style={{ display: 'flex', gap: '4px', marginTop: '16px', flexWrap: 'wrap' }}>
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)' }}
            animate={{ y: [0, -10, 0], opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </div>
    );
  }
  return null;
};

const Skills = () => {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <section className="section-container" id="skills" style={{ position: 'relative' }}>
      {/* Background 3D Particles */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.4, pointerEvents: 'none' }}>
        <Canvas>
          <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
          <ambientLight intensity={0.5} />
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Sphere args={[2, 16, 16]} position={[8, 0, -10]}>
              <MeshDistortMaterial color="#111111" wireframe emissive="#64ffda" emissiveIntensity={0.1} />
            </Sphere>
          </Float>
        </Canvas>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <motion.p className="section-label" variants={cardVariants}>
          03 — Skills & Capabilities
        </motion.p>
        <motion.h2 className="section-title" variants={cardVariants}>
          AI & System Engineering
        </motion.h2>

        <div className="projects-grid" style={{ marginTop: '40px' }}>
          {skillCategories.map((category) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              className="project-card"
              onClick={() => setExpandedId(expandedId === category.id ? null : category.id)}
              style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
              whileHover={{ y: -5 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{ padding: '12px', background: 'var(--accent-dim)', borderRadius: '12px' }}>
                  {category.icon}
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: 'var(--text-primary)' }}>
                  {category.title}
                </h3>
              </div>

              <Visualizer type={category.viz} />

              <div className="skills-cloud" style={{ marginTop: '20px', gap: '8px' }}>
                {category.skills.slice(0, expandedId === category.id ? category.skills.length : 3).map((skill, idx) => {
                  const isHighlight = category.highlight.includes(skill);
                  return (
                    <motion.span
                      key={idx}
                      className="skill-chip"
                      style={{
                        padding: '6px 14px',
                        fontSize: '12px',
                        borderColor: isHighlight ? 'var(--accent)' : 'var(--border-subtle)',
                        boxShadow: isHighlight ? '0 0 10px var(--accent-glow)' : 'none',
                        color: isHighlight ? 'var(--accent)' : 'var(--text-muted)'
                      }}
                    >
                      {skill}
                    </motion.span>
                  );
                })}
                {category.skills.length > 3 && expandedId !== category.id && (
                  <span className="skill-chip" style={{ padding: '6px 14px', fontSize: '12px', opacity: 0.6 }}>
                    +{category.skills.length - 3} more
                  </span>
                )}
              </div>

              <AnimatePresence>
                {expandedId === category.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ overflow: 'hidden', marginTop: '20px' }}
                  >
                    <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                      <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                        {category.description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;

import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere, MeshDistortMaterial } from '@react-three/drei';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const About = ({ onNavigate }) => {
  return (
    <section className="section-container" id="about">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.p className="section-label" variants={itemVariants}>
          01 — About Me
        </motion.p>
        <motion.h2 className="section-title" variants={itemVariants}>
          Architecting Intelligence
        </motion.h2>

        <div className="about-content">
          <motion.div className="about-text" variants={itemVariants}>
            {/* Professional Introduction */}
            <div style={{ marginBottom: '32px' }}>
              <p>
                I am a <strong>Machine Learning Engineer</strong> and an aspiring Data Scientist, specializing in designing scalable AI systems and deploying production-ready models. My work bridges the gap between theoretical machine learning and real-world engineering solutions.
              </p>
              <p style={{ marginTop: '12px' }}>
                Holding a B.Tech in Computer Science Engineering (CGPA: 9.1), I have built a strong foundation in complex algorithms, advanced mathematics, and modern system architectures.
              </p>
            </div>

            {/* Technical Expertise */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', fontSize: '18px', marginBottom: '12px' }}>
                Technical Expertise
              </h3>
              <p>
                My core expertise lies in developing and optimizing <strong style={{ color: 'var(--accent)' }}>Machine Learning pipelines</strong>, designing <strong style={{ color: 'var(--accent)' }}>Deep Learning architectures</strong> (CNNs, RNNs, LSTMs), and building intelligent <strong style={{ color: 'var(--accent)' }}>NLP & LLM-based systems</strong>. I am highly proficient in <strong style={{ color: 'var(--accent)' }}>Vector Search (FAISS)</strong> and Retrieval-Augmented Generation (RAG) systems.
              </p>
            </div>

            {/* Engineering Mindset */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', fontSize: '18px', marginBottom: '12px' }}>
                Engineering Mindset
              </h3>
              <p>
                I approach AI from a production-first mindset. It's not just about training a highly accurate model in a notebook; it's about building scalable, resilient systems with an emphasis on <strong>real-time pipelines, monitoring, and drift detection</strong>. Performance and reliability are paramount.
              </p>
            </div>

            {/* Key Work Highlights */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', fontSize: '18px', marginBottom: '12px' }}>
                Key Highlights
              </h3>
              <ul style={{ listStyleType: 'square', paddingLeft: '20px', color: 'var(--text-muted)', fontSize: '16px', lineHeight: '1.8' }}>
                <li>Engineered a <strong>Real-Time Industrial Equipment Failure Detection System</strong> using robust sensor data streaming.</li>
                <li>Developed <strong>VisionMatch</strong>, a high-performance image similarity and retrieval system.</li>
              </ul>
            </div>

            {/* Career Vision & Philosophy */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', fontSize: '18px', marginBottom: '12px' }}>
                Vision & Philosophy
              </h3>
              <p>
                In the short term, I am focused on mastering advanced LLM architectures and distributed ML systems. Long term, I aim to be a top-tier AI Engineer building large-scale, impactful intelligence systems. I believe in continuous learning, building tangible solutions, and relentlessly pushing the boundaries of AI capabilities.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
              <motion.button 
                onClick={() => onNavigate('projects')} 
                className="hero-cta" 
                style={{ padding: '12px 24px', fontSize: '13px', border: 'none', cursor: 'pointer' }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View Projects
              </motion.button>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="hero-cta" style={{ padding: '12px 24px', fontSize: '13px', background: 'var(--accent-dim)' }}>Download Resume</a>
            </div>
          </motion.div>

          {/* 3D Visual Layout */}
          <motion.div 
            className="about-visual" 
            variants={itemVariants}
            style={{ 
              height: '100%', 
              minHeight: '500px', 
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid var(--border-accent)',
              background: 'radial-gradient(circle at center, var(--accent-dim) 0%, transparent 70%)'
            }}
          >
            <Canvas camera={{ position: [0, 0, 4] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1.5} color="white" />
              <directionalLight position={[-5, 5, -5]} intensity={0.8} color="#64ffda" />
              <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={2} />
              
              {/* Neural Node representation */}
              <Sphere args={[1.2, 64, 64]}>
                <MeshDistortMaterial
                  color="#111111"
                  attach="material"
                  distort={0.4}
                  speed={2}
                  roughness={0.2}
                  metalness={0.8}
                  emissive="#64ffda"
                  emissiveIntensity={0.2}
                  wireframe
                />
              </Sphere>
              <OrbitControls autoRotate autoRotateSpeed={1.5} enableZoom={false} />
            </Canvas>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;

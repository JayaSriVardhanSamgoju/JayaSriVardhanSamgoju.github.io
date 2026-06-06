import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { certificationsData } from '../data/portfolioData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* Slide from left for even, right for odd */
const slideFromLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const slideFromRight = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const CertCard = ({ cert, index, isMobile }) => {
  const isEven = index % 2 === 0;
  const cardVariant = isMobile ? itemVariants : (isEven ? slideFromLeft : slideFromRight);

  const imageSection = (
    <div className="cert-image-wrapper">
      <img
        src={cert.image}
        alt={cert.title}
        className="cert-image"
        loading="lazy"
      />
    </div>
  );

  const contentSection = (
    <div className="cert-content">
      <div className="cert-issuer-badge">
        <Award size={14} />
        <span>{cert.issuer}</span>
      </div>
      <h3 className="cert-title">{cert.title}</h3>
      <p className="cert-description">{cert.description}</p>
    </div>
  );

  return (
    <motion.div
      className="cert-card-borderless"
      variants={cardVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {/* Mobile: image top → content below. Desktop: alternate image/content positions */}
      {isMobile ? (
        <>
          {imageSection}
          {contentSection}
        </>
      ) : isEven ? (
        <>
          {imageSection}
          {contentSection}
        </>
      ) : (
        <>
          {contentSection}
          {imageSection}
        </>
      )}
    </motion.div>
  );
};

const Certifications = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="section-container" id="certifications">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.p className="section-label" variants={itemVariants}>
          04 — Certifications
        </motion.p>
        <motion.h2 className="section-title" variants={itemVariants}>
          Professional Certifications
        </motion.h2>

        <div className="certifications-stack">
          {certificationsData.map((cert, index) => (
            <CertCard
              key={cert.id}
              cert={cert}
              index={index}
              isMobile={isMobile}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Certifications;

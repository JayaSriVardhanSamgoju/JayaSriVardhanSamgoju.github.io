import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { projectsData } from '../data/portfolioData';

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

/* Slide from left for image side on even, content on odd */
const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const slideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const ProjectRow = ({ project, index, isMobile }) => {
  const isEven = index % 2 === 0;

  const imageVariant = isMobile ? fadeUp : (isEven ? slideLeft : slideRight);
  const contentVariant = isMobile ? fadeUp : (isEven ? slideRight : slideLeft);

  const imageBlock = (
    <motion.div
      className="proj-row-image-wrap"
      variants={imageVariant}
    >
      <img
        src={project.image}
        alt={`${project.shortName} preview`}
        className="proj-row-image"
        loading="lazy"
      />
      <div className="proj-row-image-overlay" />
    </motion.div>
  );

  const contentBlock = (
    <motion.div className="proj-row-content" variants={contentVariant}>
      <div className="project-number">{project.num}</div>
      <h3 className="project-name">{project.name}</h3>
      <p className="project-desc">{project.description}</p>

      <div className="project-tags">
        {project.tags.map((tag, i) => (
          <span className="project-tag" key={i}>{tag}</span>
        ))}
      </div>

      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="project-github-btn"
      >
        <GithubIcon size={16} />
        View Source
        <ExternalLink size={14} />
      </a>
    </motion.div>
  );

  return (
    <motion.div
      className={`proj-row ${isEven ? 'proj-row--even' : 'proj-row--odd'}`}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {isMobile ? (
        /* Mobile: always image top, content below */
        <>
          {imageBlock}
          {contentBlock}
        </>
      ) : isEven ? (
        /* Even: image LEFT, content RIGHT */
        <>
          {imageBlock}
          {contentBlock}
        </>
      ) : (
        /* Odd: content LEFT, image RIGHT */
        <>
          {contentBlock}
          {imageBlock}
        </>
      )}
    </motion.div>
  );
};

const Projects = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section className="section-container" id="projects">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.p className="section-label" variants={fadeUp}>
          02 — AI & ML Portfolio
        </motion.p>
        <motion.h2 className="section-title" variants={fadeUp}>
          Featured Projects
        </motion.h2>

        <div className="proj-stack">
          {projectsData.map((project, i) => (
            <ProjectRow
              key={project.id || i}
              project={project}
              index={i}
              isMobile={isMobile}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;

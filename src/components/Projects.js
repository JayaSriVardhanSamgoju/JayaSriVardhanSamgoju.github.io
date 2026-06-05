import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import VanillaTilt from 'vanilla-tilt';

const projectsData = [
  {
    num: '01',
    name: 'Project Alpha',
    desc: 'A full-stack web application built with React and Node.js, featuring real-time data synchronization and an intuitive dashboard interface.',
    tags: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
  },
  {
    num: '02',
    name: 'Project Beta',
    desc: 'An AI-powered analytics platform that processes large datasets and presents insights through interactive visualizations.',
    tags: ['Python', 'TensorFlow', 'D3.js', 'FastAPI'],
  },
  {
    num: '03',
    name: 'Project Gamma',
    desc: 'A mobile-first e-commerce experience with a headless CMS backend and optimized checkout flow.',
    tags: ['Next.js', 'Stripe', 'Sanity', 'Tailwind'],
  },
  {
    num: '04',
    name: 'Project Delta',
    desc: 'A collaborative design tool that enables teams to prototype and share ideas in real-time.',
    tags: ['React', 'WebRTC', 'Canvas API', 'Firebase'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      VanillaTilt.init(cardRef.current, {
        max: 8,
        speed: 400,
        glare: true,
        'max-glare': 0.1,
        scale: 1.02,
      });
    }

    return () => {
      if (cardRef.current && cardRef.current.vanillaTilt) {
        cardRef.current.vanillaTilt.destroy();
      }
    };
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', x + 'px');
    e.currentTarget.style.setProperty('--mouse-y', y + 'px');
  };

  return (
    <motion.div
      className="project-card"
      ref={cardRef}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
    >
      <div className="project-number">{project.num}</div>
      <h3 className="project-name">{project.name}</h3>
      <p className="project-desc">{project.desc}</p>
      <div className="project-tags">
        {project.tags.map((tag, i) => (
          <span className="project-tag" key={i}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section className="section-container" id="projects">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.p className="section-label" variants={cardVariants}>
          02 — Projects
        </motion.p>
        <motion.h2 className="section-title" variants={cardVariants}>
          Selected Work
        </motion.h2>

        <div className="projects-grid">
          {projectsData.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;

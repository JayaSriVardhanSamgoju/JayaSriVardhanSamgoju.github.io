import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { aboutContent } from '../data/portfolioData';

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

/* Animated themed visual that replaces the 3D canvas */
const ThemedVisual = () => {
  const techWords = [
    'Machine Learning', 'Deep Learning', 'NLP', 'Python',
    'TensorFlow', 'FAISS', 'RAG', 'LLMs', 'CNNs', 'LSTMs',
    'FastAPI', 'Kafka', 'MLflow', 'OpenCV', 'Transformers',
    'Neural Networks', 'Data Science', 'System Design',
  ];

  return (
    <div className="about-themed-visual" style={{ marginBottom: '40px' }}>
      {/* Orbiting rings */}
      <div className="about-orbit-container">
        <div className="about-orbit about-orbit-1">
          <div className="about-orbit-dot" />
        </div>
        <div className="about-orbit about-orbit-2">
          <div className="about-orbit-dot" />
        </div>
        <div className="about-orbit about-orbit-3">
          <div className="about-orbit-dot" />
        </div>

        {/* Center icon */}
        <div className="about-center-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
      </div>

      {/* Floating tech words */}
      <div className="about-floating-words">
        {techWords.map((word, i) => (
          <motion.span
            key={i}
            className="about-float-word"
            animate={{
              y: [0, -8, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
            style={{
              animationDelay: `${i * 0.15}s`,
            }}
          >
            {word}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

/* macOS-style Code Window */
const CodeSnippet = () => {
  const codeString = `from langgraph.graph import StateGraph, END
from langchain.agents import AgentExecutor
from typing import TypedDict, Annotated

class AgentState(TypedDict):
    messages: Annotated[list, add_messages]
    context: str

def retrieve_docs(state: AgentState):
    """Hybrid search via FAISS + BM25"""
    return {"context": vector_db.similarity_search(state.messages[-1])}

def llm_synthesize(state: AgentState):
    """Generate response with Claude 3 / Gemini"""
    response = llm.invoke([SystemMessage(content=sys_prompt)] + state.messages)
    return {"messages": [response]}

# Build Multi-Agent RAG Pipeline
workflow = StateGraph(AgentState)
workflow.add_node("retrieve", retrieve_docs)
workflow.add_node("synthesize", llm_synthesize)
workflow.add_edge("retrieve", "synthesize")
workflow.set_entry_point("retrieve")

app = workflow.compile()
print("🚀 Agentic RAG System Online")`;

  return (
    <div className="about-code-window">
      <div className="code-window-header">
        <div className="mac-buttons">
          <span className="mac-btn close"></span>
          <span className="mac-btn minimize"></span>
          <span className="mac-btn maximize"></span>
        </div>
        <div className="code-window-title">agentic_rag.py</div>
      </div>
      <div className="code-window-body">
        <pre>
          <code>
            {codeString.split('\n').map((line, i) => {
              // Basic syntax highlighting simulation
              let className = "code-line";
              if (line.startsWith('from') || line.startsWith('import') || line.includes('def ') || line.includes('class ')) className += " keyword";
              if (line.includes('"""') || line.includes('# ')) className += " comment";
              if (line.includes('"')) className += " string";
              
              return (
                <div key={i} className={className}>
                  <span className="line-number">{i + 1}</span>
                  {line}
                </div>
              );
            })}
          </code>
        </pre>
      </div>
    </div>
  );
};

const About = ({ onNavigate }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section className="section-container" id="about">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.p className="section-label" variants={itemVariants}>
          01 — Professional Overview
        </motion.p>
        <motion.h2 className="section-title" variants={itemVariants}>
          {aboutContent.heading}
        </motion.h2>

        {isMobile ? (
          /* ===== MOBILE ORDER: Animation → About Text → Code ===== */
          <div className="about-content about-content-mobile">
            {/* 1. Animation first */}
            <motion.div 
              className="about-visual-wrapper" 
              variants={itemVariants}
            >
              <ThemedVisual />
            </motion.div>

            {/* 2. About text */}
            <motion.div className="about-text" variants={itemVariants}>
              {aboutContent.paragraphs.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
              <div style={{ display: 'flex', gap: '16px', marginTop: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <motion.button 
                  onClick={() => onNavigate('projects')} 
                  className="hero-cta" 
                  style={{ padding: '12px 24px', fontSize: '13px', border: '1px solid var(--accent)', cursor: 'pointer', background: 'transparent' }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  View Projects
                </motion.button>
                <a 
                  href="/resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hero-cta" 
                  style={{ padding: '12px 24px', fontSize: '13px', background: 'var(--accent-dim)' }}
                >
                  Download Resume
                </a>
              </div>
            </motion.div>

            {/* 3. Code window last */}
            <motion.div 
              className="code-visual-wrapper" 
              style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}
              variants={itemVariants}
            >
              <CodeSnippet />
            </motion.div>
          </div>
        ) : (
          /* ===== DESKTOP: Original two-column layout ===== */
          <div className="about-content">
            <motion.div className="about-text" variants={itemVariants}>
              {aboutContent.paragraphs.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
              <div style={{ display: 'flex', gap: '16px', marginTop: '24px', flexWrap: 'wrap' }}>
                <motion.button 
                  onClick={() => onNavigate('projects')} 
                  className="hero-cta" 
                  style={{ padding: '12px 24px', fontSize: '13px', border: '1px solid var(--accent)', cursor: 'pointer', background: 'transparent' }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  View Projects
                </motion.button>
                <a 
                  href="/resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hero-cta" 
                  style={{ padding: '12px 24px', fontSize: '13px', background: 'var(--accent-dim)' }}
                >
                  Download Resume
                </a>
              </div>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
              <motion.div 
                className="about-visual-wrapper" 
                variants={itemVariants}
              >
                <ThemedVisual />
              </motion.div>
              <motion.div 
                className="code-visual-wrapper" 
                style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}
                variants={itemVariants}
              >
                <CodeSnippet />
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default About;

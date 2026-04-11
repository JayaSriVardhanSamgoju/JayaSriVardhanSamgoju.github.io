import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const contactLinks = [
  {
    icon: '✉️',
    label: 'EMAIL',
    value: 'jsvardhan.samgoju@email.com',
    href: 'mailto:jsvardhan.samgoju@email.com',
    color: '#00d4ff',
  },
  {
    icon: '💼',
    label: 'LINKEDIN',
    value: 'linkedin.com/in/jsvardhan',
    href: 'https://linkedin.com',
    color: '#0a66c2',
  },
  {
    icon: '🐙',
    label: 'GITHUB',
    value: 'github.com/jsvardhan',
    href: 'https://github.com',
    color: '#ffffff',
  },
];

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid #1e3a5f',
  borderRadius: 8,
  padding: '12px 16px',
  color: '#e2e8f0',
  fontSize: 14,
  fontFamily: 'Inter, sans-serif',
  outline: 'none',
  transition: 'border-color 0.2s',
};

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: '', email: '', message: '' });
      }, 4000);
    }
  };

  return (
    <section id="contact" ref={ref} style={{ background: 'var(--bg-primary)', padding: '100px 8%' }}>
      {/* Header */}
      <div className="section-header" style={{ textAlign: 'center', marginBottom: 48 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-tag"
          style={{ justifyContent: 'center' }}
        >LET'S CONNECT</motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }} className="section-title"
        >Contact & Suggestions</motion.h2>
      </div>

      <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 40 }}
        >
          <h3 style={{
            fontFamily: 'Oxanium, sans-serif',
            fontSize: 26, fontWeight: 800,
            color: '#fff', marginBottom: 14,
          }}>Get In Touch</h3>
          <p style={{
            fontSize: 15, color: '#94a3b8',
            lineHeight: 1.8, maxWidth: 600, margin: '0 auto',
          }}>
            I'm always open to new opportunities, research collaborations, and
            conversations about AI, Machine Learning, and Data Science. Feel free to reach out!
          </p>
        </motion.div>

        {/* Suggestion form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            background: 'rgba(13,30,56,0.4)',
            border: '1px solid #1e3a5f',
            borderRadius: 24,
            padding: '40px',
            textAlign: 'left',
            backdropFilter: 'blur(10px)',
            marginBottom: 48,
          }}
        >
          <h3 style={{
            fontFamily: 'Oxanium, sans-serif',
            fontSize: 20, fontWeight: 700,
            color: '#fff', marginBottom: 10,
          }}>Leave a Suggestion</h3>
          <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.7, marginBottom: 28 }}>
            Your feedback helps me improve and grow. Share suggestions regarding my work, projects, or portfolio.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, color: '#4b6282', letterSpacing: 1, fontFamily: 'Oxanium, sans-serif', marginBottom: 8 }}>
                YOUR NAME
              </label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Jane Doe"
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused('')}
                required
                style={{
                  ...inputStyle,
                  borderColor: focused === 'name' ? '#00d4ff' : '#1e3a5f',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, color: '#4b6282', letterSpacing: 1, fontFamily: 'Oxanium, sans-serif', marginBottom: 8 }}>
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com"
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused('')}
                required
                style={{
                  ...inputStyle,
                  borderColor: focused === 'email' ? '#00d4ff' : '#1e3a5f',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, color: '#4b6282', letterSpacing: 1, fontFamily: 'Oxanium, sans-serif', marginBottom: 8 }}>
                MESSAGE / SUGGESTION
              </label>
              <textarea
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder="Share your thoughts, feedback, or suggestions..."
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused('')}
                required
                rows={4}
                style={{
                  ...inputStyle,
                  resize: 'vertical', minHeight: 120,
                  borderColor: focused === 'message' ? '#00d4ff' : '#1e3a5f',
                }}
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ opacity: 0.9, y: -2, boxShadow: '0 10px 20px rgba(0,212,255,0.2)' }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: '100%',
                background: submitted
                  ? 'linear-gradient(135deg, #10b981, #059669)'
                  : 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                color: '#fff', border: 'none',
                padding: '14px', borderRadius: 8,
                fontSize: 14, fontWeight: 700,
                fontFamily: 'Oxanium, sans-serif',
                cursor: 'pointer',
                letterSpacing: 0.5,
                transition: 'background 0.4s ease',
              }}
            >
              {submitted ? '✓ Message Sent Successfully!' : 'Send Message →'}
            </motion.button>
          </form>
        </motion.div>

        {/* Social Symbols at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 32,
            paddingTop: 12,
          }}
        >
          {contactLinks.map((link, i) => (
            <motion.a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.25, 
                color: link.color,
                filter: `drop-shadow(0 0 15px ${link.color}aa)`
              }}
              style={{
                fontSize: 32,
                color: '#4b6282',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title={link.label}
            >
              {link.label === 'EMAIL' ? (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              ) : link.label === 'LINKEDIN' ? (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              ) : (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.472-4.041-1.472-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              )}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

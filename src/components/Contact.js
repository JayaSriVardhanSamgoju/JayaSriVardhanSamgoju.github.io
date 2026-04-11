import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';

/* ── CONFIG ── */
// Replace these with your actual EmailJS credentials:
// 1. Sign up at https://www.emailjs.com/
// 2. Create an Email Service (connect your Gmail: srivardhansamgoju@gmail.com)
// 3. Create an Email Template with variables: {{from_name}}, {{from_email}}, {{message}}
// 4. Get your Public Key from Account > API Keys
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

const contactLinks = [
  {
    label: 'EMAIL',
    value: 'srivardhansamgoju@gmail.com',
    href: 'mailto:srivardhansamgoju@gmail.com',
    color: '#00d4ff',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: 'LINKEDIN',
    value: 'linkedin.com/in/jsvardhan',
    href: 'https://linkedin.com',
    color: '#0a66c2',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
  },
  {
    label: 'GITHUB',
    value: 'github.com/jsvardhan',
    href: 'https://github.com',
    color: '#e2e8f0',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.472-4.041-1.472-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
];

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [focused, setFocused] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus('sending');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_email: 'srivardhansamgoju@gmail.com',
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setForm({ name: '', email: '', message: '' });
      }, 4000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const inputBaseStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid #1e3a5f',
    borderRadius: 10,
    padding: '14px 18px',
    color: '#e2e8f0',
    fontSize: 14,
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const getInputStyle = (field) => ({
    ...inputBaseStyle,
    borderColor: focused === field ? '#00d4ff' : '#1e3a5f',
    boxShadow: focused === field ? '0 0 20px rgba(0,212,255,0.08), inset 0 0 20px rgba(0,212,255,0.03)' : 'none',
    background: focused === field ? 'rgba(0,212,255,0.02)' : 'rgba(255,255,255,0.03)',
  });

  const getButtonStyle = () => {
    if (status === 'success') return 'linear-gradient(135deg, #10b981, #059669)';
    if (status === 'error') return 'linear-gradient(135deg, #ef4444, #dc2626)';
    return 'linear-gradient(135deg, #00d4ff, #7c3aed)';
  };

  const getButtonText = () => {
    if (status === 'sending') return 'Sending...';
    if (status === 'success') return 'Message Sent Successfully!';
    if (status === 'error') return 'Failed — Try Again';
    return 'Send Message';
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

      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 40, textAlign: 'center' }}
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
            padding: '44px 40px',
            textAlign: 'left',
            backdropFilter: 'blur(16px)',
            marginBottom: 48,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative corner glow */}
          <div style={{
            position: 'absolute', top: -60, right: -60,
            width: 200, height: 200,
            background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: -60, left: -60,
            width: 200, height: 200,
            background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
            </svg>
            <h3 style={{
              fontFamily: 'Oxanium, sans-serif',
              fontSize: 20, fontWeight: 700,
              color: '#fff',
            }}>Leave a Suggestion</h3>
          </div>
          <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.7, marginBottom: 28 }}>
            Your feedback helps me improve and grow. Share suggestions regarding my work, projects, or portfolio.
          </p>

          <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div>
              <label style={{
                display: 'block', fontSize: 11, color: focused === 'name' ? '#00d4ff' : '#4b6282',
                letterSpacing: 1, fontFamily: 'Oxanium, sans-serif', marginBottom: 8,
                transition: 'color 0.3s',
                fontWeight: 600,
              }}>
                YOUR NAME
              </label>
              <input
                type="text" name="from_name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Jane Doe"
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused('')}
                required
                style={getInputStyle('name')}
              />
            </div>
            <div>
              <label style={{
                display: 'block', fontSize: 11, color: focused === 'email' ? '#00d4ff' : '#4b6282',
                letterSpacing: 1, fontFamily: 'Oxanium, sans-serif', marginBottom: 8,
                transition: 'color 0.3s',
                fontWeight: 600,
              }}>
                EMAIL ADDRESS
              </label>
              <input
                type="email" name="from_email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com"
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused('')}
                required
                style={getInputStyle('email')}
              />
            </div>
            <div>
              <label style={{
                display: 'block', fontSize: 11, color: focused === 'message' ? '#00d4ff' : '#4b6282',
                letterSpacing: 1, fontFamily: 'Oxanium, sans-serif', marginBottom: 8,
                transition: 'color 0.3s',
                fontWeight: 600,
              }}>
                MESSAGE / SUGGESTION
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder="Share your thoughts, feedback, or suggestions..."
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused('')}
                required
                rows={4}
                style={{
                  ...getInputStyle('message'),
                  resize: 'vertical', minHeight: 130,
                }}
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === 'sending'}
              whileHover={status === 'idle' ? { y: -3, boxShadow: '0 15px 30px rgba(0,212,255,0.2)' } : {}}
              whileTap={status === 'idle' ? { scale: 0.97 } : {}}
              style={{
                width: '100%',
                background: getButtonStyle(),
                color: '#fff', border: 'none',
                padding: '16px', borderRadius: 10,
                fontSize: 14, fontWeight: 700,
                fontFamily: 'Oxanium, sans-serif',
                cursor: status === 'sending' ? 'wait' : 'pointer',
                letterSpacing: 0.5,
                transition: 'all 0.4s ease',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Animated status indicator */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={status}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  {status === 'sending' && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      style={{
                        width: 16, height: 16,
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderTop: '2px solid #fff',
                        borderRadius: '50%',
                      }}
                    />
                  )}
                  {status === 'success' && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                  {status === 'idle' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  )}
                  {getButtonText()}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </form>
        </motion.div>

        {/* Social icons */}
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
              {link.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

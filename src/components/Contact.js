import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, AlertCircle, CheckCircle2, Loader2, MessageSquareText, FileText } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { personalInfo } from '../data/portfolioData';

/* Inline social SVGs */
const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
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

const shakeVariants = {
  shake: { x: [-10, 10, -10, 10, -5, 5, 0], transition: { duration: 0.4 } },
  idle: { x: 0 },
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMsg, setErrorMsg] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const MAX_CHARS = 500;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > MAX_CHARS) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return 'All fields are required.';
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      return 'Please enter a valid email address.';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setErrorMsg(error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('loading');
    try {
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          to_name: 'Jaya Sri Vardhan Samgoju',
          from_email: formData.email,
          to_email: personalInfo.email,
          message: formData.message,
          reply_to: formData.email,
        },
        publicKey
      );

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 6000);
    } catch (err) {
      console.error('EmailJS Error:', err);
      setErrorMsg('Failed to send message. Please try again or email directly.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section className="section-container" id="contact" style={{ position: 'relative' }}>
      <style>{`
        .floating-label-group {
          position: relative;
          margin-bottom: 24px;
        }
        .floating-label {
          position: absolute;
          left: 16px;
          top: 16px;
          color: var(--text-dim);
          pointer-events: none;
          transition: 0.2s ease all;
          font-family: var(--font-body);
          font-size: 15px;
        }
        .contact-input:focus ~ .floating-label,
        .contact-textarea:focus ~ .floating-label,
        .contact-input:not(:placeholder-shown) ~ .floating-label,
        .contact-textarea:not(:placeholder-shown) ~ .floating-label {
          top: -10px;
          left: 12px;
          font-size: 12px;
          color: var(--accent);
          background: var(--bg-surface);
          padding: 0 8px;
        }
        .social-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: rgba(17, 17, 17, 0.6);
          border: 1px solid var(--border-subtle);
          color: var(--text-muted);
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
        }
        .social-icon-btn:hover {
          color: var(--bg-primary);
          background: var(--accent);
          border-color: var(--accent);
          box-shadow: 0 0 20px var(--accent-glow);
          transform: translateY(-4px) scale(1.05);
        }
        .social-tooltip {
          position: absolute;
          bottom: -36px;
          background: var(--bg-surface-2);
          color: var(--text-primary);
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-family: var(--font-mono);
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transform: translateY(-10px);
          transition: all 0.2s ease;
          border: 1px solid var(--border-subtle);
        }
        .social-icon-btn:hover .social-tooltip {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <motion.p className="section-label" variants={itemVariants}>
          05 — Connect
        </motion.p>
        <motion.h2 className="section-title" variants={itemVariants}>
          Get In Touch
        </motion.h2>

        <div className="contact-layout">
          {/* Left Column: Info & Socials */}
          <motion.div className="contact-info" variants={itemVariants}>
            <h3 style={{ fontSize: '28px', marginBottom: '20px' }}>Let's build something extraordinary</h3>
            <p style={{ fontSize: '16px', maxWidth: '400px' }}>
              Have feedback, ideas, or collaboration opportunities? Feel free to reach out — your suggestions help me grow. Whether it's a question about my ML pipelines or a discussion on system design, my inbox is always open!
            </p>

            {/* Resume Button */}
            <motion.a
              href={personalInfo.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-btn"
              whileHover={{ scale: 1.03, boxShadow: '0 0 30px var(--accent-dim)' }}
              whileTap={{ scale: 0.97 }}
            >
              <FileText size={18} />
              View My Resume
            </motion.a>

            <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
              <a href={`mailto:${personalInfo.email}`} className="social-icon-btn">
                <Mail size={22} />
                <span className="social-tooltip">Email Me</span>
              </a>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="social-icon-btn">
                <GithubIcon size={22} />
                <span className="social-tooltip">Visit GitHub</span>
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon-btn">
                <LinkedinIcon size={22} />
                <span className="social-tooltip">Connect on LinkedIn</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Suggestion Box */}
          <motion.div variants={itemVariants}>
            <motion.form
              className="project-card"
              style={{ padding: '40px', display: 'flex', flexDirection: 'column', position: 'relative' }}
              onSubmit={handleSubmit}
              variants={status === 'error' ? shakeVariants : {}}
              animate={status === 'error' ? 'shake' : 'idle'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
                <MessageSquareText size={24} color="var(--accent)" />
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', color: 'var(--text-primary)' }}>
                  Suggestion Box
                </h3>
              </div>

              <div className="floating-label-group">
                <input
                  type="text"
                  name="name"
                  id="contact-name"
                  className="contact-input"
                  placeholder=" "
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  style={{ boxShadow: focusedField === 'name' ? '0 0 15px var(--accent-dim)' : 'none' }}
                />
                <label htmlFor="contact-name" className="floating-label">Your Name</label>
              </div>

              <div className="floating-label-group">
                <input
                  type="email"
                  name="email"
                  id="contact-email"
                  className="contact-input"
                  placeholder=" "
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  style={{ boxShadow: focusedField === 'email' ? '0 0 15px var(--accent-dim)' : 'none' }}
                />
                <label htmlFor="contact-email" className="floating-label">Your Email</label>
              </div>

              <div className="floating-label-group" style={{ marginBottom: '8px' }}>
                <textarea
                  name="message"
                  id="contact-message"
                  className="contact-textarea"
                  placeholder=" "
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  style={{ boxShadow: focusedField === 'message' ? '0 0 15px var(--accent-dim)' : 'none' }}
                />
                <label htmlFor="contact-message" className="floating-label">Message / Suggestion</label>
              </div>
              
              <div style={{ textAlign: 'right', fontSize: '12px', color: 'var(--text-dim)', marginBottom: '24px', fontFamily: 'var(--font-mono)' }}>
                {formData.message.length} / {MAX_CHARS}
              </div>

              <AnimatePresence mode="wait">
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    style={{ color: '#ff6b6b', fontSize: '14px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <AlertCircle size={16} /> {errorMsg}
                  </motion.div>
                )}
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    style={{ color: 'var(--accent)', fontSize: '14px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <CheckCircle2 size={16} /> Your message has been successfully sent. Thank you for your feedback!
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                className="contact-submit"
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: status === 'loading' ? 1 : 1.03 }}
                whileTap={{ scale: status === 'loading' ? 1 : 0.97 }}
                style={{ 
                  opacity: status === 'loading' ? 0.7 : 1, 
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  width: '100%'
                }}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';

/* ═══════════════════════════════════════════
   ROBOT SVG — Inline, CSS-targetable
   ═══════════════════════════════════════════ */
const RobotSVG = () => (
  <svg id="ask-sri-robot" className="robot--idle" viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg">
    {/* Antenna */}
    <g id="robot-antenna" style={{ transformOrigin: '60px 30px' }}>
      <line x1="60" y1="30" x2="60" y2="15" stroke="currentColor" strokeWidth="2"/>
      <circle id="antenna-tip" cx="60" cy="12" r="4" fill="var(--accent, #64ffda)"/>
    </g>
    {/* Head */}
    <g id="robot-head" style={{ transformOrigin: '60px 52px' }}>
      <rect x="30" y="28" width="60" height="48" rx="12" fill="var(--robot-body-color, #1a1a1a)"/>
      <g id="robot-eyes">
        <rect id="eye-left" x="40" y="40" width="14" height="14" rx="3" fill="var(--accent, #64ffda)"/>
        <rect id="eye-right" x="66" y="40" width="14" height="14" rx="3" fill="var(--accent, #64ffda)"/>
        <circle cx="46" cy="44" r="2" fill="white" opacity="0.7"/>
        <circle cx="72" cy="44" r="2" fill="white" opacity="0.7"/>
      </g>
      <g id="robot-mouth" style={{ transformOrigin: '60px 64px' }}>
        <rect x="46" y="60" width="28" height="8" rx="4" fill="var(--accent, #64ffda)" opacity="0.8"/>
      </g>
      <circle id="cheek-left" cx="37" cy="58" r="6" fill="#ff6b6b" opacity="0"/>
      <circle id="cheek-right" cx="83" cy="58" r="6" fill="#ff6b6b" opacity="0"/>
    </g>
    {/* Body */}
    <g id="robot-body" style={{ transformOrigin: '60px 100px' }}>
      <rect x="28" y="80" width="64" height="52" rx="10" fill="var(--robot-body-color, #1a1a1a)"/>
      <circle cx="60" cy="106" r="6" fill="var(--accent, #64ffda)" opacity="0.6"/>
      <rect x="42" y="90" width="36" height="8" rx="3" fill="rgba(255,255,255,0.15)" opacity="0.5"/>
    </g>
    {/* Left Arm */}
    <g id="robot-arm-left" style={{ transformOrigin: '28px 85px' }}>
      <rect x="12" y="82" width="16" height="40" rx="8" fill="var(--robot-body-color, #1a1a1a)"/>
      <circle cx="20" cy="124" r="7" fill="var(--robot-body-color, #1a1a1a)"/>
    </g>
    {/* Right Arm */}
    <g id="robot-arm-right" style={{ transformOrigin: '92px 85px' }}>
      <rect x="92" y="82" width="16" height="40" rx="8" fill="var(--robot-body-color, #1a1a1a)"/>
      <circle cx="100" cy="124" r="7" fill="var(--robot-body-color, #1a1a1a)"/>
    </g>
    {/* Thinking dots */}
    <g id="thinking-dots" opacity="0">
      <circle className="dot" cx="50" cy="20" r="3" fill="var(--accent, #64ffda)"/>
      <circle className="dot" cx="60" cy="14" r="3" fill="var(--accent, #64ffda)"/>
      <circle className="dot" cx="70" cy="20" r="3" fill="var(--accent, #64ffda)"/>
    </g>
    {/* Sparkles */}
    <g id="sparkles" opacity="0">
      <text x="18" y="32" fontSize="12" fill="var(--accent, #64ffda)">✦</text>
      <text x="90" y="28" fontSize="10" fill="var(--accent, #64ffda)">✦</text>
      <text x="10" y="55" fontSize="8" fill="var(--accent, #64ffda)">·</text>
    </g>
    {/* Confused mark */}
    <text id="confused-mark" x="92" y="24" fontSize="18" fontWeight="bold" fill="var(--accent, #64ffda)" opacity="0" textAnchor="middle">?</text>
  </svg>
);

/* ═══════════════════════════════════════════
   ROBOT STATE CONTROLLER
   ═══════════════════════════════════════════ */
const robotStates = ['idle', 'waving', 'thinking', 'talking', 'excited', 'confused'];

function setRobotState(state) {
  const robot = document.getElementById('ask-sri-robot');
  if (!robot) return;
  robotStates.forEach(s => robot.classList.remove(`robot--${s}`));
  robot.classList.add(`robot--${state}`);
}

/* ═══════════════════════════════════════════
   NAVIGATION COMMAND PARSER
   ═══════════════════════════════════════════ */
const NAV_PATTERN = /\[NAV:(\w+)\]\s*$/;

function parseNavCommand(text) {
  const match = text.match(NAV_PATTERN);
  if (match) {
    return {
      cleanText: text.replace(NAV_PATTERN, '').trim(),
      navTarget: match[1],
    };
  }
  return { cleanText: text, navTarget: null };
}

/* ═══════════════════════════════════════════
   TOPIC DETECTION (for robot emotions)
   ═══════════════════════════════════════════ */
const EXCITED_KEYWORDS = ['project', 'synoptiq', 'visionix', 'industrial', 'cloudpulse', 'built', 'achievement', 'skill', 'best', 'impressive', 'amazing'];
const CONFUSED_KEYWORDS = ["don't have", "not sure", "outside", "can't answer", "hmm"];

function detectMood(text) {
  const lower = text.toLowerCase();
  if (CONFUSED_KEYWORDS.some(kw => lower.includes(kw))) return 'confused';
  if (EXCITED_KEYWORDS.some(kw => lower.includes(kw))) return 'excited';
  return null;
}

/* ═══════════════════════════════════════════
   MARKDOWN-LIKE FORMATTER
   ═══════════════════════════════════════════ */
function formatResponse(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>')
    .replace(/•\s/g, '&bull; ');
}

/* ═══════════════════════════════════════════
   API ENDPOINT
   ═══════════════════════════════════════════ */
// For local development, use: 'http://localhost:3000/api/chat'
// For production, update to your Vercel deployment URL
const API_URL =
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000/api/chat'
    : import.meta.env.VITE_ASK_SRI_API_URL || 'https://backend-one-beige-76.vercel.app/api/chat';

/* ═══════════════════════════════════════════
   CHATBOT COMPONENT
   ═══════════════════════════════════════════ */
const Chatbot = ({ onNavigate, phase }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      text: "Hey! 👋 I'm Ask Sri — your guide to Sri's world.\nAsk me about his skills, projects, experience, or anything else!",
      sender: 'bot',
      time: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [conversationHistory, setConversationHistory] = useState([]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const inactivityTimerRef = useRef(null);
  const popupTimerRef = useRef(null);
  const streamingMsgRef = useRef(null);

  const suggestedQuestions = [
    '🚀 Best project?',
    '💼 Work experience?',
    '🧠 Top skills?',
    '📄 See resume',
  ];

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [isOpen]);

  // Robot idle state + inactivity waving
  useEffect(() => {
    if (isOpen && !isStreaming) {
      setRobotState('idle');
      startInactivityWatch();
    }
    return () => clearTimeout(inactivityTimerRef.current);
  }, [isOpen, isStreaming]);

  // About section popup trigger (IntersectionObserver)
  useEffect(() => {
    if (phase !== 'SCROLLABLE') return;

    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !sessionStorage.getItem('askSriPopupShown')) {
            setTimeout(() => {
              setShowPopup(true);
              sessionStorage.setItem('askSriPopupShown', 'true');
              // Auto-dismiss after 6 seconds
              popupTimerRef.current = setTimeout(() => setShowPopup(false), 6000);
            }, 800);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(aboutSection);
    return () => {
      observer.disconnect();
      clearTimeout(popupTimerRef.current);
    };
  }, [phase]);

  function startInactivityWatch() {
    clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      const robot = document.getElementById('ask-sri-robot');
      if (robot && robot.classList.contains('robot--idle')) {
        setRobotState('waving');
        setTimeout(() => setRobotState('idle'), 3500);
      }
    }, 8000);
  }

  // ── Send message to backend ──
  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isStreaming) return;

    const userMsg = { id: Date.now(), text: text.trim(), sender: 'user', time: 'Now' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsStreaming(true);
    setShowSuggestions(false);

    // Update conversation history
    const newHistory = [...conversationHistory, { role: 'user', content: text.trim() }];
    setConversationHistory(newHistory);

    // Robot → thinking
    setRobotState('thinking');

    // Create placeholder for streaming response
    const botMsgId = Date.now() + 1;
    setMessages(prev => [
      ...prev,
      { id: botMsgId, text: '', sender: 'bot', time: 'Now', streaming: true },
    ]);
    streamingMsgRef.current = botMsgId;

    let fullResponse = '';

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          conversationHistory: newHistory.slice(-10),
        }),
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      // Robot → talking
      setRobotState('talking');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.done) break;
            if (data.error) throw new Error('Stream error');
            if (data.text) {
              fullResponse += data.text;
              // Update the streaming message
              setMessages(prev =>
                prev.map(msg =>
                  msg.id === botMsgId
                    ? { ...msg, text: fullResponse }
                    : msg
                )
              );
            }
          } catch (e) {
            // Skip malformed JSON lines
          }
        }
      }

      // Parse nav commands
      const { cleanText, navTarget } = parseNavCommand(fullResponse);

      // Finalize message (remove streaming flag, clean nav tags)
      setMessages(prev =>
        prev.map(msg =>
          msg.id === botMsgId
            ? { ...msg, text: cleanText, streaming: false }
            : msg
        )
      );

      // Update conversation history with assistant response
      setConversationHistory(prev => [...prev, { role: 'assistant', content: cleanText }]);

      // Detect mood for robot
      const mood = detectMood(cleanText);
      if (mood === 'excited') {
        setRobotState('excited');
        setTimeout(() => setRobotState('idle'), 1500);
      } else if (mood === 'confused') {
        setRobotState('confused');
        setTimeout(() => setRobotState('idle'), 2000);
      } else {
        setRobotState('idle');
      }

      // Handle navigation
      if (navTarget && onNavigate) {
        setTimeout(() => {
          if (navTarget === 'resume') {
            window.open('/resume.pdf', '_blank');
          } else {
            onNavigate(navTarget);
          }
        }, 600);
      }

    } catch (error) {
      console.error('Ask Sri Error:', error);
      const errorText = "Oops! Something went wrong. Please try again in a moment 😅";
      setMessages(prev =>
        prev.map(msg =>
          msg.id === botMsgId
            ? { ...msg, text: errorText, streaming: false }
            : msg
        )
      );
      setRobotState('confused');
      setTimeout(() => setRobotState('idle'), 2000);
    } finally {
      setIsStreaming(false);
      startInactivityWatch();
    }
  }, [isStreaming, conversationHistory, onNavigate]);

  const handleSend = useCallback(() => {
    sendMessage(inputValue);
  }, [inputValue, sendMessage]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChipClick = (question) => {
    sendMessage(question);
  };

  const handlePopupClick = () => {
    setShowPopup(false);
    clearTimeout(popupTimerRef.current);
    setIsOpen(true);
  };

  const dismissPopup = (e) => {
    e.stopPropagation();
    setShowPopup(false);
    clearTimeout(popupTimerRef.current);
  };

  return (
    <>
      {/* ── About Section Popup ── */}
      <AnimatePresence>
        {showPopup && !isOpen && (
          <motion.div
            className="ask-sri-popup"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
            onClick={handlePopupClick}
          >
            <div className="popup-title">🤖 Ask Sri</div>
            <div>I can answer anything about Sri's work, skills & projects!</div>
            <button className="popup-close" onClick={dismissPopup} aria-label="Close popup">✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB Button ── */}
      <motion.button
        className="ask-sri-fab"
        onClick={() => {
          setIsOpen(!isOpen);
          setShowPopup(false);
          clearTimeout(popupTimerRef.current);
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open Ask Sri chat assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              style={{ fontSize: '20px', lineHeight: 1 }}
            >
              ✕
            </motion.span>
          ) : (
            <motion.span
              key="open"
              className="fab-icon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              🤖
            </motion.span>
          )}
        </AnimatePresence>

        {/* Notification dot */}
        {showPopup && !isOpen && <span className="fab-notification-dot visible" />}
        {/* Pulse ring */}
        {!isOpen && <span className="chatbot-pulse" />}
      </motion.button>

      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="ask-sri-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            role="dialog"
            aria-label="Ask Sri — Portfolio Assistant"
          >
            {/* Robot Mascot Zone */}
            <div className="robot-zone" aria-hidden="true">
              <RobotSVG />
            </div>

            {/* Header */}
            <div className="panel-header">
              <div className="panel-title">
                <span className="panel-title-name">Ask Sri</span>
                <span className="panel-title-status">
                  <span className="status-dot" />
                  <span>Online</span>
                </span>
              </div>
              <button className="panel-close" onClick={() => setIsOpen(false)} aria-label="Close chat">
                ✕
              </button>
            </div>

            {/* Messages Area */}
            <div className="messages-area" id="ask-sri-messages" role="log" aria-live="polite">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message ${msg.sender === 'user' ? 'message--user' : 'message--sri'} ${
                    msg.streaming ? 'message--streaming' : ''
                  }`}
                >
                  <div
                    className="message-bubble"
                    dangerouslySetInnerHTML={{
                      __html: formatResponse(msg.text || ''),
                    }}
                  />
                  <span className="message-time">{msg.time}</span>
                </div>
              ))}

              {/* Thinking indicator */}
              {isStreaming && messages[messages.length - 1]?.text === '' && (
                <div className="thinking-indicator visible">
                  <div className="thinking-bubble">
                    <span className="thinking-dot" />
                    <span className="thinking-dot" />
                    <span className="thinking-dot" />
                  </div>
                </div>
              )}

              {/* Suggestion chips */}
              {showSuggestions && messages.length <= 1 && (
                <div className="suggestion-chips">
                  {suggestedQuestions.map((q, i) => (
                    <button key={i} className="chip" onClick={() => handleChipClick(q)}>
                      {q}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="input-bar">
              <input
                ref={inputRef}
                type="text"
                className="ask-sri-input"
                placeholder="Ask me anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                autoCorrect="on"
                maxLength={500}
                disabled={isStreaming}
                aria-label="Type your message to Ask Sri"
              />
              <button
                className="send-button"
                onClick={handleSend}
                disabled={!inputValue.trim() || isStreaming}
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>

            {/* Footer */}
            <div className="panel-footer">
              <span>Powered by Gemini</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;

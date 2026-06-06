import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { chatbotKnowledge } from '../data/portfolioData';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Show greeting on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = chatbotKnowledge.greetings[Math.floor(Math.random() * chatbotKnowledge.greetings.length)];
      setMessages([{ id: Date.now(), text: greeting, sender: 'bot' }]);
    }
  }, [isOpen, messages.length]);

  // Rule-based response engine
  const getResponse = useCallback((query) => {
    const lowerQuery = query.toLowerCase().trim();

    // Check greetings
    const greetingWords = ['hi', 'hello', 'hey', 'hii', 'hiii', 'good morning', 'good evening', 'howdy', 'sup'];
    if (greetingWords.some(g => lowerQuery === g || lowerQuery.startsWith(g + ' ') || lowerQuery.startsWith(g + '!'))) {
      return chatbotKnowledge.greetings[Math.floor(Math.random() * chatbotKnowledge.greetings.length)];
    }

    // Check thank you
    if (lowerQuery.includes('thank') || lowerQuery.includes('thanks')) {
      return "You're welcome! Feel free to ask anything else about Jaya Sri Vardhan's portfolio.";
    }

    // Search through knowledge topics
    let bestMatch = null;
    let bestScore = 0;

    for (const [topicKey, topicData] of Object.entries(chatbotKnowledge.topics)) {
      let score = 0;
      for (const keyword of topicData.keywords) {
        if (lowerQuery.includes(keyword.toLowerCase())) {
          // Give higher score for longer keyword matches
          score += keyword.length;
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = topicData;
      }
    }

    if (bestMatch && bestScore > 0) {
      return bestMatch.response;
    }

    // Fallback
    return chatbotKnowledge.fallback;
  }, []);

  const handleSend = useCallback(() => {
    const text = inputValue.trim();
    if (!text) return;

    // Add user message
    const userMsg = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay for natural feel
    const delay = Math.min(800 + text.length * 10, 2000);
    setTimeout(() => {
      const response = getResponse(text);
      setMessages(prev => [...prev, { id: Date.now(), text: response, sender: 'bot' }]);
      setIsTyping(false);
    }, delay);
  }, [inputValue, getResponse]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    'What are his skills?',
    'Tell me about SynoptiQ',
    'What certifications does he have?',
    'How to contact him?',
  ];

  return (
    <>
      {/* Floating Chat Icon */}
      <motion.button
        className="chatbot-fab"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open chat assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!isOpen && <span className="chatbot-pulse" />}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-header-info">
                <div className="chatbot-avatar">
                  <Bot size={20} />
                </div>
                <div>
                  <h4>JSV Assistant</h4>
                  <span className="chatbot-status">
                    <span className="chatbot-status-dot" />
                    Online
                  </span>
                </div>
              </div>
              <button className="chatbot-close" onClick={() => setIsOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="chatbot-messages">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  className={`chatbot-msg ${msg.sender === 'user' ? 'chatbot-msg-user' : 'chatbot-msg-bot'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {msg.sender === 'bot' && (
                    <div className="chatbot-msg-icon">
                      <Bot size={14} />
                    </div>
                  )}
                  <div className="chatbot-msg-bubble">
                    {msg.text}
                  </div>
                  {msg.sender === 'user' && (
                    <div className="chatbot-msg-icon chatbot-msg-icon-user">
                      <User size={14} />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  className="chatbot-msg chatbot-msg-bot"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="chatbot-msg-icon">
                    <Bot size={14} />
                  </div>
                  <div className="chatbot-msg-bubble chatbot-typing">
                    <span /><span /><span />
                  </div>
                </motion.div>
              )}

              {/* Suggested questions (show only at start) */}
              {messages.length <= 1 && !isTyping && (
                <div className="chatbot-suggestions">
                  {suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      className="chatbot-suggestion-btn"
                      onClick={() => {
                        setInputValue(q);
                        setTimeout(() => {
                          const userMsg = { id: Date.now(), text: q, sender: 'user' };
                          setMessages(prev => [...prev, userMsg]);
                          setIsTyping(true);
                          setTimeout(() => {
                            const response = getResponse(q);
                            setMessages(prev => [...prev, { id: Date.now(), text: response, sender: 'bot' }]);
                            setIsTyping(false);
                          }, 800);
                          setInputValue('');
                        }, 50);
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="chatbot-input-area">
              <input
                ref={inputRef}
                type="text"
                className="chatbot-input"
                placeholder="Ask about Jaya Sri Vardhan..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <motion.button
                className="chatbot-send-btn"
                onClick={handleSend}
                disabled={!inputValue.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send size={16} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;

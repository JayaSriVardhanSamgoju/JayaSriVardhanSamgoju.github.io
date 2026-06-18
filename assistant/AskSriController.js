import './ask-sri.css';
import { AskSriHTML } from './AskSriHTML.js';
import { RobotController } from './RobotController.js';

class AskSriController {
  constructor() {
    this.isOpen = false;
    this.isLoading = false;
    this.conversationHistory = [];
    this.inactivityTimer = null;
    this.popup = null;
    this.fab = null;
    this.panel = null;
    this.messagesArea = null;
    this.input = null;
    this.sendBtn = null;
    this.thinkingIndicator = null;
    this.suggestions = null;

    this.apiEndpoint =
      window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3000/api/chat'
        : 'https://backend-one-beige-76.vercel.app/api/chat';

    this.init();
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    this.injectHTML();
    this.bindRefs();
    this.bindEvents();
    this.setupAboutObserver();
    RobotController.setState('idle');
    RobotController.startInactivityWatch();
  }

  injectHTML() {
    const container = document.createElement('div');
    container.id = 'ask-sri-container';
    container.innerHTML = AskSriHTML;
    document.body.appendChild(container);
  }

  bindRefs() {
    this.fab = document.getElementById('ask-sri-fab');
    this.panel = document.getElementById('ask-sri-panel');
    this.messagesArea = document.getElementById('ask-sri-messages');
    this.input = document.getElementById('ask-sri-input');
    this.sendBtn = document.getElementById('ask-sri-send');
    this.thinkingIndicator = document.getElementById('ask-sri-thinking');
    this.suggestions = document.getElementById('ask-sri-suggestions');
  }

  bindEvents() {
    this.fab.addEventListener('click', () => this.togglePanel());
    document.querySelector('.panel-close').addEventListener('click', () => this.togglePanel());
    
    this.sendBtn.addEventListener('click', () => this.handleSend());
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.handleSend();
      RobotController.onUserTyping();
    });

    if (this.suggestions) {
      this.suggestions.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', (e) => {
          this.input.value = e.target.textContent;
          this.handleSend();
        });
      });
    }
  }

  setupAboutObserver() {
    const aboutSection = 
      document.querySelector('#about') ||
      document.querySelector('[data-section="about"]') ||
      document.querySelector('.about-section') ||
      document.querySelector('section.about');

    if (!aboutSection) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !sessionStorage.getItem('askSriPopupShown')) {
          setTimeout(() => this.showPopup(), 800);
          sessionStorage.setItem('askSriPopupShown', 'true');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(aboutSection);
  }

  showPopup() {
    if (this.isOpen) return;
    
    const popup = document.createElement('div');
    popup.className = 'ask-sri-popup';
    popup.innerHTML = `
      <div class="popup-title">🤖 Ask Sri</div>
      <div>I can answer anything about Sri's work, skills & projects!</div>
      <button class="popup-close">✕</button>
    `;
    document.body.appendChild(popup);
    
    const notificationDot = this.fab.querySelector('.fab-notification-dot');
    if (notificationDot) notificationDot.classList.add('visible');

    popup.addEventListener('click', () => {
      this.togglePanel();
      popup.remove();
      if (notificationDot) notificationDot.classList.remove('visible');
    });

    popup.querySelector('.popup-close').addEventListener('click', (e) => {
      e.stopPropagation();
      popup.remove();
      if (notificationDot) notificationDot.classList.remove('visible');
    });

    setTimeout(() => {
      if (document.body.contains(popup)) popup.remove();
      if (notificationDot) notificationDot.classList.remove('visible');
    }, 6000);
  }

  togglePanel() {
    this.isOpen = !this.isOpen;
    this.panel.setAttribute('aria-hidden', !this.isOpen);
    
    if (this.isOpen) {
      setTimeout(() => this.input.focus(), 300);
      this.scrollToBottom();
    }
  }

  async handleSend() {
    const text = this.input.value.trim();
    if (!text || this.isLoading) return;

    this.input.value = '';
    if (this.suggestions) {
      this.suggestions.style.display = 'none';
    }

    this.addMessage(text, 'user');
    this.isLoading = true;
    this.thinkingIndicator.classList.add('visible');
    this.scrollToBottom();

    RobotController.onApiCallStart();

    const currentHistory = [...this.conversationHistory, { role: 'user', content: text }];
    this.conversationHistory = currentHistory;

    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, conversationHistory: currentHistory.slice(-10) }),
      });

      if (!response.ok) throw new Error('API Error');

      this.thinkingIndicator.classList.remove('visible');
      RobotController.onStreamStart();

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      const botMessageEl = this.addMessage('', 'sri', true);
      const bubble = botMessageEl.querySelector('.message-bubble');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunks = decoder.decode(value).split('\n\n');
        for (const chunk of chunks) {
          if (chunk.startsWith('data: ')) {
            const dataStr = chunk.slice(6);
            try {
              const data = JSON.parse(dataStr);
              if (data.text) {
                fullText += data.text;
                bubble.innerHTML = this.formatResponse(fullText);
                this.scrollToBottom();
              }
            } catch(e) {}
          }
        }
      }

      botMessageEl.classList.remove('message--streaming');
      RobotController.onStreamEnd();
      
      const { cleanText, navTarget } = this.parseNavCommand(fullText);
      bubble.innerHTML = this.formatResponse(cleanText);
      
      this.conversationHistory.push({ role: 'assistant', content: cleanText });

      if (navTarget) {
        this.handleNavigation(navTarget);
      }

      this.isLoading = false;

    } catch (error) {
      this.thinkingIndicator.classList.remove('visible');
      this.addMessage('Oops! Something went wrong. Please try again in a moment 😅', 'sri');
      RobotController.onConfusedTopic();
      this.isLoading = false;
      this.scrollToBottom();
    }
  }

  addMessage(text, sender, isStreaming = false) {
    const el = document.createElement('div');
    el.className = `message message--${sender} ${isStreaming ? 'message--streaming' : ''}`;
    el.innerHTML = `
      <div class="message-bubble">${this.formatResponse(text)}</div>
      <div class="message-time">Now</div>
    `;
    
    // Append to messages area
    this.messagesArea.appendChild(el);
    return el;
  }

  formatResponse(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>')
      .replace(/•\s/g, '&bull; ');
  }

  parseNavCommand(text) {
    const match = text.match(/\[NAV:(\w+)\]\s*$/);
    if (match) {
      return { cleanText: text.replace(match[0], '').trim(), navTarget: match[1] };
    }
    return { cleanText: text, navTarget: null };
  }

  handleNavigation(target) {
    if (target === 'resume') {
      window.open('/resume.pdf', '_blank');
    } else {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        this.togglePanel();
      }
    }
  }

  scrollToBottom() {
    this.messagesArea.scrollTop = this.messagesArea.scrollHeight;
  }
}

new AskSriController();

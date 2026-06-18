export const AskSriHTML = `
<!-- FLOATING ACTION BUTTON -->
<button id="ask-sri-fab" aria-label="Open Ask Sri chat assistant" class="ask-sri-fab">
  <span class="fab-icon">🤖</span>
  <span class="fab-notification-dot" aria-hidden="true"></span>
</button>

<!-- MAIN CHAT PANEL -->
<div id="ask-sri-panel" class="ask-sri-panel" aria-hidden="true"
     role="dialog" aria-label="Ask Sri — Portfolio Assistant">

  <!-- ROBOT MASCOT ZONE -->
  <div class="robot-zone" aria-hidden="true">
    <svg id="ask-sri-robot" viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg">
      <!-- Antenna -->
      <g id="robot-antenna" transform-origin="60 30">
        <line x1="60" y1="30" x2="60" y2="15" stroke="currentColor" stroke-width="2"/>
        <circle id="antenna-tip" cx="60" cy="12" r="4" fill="var(--accent-color, #3dffc0)"/>
      </g>
      <!-- Head -->
      <g id="robot-head" transform-origin="60 52">
        <rect x="30" y="28" width="60" height="48" rx="12" fill="var(--robot-body-color)"/>
        <g id="robot-eyes">
          <rect id="eye-left"  x="40" y="40" width="14" height="14" rx="3" fill="var(--accent-color)"/>
          <rect id="eye-right" x="66" y="40" width="14" height="14" rx="3" fill="var(--accent-color)"/>
          <circle cx="46" cy="44" r="2" fill="white" opacity="0.7"/>
          <circle cx="72" cy="44" r="2" fill="white" opacity="0.7"/>
        </g>
        <g id="robot-mouth" transform-origin="60 64">
          <rect x="46" y="60" width="28" height="8" rx="4" fill="var(--accent-color)" opacity="0.8"/>
        </g>
        <circle id="cheek-left"  cx="37" cy="58" r="6" fill="#ff6b6b" opacity="0"/>
        <circle id="cheek-right" cx="83" cy="58" r="6" fill="#ff6b6b" opacity="0"/>
      </g>
      <!-- Body -->
      <g id="robot-body" transform-origin="60 100">
        <rect x="28" y="80" width="64" height="52" rx="10" fill="var(--robot-body-color)"/>
        <circle cx="60" cy="106" r="6" fill="var(--accent-color)" opacity="0.6"/>
        <rect x="42" y="90" width="36" height="8" rx="3" fill="var(--robot-panel-color)" opacity="0.5"/>
      </g>
      <!-- Left Arm -->
      <g id="robot-arm-left" transform-origin="28 85">
        <rect x="12" y="82" width="16" height="40" rx="8" fill="var(--robot-body-color)"/>
        <circle cx="20" cy="124" r="7" fill="var(--robot-body-color)"/>
      </g>
      <!-- Right Arm (waving arm) -->
      <g id="robot-arm-right" transform-origin="92 85">
        <rect x="92" y="82" width="16" height="40" rx="8" fill="var(--robot-body-color)"/>
        <circle cx="100" cy="124" r="7" fill="var(--robot-body-color)"/>
      </g>
      <!-- Thinking dots (hidden default) -->
      <g id="thinking-dots" opacity="0">
        <circle class="dot" cx="50" cy="20" r="3" fill="var(--accent-color)"/>
        <circle class="dot" cx="60" cy="14" r="3" fill="var(--accent-color)"/>
        <circle class="dot" cx="70" cy="20" r="3" fill="var(--accent-color)"/>
      </g>
      <!-- Sparkles (hidden default) -->
      <g id="sparkles" opacity="0">
        <text x="18" y="32" font-size="12" fill="var(--accent-color)">✦</text>
        <text x="90" y="28" font-size="10" fill="var(--accent-color)">✦</text>
        <text x="10" y="55" font-size="8"  fill="var(--accent-color)">·</text>
      </g>
      <!-- Confused mark (hidden) -->
      <text id="confused-mark" x="92" y="24" font-size="18" font-weight="bold"
            fill="var(--accent-color)" opacity="0" text-anchor="middle">?</text>
    </svg>
  </div>

  <!-- PANEL HEADER -->
  <div class="panel-header">
    <div class="panel-title">
      <span class="panel-title-name">Ask Sri</span>
      <span class="panel-title-status">
        <span class="status-dot" aria-hidden="true"></span>
        <span>Online</span>
      </span>
    </div>
    <button class="panel-close" aria-label="Close chat">✕</button>
  </div>

  <!-- MESSAGES AREA -->
  <div class="messages-area" id="ask-sri-messages"
       role="log" aria-live="polite" aria-label="Chat messages">

    <!-- WELCOME MESSAGE (static, always shown) -->
    <div class="message message--sri">
      <div class="message-bubble">
        Hey! 👋 I'm Ask Sri — your guide to Sri's world.<br>
        Ask me about his skills, projects, experience, or anything else!
      </div>
      <div class="message-time">Just now</div>
    </div>

    <!-- SUGGESTION CHIPS -->
    <div class="suggestion-chips" id="ask-sri-suggestions" role="list">
      <button class="chip" role="listitem">🚀 Best project?</button>
      <button class="chip" role="listitem">💼 Work experience?</button>
      <button class="chip" role="listitem">🧠 Top skills?</button>
      <button class="chip" role="listitem">📄 See resume</button>
    </div>
  </div>

  <!-- THINKING INDICATOR -->
  <div class="thinking-indicator" id="ask-sri-thinking" aria-hidden="true">
    <div class="thinking-bubble">
      <span class="thinking-dot"></span>
      <span class="thinking-dot"></span>
      <span class="thinking-dot"></span>
    </div>
  </div>

  <!-- INPUT BAR -->
  <div class="input-bar">
    <input
      type="text"
      id="ask-sri-input"
      class="ask-sri-input"
      placeholder="Ask me anything..."
      autocomplete="off"
      autocorrect="on"
      maxlength="500"
      aria-label="Type your message to Ask Sri"
    />
    <button id="ask-sri-send" class="send-button" aria-label="Send message">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
      </svg>
    </button>
  </div>

  <!-- FOOTER -->
  <div class="panel-footer">
    <span>Powered by Gemini Pro</span>
  </div>
</div>
`;

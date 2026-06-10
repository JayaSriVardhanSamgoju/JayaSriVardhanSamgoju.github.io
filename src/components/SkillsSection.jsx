import React, { useState, useEffect, useRef } from 'react';

/* ============================================================
   SKILL CATEGORIES DATA — Colored Brand SVG Icons
   ============================================================ */
const cats = [
  {
    id: 1,
    label: 'Programming Languages',
    sub: '3 skills',
    emoji: '🖥️',
    title: 'Programming Languages',
    desc: 'Core languages for system design, algorithm development, and low-level optimization.',
    viz: 'bars',
    bars: [
      { l: 'Python', v: 92 },
      { l: 'C', v: 70 },
      { l: 'C++', v: 65 },
    ],
    highlight: ['Python'],
    skills: [
      {
        name: 'Python',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17.8 3C11.3 3 8.5 6 8.5 9.2v3.3h9.3v1.2H6.5c-3 0-4.5 2.8-4.5 5.6s1.5 5.6 4.5 5.6H8v3.5c0 3.2 2.8 5.6 9.3 5.6s9.7-2.4 9.7-5.6V25h-9.3v-1.2h9.3c3 0 5-2.8 5-5.6s-2-5.6-5-5.6H26V9.2C26 6 23.2 3 17.8 3z" fill="none" stroke="#4B8BBE" stroke-width="1.5"/>
          <path d="M17.8 3C11.3 3 8.5 6 8.5 9.2v3.3h9.3v1.2" fill="none" stroke="#FFD43B" stroke-width="1.2" opacity="0.7"/>
          <circle cx="13.5" cy="8.8" r="1.6" fill="#4B8BBE"/>
          <circle cx="22.2" cy="27.2" r="1.6" fill="#FFD43B"/>
        </svg>`,
      },
      {
        name: 'C',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="18" cy="18" r="13" stroke="#5C6BC0" stroke-width="1.5"/>
          <path d="M23 13A8.5 8.5 0 1 0 23 23" stroke="#7986CB" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        </svg>`,
      },
      {
        name: 'C++',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="18" cy="18" r="13" stroke="#7E57C2" stroke-width="1.5"/>
          <path d="M22 13A8.5 8.5 0 1 0 22 23" stroke="#9575CD" stroke-width="2" stroke-linecap="round" fill="none"/>
          <line x1="25" y1="14" x2="25" y2="22" stroke="#9575CD" stroke-width="1.5"/>
          <line x1="21" y1="18" x2="29" y2="18" stroke="#9575CD" stroke-width="1.5"/>
          <line x1="31" y1="14" x2="31" y2="22" stroke="#9575CD" stroke-width="1.5"/>
          <line x1="27" y1="18" x2="35" y2="18" stroke="#9575CD" stroke-width="1.5"/>
        </svg>`,
      },
    ],
  },
  {
    id: 2,
    label: 'Machine Learning',
    sub: '4 skills',
    emoji: '🧠',
    title: 'Machine Learning',
    desc: 'Developing predictive models and statistical algorithms for complex data analysis.',
    viz: 'bars',
    bars: [
      { l: 'Regression', v: 88 },
      { l: 'Anomaly Det.', v: 85 },
      { l: 'Model Eval.', v: 80 },
      { l: 'Feature Eng.', v: 75 },
    ],
    highlight: ['Anomaly Detection'],
    skills: [
      {
        name: 'Regression & Classif.',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <line x1="4" y1="30" x2="32" y2="30" stroke="#333" stroke-width="1"/>
          <line x1="4" y1="4" x2="4" y2="30" stroke="#333" stroke-width="1"/>
          <circle cx="8" cy="24" r="2" fill="#42A5F5"/><circle cx="12" cy="19" r="2" fill="#42A5F5"/>
          <circle cx="17" cy="22" r="2" fill="#42A5F5"/><circle cx="22" cy="14" r="2" fill="#42A5F5"/>
          <circle cx="27" cy="10" r="2" fill="#42A5F5"/>
          <line x1="6" y1="26" x2="30" y2="8" stroke="#EF5350" stroke-width="1.5" stroke-dasharray="4 2"/>
        </svg>`,
      },
      {
        name: 'Feature Engineering',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="18,4 30,11 30,25 18,32 6,25 6,11" stroke="#FF7043" stroke-width="1.5" fill="none"/>
          <polygon points="18,9 26,14 26,22 18,27 10,22 10,14" stroke="#FF8A65" stroke-width="1.2" fill="none"/>
          <polygon points="18,14 22,16.5 22,21.5 18,24 14,21.5 14,16.5" stroke="#FFAB91" stroke-width="1" fill="none"/>
        </svg>`,
      },
      {
        name: 'Model Evaluation',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 28 A13 13 0 0 1 31 28" stroke="#333" stroke-width="1.5" fill="none"/>
          <path d="M5 28 A13 13 0 0 1 14 11" stroke="#26A69A" stroke-width="3" fill="none" stroke-linecap="round"/>
          <path d="M14 11 A13 13 0 0 1 24 11" stroke="#66BB6A" stroke-width="3" fill="none" stroke-linecap="round"/>
          <path d="M24 11 A13 13 0 0 1 31 28" stroke="#FFA726" stroke-width="3" fill="none" stroke-linecap="round"/>
          <line x1="18" y1="28" x2="24" y2="14" stroke="#e5e5e5" stroke-width="1.5" stroke-linecap="round"/>
          <circle cx="18" cy="28" r="2.5" fill="#333" stroke="#555" stroke-width="1"/>
        </svg>`,
      },
      {
        name: 'Anomaly Detection',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="2,22 6,22 9,18 12,24 14,20 17,8 20,20 23,24 26,18 29,22 34,22" stroke="#555" stroke-width="1.5" fill="none"/>
          <polyline points="14,20 17,8 20,20" stroke="#EF5350" stroke-width="2" fill="none"/>
          <circle cx="17" cy="8" r="3" stroke="#EF5350" stroke-width="1.5" fill="none"/>
          <line x1="17" y1="5" x2="17" y2="2" stroke="#EF5350" stroke-width="1" stroke-dasharray="1.5 1.5"/>
        </svg>`,
      },
    ],
  },
  {
    id: 3,
    label: 'Deep Learning',
    sub: '4 skills',
    emoji: '🔬',
    title: 'Deep Learning',
    desc: 'Designing deep neural architectures for advanced pattern recognition.',
    viz: 'nodes',
    highlight: [],
    skills: [
      {
        name: 'ANN',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="6" cy="12" r="3" fill="#AB47BC"/><circle cx="6" cy="24" r="3" fill="#AB47BC"/>
          <circle cx="18" cy="7" r="3" fill="#7E57C2"/><circle cx="18" cy="18" r="3" fill="#7E57C2"/><circle cx="18" cy="29" r="3" fill="#7E57C2"/>
          <circle cx="30" cy="14" r="3" fill="#5C6BC0"/><circle cx="30" cy="22" r="3" fill="#5C6BC0"/>
          <line x1="9" y1="12" x2="15" y2="7" stroke="#444" stroke-width="0.8"/><line x1="9" y1="12" x2="15" y2="18" stroke="#444" stroke-width="0.8"/><line x1="9" y1="12" x2="15" y2="29" stroke="#444" stroke-width="0.8"/>
          <line x1="9" y1="24" x2="15" y2="7" stroke="#444" stroke-width="0.8"/><line x1="9" y1="24" x2="15" y2="18" stroke="#444" stroke-width="0.8"/><line x1="9" y1="24" x2="15" y2="29" stroke="#444" stroke-width="0.8"/>
          <line x1="21" y1="7" x2="27" y2="14" stroke="#444" stroke-width="0.8"/><line x1="21" y1="7" x2="27" y2="22" stroke="#444" stroke-width="0.8"/>
          <line x1="21" y1="18" x2="27" y2="14" stroke="#444" stroke-width="0.8"/><line x1="21" y1="18" x2="27" y2="22" stroke="#444" stroke-width="0.8"/>
          <line x1="21" y1="29" x2="27" y2="14" stroke="#444" stroke-width="0.8"/><line x1="21" y1="29" x2="27" y2="22" stroke="#444" stroke-width="0.8"/>
        </svg>`,
      },
      {
        name: 'CNN',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="2" width="8" height="8" rx="1" stroke="#1565C0" stroke-width="1.2" fill="rgba(21,101,192,0.15)"/>
          <rect x="12" y="2" width="8" height="8" rx="1" stroke="#1565C0" stroke-width="1.2" fill="rgba(21,101,192,0.15)"/>
          <rect x="2" y="12" width="8" height="8" rx="1" stroke="#1565C0" stroke-width="1.2" fill="rgba(21,101,192,0.15)"/>
          <rect x="12" y="12" width="8" height="8" rx="1" stroke="#1565C0" stroke-width="1.2" fill="rgba(21,101,192,0.15)"/>
          <rect x="7" y="22" width="12" height="12" rx="2" stroke="#42A5F5" stroke-width="1.5" fill="rgba(66,165,245,0.1)" stroke-dasharray="2 1.5"/>
          <path d="M20 6h4v26H4v-4" stroke="#42A5F5" stroke-width="1" stroke-dasharray="2 2"/>
          <polyline points="20,16 24,20" stroke="#42A5F5" stroke-width="1.2"/>
        </svg>`,
      },
      {
        name: 'RNN',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <rect x="8" y="12" width="20" height="12" rx="3" stroke="#26C6DA" stroke-width="1.5" fill="none"/>
          <path d="M28 18 A12 12 0 0 0 8 18" stroke="#26C6DA" stroke-width="1.2" fill="none" stroke-dasharray="3 2"/>
          <polyline points="10,16 8,18 10,20" stroke="#26C6DA" stroke-width="1.5"/>
          <line x1="3" y1="18" x2="8" y2="18" stroke="#26C6DA" stroke-width="1.2"/>
          <line x1="28" y1="18" x2="33" y2="18" stroke="#26C6DA" stroke-width="1.2"/>
          <polyline points="31,16 33,18 31,20" stroke="#26C6DA" stroke-width="1.2"/>
        </svg>`,
      },
      {
        name: 'LSTM',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="10" width="30" height="16" rx="2" stroke="#66BB6A" stroke-width="1.5" fill="none"/>
          <line x1="12" y1="10" x2="12" y2="26" stroke="#A5D6A7" stroke-width="1"/>
          <line x1="21" y1="10" x2="21" y2="26" stroke="#A5D6A7" stroke-width="1"/>
          <circle cx="7.5" cy="18" r="2.5" stroke="#66BB6A" stroke-width="1.2" fill="rgba(102,187,106,0.15)"/>
          <circle cx="16.5" cy="18" r="2.5" stroke="#66BB6A" stroke-width="1.2" fill="rgba(102,187,106,0.15)"/>
          <circle cx="25.5" cy="18" r="2.5" stroke="#66BB6A" stroke-width="1.2" fill="rgba(102,187,106,0.15)"/>
          <line x1="0" y1="18" x2="5" y2="18" stroke="#66BB6A" stroke-width="1"/><line x1="31" y1="18" x2="36" y2="18" stroke="#66BB6A" stroke-width="1"/>
        </svg>`,
      },
    ],
  },
  {
    id: 4,
    label: 'NLP & LLMs',
    sub: '5 skills',
    emoji: '💬',
    title: 'NLP & LLMs',
    desc: 'Building intelligent text processing systems and integrating large language models.',
    viz: 'particles',
    highlight: ['Transformers', 'RAG'],
    skills: [
      {
        name: 'Transformers',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <rect x="4" y="4" width="6" height="6" rx="1" stroke="#FF7043" stroke-width="1.2" fill="rgba(255,112,67,0.15)"/>
          <rect x="15" y="4" width="6" height="6" rx="1" stroke="#FF7043" stroke-width="1.2" fill="rgba(255,112,67,0.15)"/>
          <rect x="26" y="4" width="6" height="6" rx="1" stroke="#FF7043" stroke-width="1.2" fill="rgba(255,112,67,0.15)"/>
          <rect x="13" y="15" width="10" height="8" rx="2" stroke="#FFA726" stroke-width="1.5" fill="rgba(255,167,38,0.1)"/>
          <line x1="7" y1="10" x2="15" y2="15" stroke="#555" stroke-width="0.8"/><line x1="18" y1="10" x2="18" y2="15" stroke="#555" stroke-width="0.8"/>
          <line x1="29" y1="10" x2="21" y2="15" stroke="#555" stroke-width="0.8"/>
          <line x1="18" y1="23" x2="18" y2="32" stroke="#FFA726" stroke-width="1.2"/>
          <polyline points="15,29 18,32 21,29" stroke="#FFA726" stroke-width="1.2"/>
        </svg>`,
      },
      {
        name: 'Embeddings',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="18,3 32,10 32,26 18,33 4,26 4,10" stroke="#7E57C2" stroke-width="1.2" fill="none"/>
          <circle cx="18" cy="18" r="5" stroke="#AB47BC" stroke-width="1.5" fill="rgba(171,71,188,0.1)"/>
          <line x1="18" y1="13" x2="18" y2="3" stroke="#7E57C2" stroke-width="0.8"/>
          <line x1="22" y1="15" x2="32" y2="10" stroke="#7E57C2" stroke-width="0.8"/>
          <line x1="14" y1="21" x2="4" y2="26" stroke="#7E57C2" stroke-width="0.8"/>
        </svg>`,
      },
      {
        name: 'Prompt Eng.',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <rect x="4" y="5" width="28" height="22" rx="2" stroke="#26A69A" stroke-width="1.5" fill="none"/>
          <line x1="4" y1="12" x2="32" y2="12" stroke="#333" stroke-width="1"/>
          <circle cx="8" cy="8.5" r="1.2" fill="#EF5350"/><circle cx="12" cy="8.5" r="1.2" fill="#FFA726"/><circle cx="16" cy="8.5" r="1.2" fill="#66BB6A"/>
          <text x="9" y="21.5" fill="#26A69A" font-family="monospace" font-size="10" font-weight="bold">❯ _</text>
        </svg>`,
      },
      {
        name: 'RAG',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="22" rx="2" stroke="#42A5F5" stroke-width="1.5" fill="none"/>
          <line x1="7" y1="10" x2="17" y2="10" stroke="#42A5F5" stroke-width="1" opacity="0.5"/>
          <line x1="7" y1="14" x2="17" y2="14" stroke="#42A5F5" stroke-width="1" opacity="0.5"/>
          <line x1="7" y1="18" x2="14" y2="18" stroke="#42A5F5" stroke-width="1" opacity="0.5"/>
          <circle cx="26" cy="24" r="6" stroke="#FFA726" stroke-width="1.5" fill="none"/>
          <line x1="30.2" y1="28.2" x2="34" y2="32" stroke="#FFA726" stroke-width="2" stroke-linecap="round"/>
        </svg>`,
      },
      {
        name: 'Contextual LM',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 8 Q4 4 8 4 H28 Q32 4 32 8 V18 Q32 22 28 22 H20 L14 30 L14 22 H8 Q4 22 4 18 Z" stroke="#26C6DA" stroke-width="1.5" fill="none"/>
          <path d="M10 10 Q14 8 22 10" stroke="#26C6DA" stroke-width="1.2" fill="none"/>
          <path d="M10 14 Q16 16 26 14" stroke="#26C6DA" stroke-width="1.2" fill="none"/>
          <path d="M10 18 Q13 17 18 18" stroke="#26C6DA" stroke-width="1" fill="none" opacity="0.6"/>
        </svg>`,
      },
    ],
  },
  {
    id: 5,
    label: 'Vector Search',
    sub: '4 skills',
    emoji: '🔍',
    title: 'Vector Search',
    desc: 'Architecting high-speed similarity search and retrieval systems for unstructured data.',
    viz: 'bars',
    bars: [
      { l: 'FAISS', v: 90 },
      { l: 'Vector DBs', v: 82 },
      { l: 'Indexing', v: 78 },
      { l: 'ANN', v: 75 },
    ],
    highlight: ['FAISS'],
    skills: [
      {
        name: 'FAISS',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="18" cy="18" r="14" stroke="#1565C0" stroke-width="1.5" fill="none"/>
          <text x="10" y="24" fill="#42A5F5" font-family="Arial" font-size="16" font-weight="bold">F</text>
          <circle cx="27" cy="26" r="2" fill="#42A5F5"/>
        </svg>`,
      },
      {
        name: 'Vector Databases',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <ellipse cx="18" cy="9" rx="12" ry="4" stroke="#7E57C2" stroke-width="1.5" fill="none"/>
          <path d="M6 9 v8 c0 2.2 5.4 4 12 4 s12-1.8 12-4 V9" stroke="#7E57C2" stroke-width="1.5"/>
          <path d="M6 17 v8 c0 2.2 5.4 4 12 4 s12-1.8 12-4 v-8" stroke="#7E57C2" stroke-width="1.5"/>
          <circle cx="13" cy="22" r="1.3" fill="#AB47BC"/><circle cx="18" cy="24" r="1.3" fill="#AB47BC"/><circle cx="23" cy="22" r="1.3" fill="#AB47BC"/>
        </svg>`,
      },
      {
        name: 'ANN Search',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="7" cy="7" r="3" fill="#26A69A"/><circle cx="29" cy="7" r="3" fill="#26A69A"/>
          <circle cx="7" cy="29" r="3" fill="#26A69A"/><circle cx="29" cy="29" r="3" fill="#26A69A"/>
          <circle cx="18" cy="18" r="4" fill="#66BB6A"/>
          <line x1="10" y1="9" x2="15" y2="15" stroke="#333" stroke-width="0.8"/><line x1="26" y1="9" x2="21" y2="15" stroke="#333" stroke-width="0.8"/>
          <line x1="10" y1="27" x2="15" y2="21" stroke="#333" stroke-width="0.8"/><line x1="26" y1="27" x2="21" y2="21" stroke="#333" stroke-width="0.8"/>
        </svg>`,
      },
      {
        name: 'Emb. Indexing',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <rect x="4" y="6" width="16" height="4" rx="1" fill="#42A5F5" opacity="0.3" stroke="#42A5F5" stroke-width="1"/>
          <rect x="4" y="13" width="22" height="4" rx="1" fill="#42A5F5" opacity="0.5" stroke="#42A5F5" stroke-width="1"/>
          <rect x="4" y="20" width="12" height="4" rx="1" fill="#42A5F5" opacity="0.7" stroke="#42A5F5" stroke-width="1"/>
          <rect x="4" y="27" width="8" height="4" rx="1" fill="#42A5F5" opacity="0.9" stroke="#42A5F5" stroke-width="1"/>
          <line x1="28" y1="8" x2="28" y2="30" stroke="#555" stroke-width="1.2"/>
          <polyline points="26,12 28,8 30,12" stroke="#555" stroke-width="1.2"/>
        </svg>`,
      },
    ],
  },
  {
    id: 6,
    label: 'Computer Vision',
    sub: '3 skills',
    emoji: '👁️',
    title: 'Computer Vision',
    desc: 'Extracting meaningful features from images and video streams for real-time analysis.',
    viz: 'bars',
    bars: [
      { l: 'OpenCV', v: 80 },
      { l: 'Classification', v: 75 },
      { l: 'Feature Ext.', v: 72 },
    ],
    highlight: [],
    skills: [
      {
        name: 'OpenCV',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 4 A14 14 0 0 1 30 24" stroke="#EF5350" stroke-width="3" fill="none" stroke-linecap="round"/>
          <path d="M30 24 A14 14 0 0 1 6 24" stroke="#66BB6A" stroke-width="3" fill="none" stroke-linecap="round"/>
          <path d="M6 24 A14 14 0 0 1 18 4" stroke="#42A5F5" stroke-width="3" fill="none" stroke-linecap="round"/>
          <circle cx="18" cy="18" r="4" stroke="#e5e5e5" stroke-width="1.5" fill="none"/>
        </svg>`,
      },
      {
        name: 'Image Classif.',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <rect x="4" y="5" width="22" height="18" rx="2" stroke="#42A5F5" stroke-width="1.5" fill="none"/>
          <circle cx="10" cy="11" r="2.5" fill="#FFA726" stroke="none"/>
          <polyline points="4,18 10,13 15,17 20,11 26,17" stroke="#42A5F5" stroke-width="1.2" fill="none"/>
          <rect x="20" y="24" width="14" height="8" rx="2" stroke="#66BB6A" stroke-width="1.2" fill="rgba(102,187,106,0.1)"/>
          <text x="22" y="30" fill="#66BB6A" font-size="6" font-family="monospace">TAG</text>
        </svg>`,
      },
      {
        name: 'Feature Ext.',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="4" width="9" height="9" rx="1" stroke="#7E57C2" stroke-width="1.2" fill="rgba(126,87,194,0.1)"/>
          <rect x="2" y="16" width="9" height="9" rx="1" stroke="#7E57C2" stroke-width="1.2" fill="rgba(126,87,194,0.1)"/>
          <rect x="14" y="10" width="9" height="9" rx="1" stroke="#AB47BC" stroke-width="1.3" fill="rgba(171,71,188,0.1)"/>
          <rect x="26" y="12" width="8" height="8" rx="2" stroke="#E040FB" stroke-width="1.5" fill="rgba(224,64,251,0.1)"/>
          <line x1="11" y1="8" x2="14" y2="13" stroke="#555" stroke-width="1"/><line x1="11" y1="21" x2="14" y2="17" stroke="#555" stroke-width="1"/>
          <line x1="23" y1="14" x2="26" y2="16" stroke="#555" stroke-width="1"/>
          <circle cx="34" cy="16" r="2" fill="#E040FB"/>
        </svg>`,
      },
    ],
  },
  {
    id: 7,
    label: 'Tools & Frameworks',
    sub: '10 skills',
    emoji: '🛠️',
    title: 'Tools & Frameworks',
    desc: 'Ecosystem of libraries for experiment tracking, deployment, and data manipulation.',
    viz: 'particles',
    highlight: ['MLflow', 'FastAPI'],
    skills: [
      {
        name: 'Scikit-learn',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="18" cy="18" r="13" stroke="#F7931E" stroke-width="1.5" fill="none"/>
          <path d="M18 5 L18 18 L28 26" stroke="#F7931E" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          <path d="M18 5 A13 13 0 0 1 28 26" fill="rgba(247,147,30,0.2)" stroke="none"/>
        </svg>`,
      },
      {
        name: 'TensorFlow',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="18,2 32,10 32,18 18,26 4,18 4,10" stroke="#FF6F00" stroke-width="1.5" fill="rgba(255,111,0,0.1)"/>
          <text x="10" y="18" fill="#FF6F00" font-family="Arial" font-size="12" font-weight="bold">TF</text>
          <line x1="18" y1="26" x2="18" y2="34" stroke="#FF6F00" stroke-width="1.5"/>
        </svg>`,
      },
      {
        name: 'Keras',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <line x1="10" y1="5" x2="10" y2="31" stroke="#D32F2F" stroke-width="2.5"/>
          <path d="M10 18 L24 5" stroke="#D32F2F" stroke-width="2.5"/>
          <path d="M10 18 L26 31" stroke="#D32F2F" stroke-width="2.5"/>
        </svg>`,
      },
      {
        name: 'Pandas',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <rect x="4" y="4" width="28" height="28" rx="2" stroke="#150458" stroke-width="1.5" fill="none"/>
          <line x1="4" y1="12" x2="32" y2="12" stroke="#150458" stroke-width="1"/><line x1="4" y1="20" x2="32" y2="20" stroke="#150458" stroke-width="1"/><line x1="4" y1="28" x2="32" y2="28" stroke="#150458" stroke-width="1"/>
          <line x1="14" y1="4" x2="14" y2="32" stroke="#150458" stroke-width="1"/><line x1="24" y1="4" x2="24" y2="32" stroke="#150458" stroke-width="1"/>
          <rect x="5" y="5" width="8" height="6" fill="rgba(21,4,88,0.25)"/><rect x="25" y="13" width="6" height="6" fill="rgba(21,4,88,0.25)"/>
        </svg>`,
      },
      {
        name: 'NumPy',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="18,3 33,11 33,25 18,33 3,25 3,11" stroke="#4DABCF" stroke-width="1.5" fill="none"/>
          <polygon points="18,8 28,13 28,23 18,28 8,23 8,13" stroke="#4DABCF" stroke-width="1" fill="rgba(77,171,207,0.1)"/>
          <text x="12" y="22" fill="#4DABCF" font-family="Arial" font-size="10" font-weight="bold">N</text>
        </svg>`,
      },
      {
        name: 'MLflow',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 28 Q10 10 18 20 Q26 30 32 8" stroke="#0194E2" stroke-width="2" fill="none"/>
          <circle cx="10" cy="17" r="2.5" fill="#0194E2"/><circle cx="18" cy="20" r="2.5" fill="#0194E2"/><circle cx="28" cy="12" r="2.5" fill="#0194E2"/>
          <polyline points="29,5 32,8 29,11" stroke="#0194E2" stroke-width="1.5"/>
        </svg>`,
      },
      {
        name: 'Streamlit',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 4 L30 30 L6 30 Z" stroke="#FF4B4B" stroke-width="1.5" fill="none"/>
          <path d="M18 12 L26 30 L10 30 Z" stroke="#FF4B4B" stroke-width="1" fill="rgba(255,75,75,0.15)"/>
        </svg>`,
      },
      {
        name: 'FastAPI',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="18" cy="18" r="14" stroke="#009688" stroke-width="1.5" fill="none"/>
          <path d="M21 5 L13 20 L19 20 L15 31 L25 16 L19 16 Z" stroke="#009688" stroke-width="1.5" fill="rgba(0,150,136,0.15)"/>
        </svg>`,
      },
      {
        name: 'Git & GitHub',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="10" cy="7" r="3" stroke="#F05032" stroke-width="1.5" fill="none"/>
          <circle cx="10" cy="29" r="3" stroke="#F05032" stroke-width="1.5" fill="none"/>
          <circle cx="26" cy="14" r="3" stroke="#F05032" stroke-width="1.5" fill="none"/>
          <line x1="10" y1="10" x2="10" y2="26" stroke="#F05032" stroke-width="1.5"/>
          <path d="M13 7 Q18 7 20 10 L23 14" stroke="#F05032" stroke-width="1.5" fill="none"/>
        </svg>`,
      },
      {
        name: 'Apache Airflow',
        svg: `<svg role="img" viewBox="0 0 24 24" fill="#017CEE" xmlns="http://www.w3.org/2000/svg"><path d="M17.195 16.822l4.002-4.102C23.55 10.308 23.934 5.154 24 .43a.396.396 0 0 0-.246-.373.392.392 0 0 0-.437.09l-6.495 6.658-4.102-4.003C10.309.45 5.154.066.43 0H.423a.397.397 0 0 0-.277.683l6.658 6.494-4.003 4.103C.45 13.692.065 18.846 0 23.57a.398.398 0 0 0 .683.282l6.494-6.657 3.934 3.837.17.165c2.41 2.353 7.565 2.737 12.288 2.803h.006a.397.397 0 0 0 .277-.683l-6.657-6.495zm-.409-9.476c.04.115.05.24.031.344-.17.96-1.593 2.538-4.304 3.87a.597.597 0 0 0-.08-.079c1.432-3.155 1.828-5.61 1.175-7.322l3.058 2.984.12.203zm-.131 9.44a.73.73 0 0 1-.347.031c-.96-.171-2.537-1.594-3.87-4.307a.656.656 0 0 0 .08-.078l-.001.001c3.155 1.432 5.61 1.83 7.324 1.174l-2.969 3.043M23.568.392a.05.05 0 0 1 .052-.011c.018.006.03.024.029.043-.065 4.655-.437 9.726-2.703 12.05-1.53 1.565-4.326 1.419-8.283-.377.006-.037.021-.07.02-.108 0-.044-.017-.082-.026-.123 2.83-1.39 4.315-3.037 4.506-4.115.057-.322-.009-.542-.102-.688l6.507-6.67V.392zM.393.43A.045.045 0 0 1 .382.38C.39.36.403.343.425.35c4.655.065 9.727.438 12.05 2.703l.002.002c1.56 1.527 1.415 4.323-.379 8.28-.033-.005-.062-.02-.097-.02h-.008c-.045.001-.084.019-.126.027-1.39-2.83-3.037-4.314-4.115-4.506-.323-.057-.542.01-.688.103L.393.43zm11.94 11.563a.331.331 0 0 1-.327.335H12a.332.332 0 0 1-.004-.661c.172.016.333.144.335.326h.002zm-5.12 4.661a.722.722 0 0 1-.03-.345c.17-.96 1.595-2.54 4.309-3.873.013.016.019.035.033.05.013.012.03.017.044.028-1.434 3.158-1.83 5.613-1.177 7.326l-3.041-2.967m-.006-9.659a.735.735 0 0 1 .345-.031c.961.17 2.54 1.594 3.871 4.306a.597.597 0 0 0-.079.08c-2.167-.983-4.007-1.484-5.498-1.484-.68 0-1.289.103-1.825.308L7.128 7.35M.43 23.607c-.018.018-.038.015-.052.01-.019-.007-.028-.021-.028-.043.065-4.654.437-9.725 2.703-12.049 1.527-1.565 4.325-1.419 8.286.378-.006.035-.02.067-.02.104 0 .043.018.083.026.124-2.831 1.391-4.317 3.04-4.51 4.117-.057.322.01.542.103.688L.43 23.607zm23.144.042c-4.655-.065-9.726-.437-12.05-2.703l-.005-.006c-1.56-1.526-1.412-4.322.383-8.279.033.005.064.02.098.02h.009c.043 0 .08-.018.122-.027 1.39 2.832 3.036 4.317 4.115 4.51.083.014.16.021.23.021a.776.776 0 0 0 .45-.133l6.68 6.516c.02.02.016.04.01.052a.042.042 0 0 1-.042.029z"/></svg>`,
      },
    ],
  },
  {
    id: 8,
    label: 'System Design',
    sub: '5 skills',
    emoji: '⚙️',
    title: 'System Design & Engineering',
    desc: 'Architecting robust, scalable, and production-ready machine learning systems.',
    viz: 'nodes',
    highlight: ['ML Pipeline', 'Kafka Streaming'],
    skills: [
      {
        name: 'ML Pipeline',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <rect x="1" y="13" width="8" height="10" rx="2" stroke="#26A69A" stroke-width="1.5" fill="rgba(38,166,154,0.1)"/>
          <rect x="14" y="13" width="8" height="10" rx="2" stroke="#66BB6A" stroke-width="1.5" fill="rgba(102,187,106,0.1)"/>
          <rect x="27" y="13" width="8" height="10" rx="2" stroke="#42A5F5" stroke-width="1.5" fill="rgba(66,165,245,0.1)"/>
          <line x1="9" y1="18" x2="14" y2="18" stroke="#555" stroke-width="1.2"/><polyline points="12,16 14,18 12,20" stroke="#555" stroke-width="1"/>
          <line x1="22" y1="18" x2="27" y2="18" stroke="#555" stroke-width="1.2"/><polyline points="25,16 27,18 25,20" stroke="#555" stroke-width="1"/>
        </svg>`,
      },
      {
        name: 'Kafka Streaming',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2 10 Q8 6 14 12 Q20 18 26 12 Q32 6 34 10" stroke="#26C6DA" stroke-width="1.8" fill="none"/>
          <path d="M2 18 Q8 14 14 20 Q20 26 26 20 Q32 14 34 18" stroke="#42A5F5" stroke-width="1.8" fill="none"/>
          <path d="M2 26 Q8 22 14 28 Q20 34 26 28 Q32 22 34 26" stroke="#7E57C2" stroke-width="1.8" fill="none"/>
          <circle cx="14" cy="12" r="2" fill="#26C6DA"/><circle cx="26" cy="20" r="2" fill="#42A5F5"/>
        </svg>`,
      },
      {
        name: 'Scalable Inference',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <rect x="6" y="22" width="24" height="6" rx="1.5" stroke="#42A5F5" stroke-width="1.2" fill="rgba(66,165,245,0.1)"/>
          <rect x="9" y="14" width="18" height="6" rx="1.5" stroke="#66BB6A" stroke-width="1.2" fill="rgba(102,187,106,0.1)"/>
          <rect x="12" y="6" width="12" height="6" rx="1.5" stroke="#FFA726" stroke-width="1.2" fill="rgba(255,167,38,0.1)"/>
          <polygon points="18,1 15,5 21,5" fill="#FFA726" stroke="none"/>
        </svg>`,
      },
      {
        name: 'Model Monitoring',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="2,26 8,20 14,23 18,14 24,18 30,12" stroke="#26A69A" stroke-width="1.5" fill="none"/>
          <line x1="22" y1="6" x2="22" y2="18" stroke="#EF5350" stroke-width="1" stroke-dasharray="2 2"/>
          <circle cx="22" cy="5" r="2.5" stroke="#EF5350" stroke-width="1.5" fill="none"/>
          <line x1="2" y1="30" x2="34" y2="30" stroke="#333" stroke-width="1"/>
        </svg>`,
      },
      {
        name: 'Production APIs',
        svg: `<svg viewBox="0 0 36 36" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="8" width="12" height="20" rx="2" stroke="#42A5F5" stroke-width="1.5" fill="none"/>
          <rect x="21" y="12" width="12" height="12" rx="2" stroke="#66BB6A" stroke-width="1.5" fill="none"/>
          <line x1="15" y1="18" x2="21" y2="18" stroke="#555" stroke-width="1.5"/>
          <circle cx="18" cy="18" r="1.5" fill="#FFA726"/>
          <line x1="7" y1="14" x2="11" y2="14" stroke="#42A5F5" stroke-width="1" opacity="0.5"/><line x1="7" y1="18" x2="11" y2="18" stroke="#42A5F5" stroke-width="1" opacity="0.5"/>
          <line x1="25" y1="18" x2="29" y2="18" stroke="#66BB6A" stroke-width="1" opacity="0.5"/>
        </svg>`,
      },
    ],
  },
];

/* ============================================================
   DEFAULT STATE — Neural Network Animation
   ============================================================ */
function buildDefaultState() {
  // Micro-dots at random positions
  const dotPositions = [
    {l:5,t:10,s:1.2,o:0.08,c:'var(--accent)',d:0},{l:15,t:80,s:0.8,o:0.12,c:'#6e8efb',d:0.5},{l:25,t:30,s:1.5,o:0.06,c:'var(--accent)',d:1.2},
    {l:40,t:15,s:0.6,o:0.1,c:'#f9a03f',d:0.8},{l:55,t:85,s:1.0,o:0.14,c:'var(--accent)',d:1.5},{l:70,t:20,s:1.8,o:0.04,c:'#6e8efb',d:0.3},
    {l:80,t:70,s:0.5,o:0.16,c:'var(--accent)',d:2.0},{l:90,t:45,s:1.3,o:0.07,c:'#f9a03f',d:1.0},{l:35,t:60,s:0.9,o:0.11,c:'#6e8efb',d:1.8},
    {l:60,t:40,s:1.1,o:0.09,c:'var(--accent)',d:0.6},{l:85,t:15,s:0.7,o:0.13,c:'var(--accent)',d:2.2},{l:10,t:50,s:1.4,o:0.05,c:'#f9a03f',d:1.4},
    {l:50,t:5,s:0.4,o:0.15,c:'#6e8efb',d:0.9},{l:75,t:90,s:1.6,o:0.06,c:'var(--accent)',d:1.6},{l:20,t:65,s:0.8,o:0.1,c:'var(--accent)',d:0.4},
    {l:45,t:75,s:1.0,o:0.08,c:'#6e8efb',d:2.4},{l:65,t:55,s:0.6,o:0.12,c:'#f9a03f',d:1.1},{l:30,t:90,s:1.2,o:0.07,c:'var(--accent)',d:0.7},
    {l:95,t:60,s:0.5,o:0.14,c:'#6e8efb',d:1.3},{l:50,t:50,s:1.0,o:0.05,c:'var(--accent)',d:1.9}
  ];

  // Floating skill chips
  const chipData = [
    {name:'Python',l:8,t:18},{name:'Transformers',l:68,t:8},{name:'FAISS',l:72,t:78},
    {name:'FastAPI',l:5,t:72},{name:'TensorFlow',l:60,t:45},{name:'RAG',l:30,t:8},
    {name:'LSTM',l:78,t:35},{name:'OpenCV',l:15,t:48},{name:'Kafka',l:48,t:82}
  ];

  const dotsHtml = dotPositions.map((d, i) => `
    <div class="skw-nn-dot" style="left:${d.l}%;top:${d.t}%;width:${d.s}px;height:${d.s}px;opacity:${d.o};background:${d.c};animation:neuralPulse ${2+i*0.3}s ease-in-out ${d.d}s infinite"></div>
  `).join('');

  const chipsHtml = chipData.map((c, i) => `
    <div class="skw-nn-chip" style="left:${c.l}%;top:${c.t}%;animation:chipDrift ${3+i*0.4}s ease-in-out ${i*0.35}s infinite">${c.name}</div>
  `).join('');

  return `
    <div class="skw-nn-default">
      ${dotsHtml}
      ${chipsHtml}
      <div class="skw-nn-svg-wrap">
        <svg viewBox="0 0 200 200" fill="none">
          <!-- Edges Layer 1 → 2 -->
          <line x1="30" y1="50" x2="100" y2="30" stroke="rgba(100,255,218,0.15)" stroke-width="1" stroke-dasharray="40" class="skw-nn-edge" style="animation-delay:0s"/>
          <line x1="30" y1="50" x2="100" y2="100" stroke="rgba(100,255,218,0.15)" stroke-width="1" stroke-dasharray="40" class="skw-nn-edge" style="animation-delay:0.3s"/>
          <line x1="30" y1="50" x2="100" y2="170" stroke="rgba(100,255,218,0.15)" stroke-width="1" stroke-dasharray="40" class="skw-nn-edge" style="animation-delay:0.6s"/>
          <line x1="30" y1="150" x2="100" y2="30" stroke="rgba(100,255,218,0.15)" stroke-width="1" stroke-dasharray="40" class="skw-nn-edge" style="animation-delay:0.15s"/>
          <line x1="30" y1="150" x2="100" y2="100" stroke="rgba(100,255,218,0.15)" stroke-width="1" stroke-dasharray="40" class="skw-nn-edge" style="animation-delay:0.45s"/>
          <line x1="30" y1="150" x2="100" y2="170" stroke="rgba(100,255,218,0.15)" stroke-width="1" stroke-dasharray="40" class="skw-nn-edge" style="animation-delay:0.75s"/>
          <!-- Edges Layer 2 → 3 -->
          <line x1="100" y1="30" x2="170" y2="80" stroke="rgba(110,142,251,0.15)" stroke-width="1" stroke-dasharray="40" class="skw-nn-edge" style="animation-delay:0.2s"/>
          <line x1="100" y1="30" x2="170" y2="150" stroke="rgba(110,142,251,0.15)" stroke-width="1" stroke-dasharray="40" class="skw-nn-edge" style="animation-delay:0.5s"/>
          <line x1="100" y1="100" x2="170" y2="80" stroke="rgba(110,142,251,0.15)" stroke-width="1" stroke-dasharray="40" class="skw-nn-edge" style="animation-delay:0.35s"/>
          <line x1="100" y1="100" x2="170" y2="150" stroke="rgba(110,142,251,0.15)" stroke-width="1" stroke-dasharray="40" class="skw-nn-edge" style="animation-delay:0.65s"/>
          <line x1="100" y1="170" x2="170" y2="80" stroke="rgba(110,142,251,0.15)" stroke-width="1" stroke-dasharray="40" class="skw-nn-edge" style="animation-delay:0.4s"/>
          <line x1="100" y1="170" x2="170" y2="150" stroke="rgba(110,142,251,0.15)" stroke-width="1" stroke-dasharray="40" class="skw-nn-edge" style="animation-delay:0.7s"/>
          <!-- Layer 1 nodes (input) -->
          <circle cx="30" cy="50" r="6" fill="var(--accent)" class="skw-nn-node" style="animation-delay:0s"/>
          <circle cx="30" cy="150" r="6" fill="var(--accent)" class="skw-nn-node" style="animation-delay:0.3s"/>
          <!-- Layer 2 nodes (hidden) -->
          <circle cx="100" cy="30" r="8" fill="#6e8efb" class="skw-nn-node" style="animation-delay:0.15s"/>
          <circle cx="100" cy="100" r="9" fill="var(--accent)" filter="url(#nodeGlow)" class="skw-nn-node" style="animation-delay:0.45s"/>
          <circle cx="100" cy="170" r="8" fill="#6e8efb" class="skw-nn-node" style="animation-delay:0.6s"/>
          <!-- Layer 3 nodes (output) -->
          <circle cx="170" cy="80" r="6" fill="#f9a03f" class="skw-nn-node" style="animation-delay:0.2s"/>
          <circle cx="170" cy="150" r="6" fill="#f9a03f" class="skw-nn-node" style="animation-delay:0.5s"/>
          <!-- Glow filter -->
          <defs><filter id="nodeGlow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
        </svg>
      </div>
      <div class="skw-nn-hint">
        <span class="skw-nn-arrow">←</span>
        <span>Select a category to explore skills</span>
      </div>
    </div>
  `;
}

/* ============================================================
   RENDER HELPERS
   ============================================================ */
function buildSkillTile(skill, isHighlighted, idx) {
  const highlightClass = isHighlighted ? 'skw-tile--highlighted' : '';
  const opacityStyle = isHighlighted ? '' : 'opacity:0.7';
  return `
    <div class="skw-tile ${highlightClass}" style="animation-delay:${idx * 0.05}s">
      <div class="skw-tile-icon" style="width:36px;height:36px;${opacityStyle}">
        ${skill.svg}
      </div>
      <span class="skw-tile-name ${isHighlighted ? 'skw-tile-name--hl' : ''}">${skill.name}</span>
    </div>
  `;
}

function buildBarsViz(bars) {
  return `
    <div class="skw-viz skw-viz-bars">
      <div class="skw-viz-label">Proficiency</div>
      ${bars.map((b, i) => `
        <div class="skw-bar-row" style="animation-delay:${i * 0.08}s">
          <span class="skw-bar-name">${b.l}</span>
          <div class="skw-bar-track">
            <div class="skw-bar-fill" data-target="${b.v}" style="width:0%"></div>
          </div>
          <span class="skw-bar-val">${b.v}%</span>
        </div>
      `).join('')}
    </div>
  `;
}

function buildNodesViz() {
  return `
    <div class="skw-viz skw-viz-nodes">
      <div class="skw-viz-label">Architecture</div>
      <svg viewBox="0 0 320 56" class="skw-nodes-svg" fill="none">
        <line x1="40" y1="14" x2="120" y2="14" stroke="rgba(100,255,218,0.2)" stroke-width="1"/>
        <line x1="40" y1="14" x2="120" y2="42" stroke="rgba(100,255,218,0.2)" stroke-width="1"/>
        <line x1="40" y1="42" x2="120" y2="14" stroke="rgba(100,255,218,0.2)" stroke-width="1"/>
        <line x1="40" y1="42" x2="120" y2="42" stroke="rgba(100,255,218,0.2)" stroke-width="1"/>
        <line x1="120" y1="14" x2="200" y2="14" stroke="rgba(110,142,251,0.2)" stroke-width="1"/>
        <line x1="120" y1="42" x2="200" y2="14" stroke="rgba(110,142,251,0.2)" stroke-width="1"/>
        <line x1="120" y1="14" x2="200" y2="42" stroke="rgba(110,142,251,0.2)" stroke-width="1"/>
        <line x1="120" y1="42" x2="200" y2="42" stroke="rgba(110,142,251,0.2)" stroke-width="1"/>
        <line x1="200" y1="14" x2="280" y2="28" stroke="rgba(249,160,63,0.2)" stroke-width="1"/>
        <line x1="200" y1="42" x2="280" y2="28" stroke="rgba(249,160,63,0.2)" stroke-width="1"/>
        <circle cx="40" cy="14" r="6" fill="var(--accent)" class="skw-nn-node" style="animation-delay:0s"/>
        <circle cx="40" cy="42" r="6" fill="var(--accent)" class="skw-nn-node" style="animation-delay:0.2s"/>
        <circle cx="120" cy="14" r="7" fill="#6e8efb" class="skw-nn-node" style="animation-delay:0.1s"/>
        <circle cx="120" cy="42" r="7" fill="#6e8efb" class="skw-nn-node" style="animation-delay:0.3s"/>
        <circle cx="200" cy="14" r="7" fill="#6e8efb" class="skw-nn-node" style="animation-delay:0.15s"/>
        <circle cx="200" cy="42" r="7" fill="#6e8efb" class="skw-nn-node" style="animation-delay:0.35s"/>
        <circle cx="280" cy="28" r="8" fill="#f9a03f" class="skw-nn-node" style="animation-delay:0.25s"/>
      </svg>
    </div>
  `;
}

function buildParticlesViz(count) {
  const n = Math.min(count * 3, 20);
  const colors = ['var(--accent)', '#6e8efb', '#f9a03f'];
  return `
    <div class="skw-viz skw-viz-particles">
      <div class="skw-viz-label">Activity</div>
      <div class="skw-particles-row">
        ${Array.from({ length: n }, (_, i) => `
          <div class="skw-particle" style="background:${colors[i%3]};animation-delay:${(i*0.12).toFixed(2)}s"></div>
        `).join('')}
      </div>
    </div>
  `;
}

function buildDetailPanel(cat) {
  const skillsHtml = cat.skills.map((sk, i) =>
    buildSkillTile(sk, cat.highlight.includes(sk.name), i)
  ).join('');

  let vizHtml = '';
  if (cat.viz === 'bars' && cat.bars) vizHtml = buildBarsViz(cat.bars);
  else if (cat.viz === 'nodes') vizHtml = buildNodesViz();
  else if (cat.viz === 'particles') vizHtml = buildParticlesViz(cat.skills.length);

  return `
    <div class="skw-panel-inner" style="animation:tileIn 0.3s ease both">
      <div class="skw-panel-section-tag">SKILLS &amp; CAPABILITIES</div>

      <div class="skw-panel-header">
        <div class="skw-panel-icon-box">
          <span style="font-size:22px">${cat.emoji}</span>
        </div>
        <div>
          <div class="skw-panel-title">${cat.title}</div>
          <div class="skw-panel-desc">${cat.desc}</div>
        </div>
      </div>

      <div class="skw-divider"></div>

      <div class="skw-skills-header">
        <span class="skw-skills-label">Skills</span>
        <span class="skw-skills-badge">${cat.skills.length}</span>
      </div>

      <div class="skw-icon-grid">
        ${skillsHtml}
      </div>

      ${vizHtml}
    </div>
  `;
}

/* ============================================================
   MAIN REACT COMPONENT
   ============================================================ */
const SkillsSection = () => {
  const [activeId, setActiveId] = useState(null);
  const panelRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mount: show neural network default
  useEffect(() => {
    if (panelRef.current) panelRef.current.innerHTML = buildDefaultState();
  }, []);

  // State changes: update panel
  useEffect(() => {
    if (!panelRef.current) return;

    const activeCat = cats.find(c => c.id === activeId);
    if (!activeCat) {
      panelRef.current.innerHTML = buildDefaultState();
      return;
    }

    panelRef.current.innerHTML = buildDetailPanel(activeCat);

    // Animate bars
    if (activeCat.viz === 'bars' && activeCat.bars) {
      setTimeout(() => {
        const fills = panelRef.current?.querySelectorAll('.skw-bar-fill');
        fills?.forEach(fill => {
          const target = fill.getAttribute('data-target');
          if (target) fill.style.width = target + '%';
        });
      }, 60);
    }
  }, [activeId]);

  const handleSelect = (id) => {
    setActiveId(prev => (prev === id ? null : id));
    if (isMobile) {
      setTimeout(() => {
        panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  return (
    <section className="section-container" style={{ paddingLeft: isMobile ? '24px' : undefined }}>
      <p className="section-label">03 — Technical Skills</p>
      <h2 className="section-title">Technical Expertise</h2>

      <div className={`skw-wrapper ${isMobile ? 'skw-wrapper--mobile' : ''}`}>
        {/* LEFT COLUMN */}
        <div className={`skw-left-col ${isMobile ? 'skw-left-col--mobile' : ''}`}>
          {cats.map(cat => {
            const isActive = activeId === cat.id;
            return (
              <button
                key={cat.id}
                className={`skw-cat-btn ${isActive ? 'skw-cat-btn--active' : ''}`}
                onClick={() => handleSelect(cat.id)}
                aria-pressed={isActive}
              >
                <span className="skw-cat-label">{cat.label}</span>
                <span className={`skw-cat-sub ${isActive ? 'skw-cat-sub--active' : ''}`}>{cat.sub}</span>
              </button>
            );
          })}
        </div>

        {/* RIGHT PANEL */}
        <div ref={panelRef} className="skw-right-panel" />
      </div>
    </section>
  );
};

export default SkillsSection;

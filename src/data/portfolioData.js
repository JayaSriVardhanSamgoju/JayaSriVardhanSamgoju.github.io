/*
  ===================================================
  CENTRALIZED PORTFOLIO DATA
  ===================================================
  This file is the single source of truth for all
  portfolio content. Both UI components and the
  chatbot read from this file.

  To update the chatbot's knowledge, simply update
  this file — no other changes needed.
  ===================================================
*/

export const personalInfo = {
  name: 'Jaya Sri Vardhan Samgoju',
  title: 'ML & AI Engineer',
  email: 'srivardhansamgoju@gmail.com',
  github: 'https://github.com/JayaSriVardhanSamgoju/Portfolio',
  linkedin: 'https://www.linkedin.com/in/jaya-sri-vardhan-samgoju/',
  resumePath: '/resume.pdf',
  bio: 'Fusing data with intelligence to build state-of-the-art AI solutions. Passionate about machine learning, deep neural networks, and translating complex algorithms into impactful real-world applications.',
  roles: ['AI Engineer', 'Data Scientist', 'ML Engineer', 'Works on LLMs'],
};

export const aboutContent = {
  heading: 'Building Intelligent Systems Through Machine Learning',
  paragraphs: [
    'I am a Computer Science Engineering student and an aspiring Machine Learning Engineer with a strong interest in Artificial Intelligence, Data Science, and Software Development. I enjoy building intelligent systems that solve real-world problems using Machine Learning, Deep Learning, and modern software engineering practices.',
    'Currently pursuing my B.Tech in Computer Science Engineering with a CGPA of 9.1, I have developed a solid foundation in Data Structures & Algorithms, Machine Learning, Deep Learning, Natural Language Processing (NLP), and System Design.',
    'My technical expertise includes developing end-to-end Machine Learning pipelines, working with Deep Learning architectures such as CNNs, RNNs, and LSTMs, and building NLP-based applications. I have hands-on experience in Python, Java, Streamlit, Scikit-learn, TensorFlow, and data preprocessing techniques for building production-oriented AI solutions.',
    'I have worked on several practical projects, including a Real-Time Industrial Equipment Failure Detection System, Disease Prediction Web Application, Student Performance Prediction, Phishing URL Detection, Sentiment Analysis using NLP, and Deep Learning-based classification systems. These projects helped me strengthen my skills in model development, data handling, deployment, and real-world problem solving.',
    'I believe in learning by building. My focus is not only on understanding concepts deeply but also on implementing scalable and impactful solutions. Currently, I am expanding my expertise in Large Language Models (LLMs), NLP, Computer Vision, and advanced Machine Learning systems to become a highly skilled AI/ML Engineer.',
    'I am actively seeking opportunities where I can contribute, learn, and grow while solving meaningful engineering problems through technology.',
  ],
};

export const projectsData = [
  {
    id: 'synoptiq',
    num: '01',
    name: 'SynoptiQ — Agentic Document Intelligence Engine',
    shortName: 'SynoptiQ',
    image: '/assets/projects/SynoptiQ.png',
    description:
      'A production-grade GenAI application that enables users to upload documents (PDF, DOCX, TXT) and query them using a multi-agent Retrieval-Augmented Generation (RAG) pipeline. Features a LangGraph-powered multi-agent orchestrator with Planner, Retriever, Synthesizer, and Verifier agents, hybrid retrieval (FAISS + BM25 + CrossEncoder reranking), input/output guardrails for security, JWT authentication with RBAC, real-time streaming responses, and a Next.js 14 frontend with glassmorphism design.',
    tags: [
      'FastAPI', 'LangChain', 'LangGraph', 'Groq', 'FAISS',
      'Next.js 14', 'TypeScript', 'TailwindCSS',
    ],
    github: 'https://github.com/JayaSriVardhanSamgoju/Agentic-Document-Intelligence-Engine',
  },
  {
    id: 'industrial',
    num: '02',
    name: 'Real-Time Industrial Equipment Failure Detection',
    shortName: 'Industrial Failure Detection',
    image: '/assets/projects/Real time intelligence.png',
    description:
      'A production-grade streaming Machine Learning pipeline for real-time industrial equipment monitoring. Continuously ingests sensor data via Apache Kafka, detects abnormal machine behavior using Isolation Forest with adaptive thresholds, provides multi-level alerts (LOW/MEDIUM/HIGH), monitors data drift with EvidentlyAI, tracks ML experiments with MLflow, and features a Streamlit dashboard with live charts and anomaly feeds.',
    tags: [
      'Apache Kafka', 'Isolation Forest', 'Streamlit', 'FastAPI',
      'MLflow', 'EvidentlyAI', 'Scikit-learn', 'Python',
    ],
    github: 'https://github.com/JayaSriVardhanSamgoju/Real-Time-Industry-Equipment-Failure-Detection-System',
  },
  {
    id: 'visionixai',
    num: '03',
    name: 'VisionixAI — Zone-Based Computer Vision Automation',
    shortName: 'VisionixAI',
    image: '/assets/projects/Visionix.png',
    description:
      'A computer vision platform for detecting human presence in room zones and triggering automated responses — no sensors, no hardware dependencies. Features a Node.js CLI tool for video analysis, a Python-based ML core using OpenCV and MediaPipe for real-time zone detection, and smart ON/OFF triggers based on visual presence. Designed for seamless automation through visual intelligence.',
    tags: [
      'OpenCV', 'MediaPipe', 'Python', 'Node.js',
      'Computer Vision', 'CLI', 'Automation',
    ],
    github: 'https://github.com/VisionixAI/',
  },
];

export const skillCategories = [
  {
    id: 1,
    title: 'LLM Engineering',
    category: 'left',
    skills: ['OpenAI', 'Anthropic', 'Gemini', 'QLoRA', 'LoRA', 'PEFT', 'Quantization', 'llama.cpp', 'Transformers', 'HuggingFace']
  },
  {
    id: 2,
    title: 'Backend and Infrastructure',
    category: 'left',
    skills: ['FastAPI', 'PostgreSQL', 'MySQL', 'SQLAlchemy', 'Docker', 'AWS', 'Vercel', 'Git', 'GitHub', 'DVC']
  },
  {
    id: 3,
    title: 'Agentic AI',
    category: 'right',
    skills: ['LangGraph', 'LangChain', 'CrewAI', 'Multi-Agent Systems', 'Agentic RAG', 'Tool-Calling', 'Long-Term Memory']
  },
  {
    id: 4,
    title: 'AI Systems',
    category: 'right',
    skills: ['RAG Pipelines', 'Vector DBs', 'ChromaDB', 'LLM Inference Optimization', 'PyTorch', 'TensorFlow', 'MLflow', 'scikit-learn', 'Forecasting', 'Computer Vision']
  }
];

export const educationData = [
  {
    degree: 'Bachelor of Technology — Computer Science Engineering',
    institution: 'Rajiv Gandhi University of Knowledge and Technologies (RGUKT), Ongole',
    period: '2022 – Present',
    cgpa: '9.1 / 10.0',
    highlight: true,
    description: 'Specializing in Artificial Intelligence, Machine Learning, and Data Science. Active participant in research projects and technical competitions.',
  },
  {
    degree: 'Pre-University Course',
    institution: 'RGUKT',
    period: '2020 – 2022',
    cgpa: '9.2 / 10.0',
    highlight: false,
    description: 'Strong foundation in Mathematics, Physics, Chemistry, and Computer Science.',
  },
  {
    degree: 'Secondary Education — Class X',
    institution: 'Jawahar Navodaya Vidyalaya, Maddirala',
    period: 'Completed',
    cgpa: null,
    highlight: false,
    description: 'A central government residential school with focus on academic excellence and holistic development.',
  },
];

export const certificationsData = [
  {
    id: 1,
    title: 'Data Science, Machine Learning, Deep Learning & NLP Bootcamp',
    issuer: 'Udemy',
    image: '/assets/certifications/Data Science,ML,DL,NLP Bootcamp.png',
    description:
      'A comprehensive bootcamp covering the full data science lifecycle — from data preprocessing and exploratory analysis to building Machine Learning models, Deep Learning architectures (CNNs, RNNs), and Natural Language Processing pipelines. Gained hands-on experience with real-world datasets and end-to-end project workflows.',
  },
  {
    id: 2,
    title: 'Foundations of Deep Learning',
    issuer: 'NPTEL',
    image: '/assets/certifications/Foundations of Deep Learning.png',
    description:
      'An in-depth academic course from NPTEL covering the mathematical and theoretical foundations of Deep Learning — including gradient-based optimization, backpropagation, activation functions, convolutional networks, recurrent architectures, and regularization techniques. Provides a rigorous understanding of how deep neural networks learn.',
  },
  {
    id: 3,
    title: 'Generative AI and ChatGPT',
    issuer: 'GeeksforGeeks',
    image: '/assets/certifications/Generative AI and ChatGPT.png',
    description:
      'A focused program exploring the foundations and applications of Generative AI, including large language models, transformer architectures, prompt engineering, and practical use cases of ChatGPT. Covers how generative models are built, fine-tuned, and deployed in real-world applications.',
  },
  {
    id: 4,
    title: 'Ignite India — Entrepreneurship & Innovation',
    issuer: 'Wadhwani Foundation',
    image: '/assets/certifications/Ignite India _Wadhwani.png',
    description:
      'A national-level certification program by the Wadhwani Foundation focused on entrepreneurship, innovation mindset, and building technology-driven solutions. Covers ideation, business model design, problem solving, and developing scalable ventures with social impact.',
  },
];

export const goalsData = [
  {
    label: 'SHORT TERM',
    title: 'Master Advanced ML',
    description: 'Master advanced Machine Learning and Deep Learning architectures including Transformers, GANs, and reinforcement learning.',
    color: '#00d4ff',
    items: ['Transformer architectures', 'Generative AI', 'MLOps basics', 'Research publications'],
  },
  {
    label: 'MID TERM',
    title: 'Scalable AI Systems',
    description: 'Build scalable AI systems and advanced NLP applications for production environments with real impact.',
    color: '#7c3aed',
    items: ['Production ML pipelines', 'Advanced NLP apps', 'Open source contributions', 'Industry internships'],
  },
  {
    label: 'LONG TERM',
    title: 'Professional Data Scientist',
    description: 'Become a professional Data Scientist developing impactful AI-driven solutions that make a real-world difference.',
    color: '#10b981',
    items: ['Lead AI research', 'Mentor others', 'Build AI products', 'Global impact projects'],
  },
];

export const researchInterests = [
  {
    title: 'Machine Learning Systems',
    description: 'Scalable ML architectures, AutoML, hyperparameter optimization, and production deployment strategies.',
    color: '#00d4ff',
  },
  {
    title: 'Deep Learning Architectures',
    description: 'Transformer models, GANs, attention mechanisms, and novel neural network designs.',
    color: '#7c3aed',
  },
  {
    title: 'Natural Language Processing',
    description: 'Language understanding, text generation, semantic search, and large language model fine-tuning.',
    color: '#ec4899',
  },
  {
    title: 'Computer Vision Applications',
    description: 'Object detection, image segmentation, medical imaging AI, and real-time visual recognition systems.',
    color: '#10b981',
  },
  {
    title: 'AI for Smart Cities',
    description: 'AI-driven solutions for urban infrastructure, traffic optimization, energy management, and public safety.',
    color: '#f59e0b',
  },
];

/*
  ===================================================
  CHATBOT KNOWLEDGE BASE
  ===================================================
  This aggregates all the above data into a searchable
  format for the rule-based chatbot. Add a separate
  "document" field later for custom document content.
  ===================================================
*/
export const chatbotKnowledge = {
  greetings: [
    'Hello! I\'m JSV\'s portfolio assistant. I can answer questions about Jaya Sri Vardhan\'s skills, projects, education, and experience. What would you like to know?',
    'Hi there! Ask me anything about Jaya Sri Vardhan — his projects, skills, certifications, or background.',
    'Welcome! I\'m here to help you learn about Jaya Sri Vardhan Samgoju. Feel free to ask anything!',
  ],
  topics: {
    about: {
      keywords: ['about', 'who', 'introduce', 'introduction', 'tell me', 'background', 'himself', 'bio', 'describe'],
      response: `Jaya Sri Vardhan Samgoju is a Computer Science Engineering student and an aspiring Machine Learning Engineer with a strong interest in Artificial Intelligence, Data Science, and Software Development. He is currently pursuing his B.Tech in CSE with a CGPA of 9.1. His expertise spans ML pipelines, Deep Learning (CNNs, RNNs, LSTMs), NLP, and system design. He is actively expanding his knowledge in LLMs, Computer Vision, and advanced ML systems.`,
    },
    education: {
      keywords: ['education', 'college', 'university', 'degree', 'cgpa', 'gpa', 'school', 'study', 'studying', 'btech', 'b.tech'],
      response: `Jaya Sri Vardhan is pursuing a B.Tech in Computer Science Engineering at RGUKT Ongole with a CGPA of 9.1/10.0 (2022–Present). He completed his Pre-University Course at RGUKT with a CGPA of 9.2/10.0. His secondary education was at Jawahar Navodaya Vidyalaya, Maddirala — a central government residential school.`,
    },
    skills: {
      keywords: ['skills', 'technologies', 'tech stack', 'programming', 'languages', 'tools', 'frameworks', 'expertise', 'proficient', 'know', 'llm', 'agentic'],
      response: `Key skills include LLM Engineering (OpenAI, Anthropic, Gemini, QLoRA, PEFT, Quantization, llama.cpp, Transformers, HuggingFace), Backend & Infra (FastAPI, PostgreSQL, Docker, AWS, Vercel, DVC), Agentic AI (LangGraph, LangChain, CrewAI, Multi-Agent Systems, Agentic RAG, Tool-Calling), and AI Systems (RAG Pipelines, Vector DBs, ChromaDB, PyTorch, TensorFlow, MLflow, scikit-learn, Computer Vision).`,
    },
    projects: {
      keywords: ['projects', 'work', 'built', 'developed', 'created', 'portfolio', 'synoptiq', 'industrial', 'failure detection', 'visionix'],
      response: `He has built three major projects: 1) SynoptiQ — An enterprise-grade Agentic RAG system with multi-agent orchestration (LangGraph), hybrid retrieval (FAISS + BM25), guardrails, JWT auth, and a Next.js 14 frontend. 2) Real-Time Industrial Equipment Failure Detection — A streaming ML pipeline using Apache Kafka, Isolation Forest, adaptive thresholds, MLflow tracking, EvidentlyAI drift detection, and a Streamlit dashboard. 3) VisionixAI — A computer vision platform for zone-based presence detection and automated responses using OpenCV and MediaPipe.`,
    },
    visionixai: {
      keywords: ['visionix', 'vision', 'computer vision', 'zone', 'presence', 'detection', 'mediapipe', 'opencv'],
      response: `VisionixAI is a computer vision platform for detecting human presence in room zones and triggering automated responses — no sensors or hardware dependencies needed. It features a Node.js CLI tool for video analysis, a Python-based ML core using OpenCV and MediaPipe, and smart ON/OFF triggers based on visual presence. The system divides video feeds into zones and detects presence to drive automation.`,
    },
    synoptiq: {
      keywords: ['synoptiq', 'document intelligence', 'rag', 'agentic', 'langchain', 'langgraph'],
      response: `SynoptiQ is a production-grade Agentic Document Intelligence Engine. It allows users to upload documents (PDF, DOCX, TXT) and query them using a multi-agent RAG pipeline. Built with FastAPI, LangChain, LangGraph, Groq, FAISS, and a Next.js 14 frontend. Features include multi-agent orchestration (Planner → Retriever → Synthesizer → Verifier), hybrid retrieval, input/output guardrails, JWT authentication with RBAC, real-time streaming, and citation tracking.`,
    },
    industrial: {
      keywords: ['industrial', 'equipment', 'failure', 'detection', 'sensor', 'kafka', 'anomaly', 'iot'],
      response: `The Real-Time Industrial Equipment Failure Detection System is a production-grade streaming ML pipeline. It ingests sensor data via Apache Kafka, detects anomalies using Isolation Forest with adaptive thresholds, provides multi-level alerts (LOW/MEDIUM/HIGH), monitors data drift with EvidentlyAI, tracks experiments with MLflow, and features a Streamlit dashboard with live sensor charts and anomaly feeds.`,
    },
    certifications: {
      keywords: ['certification', 'certificate', 'certified', 'course', 'udemy', 'nptel', 'geeksforgeeks', 'wadhwani'],
      response: `Certifications: 1) Data Science, ML, DL & NLP Bootcamp (Udemy) — comprehensive data science lifecycle coverage. 2) Foundations of Deep Learning (NPTEL) — rigorous academic deep learning course. 3) Generative AI and ChatGPT (GeeksforGeeks) — generative models and prompt engineering. 4) Ignite India (Wadhwani Foundation) — entrepreneurship and innovation program.`,
    },
    contact: {
      keywords: ['contact', 'email', 'reach', 'connect', 'hire', 'linkedin', 'github', 'resume'],
      response: `You can reach Jaya Sri Vardhan at: Email: srivardhansamgoju@gmail.com | GitHub: github.com/JayaSriVardhanSamgoju | LinkedIn: linkedin.com/in/jaya-sri-vardhan-samgoju | His resume is available on the Contact section of this portfolio.`,
    },
    goals: {
      keywords: ['goals', 'future', 'plan', 'aim', 'ambition', 'roadmap', 'vision', 'aspire'],
      response: `Short term: Master advanced ML/DL architectures (Transformers, GANs) and MLOps. Mid term: Build scalable AI systems, advanced NLP apps, and contribute to open source. Long term: Become a professional Data Scientist building impactful AI-driven solutions at a global scale.`,
    },
  },
  fallback: 'I can answer questions about Jaya Sri Vardhan\'s education, skills, projects (SynoptiQ, Industrial Failure Detection), certifications, goals, and contact info. Could you rephrase your question?',
  // Placeholder for future document content
  customDocument: null,
};

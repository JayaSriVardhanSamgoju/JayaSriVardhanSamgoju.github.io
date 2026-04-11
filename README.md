# Jaya Sri Vardhan Samgoju — ML & AI Portfolio

A world-class, futuristic portfolio website built with **React**, **Framer Motion**, and modern UI techniques.

## ✨ Features

- **Animated Particle Background** — Neural network-style particle system with connecting lines
- **Smooth Framer Motion Animations** — Scroll-triggered reveals, staggered children, hover effects
- **Typewriter Effect** — Dynamic title animation in the Hero section
- **Animated Stat Counters** — Numbers count up on page load
- **Skill Progress Bars** — Animated on scroll into view
- **Interactive Project Cards** — 3D hover lifts with glow effects
- **Education Timeline** — Animated left-border timeline
- **Goals Roadmap** — Three-step visual journey
- **Suggestion Form** — Animated feedback form with submit confirmation
- **Responsive Design** — Mobile-first, works on all screen sizes
- **Dark Futuristic Theme** — Deep navy/cyan/purple color scheme with glassmorphism

## 🚀 Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Framer Motion | Animations & transitions |
| react-intersection-observer | Scroll-triggered animations |
| Canvas API | Particle background |
| CSS Variables | Theming & dark mode |
| Google Fonts (Oxanium) | Futuristic typography |

## 📂 Project Structure

```
portfolio/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ParticleBackground.js   # Canvas particle system
│   │   ├── Navbar.js               # Sticky animated navbar
│   │   ├── Hero.js                 # Hero with typewriter & counters
│   │   ├── About.js                # About with orbit animation
│   │   ├── Education.js            # Timeline cards
│   │   ├── Skills.js               # Animated skill bars & tags
│   │   ├── Projects.js             # Project showcase grid
│   │   ├── Research.js             # Research interests cards
│   │   ├── Goals.js                # Future roadmap
│   │   ├── Contact.js              # Contact links + suggestion form
│   │   └── Footer.js               # Footer
│   ├── App.js                      # Root component (lazy loading)
│   ├── index.js                    # Entry point
│   └── index.css                   # Global styles & CSS variables
├── package.json
└── README.md
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 16+ and npm installed

### Installation

```bash
# 1. Navigate to the project folder
cd portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm start
```

The app will open at **http://localhost:3000**

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## 🎨 Customization

### Update Personal Info
Edit the data directly in each component file:
- **Hero.js** — Name, title, stats
- **About.js** — Bio text, focus tags
- **Education.js** — `educationData` array
- **Skills.js** — `skillGroups` array
- **Projects.js** — `projects` array
- **Contact.js** — `contactLinks` array

### Change Color Theme
Edit CSS variables in `src/index.css`:
```css
:root {
  --accent-cyan: #00d4ff;    /* Primary accent */
  --accent-purple: #7c3aed;  /* Secondary accent */
  --accent-green: #10b981;   /* Tertiary accent */
}
```

## 📱 Responsive Breakpoints
- Desktop: 1024px+
- Tablet: 768px – 1023px
- Mobile: < 768px

## 📄 License
MIT — Free to use and modify for personal portfolio purposes.

---
*Built for Jaya Sri Vardhan Samgoju — ML & AI Developer*

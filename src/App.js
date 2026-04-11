import React, { Suspense, lazy } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ParticleBackground from './components/ParticleBackground';

const About = lazy(() => import('./components/About'));
const Education = lazy(() => import('./components/Education'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Research = lazy(() => import('./components/Research'));
const Goals = lazy(() => import('./components/Goals'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  return (
    <div className="App">
      <ParticleBackground />
      <Navbar />
      <Hero />
      <Suspense fallback={<div style={{ height: '200px' }} />}>
        <About />
        <Education />
        <Skills />
        <Projects />
        <Research />
        <Goals />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;

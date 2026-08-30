import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Menu } from 'lucide-react';
import { teamMembers } from './teamMembers';
import './Developer.css';

// Specialty tags per candidate (6 members)
const memberTags = {
  1: ["PRODUCT STRATEGY", "LEADER"],
  2: ["DATA RESEARCH", "CO-LEADER"],
  3: ["CORE BACKEND", "SYSTEMS ARCH"],
  4: ["FRONTEND DEV", "STATE MGMT"],
  5: ["OPERATIONS", "SPRINT DOCS"],
  6: ["UI/UX DESIGN", "PROTOTYPING"]
};

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// Helper for generating starburst points (24 points)
const generateStarburstPoints = () => {
  const points = [];
  const center = 50;
  const numPoints = 24;
  for (let i = 0; i < numPoints * 2; i++) {
    const angle = (i * Math.PI) / numPoints;
    const r = i % 2 === 0 ? 50 : 43; // outer vs inner radius
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return points.join(' ');
};

export default function Developer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = (e) => {
      if (showInfo) return; // disable slider key navigation in detail view
      if (e.key === 'ArrowRight') advance(1);
      if (e.key === 'ArrowLeft') advance(-1);
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [activeIndex, showInfo]);

  const advance = (dir) => {
    setActiveIndex(p => (p + dir + teamMembers.length) % teamMembers.length);
  };
  const next = () => advance(1);
  const prev = () => advance(-1);

  const active = teamMembers[activeIndex];
  const activeTags = memberTags[active.id] || ["MEMBER", "EDUGUIDE"];

  // Playcard stacked fanned coordinates (made tighter to prevent frame overflow and text overlapping)
  const stackPos = (rel) => {
    return {
      x: rel * 32,
      y: rel * 8,
      rotateZ: rel * 3,
      scale: 1,
      opacity: rel === 0 ? 1 : Math.max(0, 1 - rel * 0.16),
      zIndex: 60 - rel * 10,
      filter: rel === 0 ? 'brightness(1)' : `brightness(${1 - rel * 0.08})`,
    };
  };

  const spring = { type: 'spring', stiffness: 350, damping: 28, mass: 0.9 };

  return (
    <div className="eg-developer-page">
      {/* Header */}
      <header className="eg-header eg-container">
        <a href="/" className="eg-logo-area">
          <img src="/logo.png" alt="EduGuide" className="eg-logo-img" />
          <span className="eg-logo-text">EDUGUIDE AI</span>
        </a>
        <nav className={`eg-nav-links ${menuOpen ? 'eg-nav-open' : ''}`}>
          <a href="/" className="eg-nav-link eg-nav-pill">Home</a>
          <a href="/" className="eg-nav-link eg-nav-pill">Portals</a>
        </nav>
        <button className="eg-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <Menu size={22} />
        </button>
      </header>

      {/* Main content container with smooth transitions */}
      <div className="eg-main-container eg-container">
        <AnimatePresence mode="wait">
          {!showInfo ? (
            <motion.div
              key="slider-view"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
              className="eg-slider-view-layout"
            >
              {/* Left Column: Team Intro */}
              <div className="eg-slider-left-col">
                <h1 className="eg-hero-title">
                  MEET<br />
                  <span className="italic-accent">our</span><br />
                  TEAM
                </h1>
                <p className="eg-hero-subhead">
                  Behind every intelligent experience is a team turning ideas, technology and curiosity into meaningful learning experiences.
                </p>
              </div>

              {/* Right Column: Card Carousel Stack */}
              <div className="eg-slider-right-col">
                <div className="eg-stack-container">
                  {teamMembers.map((m, idx) => {
                    const rel = (idx - activeIndex + teamMembers.length) % teamMembers.length;
                    const isActive = rel === 0;

                    return (
                      <motion.button
                        key={m.id}
                        className={`eg-stack-card ${isActive ? 'active' : ''}`}
                        onClick={() => {
                          if (isActive) {
                            setShowInfo(true);
                          } else {
                            setActiveIndex(idx);
                          }
                        }}
                        animate={stackPos(rel)}
                        transition={spring}
                        style={{
                          transformOrigin: 'center left',
                          transformPerspective: 1000,
                        }}
                        whileHover={
                          !isActive
                            ? {
                              x: stackPos(rel).x + 10,
                              y: stackPos(rel).y - 10,
                              rotateZ: stackPos(rel).rotateZ + 1.5,
                              transition: { type: 'spring', stiffness: 400, damping: 22 }
                            }
                            : undefined
                        }
                      >
                        <img src={m.image} alt={m.name} className="eg-stack-card-img" />
                      </motion.button>
                    );
                  })}
                </div>

                {/* Controls & metadata row below active card */}
                <div className="eg-meta-controls-wrapper">
                  {/* Controls */}
                  <div className="eg-controls-row">
                    <motion.button
                      onClick={prev}
                      className="eg-nav-btn"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <ArrowLeft size={16} />
                    </motion.button>

                    <div className="eg-counter">
                      <span className="eg-counter-active">{activeIndex + 1}</span>
                      <span className="eg-counter-total"> / {teamMembers.length}</span>
                    </div>

                    <motion.button
                      onClick={next}
                      className="eg-nav-btn"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <ArrowRight size={16} />
                    </motion.button>
                  </div>

                  {/* Info & metadata */}
                  <div className="eg-slider-active-meta">
                    <h2 className="eg-active-name">{active.name}</h2>
                    <div className="eg-active-tags">
                      {activeTags.map((tag, i) => (
                        <span key={i} className="eg-active-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail-view"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
              className="eg-detail-view-layout"
            >
              {/* Back to team */}
              <button className="eg-detail-back-btn" onClick={() => setShowInfo(false)}>
                <ArrowLeft size={16} />
                <span>BACK TO TEAM</span>
              </button>

              {/* Developer Specialty and Name header */}
              <div className="eg-detail-header">
                <div className="eg-detail-tags">
                  {activeTags.map((tag, idx) => (
                    <span key={idx} className="eg-detail-tag">{tag}</span>
                  ))}
                </div>
                <h2 className="eg-detail-name">{active.name}</h2>
              </div>

              {/* Detailed developer contents */}
              <div className="eg-detail-body">
                {/* Large rectangular photo with entrance and subtle hover float */}
                <motion.div
                  className="eg-detail-photo-wrapper"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                  whileHover={{ y: -6, boxShadow: "0 24px 48px rgba(0, 0, 0, 0.12)", transition: { duration: 0.2 } }}
                >
                  <img src={active.image} alt={active.name} className="eg-detail-photo" />
                </motion.div>

                {/* Sage green info block with entrance and subtle hover float */}
                <motion.div
                  className="eg-detail-info-block"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.05 }}
                  whileHover={{ y: -6, boxShadow: "0 24px 48px rgba(0, 0, 0, 0.12)", transition: { duration: 0.2 } }}
                >
                  <p className="eg-detail-bio">{active.description}</p>

                  <div className="eg-detail-bottom-row">
                    {/* Custom Stats list */}
                    <div className="eg-detail-stats">
                      {active.stats && active.stats.map((stat, idx) => (
                        <div key={idx} className="eg-detail-stat-box">
                          <span className="eg-detail-stat-val">{stat.value}</span>
                          <span className="eg-detail-stat-lbl">{stat.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Circular Starburst Interactive GitHub link */}
                    <a href={active.github} target="_blank" rel="noopener noreferrer" className="eg-starburst-badge">
                      <svg viewBox="0 0 100 100" className="eg-starburst-svg">
                        <polygon points={generateStarburstPoints()} fill="#E6E0CC" />
                        <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                        <text fontSize="7.8" fontWeight="600" fill="#2D3142" letterSpacing="1">
                          <textPath href="#circlePath" startOffset="0%">
                            VIEW GITHUB ↗ • VIEW GITHUB ↗ •
                          </textPath>
                        </text>
                      </svg>
                      <div className="eg-starburst-arrow">↗</div>
                    </a>
                  </div>

                  {/* Social connections */}
                  <div className="eg-detail-socials">
                    <a href={active.linkedin} target="_blank" rel="noopener noreferrer" className="eg-detail-social-link" title="LinkedIn">
                      <LinkedinIcon />
                    </a>
                    <a href={active.github} target="_blank" rel="noopener noreferrer" className="eg-detail-social-link" title="GitHub">
                      <GithubIcon />
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="eg-footer">
        Proudly built by the Samayk Team
      </footer>
    </div>
  );
}

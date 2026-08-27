import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Menu, Globe, Code } from 'lucide-react';

const GithubIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.5 6.5-7.1a5.8 5.8 0 0 0-1.5-3.8 5.3 5.3 0 0 0-.15-3.7s-1.2-.38-3.9 1.5a13.2 13.2 0 0 0-7 0C6.1 1.2 4.9 1.6 4.9 1.6a5.3 5.3 0 0 0-.15 3.7 5.8 5.8 0 0 0-1.5 3.8c0 5.6 3.3 6.7 6.5 7.1a4.8 4.8 0 0 0-1 3.03v4"/>
    <path d="M9 20c-3 1-5-1-6-3"/>
  </svg>
);

const LinkedinIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

import developer1 from '../../../assets/developers/developer1.jpg';
import developer2 from '../../../assets/developers/developer2.jpg';
import developer3 from '../../../assets/developers/developer3.jpg';
import developer4 from '../../../assets/developers/developer4.jpg';
import developer5 from '../../../assets/developers/developer5.jpg';
import developer6 from '../../../assets/developers/developer6.jpg';

const TEAM_MEMBERS = [
  {
    id: '1',
    name: 'Rishabh Malviya',
    roles: ['TEAM LEAD'],
    role: 'Team Lead',
    image: developer1,
    bio: 'Leads the vision and direction of EduGuide AI, keeping the team aligned from first idea to final release.',
    contribution: 'Sets product direction and coordinates design, development and research across the team.',
    stats: [
      { label: 'Role', value: 'Lead' },
      { label: 'Focus', value: 'Vision' }
    ],
    links: {
      github: '#',
      linkedin: '#',
      portfolio: '#',
      leetcode: '#'
    }
  },
  {
    id: '2',
    name: 'Snehal Kushwaha',
    roles: ['BACKEND DEVELOPER'],
    role: 'Backend Developer',
    image: developer2,
    bio: 'Builds and maintains the robust backend systems and APIs that power EduGuide AI.',
    contribution: 'Builds and maintains the backend systems that power EduGuide AI.',
    stats: [
      { label: 'Role', value: 'Backend' },
      { label: 'Focus', value: 'Systems' }
    ],
    links: {
      github: '#',
      linkedin: '#',
      portfolio: '#',
      leetcode: '#'
    }
  },
  {
    id: '3',
    name: 'Rex Mantode',
    roles: ['FRONTEND DEVELOPER'],
    role: 'Frontend Developer',
    image: developer3,
    bio: 'Crafts intuitive and engaging interfaces that students and staff use every day.',
    contribution: 'Builds the interfaces students and staff use every day.',
    stats: [
      { label: 'Role', value: 'Frontend' },
      { label: 'Focus', value: 'UI/UX' }
    ],
    links: {
      github: '#',
      linkedin: '#',
      portfolio: '#',
      leetcode: '#'
    }
  },
  {
    id: '4',
    name: 'Sumit Ransurma',
    roles: ['RESEARCH', 'DATA'],
    role: 'Research & Data Collection',
    image: developer4,
    bio: 'Gathers and organizes the crucial research and data that shapes EduGuide AI\'s insights.',
    contribution: 'Gathers and organizes the research that shapes EduGuide AI\'s insights.',
    stats: [
      { label: 'Role', value: 'Research' },
      { label: 'Focus', value: 'Data' }
    ],
    links: {
      github: '#',
      linkedin: '#',
      portfolio: '#',
      leetcode: '#'
    }
  },
  {
    id: '5',
    name: 'Shruti Tiwari',
    roles: ['OPERATIONS', 'ADMIN'],
    role: 'Operations & Notion Admin',
    image: developer5,
    bio: 'Keeps the team highly organized and ensures all project documentation is completely up to date.',
    contribution: 'Keeps the team organized and documentation up to date.',
    stats: [
      { label: 'Role', value: 'Ops' },
      { label: 'Focus', value: 'Admin' }
    ],
    links: {
      github: '#',
      linkedin: '#',
      portfolio: '#',
      leetcode: '#'
    }
  },
  {
    id: '6',
    name: 'Neha Kumari Sah',
    roles: ['UI/UX', 'DOCUMENTATION'],
    role: 'UI/UX & Documentation',
    image: developer6,
    bio: 'Shapes the product experience with thoughtful design and documents how EduGuide AI works.',
    contribution: 'Shapes the product experience and documents how EduGuide AI works.',
    stats: [
      { label: 'Role', value: 'Design' },
      { label: 'Focus', value: 'Docs' }
    ],
    links: {
      github: '#',
      linkedin: '#',
      portfolio: '#',
      leetcode: '#'
    }
  }
];

export default function Developer() {
  const [selectedId, setSelectedId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(1);

  const selectedMember = TEAM_MEMBERS.find(m => m.id === selectedId);

  const nextSlide = () => {
    if (currentIndex < TEAM_MEMBERS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const getCardStyle = (index) => {
    const diff = index - currentIndex;
    if (diff === 0) return { x: 0, scale: 1, zIndex: 50, opacity: 1 };
    if (diff === 1) return { x: 180, scale: 0.85, zIndex: 40, opacity: 0.9 };
    if (diff === 2) return { x: 320, scale: 0.7, zIndex: 30, opacity: 0.7 };
    if (diff === 3) return { x: 420, scale: 0.55, zIndex: 20, opacity: 0.4 };
    if (diff > 3) return { x: 500, scale: 0.4, zIndex: 10, opacity: 0 };
    if (diff < 0) return { x: -200, scale: 0.8, zIndex: 0, opacity: 0 };
  };

  return (
    <div className="min-h-screen bg-bg-ambient text-brand-navy font-sans overflow-hidden flex flex-col p-6 lg:p-10 relative">
      <AnimatePresence>
        {!selectedId ? (
          <motion.div
            key="list-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col w-full"
          >
            {/* Header */}
            <header className="flex justify-between items-center mb-10 text-[10px] lg:text-xs font-semibold tracking-widest uppercase">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="EduGuide Logo" className="w-6 h-6 object-contain" />
                <span className="text-brand-navy">EDUGUIDE AI</span>
              </div>
              <div className="cursor-pointer hover:opacity-70 text-brand-navy">
                <Menu size={18} />
              </div>
              <div className="flex gap-8 hidden md:flex text-slate-800">
                <span className="cursor-pointer hover:text-brand-blue transition-colors">Home</span>
                <span className="cursor-pointer hover:text-brand-blue transition-colors">Portals</span>
              </div>
            </header>

            {/* Main Layout */}
            <div className="flex-1 relative flex">
              
              {/* Left Column (Fixed Text) */}
              <div className="absolute left-0 top-0 w-full lg:w-1/3 h-full flex flex-col justify-between pointer-events-none z-10">
                <div className="pt-4 lg:pt-12 pointer-events-auto">
                  <h1 className="font-heading text-[4rem] md:text-[6rem] lg:text-[7.5rem] leading-[0.95] tracking-tight text-brand-navy">
                    MEET<br />
                    <span className="text-brand-blue font-light italic">OUR</span><br />
                    TEAM
                  </h1>
                </div>
                <div className="pb-8 pointer-events-auto">
                  <p className="max-w-xs text-xs lg:text-sm text-slate-600 leading-relaxed font-medium">
                    Behind every intelligent experience is a team turning ideas, technology and curiosity into meaningful learning experiences.
                  </p>
                </div>
              </div>

              {/* Center/Right (Carousel) */}
              <div className="absolute right-0 w-full lg:w-2/3 h-full flex flex-col items-center pt-8">
                {/* 3D Stacked Cards */}
                <div className="relative w-[340px] md:w-[380px] h-[480px] md:h-[540px] flex items-center justify-center">
                  {TEAM_MEMBERS.map((member, index) => {
                    const style = getCardStyle(index);
                    const isActive = index === currentIndex;
                    return (
                      <motion.div
                        key={member.id}
                        layoutId={`image-container-${member.id}`}
                        initial={false}
                        animate={{
                          x: style.x,
                          scale: style.scale,
                          zIndex: style.zIndex,
                          opacity: style.opacity
                        }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className={`absolute w-full h-full origin-left shadow-2xl rounded-2xl overflow-hidden bg-slate-200 ${isActive ? 'cursor-pointer group' : ''}`}
                        onClick={() => isActive && setSelectedId(member.id)}
                      >
                        <motion.img
                          layoutId={`image-${member.id}`}
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                        {isActive && (
                          <div className="absolute inset-0 bg-brand-navy/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg"
                            >
                              <ArrowUpRight size={22} className="text-brand-blue" />
                            </motion.button>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Active Info & Controls */}
                <div className="mt-8 flex flex-col items-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-center"
                    >
                      <motion.h2 layoutId={`name-${TEAM_MEMBERS[currentIndex].id}`} className="font-heading font-bold text-3xl mb-3 text-brand-navy">
                        {TEAM_MEMBERS[currentIndex].name}
                      </motion.h2>
                      <motion.div layoutId={`roles-${TEAM_MEMBERS[currentIndex].id}`} className="flex gap-2 justify-center mb-8">
                        {TEAM_MEMBERS[currentIndex].roles.map((role) => (
                          <span
                            key={role}
                            className="text-[9px] font-bold tracking-widest uppercase bg-[#EEF2FF] text-brand-blue px-3 py-1 rounded-full"
                          >
                            {role}
                          </span>
                        ))}
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex gap-4">
                    <button
                      onClick={prevSlide}
                      disabled={currentIndex === 0}
                      className={`w-14 h-8 border border-brand-navy rounded-full flex items-center justify-center transition-colors ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-brand-navy hover:text-white text-brand-navy'}`}
                    >
                      <ArrowLeft size={16} strokeWidth={2} />
                    </button>
                    <button
                      onClick={nextSlide}
                      disabled={currentIndex === TEAM_MEMBERS.length - 1}
                      className={`w-14 h-8 border border-brand-navy rounded-full flex items-center justify-center transition-colors ${currentIndex === TEAM_MEMBERS.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-brand-navy hover:text-white text-brand-navy'}`}
                    >
                      <ArrowRight size={16} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Pagination */}
              <div className="absolute right-0 bottom-0 pb-8 pointer-events-none">
                <span className="font-heading font-bold text-4xl text-brand-navy">{currentIndex + 1}</span>
                <span className="text-slate-400 text-xl font-heading font-medium"> / {TEAM_MEMBERS.length}</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="detail-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col w-full max-w-7xl mx-auto"
          >
            {/* Top Navigation & Close */}
            <div className="flex justify-between items-center mb-8 pt-4">
              <button
                onClick={() => setSelectedId(null)}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-navy hover:text-brand-blue transition-colors"
              >
                <ArrowLeft size={18} /> BACK
              </button>
            </div>

            {/* Top Roles & Name */}
            <motion.div
              layoutId={`content-${selectedMember.id}`}
              className="flex flex-col items-center mb-12"
            >
              <motion.div
                layoutId={`roles-${selectedMember.id}`}
                className="flex gap-3 mb-6"
              >
                {selectedMember.roles.map((role) => (
                  <span
                    key={role}
                    className="text-[10px] font-bold tracking-widest uppercase bg-[#EEF2FF] text-brand-blue px-4 py-1.5 rounded-full"
                  >
                    {role}
                  </span>
                ))}
              </motion.div>
              <motion.h2
                layoutId={`name-${selectedMember.id}`}
                className="font-heading font-bold text-5xl md:text-7xl lg:text-[7rem] text-center leading-none tracking-tight text-brand-navy"
              >
                {selectedMember.name}
              </motion.h2>
            </motion.div>

            {/* Main Content Split */}
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative mt-8 lg:mt-16">
              {/* Expanded Image */}
              <motion.div
                layoutId={`image-container-${selectedMember.id}`}
                className="w-full lg:w-5/12 h-[500px] lg:h-[650px] relative shadow-2xl rounded-2xl overflow-hidden"
              >
                <motion.img
                  layoutId={`image-${selectedMember.id}`}
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Bio, Testimonial & Contact Card */}
              <div className="w-full lg:w-7/12 flex flex-col justify-center relative">
                {/* Rotating Badge overlaying slightly */}
                <div className="absolute -top-16 lg:-top-24 lg:-left-20 w-32 h-32 lg:w-40 lg:h-40 z-10 pointer-events-none hidden lg:block">
                  <div className="relative w-full h-full animate-[spin_10s_linear_infinite] flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-brand-blue opacity-50 drop-shadow-sm">
                      <path id="curve" d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" fill="transparent" />
                      <text className="text-[11px] uppercase tracking-[0.2em] font-bold fill-brand-navy">
                        <textPath href="#curve">
                          • Connect on LinkedIn • Connect on LinkedIn
                        </textPath>
                      </text>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center bg-white border border-[#EEF2FF] rounded-full m-7 shadow-lg pointer-events-auto cursor-pointer hover:scale-105 transition-transform group" onClick={() => window.open(selectedMember.links.linkedin, '_blank')}>
                      <ArrowUpRight size={20} className="text-brand-blue group-hover:text-brand-navy transition-colors" />
                    </div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-12 mt-10 lg:mt-0"
                >
                  <p className="text-xl lg:text-3xl leading-relaxed text-slate-700 max-w-xl font-heading font-medium italic">
                    "{selectedMember.contribution}"
                  </p>
                </motion.div>

                {/* Profile Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-[2rem] p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 max-w-xl"
                >
                  <div className="mb-10">
                    <h3 className="text-xs font-bold tracking-widest uppercase text-brand-blue mb-3">Role in the team</h3>
                    <p className="font-heading font-bold text-3xl lg:text-4xl text-brand-navy">{selectedMember.role}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-4">Connect & Explore</h3>
                    <div className="flex gap-4">
                      <a href={selectedMember.links.linkedin} target="_blank" rel="noreferrer" className="w-14 h-14 bg-[#FAFBFC] hover:bg-[#EEF2FF] rounded-full flex items-center justify-center text-slate-500 hover:text-brand-blue transition-colors group">
                        <LinkedinIcon size={22} className="group-hover:scale-110 transition-transform" />
                      </a>
                      <a href={selectedMember.links.github} target="_blank" rel="noreferrer" className="w-14 h-14 bg-[#FAFBFC] hover:bg-[#EEF2FF] rounded-full flex items-center justify-center text-slate-500 hover:text-brand-blue transition-colors group">
                        <GithubIcon size={22} className="group-hover:scale-110 transition-transform" />
                      </a>
                      <a href={selectedMember.links.portfolio} target="_blank" rel="noreferrer" className="w-14 h-14 bg-[#FAFBFC] hover:bg-[#EEF2FF] rounded-full flex items-center justify-center text-slate-500 hover:text-brand-blue transition-colors group">
                        <Globe size={22} className="group-hover:scale-110 transition-transform" />
                      </a>
                      <a href={selectedMember.links.leetcode} target="_blank" rel="noreferrer" className="w-14 h-14 bg-[#FAFBFC] hover:bg-[#EEF2FF] rounded-full flex items-center justify-center text-slate-500 hover:text-brand-blue transition-colors group">
                        <Code size={22} className="group-hover:scale-110 transition-transform" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";
import React, { useState, useEffect, useRef } from "react";
import { fetchData } from "./utils/fetchData";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";

const Icons = { ...FaIcons, ...SiIcons };

// ─── Animation Variants ──────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

const itemFade = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } }
};

const categoryTitles = {
  languages: "Programming Languages",
  frameworks: "Frameworks & Libraries",
  databases: "Databases & Tools",
  platforms: "Software & Platforms",
  otherSkills: "Other Skills"
};

const NAV_ITEMS = ["about", "skills", "education", "projects", "experience"];

// ─── Header ──────────────────────────────────────────────────────────────────

const Header = ({ menuOpen, setMenuOpen, scrolled }) => (
  <header
    className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
      scrolled
        ? "py-3 bg-[#0A0718]/85 backdrop-blur-xl border-b border-purple-900/30 shadow-lg shadow-black/20"
        : "py-5 bg-transparent"
    }`}
  >
    <nav className="flex justify-between items-center px-6 sm:px-12 max-w-7xl mx-auto">
      {/* Logo */}
      <motion.a
        href="/"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl font-bold tracking-widest uppercase font-['Poppins'] text-white hover:text-purple-300 transition-colors"
      >
        Shu<span className="text-purple-400"> Yi</span>
      </motion.a>

      {/* Desktop Nav */}
      <motion.div
        className="hidden sm:flex gap-8 text-xs uppercase tracking-widest font-semibold"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item}
            href={`#${item}`}
            className="text-gray-300 hover:text-purple-300 transition-colors relative group py-1"
          >
            {item}
            <span className="absolute bottom-0 left-0 w-0 h-px bg-purple-400 group-hover:w-full transition-all duration-300" />
          </a>
        ))}
      </motion.div>

      {/* Social Icons */}
      <motion.div
        className="hidden sm:flex gap-4 text-lg text-gray-400"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {[
          { icon: "FaGithub", url: "https://github.com/sygoh0909" },
          { icon: "FaLinkedin", url: "https://www.linkedin.com/in/shu-yi-goh-384021346/" },
          { icon: "FaInstagram", url: "https://www.instagram.com/shu_yi_0909" }
        ].map(({ icon, url }) => {
          const Icon = Icons[icon];
          return (
            <motion.a
              key={icon}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-300 transition-colors"
              whileHover={{ y: -2, scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon />
            </motion.a>
          );
        })}
      </motion.div>

      {/* Mobile hamburger */}
      <motion.button
        className="sm:hidden text-xl text-gray-300 hover:text-purple-300 transition-colors"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
        whileTap={{ scale: 0.9 }}
      >
        {menuOpen ? <Icons.FaTimes /> : <Icons.FaBars />}
      </motion.button>
    </nav>

    {/* Mobile Menu */}
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          className="sm:hidden flex flex-col bg-[#110A30]/95 backdrop-blur-xl text-white py-4 px-8 w-full absolute top-full left-0 border-b border-purple-900/40"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="py-3 text-sm uppercase tracking-widest font-medium text-gray-300 hover:text-purple-300 transition-colors border-b border-purple-900/30 last:border-0"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <div className="flex gap-5 mt-4 text-xl text-gray-400 pb-2">
            {[
              { icon: "FaGithub", url: "https://github.com/sygoh0909" },
              { icon: "FaLinkedin", url: "https://www.linkedin.com/in/shu-yi-goh-384021346/" },
              { icon: "FaInstagram", url: "https://www.instagram.com/shu_yi_0909" }
            ].map(({ icon, url }) => {
              const Icon = Icons[icon];
              return (
                <a key={icon} href={url} target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors">
                  <Icon />
                </a>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </header>
);

// ─── Section Wrapper ──────────────────────────────────────────────────────────

const SectionLabel = ({ children }) => (
  <p className="text-xs uppercase tracking-[0.2em] font-semibold text-purple-400 mb-4">{children}</p>
);

// ─── Hero / About ─────────────────────────────────────────────────────────────

const AboutSection = () => (
  <section id="about" className="relative pt-36 pb-28 min-h-screen flex items-center">
    {/* Background orbs */}
    <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-purple-900/20 blur-[120px] pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-indigo-900/15 blur-[100px] pointer-events-none" />

    <motion.div
      className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-16 w-full"
      initial="hidden"
      animate="visible"
      variants={stagger}
    >
      {/* Text */}
      <motion.div className="flex-1 text-center lg:text-left max-w-2xl" variants={fadeUp}>
        <SectionLabel>Portfolio</SectionLabel>

        <h1 className="text-5xl sm:text-7xl font-extrabold leading-[1.05] tracking-tight font-['Poppins'] mb-6">
          Hi, I'm{" "}
          <span className="gradient-text">Shu Yi</span>
        </h1>

        <p className="text-lg sm:text-xl text-purple-300/80 font-medium mb-6 tracking-wide">
          Software Engineering Student &amp; Developer
        </p>

        <p className="text-base sm:text-lg leading-relaxed text-gray-400 max-w-xl mx-auto lg:mx-0">
          I'm passionate about crafting elegant, scalable software solutions. Currently studying Software Engineering while building real-world products — from AI-powered tools to full-stack web applications.
        </p>

        <motion.div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start" variants={fadeUp}>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 leading-none bg-purple-600 hover:bg-purple-500 text-white font-semibold px-7 py-3 rounded-lg transition-all duration-300 shadow-lg shadow-purple-900/40 hover:shadow-purple-700/40 hover:-translate-y-0.5"
          >
            View Resume
            <Icons.FaDownload className="text-sm opacity-80" />
          </a>
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 leading-none border border-purple-700/60 hover:border-purple-500 text-purple-300 hover:text-white font-semibold px-7 py-3 rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-900/30"
          >
            View Projects
            <Icons.FaArrowRight className="text-sm" />
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="mt-12 flex flex-wrap gap-8 justify-center lg:justify-start"
          variants={fadeUp}
        >
          {[
            { value: "12+", label: "Projects" },
            { value: "3.98", label: "Foundation CGPA" },
            { value: "Dean's", label: "List Awardee" }
          ].map(({ value, label }) => (
            <div key={label} className="text-center lg:text-left">
              <div className="text-2xl font-bold text-white">{value}</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest mt-0.5">{label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Avatar */}
      <motion.div
        className="flex-shrink-0 flex justify-center"
        variants={fadeUp}
        transition={{ delay: 0.3 }}
      >
        <div className="relative w-60 h-60 sm:w-72 sm:h-72">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border border-purple-500/20" />
          {/* Glow */}
          <div className="absolute inset-4 rounded-full bg-purple-600/20 blur-2xl" />
          {/* Rotating ring */}
          <motion.div
            className="absolute inset-0 rounded-full border border-dashed border-purple-500/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          {/* Avatar circle — SY text only */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#1E1055] via-[#1A1A50] to-[#0F2060] border border-purple-500/25 shadow-2xl flex items-center justify-center">
            <span className="text-5xl font-extrabold gradient-text tracking-tight select-none">SY</span>
          </div>
          {/* Stitch sitting fully outside bottom-right */}
          <motion.img
            src="/stitch.gif"
            alt="Stitch"
            className="absolute -bottom-16 -right-20 w-28 sm:w-32 object-contain"

            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  </section>
);

// ─── Skills ───────────────────────────────────────────────────────────────────

const SkillCard = ({ skill }) => {
  const IconComponent = Icons[skill.icon];
  return (
    <motion.div
      className="glass-card rounded-xl p-5 flex flex-col items-center gap-3 group cursor-default glow-purple-hover transition-all duration-300 hover:-translate-y-1"
      variants={itemFade}
      whileHover={{ scale: 1.03 }}
    >
      <div className="w-12 h-12 rounded-lg bg-purple-900/40 flex items-center justify-center group-hover:bg-purple-800/40 transition-colors">
        {IconComponent && <IconComponent className="text-2xl text-purple-300 group-hover:text-purple-200 transition-colors" />}
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-200 leading-tight">{skill.name}</p>
        {skill.level && <p className="text-xs text-gray-500 mt-0.5">{skill.level}</p>}
      </div>
    </motion.div>
  );
};

const SkillsSection = ({ skills }) => (
  <section id="skills" className="py-24">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={stagger}
    >
      <motion.div variants={fadeUp} className="text-center mb-16">
        <SectionLabel>Expertise</SectionLabel>
        <h2 className="text-4xl sm:text-5xl font-extrabold font-['Poppins'] tracking-tight">
          My <span className="gradient-text">Skills</span>
        </h2>
        <p className="mt-4 text-gray-500 text-sm max-w-md mx-auto">
          Technologies and tools I work with across the full stack
        </p>
      </motion.div>

      <div className="space-y-14">
        {Object.entries(skills).map(([category, items]) => (
          <motion.div key={category} variants={fadeUp}>
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-sm uppercase tracking-[0.15em] font-semibold text-purple-400">
                {categoryTitles[category] || category}
              </h3>
              <span className="h-px flex-1 bg-purple-900/50" />
              <span className="text-xs text-gray-600">{items?.length || 0} items</span>
            </div>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
              variants={stagger}
            >
              {items?.map((skill) => <SkillCard key={skill.id} skill={skill} />)}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

// ─── Education / Experience ───────────────────────────────────────────────────

const TimelineItem = ({ item, index }) => (
  <motion.div
    className="relative pl-14 group"
    variants={itemFade}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
  >
    {/* Timeline dot */}
    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-[#1A1A50] border-2 border-purple-500/50 flex items-center justify-center group-hover:border-purple-400 transition-colors z-10">
      <div className="w-2.5 h-2.5 rounded-full bg-purple-500 group-hover:bg-purple-400 group-hover:shadow-[0_0_8px_rgba(139,92,246,0.8)] transition-all" />
    </div>
    {/* Connector line (except last) */}
    <div className="absolute left-[15px] top-10 bottom-0 w-px bg-gradient-to-b from-purple-500/40 to-transparent" />

    <motion.div
      className="glass-card rounded-xl p-6 glow-purple-hover transition-all duration-300 hover:-translate-y-1"
      whileHover={{ x: 4 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white leading-snug">{item.name}</h3>
          {item.description && (
            <p className="text-sm text-gray-400 mt-1">{item.description}</p>
          )}
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <span className="skill-tag">{item.year}</span>
          {item.achievement && (
            <span className="text-xs bg-purple-600/20 border border-purple-500/30 text-purple-300 px-3 py-1 rounded-full font-medium">
              {item.achievement}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const ExperienceSection = ({ education }) => (
  <section id="education" className="py-24">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={stagger}
    >
      <motion.div variants={fadeUp} className="text-center mb-16">
        <SectionLabel>Background</SectionLabel>
        <h2 className="text-4xl sm:text-5xl font-extrabold font-['Poppins'] tracking-tight">
          Education &amp; <span className="gradient-text">Experience</span>
        </h2>
        <p className="mt-4 text-gray-500 text-sm max-w-md mx-auto">
          My academic journey and professional milestones
        </p>
      </motion.div>

      <div className="space-y-6 max-w-3xl mx-auto">
        {education?.length > 0 ? (
          education.map((item, i) => <TimelineItem key={item.id || i} item={item} index={i} />)
        ) : (
          <p className="text-center text-gray-500">No entries available.</p>
        )}
      </div>
    </motion.div>
  </section>
);

// ─── Projects ─────────────────────────────────────────────────────────────────

const ProjectCard = ({ project, setActiveDemo, featured }) => (
  <motion.div
    className={`glass-card rounded-xl overflow-hidden flex flex-col glow-purple-hover transition-all duration-300 hover:-translate-y-1 ${
      featured ? "ring-1 ring-purple-500/30" : ""
    }`}
    variants={itemFade}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    {/* Card header stripe */}
    <div className="h-1 w-full bg-gradient-to-r from-purple-700 via-purple-500 to-indigo-600" />

    <div className="p-6 flex flex-col flex-1">
      {featured && (
        <span className="self-start text-[10px] uppercase tracking-widest font-bold text-purple-400 bg-purple-900/30 border border-purple-700/40 px-2.5 py-1 rounded-full mb-3">
          Featured
        </span>
      )}

      <h3 className="text-lg font-bold text-white mb-2 leading-snug">{project.name}</h3>
      <p className="text-sm text-gray-400 leading-relaxed flex-1 mb-5">{project.description}</p>

      {/* Skill tags */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {(project.skills || []).map((skill, i) => (
          <span key={i} className="skill-tag">{skill}</span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 mt-auto">
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 leading-none text-xs font-semibold text-purple-300 border border-purple-700/50 hover:border-purple-400 hover:text-white px-4 py-2 rounded-lg transition-all duration-200 hover:bg-purple-900/30"
          >
            <Icons.FaGithub className="text-sm" />
            Source Code
          </a>
        )}
        {project.demo && (
          <button
            onClick={() => setActiveDemo(project.demo)}
            className="inline-flex items-center justify-center gap-1.5 leading-none text-xs font-semibold text-white bg-purple-700/70 hover:bg-purple-600 px-4 py-2 rounded-lg transition-all duration-200"
          >
            <Icons.FaPlay className="text-xs" />
            Watch Demo
          </button>
        )}
      </div>
    </div>
  </motion.div>
);

const ProjectsSection = ({ projects = [], setActiveDemo }) => (
  <section id="projects" className="py-24">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={stagger}
    >
      <motion.div variants={fadeUp} className="text-center mb-16">
        <SectionLabel>Work</SectionLabel>
        <h2 className="text-4xl sm:text-5xl font-extrabold font-['Poppins'] tracking-tight">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <p className="mt-4 text-gray-500 text-sm max-w-md mx-auto">
          A selection of things I've built — from academic work to personal tools
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        variants={stagger}
      >
        {projects.length > 0 ? (
          projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              setActiveDemo={setActiveDemo}
              featured={i < 3}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No projects available.</p>
        )}
      </motion.div>
    </motion.div>
  </section>
);

// ─── Other Experiences ────────────────────────────────────────────────────────

const OtherExperiencesSection = ({ otherExperiences }) => (
  <section id="experience" className="py-24">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={stagger}
    >
      <motion.div variants={fadeUp} className="text-center mb-16">
        <SectionLabel>Beyond Code</SectionLabel>
        <h2 className="text-4xl sm:text-5xl font-extrabold font-['Poppins'] tracking-tight">
          Other <span className="gradient-text">Experiences</span>
        </h2>
        <p className="mt-4 text-gray-500 text-sm max-w-md mx-auto">
          Performances, events, and activities outside of software
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        variants={stagger}
      >
        {otherExperiences?.length > 0 ? (
          otherExperiences.map((item, i) => (
            <motion.div
              key={item.id || i}
              className="glass-card rounded-xl p-5 flex flex-col justify-between glow-purple-hover transition-all duration-300 hover:-translate-y-1 group"
              variants={itemFade}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-base font-semibold text-white leading-snug group-hover:text-purple-200 transition-colors">
                    {item.name}
                  </h3>
                  <span className="shrink-0 skill-tag">{item.year}</span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
              </div>
              {item.role && (
                <div className="mt-4 flex items-center gap-2">
                  <Icons.FaMicrophone className="text-purple-400 text-xs" />
                  <span className="text-xs text-purple-400 font-medium">{item.role}</span>
                </div>
              )}
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500">No experiences listed.</p>
        )}
      </motion.div>
    </motion.div>
  </section>
);

// ─── Footer ───────────────────────────────────────────────────────────────────

const Footer = () => (
  <footer className="border-t border-purple-900/30 py-12 mt-8">
    <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="text-center sm:text-left">
        <div className="text-lg font-bold tracking-widest font-['Poppins'] text-white">
          Shu<span className="text-purple-400"> Yi</span>
        </div>
        <p className="text-xs text-gray-600 mt-1">Software Engineering Student · Sunway University</p>
      </div>

      <div className="flex gap-5 text-lg text-gray-500">
        {[
          { icon: "FaGithub", url: "https://github.com/sygoh0909" },
          { icon: "FaLinkedin", url: "https://www.linkedin.com/in/shu-yi-goh-384021346/" },
          { icon: "FaInstagram", url: "https://www.instagram.com/shu_yi_0909" }
        ].map(({ icon, url }) => {
          const Icon = Icons[icon];
          return (
            <a
              key={icon}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors hover:-translate-y-0.5 inline-block"
            >
              <Icon />
            </a>
          );
        })}
      </div>

      <p className="text-xs text-gray-700">
        © {new Date().getFullYear()} Shu Yi. Built with Next.js
      </p>
    </div>
  </footer>
);

// ─── Loading Screen ───────────────────────────────────────────────────────────

const LoadingScreen = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-[#0A0718] text-white">
    <motion.div
      className="relative w-16 h-16 mb-8"
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-purple-500 border-r-purple-400" />
      <div className="absolute inset-3 rounded-full border border-purple-800/50" />
    </motion.div>
    <motion.p
      className="text-sm uppercase tracking-[0.3em] text-gray-500 font-medium"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      Loading
    </motion.p>
  </div>
);

// ─── Demo Modal ───────────────────────────────────────────────────────────────

const DemoModal = ({ activeDemo, setActiveDemo }) => (
  <AnimatePresence>
    {activeDemo && (
      <motion.div
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 sm:p-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setActiveDemo(null)}
      >
        <motion.div
          className="bg-[#0e0c1a] rounded-2xl border border-purple-900/50 overflow-hidden max-w-5xl w-full relative shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-5 py-3 border-b border-purple-900/40">
            <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Demo</span>
            <button
              onClick={() => setActiveDemo(null)}
              className="text-gray-500 hover:text-white transition-colors text-lg"
              aria-label="Close"
            >
              <Icons.FaTimes />
            </button>
          </div>
          <div className="relative pt-[56.25%]">
            <iframe
              src={activeDemo}
              title="Project Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Main() {
  const [data, setData] = useState({
    skills: { languages: [], frameworks: [], databases: [], platforms: [], otherSkills: [] },
    education: [],
    projects: [],
    otherExperiences: []
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeDemo, setActiveDemo] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetchData()
      .then((apiData) => {
        setData({
          skills: {
            languages: apiData.languages,
            frameworks: apiData.frameworks,
            databases: apiData.databases,
            platforms: apiData.platforms,
            otherSkills: apiData.otherSkills
          },
          education: apiData.education,
          projects: apiData.projects.map((p) => ({
            ...p,
            skills: typeof p.skills === "string"
              ? p.skills.split(",").map((s) => s.trim())
              : (p.skills || [])
          })),
          otherExperiences: apiData.otherExperiences || []
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="bg-[#0A0718] text-white min-h-screen font-sans relative overflow-x-hidden">
      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(139,92,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />

      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} scrolled={scrolled} />

      <main className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 pb-12">
        <AboutSection />
        <SkillsSection skills={data.skills} />
        <ExperienceSection education={data.education} />
        <ProjectsSection projects={data.projects} setActiveDemo={setActiveDemo} />
        <OtherExperiencesSection otherExperiences={data.otherExperiences} />
      </main>

      <Footer />
      <DemoModal activeDemo={activeDemo} setActiveDemo={setActiveDemo} />
    </div>
  );
}

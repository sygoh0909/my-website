"use client";
import React, { useState, useEffect } from 'react';
import * as Icons from "react-icons/fa";
import { fetchData } from './utils/fetchData';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Header = ({ menuOpen, setMenuOpen }) => (
  <header className="bg-gradient-to-br from-[#120A3A] to-[#1E3163] text-white sticky top-0 z-50 w-full py-4 shadow-lg">
    <nav className="flex justify-between items-center px-6 sm:px-12">
      <div className="text-2xl font-bold">
        <a href="/">Shu Yi</a>
      </div>
      <div className="hidden sm:flex gap-8 text-sm uppercase font-medium">
        <a href="/" className="hover:text-gray-300">Home</a>
        <a href="#about" className="hover:text-gray-300">About</a>
        <a href="#experiences" className="hover:text-gray-300">Experiences</a>
        <a href="#projects" className="hover:text-gray-300">Projects</a>
      </div>
      <div className="flex gap-4 text-xl">
        <a href="https://github.com/sygoh0909" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300"><Icons.FaGithub /></a>
        <a href="https://www.linkedin.com/in/shu-yi-goh" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300"><Icons.FaLinkedin /></a>
        <a href="https://www.instagram.com/shu_yi_0909" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300"><Icons.FaInstagram /></a>
      </div>
      <div className="sm:hidden flex items-center">
        <button className="hover:text-gray-300 text-xl" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      </div>
    </nav>
    {menuOpen && (
      <div className="sm:hidden flex flex-col bg-[#1E3163] text-white py-4 px-6 w-full absolute top-full left-0 shadow-md">
        <a href="/" className="py-2 hover:text-gray-300" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="#about" className="py-2 hover:text-gray-300" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#experiences" className="py-2 hover:text-gray-300" onClick={() => setMenuOpen(false)}>Experiences</a>
        <a href="#projects" className="py-2 hover:text-gray-300" onClick={() => setMenuOpen(false)}>Projects</a>
      </div>
    )}
  </header>
);

export default function Main() {
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetchData()
      .then((data) => {
        setExperiences(data.experiences);
        setProjects(data.projects.map(project => ({
          ...project,
          skills: typeof project.skills === 'string'
            ? project.skills.split(',').map(skill => skill.trim())
            : project.skills
        })));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#120A3A] to-[#1E3163] flex flex-col items-center text-white min-h-screen">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <motion.div id="about" className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-12 w-full max-w-5xl px-6" initial="hidden" animate="visible" variants={fadeIn}>
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-4xl sm:text-7xl font-bold mb-4">Hi, I'm Shu Yi</h1>
          <p className="text-lg sm:text-2xl">IT Student | Passionate about Software Development</p>
        </div>
        <div className="flex-1 text-lg leading-relaxed text-center sm:text-left">
          <p>I'm currently studying Software Engineering and have a strong passion for coding and problem-solving. I am eager to develop innovative solutions and continuously learn in the tech field.</p>
        </div>
      </motion.div>

      <motion.div id="experiences" className="mt-20 w-full max-w-5xl px-6" initial="hidden" animate="visible" variants={fadeIn}>
        <h2 className="text-4xl font-bold mb-6 text-center text-white">Education & Experience</h2>
        <div className="space-y-8">
          {experiences.map((experience) => (
            <motion.div key={experience.id} className="p-6 border-l-4 border-white bg-gradient-to-br from-[#3E2C75] to-[#2E3A65] rounded-lg shadow-md" variants={fadeIn}>
              <h3 className="text-2xl font-bold">{experience.name}</h3>
              <p className="text-sm text-gray-300">{experience.year}</p>
              <p className="mt-2 text-lg">{experience.description}</p>
              <p className="text-sm bg-[#6A5ACD] text-white w-fit px-3 py-1 mt-2 rounded-full">{experience.achievement}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div id="projects" className="mt-20 w-full max-w-5xl px-6" initial="hidden" animate="visible" variants={fadeIn}>
        <h2 className="text-4xl font-bold mb-6 text-center text-white">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div key={project.id} className="p-6 rounded-lg bg-gradient-to-br from-[#3E2C75] to-[#2E3A65] shadow-md" variants={fadeIn}>
              <h3 className="text-2xl font-bold">{project.name}</h3>
              <p className="mt-2 text-lg">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {project.skills.map((skill, index) => (
                  <span key={index} className="text-sm bg-[#6A5ACD] text-white px-3 py-1 rounded-full">{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
{/*
      <div id="certificates" className="mt-20 w-full max-w-5xl px-6">
        <h2 className="text-4xl font-bold mb-6 text-center">Certificates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((certificate) => (
            <div key={certificate.id} className="p-6 rounded-lg bg-[#2A1B5F]">
              <h3 className="text-2xl font-bold">{certificate.name}</h3>
              <p className="mt-2 text-lg">{certificate.issuer}</p>
              <p className="text-sm text-gray-300">{certificate.date}</p>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}

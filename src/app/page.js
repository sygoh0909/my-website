"use client";
import React, { useState, useEffect } from "react";
import { fetchData } from "./utils/fetchData";
import { motion, AnimatePresence } from "framer-motion";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";

// Animations
const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const scaleHover = {
  scale: 1.05,
  transition: { duration: 0.3 }
};

const Icons = { ...FaIcons, ...SiIcons };

const categoryTitles = {
  languages: "Programming Languages",
  frameworks: "Frameworks & Libraries",
  databases: "Databases & Tools",
  platforms: "Software & Platforms",
  otherSkills: "Other Skills"
};

const Header = ({ menuOpen, setMenuOpen }) => (
  <header className="bg-gradient-to-br from-[#120A3A] to-[#1E3163] text-white sticky top-0 z-50 w-full py-4 shadow-lg backdrop-blur-sm bg-opacity-90">
    <nav className="flex justify-between items-center px-6 sm:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-bold"
      >
        <a href="/" className="hover:text-purple-300 transition-colors">Shu Yi</a>
      </motion.div>

      <div className="hidden sm:flex gap-8 text-sm uppercase font-medium">
        {['about', 'skills', 'education', 'projects'].map((item) => (
          <motion.a
            key={item}
            href={`#${item}`}
            className="hover:text-purple-300 transition-colors relative group"
            whileHover={{ y: -2 }}
          >
            {item}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-300 group-hover:w-full transition-all duration-300"></span>
          </motion.a>
        ))}
      </div>

      <div className="flex gap-4 text-xl">
        {[
          { icon: 'FaGithub', url: 'https://github.com/sygoh0909' },
          { icon: 'FaLinkedin', url: 'https://www.linkedin.com/in/shu-yi-goh' },
          { icon: 'FaInstagram', url: 'https://www.instagram.com/shu_yi_0909' }
        ].map((social) => {
          const Icon = Icons[social.icon];
          return (
            <motion.a
              key={social.icon}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-300 transition-colors"
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon />
            </motion.a>
          );
        })}
      </div>

      <motion.div
        className="sm:hidden flex items-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <button
          className="hover:text-purple-300 text-xl transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </motion.div>
    </nav>

    <AnimatePresence>
      {menuOpen && (
        <motion.div
          className="sm:hidden flex flex-col bg-[#1E3163] text-white py-4 px-6 w-full absolute top-full left-0 shadow-md uppercase text-sm"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          {['about', 'skills', 'education', 'projects'].map((item) => (
            <motion.a
              key={item}
              href={`#${item}`}
              className="py-3 hover:text-purple-300 transition-colors border-b border-[#2A1B5F] last:border-0"
              onClick={() => setMenuOpen(false)}
              whileHover={{ x: 5 }}
            >
              {item}
            </motion.a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  </header>
);

export default function Main() {
  const [skills, setSkills] = useState({
    languages: [],
    frameworks: [],
    databases: [],
    platforms: [],
    otherSkills: []
  });
  const [education, setEducation] = useState([]);
  const [projects, setProjects] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData()
      .then((data) => {
        setSkills({
          languages: data.languages,
          frameworks: data.frameworks,
          databases: data.databases,
          platforms: data.platforms,
          otherSkills: data.otherSkills,
        });
        setEducation(data.education);
        setProjects(data.projects.map((project) => ({
          ...project,
          skills: typeof project.skills === "string"
            ? project.skills.split(",").map(skill => skill.trim())
            : project.skills,
        })));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#120A3A] to-[#1E3163]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#0F0A2A] to-[#1A234D] text-white min-h-screen">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main className="max-w-7xl mx-auto px-6 pb-20">
        {/* About Section */}
        <section id="about" className="pt-32 pb-20">
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-between gap-12"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div className="flex-1" variants={fadeIn}>
              <motion.h1
                className="text-4xl sm:text-6xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Hi, I'm <span className="text-purple-300">Shu Yi</span>
              </motion.h1>
              <motion.p
                className="text-xl sm:text-2xl text-purple-200 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                IT Student | Passionate Software Developer
              </motion.p>
              <motion.p
                className="text-lg leading-relaxed text-gray-300 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                I'm currently studying Software Engineering with a strong passion for creating innovative solutions. I thrive on solving complex problems and continuously expanding my knowledge in the ever-evolving tech landscape.
              </motion.p>
            </motion.div>

            <motion.div
              className="mt-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-block bg-purple-700 hover:bg-purple-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300">View My Resume<Icons.FaDownload className="inline ml-2 text-sm" /></a>
            </motion.div>

            <motion.div
              className="flex-1 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="relative w-64 h-64 sm:w-80 sm:h-80">
                <div className="absolute inset-0 bg-purple-500 rounded-full opacity-20 blur-xl"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-purple-900 to-[#1E3163] rounded-full flex items-center justify-center overflow-hidden border-2 border-purple-500/30">
                  <div className="text-6xl">SY</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h2
              className="text-4xl font-bold mb-16 text-center"
              variants={fadeIn}
            >
              My <span className="text-purple-300">Skills</span>
            </motion.h2>

            <div className="space-y-16">
              {Object.entries(skills).map(([category, items]) => (
                <motion.div key={category} variants={itemFadeIn}>
                  <motion.h3
                    className="text-2xl font-bold mb-6 text-purple-200 border-b border-purple-900 pb-2"
                    whileInView={{ x: 0, opacity: 1 }}
                    initial={{ x: -20, opacity: 0 }}
                    viewport={{ once: true }}
                  >
                    {categoryTitles[category] || category}
                  </motion.h3>
                  <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6"
                    variants={staggerContainer}
                  >
                    {items && items.length > 0 ? (
                      items.map((skill) => {
                        const IconComponent = Icons[skill.icon];
                        return (
                          <motion.div
                            key={skill.id}
                            className="p-6 bg-[#1A1A40] rounded-xl shadow-lg hover:shadow-purple-500/20 transition-all duration-300 flex flex-col items-center"
                            variants={itemFadeIn}
                            whileHover={scaleHover}>
                            <div className="relative">
                              <IconComponent className="text-4xl mb-3 text-purple-300" />
                              <div className="absolute inset-0 rounded-full bg-purple-500 opacity-0 group-hover:opacity-20 blur-md transition-opacity"></div>
                            </div>
                            <p className="mt-2 text-lg font-medium">{skill.name}</p>
                            <p className="text-sm text-gray-400 mt-1">{skill.level}</p>
                          </motion.div>
                        );
                      })
                    ) : (
                      <p>No skills available</p>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

          {/* Experience Section */}
        <section id="education" className="py-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h2
              className="text-4xl font-bold mb-16 text-center"
              variants={fadeIn}
            >
              Education & <span className="text-purple-300">Experience</span>
            </motion.h2>

            <div className="space-y-8 relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/20 via-purple-500 to-purple-500/20 left-4 sm:left-8"></div>
              {education && education.length > 0 ? (
                education.map((exp, index) => (
                  <motion.div
                    key={exp.id || index}
                    className="relative pl-12 sm:pl-16 group"
                    variants={itemFadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-purple-500 border-4 border-[#1A1A40]"></div>
                    <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-purple-500/20 animate-ping"></div>

                    <motion.div
                      className="p-6 bg-gradient-to-br from-[#1A1A40] to-[#1E3163] rounded-xl shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <h3 className="text-2xl font-bold text-purple-300">{exp.name}</h3>
                        <span className="text-sm bg-purple-900/50 text-purple-300 px-3 py-1 rounded-full max-w-fit">
                          {exp.year}
                        </span>
                      </div>
                      <p className="text-gray-300 mt-4">{exp.description}</p>
                      {exp.achievement && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          <span className="text-sm bg-purple-900/50 text-purple-300 px-3 py-1 rounded-full">
                            {exp.achievement}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-gray-400">No education experiences available.</p>
              )}
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          >
          <motion.h2
          className="text-4xl font-bold mb-16 text-center"
          variants={fadeIn}
          >
            Featured <span className="text-purple-300">Projects</span>
          </motion.h2>
          <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 gap-8 max-w-7xl mx-auto px-6"
          variants={staggerContainer}
          >
            {projects.map((project) => (
            <motion.div
              key={project.id}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1A1A40] to-[#1E3163] shadow-lg"
              variants={itemFadeIn}
              whileHover="hover"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              >
              <div className="p-6">
                <h3 className="text-2xl font-bold text-purple-300 mb-2">{project.name}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.skills.map((skill, index) => (
                    <span
                    key={index}
                    className="text-xs bg-purple-900/50 text-purple-300 px-2 py-1 rounded-full"
                    >
                    {skill}
                    </span>
                  ))}
                </div>
                <motion.div className="mt-auto">
                  <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-lg max-w-[200px] w-full mx-auto group-hover:from-purple-700 group-hover:to-purple-800 transition-all duration-300"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 10px 25px -5px rgba(126, 34, 206, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  >
                    View Project
                  <Icons.FaExternalLinkAlt className="ml-2 text-sm opacity-70 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                </motion.div>
              </div>
              <motion.div
              className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-purple-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              initial={{ opacity: 0 }}
              />
            </motion.div>
          ))}
        </motion.div>
        </motion.div>
        </section>
      </main>
    </div>
  );
}

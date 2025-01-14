"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import * as Icons from "react-icons/fa";
import { fetchData } from './utils/fetchData';

const Header = ({ menuOpen, setMenuOpen }) => (
  <header className="bg-white sticky top-0 z-50 shadow-md w-full">
    <nav className="flex justify-between items-center px-4 sm:px-8 py-2">
      <div className="text-sky-950 font-bold text-lg">
        <a href="/">Shu Yi</a>
      </div>
      <div className="hidden sm:flex gap-10 text-sky-950">
        <a href="/" className="hover:text-sky-700">Home</a>
        <a href="/skills" className="hover:text-sky-700">Skills</a>
        <a href="#experiences" className="hover:text-sky-700">Experiences</a>
        <a href="https://github.com/sygoh0909" className="hover:text-sky-700" target='_blank' rel='noopener noreferrer'>Projects</a>
        <a href="/contact" className="hover:text-sky-700">Contact</a>
      </div>
      <div className="sm:hidden flex items-center">
        <button
          className="text-sky-950 hover:text-sky-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>
    </nav>
    {menuOpen && (
      <div className="sm:hidden flex flex-col items-center bg-white shadow-md w-full py-4 text-sky-950">
        <a href="/" className="py-2 hover:text-sky-700">Home</a>
        <a href="/skills" className="py-2 hover:text-sky-700">Skills</a>
        <a href="#experiences" className="py-2 hover:text-sky-700">Experiences</a>
        <a href="https://github.com/sygoh0909" className="py-2 hover:text-sky-700" target='_blank' rel='noopener noreferrer'>Projects</a>
        <a href="/contact" className="py-2 hover:text-sky-700">Contact</a>
      </div>
    )}
  </header>
);

export default function Main() {
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetchData()
      .then((data) => {
        setSkills(data.skills);
        setExperiences(data.experiences);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="bg-gray-100 flex flex-col items-center">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <div className="mt-20 flex flex-wrap items-center justify-between gap-12 overflow-y-auto">
        <div className="text-left flex-1 max-w-lg sm:max-w-none text-center sm:text-left ml-5">
          <h1 className="text-4xl sm:text-6xl font-bold text-sky-950 mb-4 sm:mb-8">Hi, I'm Shu Yi</h1>
          <p className="text-xl text-gray-400 mt-4 mb-6">IT Student</p>
          <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-lg mx-auto leading-relaxed">
            Currently studying Software Engineering, I'm passionate about coding and eager to develop innovative solutions. Focused on learning and growing in the tech field.
          </p>
          <a
            href="https://github.com/sygoh0909"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-blue-400 via-teal-500 to-green-500 hover:from-blue-500 hover:via-teal-600 hover:to-green-600 text-white w-40 h-10 flex items-center justify-center rounded shadow-md transition-all duration-300"
          >
            View My Projects
          </a>
        </div>
        <div className='flex-1 max-w-lg mt-8 sm:mt-0'>
          <Image src="/capybara.png" alt="pic" width={400} height={300} />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-sky-950 mb-9 mt-20 text-center">Technical skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills && skills.length > 0 ? (
            skills.slice(0, 3).map((skill) => {
              const SkillIcon = Icons[skill.icon];

              return (
                <div key={skill.id} className="bg-white w-80 h-40 rounded-md flex flex-col items-center justify-center text-sky-950 shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                  {SkillIcon ? <SkillIcon className="text-4xl text-sky-500 mb-8 animate-pulse" /> : <span>No icon</span>}
                  <h3 className="font-bold mb-2">{skill.name}</h3>
                  <p className="text-xs">{skill.description}</p>
                </div>
              );
            })
          ) : (
            <li className="text-gray-400">No skills available</li>
          )}
        </div>
        <div className="flex items-center justify-center">
          <a href="/skills" target="_blank" rel="noopener noreferrer" className="bg-sky-500 hover:bg-blue-300 flex items-center justify-center w-36 h-10 rounded mt-5">
            View More
          </a>
        </div>
      </div>

      <div id="experiences" className="mt-20">
        <h2 className="text-2xl font-bold text-sky-950 mb-9 text-center">Education and Experience</h2>
        <div className="relative w-full max-w-4xl mx-auto min-h-screen">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-sky-500"></div>
          <div className="flex flex-col text-sky-950 gap-10 sm:gap-12">
            {experiences.map((experience, index) => {
              const positionLeft = index % 2 !== 0;
              return (
              <div
              key={experience.id}
              className={`relative flex flex-col bg-white rounded-md shadow-md p-6 w-full sm:w-80 mx-auto ${positionLeft ? "sm:left-1/2 sm:ml-[50px]" : "sm:right-1/2 sm:mr-[50px]"} transition-all duration-300`}
              >
                <p className="text-sm sm:text-[14px]">{experience.year}</p>
                <h3 className="font-bold text-lg sm:text-xl mb-4 mt-2">{experience.name}</h3>
                <p className="text-sm sm:text-[14px]">{experience.description}</p>
                <p className="text-xs bg-sky-200 text-sky-500 w-28 h-8 rounded-full flex justify-center items-center mt-2">
                  {experience.achievement}
                  </p>
                </div>
              );
              })}
            </div>
          </div>
        </div>
    </div>
  );
}

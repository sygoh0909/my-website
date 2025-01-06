"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import * as Icons from "react-icons/fa"

async function fetchSkills(){
  try{
    const res = await fetch('http://localhost:3000/api/skills');
    if(!res.ok){
      throw new Error('Failed to fetch skills');
    }
    const skills = await res.json();
    return skills;
  }catch (err){
    console.error('Error fetching skills:', err);
    return [];
  }
}

export default function Main (){
  const [skills, setSkills] = useState([]);

  useEffect(() =>{
    fetchSkills().then(setSkills);
  }, []);

  return(
    <div className="bg-gray-100 flex flex-col items-center">
      <header className="bg-white sticky top-0 z-50 shadow-md w-full h-12">
        <nav className="absolute flex gap-10 right-0 pr-96 top-2.5 text-sky-950">
          <a href="page.js" className='hover:text-sky-700'>Home</a>
          <a href="skills.js" className='hover:text-sky-700'>Skills</a>
          <a href="experience.js" className='hover:text-sky-700'>Experiences</a>
          <a href="https://github.com/sygoh0909" className='hover:text-sky-700'>Projects</a>
          <a href="contact.js" className='hover:text-sky-700'>Contact</a>
        </nav>
      </header>
      <div className="mt-20 flex flex-grow items-center gap-24 overflow-y-auto">
        <div className="text-left">
          <h1 className="text-6xl font-bold text-sky-950 mb-8">Hi, I'm Shu Yi</h1>
          <p className="text-xl text-gray-400 mt-10 mb-8">IT Student</p>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxes">Currently studying in Software Engineering.</p>
          <a href='https://github.com/sygoh0909' target='_blank' rel='noopener noreferrer' className='bg-gradient-to-r from-blue-400 via-teal-500 to-green-500 hover:from-blue-500 hover:via-teal-600 hover:to-green-600 text-white w-40 h-10 flex items-center justify-center rounded shadow-md transition-all duration-300'>View My Projects</a>
        </div>
        <div>
          <Image src="/capybara.png" alt="pic" width={400} height={300}/>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-sky-950 mb-9 mt-20 text-center">Technical skills</h2>
        <div className="text-sky-95 flex flex-row gap-8">
          {skills.length > 0 ? (
            skills.slice(0, 3).map((skill) => {
              const SkillIcon = Icons[skill.icon];

              return(
                <div key={skill.id} className='bg-white w-96 h-48 rounded-md flex flex-col items-center justify-center text-sky-950 shadow-lg'>
                  {SkillIcon ? (
                    <SkillIcon className='text-4xl text-sky-500 mb-8'/>
                  ) : (
                    <span>No icon</span>
                  )}
                    <h3 className='font-bold mb-2'>{skill.name}</h3>
                    <p className='text-xs'>{skill.description}</p>
                </div>
              );
            })
          ) : (
            <li>No skills available</li>
          )}
      </div>
      <div className='flex items-center justify-center'><a href='skills.js' target='_blank' rel='noopener noreferrer' className='bg-sky-500 hover:bg-blue-300 flex items-center justify-center w-36 h-10 rounded mt-5'>View More</a></div>
    </div>
    <div>
      <h2 className='text-2xl font-bold text-sky-950 mb-9 mt-20'>Education and Experience</h2>
      <div className='min-h-screen relative w-full max-w-4xl'>
        <div className='absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-sky-500'></div>
      </div>
    </div>
  </div>
  )
}
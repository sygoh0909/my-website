"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import * as Icons from "react-icons/fa"

async function fetchData(){
  try{
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    const res = await fetch(`${baseURL}/api/data`)
    if(!res.ok){
      throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    return {skills: data.skills || [], experiences: data.experiences || []};
  }catch (err){
    console.error('Error fetching data:', err);
    return {skills:[], experiences:[]};
  }
}

export default function Main (){
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);

  useEffect(() =>{
    fetchData().then((data)=>{
      setSkills(data.skills);
      setExperiences(data.experiences);
    });
  }, []);

  return(
    <div className="bg-gray-100 flex flex-col items-center">
      <header className="bg-white sticky top-0 z-50 shadow-md w-full h-12">
        <nav className="absolute flex gap-10 right-0 pr-96 top-2.5 text-sky-950">
          <a href="/" className='hover:text-sky-700'>Home</a>
          <a href="/skills" className='hover:text-sky-700'>Skills</a>
          <a href="#experiences" className='hover:text-sky-700'>Experiences</a>
          <a href="https://github.com/sygoh0909" className='hover:text-sky-700'>Projects</a>
          <a href="/contact" className='hover:text-sky-700'>Contact</a>
        </nav>
      </header>
      <div className="mt-20 flex flex-grow items-center gap-12 overflow-y-auto">
        <div className="text-left">
          <h1 className="text-6xl font-bold text-sky-950 mb-8">Hi, I'm Shu Yi</h1>
          <p className="text-xl text-gray-400 mt-10 mb-8">IT Student</p>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxes">Currently studying Software Engineering, I'm passionate about coding and eager to develop innovative solutions. Focused on learning and growing in the tech field.</p>
          <a href='https://github.com/sygoh0909' target='_blank' rel='noopener noreferrer' className='bg-gradient-to-r from-blue-400 via-teal-500 to-green-500 hover:from-blue-500 hover:via-teal-600 hover:to-green-600 text-white w-40 h-10 flex items-center justify-center rounded shadow-md transition-all duration-300'>View My Projects</a>
        </div>
        <div>
          <Image src="/capybara.png" alt="pic" width={400} height={300}/>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-sky-950 mb-9 mt-20 text-center">Technical skills</h2>
        <div className="flex flex-row gap-8">
          {skills && skills.length > 0 ? (
            skills.slice(0, 3).map((skill) => {
              const SkillIcon = Icons[skill.icon];

              return(
                <div key={skill.id} className='bg-white w-80 h-40 rounded-md flex flex-col items-center justify-center text-sky-950 shadow-lg'>
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
            <li className='text-gray-400'>No skills available</li>
          )}
      </div>
      <div className='flex items-center justify-center'><a href='/skills' target='_blank' rel='noopener noreferrer' className='bg-sky-500 hover:bg-blue-300 flex items-center justify-center w-36 h-10 rounded mt-5'>View More</a></div>
    </div>
    <div id='experiences'>
      <h2 className='text-2xl font-bold text-sky-950 mb-9 mt-20 text-center'>Education and Experience</h2>
      <div className='min-h-screen relative w-full max-w-4xl'>
        <div className='absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-sky-500'></div>
        <div className='flex flex-col text-sky-950 gap-20'>
          {experiences.map((experience, index) => {
            const positionLeft = index % 2 !== 0;
            return(
              <div key={experience.id} className={`relative flex flex-col bg-white w-80 h-40 rounded-md shadow-md p-4 ${positionLeft ? "left-1/2 ml-[50px]" : "right-1/2 mr-[50px]"}`}>
                <p className='text-[14px]'>{experience.year}</p>
                <h3 className='font-bold mb-4 mt-2'>{experience.name}</h3>
                <p className='text-[14px]'>{experience.description}</p>
                <p className='text-xs bg-sky-200 text-sky-500 w-28 h-8 rounded-full flex justify-center items-center mt-2'>{experience.acheivement}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
  )
}
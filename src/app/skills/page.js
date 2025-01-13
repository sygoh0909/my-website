"use client";
import React, { useState, useEffect } from 'react';
import * as Icons from 'react-icons/fa';
import { fetchData } from '../utils/fetchData';

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
            <a href="https://github.com/sygoh0909" className="hover:text-sky-700">Projects</a>
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
            <a href="https://github.com/sygoh0909" className="py-2 hover:text-sky-700">Projects</a>
            <a href="/contact" className="py-2 hover:text-sky-700">Contact</a>
        </div>
    )}
    </header>
    );

export default function Main(){
    const [skills, setSkills] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(()=>{
        fetchData().then((data)=>{
            setSkills(data.skills);
            setExperiences(data.experiences);
        });
    }, []);

    return(
        <div className="bg-gray-100 flex flex-col items-center">
            <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <h2 className="text-2xl font-bold text-sky-950 mb-9 mt-20 text-center">Technical skills</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {skills && skills.length > 0 ? (
                skills.map((skill) => {
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
        </div>
    );
}
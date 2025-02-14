"use client";
import React, {useState, useEffect} from "react";

const Header = ({menuOpen, setMenuOpen}) =>(
    <header className="bg-white sticky top-0 z-50 shadow-md w-full">
        <nav className="flex justify-between items-center px-4 sm:px-8 py-2">
            <div className="text-sky-950 font-bold text-lg">
                <a href="/">Shu Yi</a>
            </div>
            <div className="hidden sm:flex gap-10 text-sky-950">
                <a href="/" className="hover:text-sky-700">Home</a>
                <a href="/skills" className="hover:text-sky-700">Skills</a>
                <a href="/#experiences" className="hover:text-sky-700">Experiences</a>
                <a href="https://github.com/sygoh0909" className="hover:text-sky-700" target="_blank" rel="noopener noreferrer">Projects</a>
                <a href="/contact" className="hover:text-sky-700">Contact</a>
            </div>
            <div className="sm:hidden flex items-center">
                <button className="text-sky-950 hover:text-sky-700"
                onClick={()=>setMenuOpen(!menuOpen)}>☰</button>
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
    const [menuOpen, setMenuOpen] = useState(false);
    return(
        <div className='bg-white'>
            <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen}></Header>
            <h2 className="text-2xl font-bold text-sky-950 mb-9 mt-10 text-center">Contact Page</h2>
        </div>
    )
}

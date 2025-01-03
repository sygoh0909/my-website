import {FaJava, FaReact} from "react-icons/fa";
import {SiPython, SiMySql} from "react-icons/si";

export default function Home (){
  return(
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="relative">
        <nav className="mr-20 absolute top-5 text-sky-950 flex gap-6">
          <a href="page.js">Home</a>
          <a href="skills.js">Skills</a>
          <a href="experience.js">Experiences</a>
          <a href="projects.js">Projects</a>
          <a href="contact.js">Contact</a>
        </nav>
      </header>
      <div className="flex flex-grow items-center gap-64">
        <div className="text-left">
          <h1 className="text-6xl font-bold text-sky-950 mb-8">Hi, I'm Shu Yi</h1>
          <p className="text-xl text-gray-400 mt-2 mb-10">IT Student</p>
          <p className="text-xl text-gray-400 mb-10">Currently studying my degree in Software Engineering</p>
          <button className="bg-blue-200 w-1/3 h-10 rounded-md text-white">View my projects</button>
        </div>
        <div>
          <img src="logo.png"></img>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-sky-950">Technical skills</h2>
        <div className="text-sky-950 flex flex-row gap-10">
          <div className="bg-white w-60 h-32 rounded-md flex flex-col items-center justify-center">
            <FaJava className="text-4xl text-blue-500 mb-2"></FaJava>
            <h3 className="font-bold">Java</h3>
            <p className="text-xs">Object-Oriented Programming</p>
            <p></p>
          </div>
          <div className="bg-white w-60 h-32 rounded-md flex flex-col items-center justify-center">
            <FaReact className="text-4xl text-blue-500 mb-2"></FaReact>
            <h3 className="font-bold">React.js</h3>
            <p className="text-xs">Frontend Development</p>
          </div>
          <div className="bg-white w-60 h-32 rounded-md flex flex-col items-center justify-center">

            <h3 className="font-bold">SQL</h3>
            <p>Database Management</p>
          </div>
        </div>
        <a href="skills.js" className="text-blue-500">View More</a>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-sky-950">Education & Experience</h2>
        <div>
          <p>Bachelor of Software Engineering (Hons)</p>
        </div>
      </div>
    </div>
  )
}
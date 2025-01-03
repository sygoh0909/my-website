export default function Home (){
  return(
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="relative">
        <nav className="absolute top-5 right-5">
          <a href="page.js">Home</a>
        </nav>
      </header>
      <div className="flex-grow flex items-center ml-10">
        <h1 className="text-4xl font-bold text-gray-900">Hi, I'm Shu Yi</h1>
        <p className="text-xl text-gray-600 mt-2">Welcome to my world</p>
      </div>
    </div>
  )
}
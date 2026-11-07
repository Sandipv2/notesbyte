import React from 'react'
import Navbar from '../components/Navbar'

function Home() {
  return (
    <div className='text-center flex flex-col items-center justify-center h-screen'>
      <h2 className='font-bold text-2xl lg:text-3xl'>
        Capture. Note. Share.
      </h2>
      <h1 className='font-extrabold text-7xl lg:text-9xl text-cyan-400'>
        Notesbyte
      </h1>
      <p className='text-xl lg:text-3xl mt-5 px-5'>
        A personal space to save your thoughts, code snippets, and images.
      </p>
      <p className='text-xl lg:text-3xl px-5'>
        Keep your notes private or share them with anyone using a simple link.
      </p>

      <button className='rounded-full bg-cyan-400 w-fit px-5 py-2 text-2xl text-black font-bold mt-20 cursor-pointer shadow-2xl duration-300 ease-linear transition-all hover:shadow-[0_0_35px_rgba(57,222,247,0.9)] hover:scale-105'>
        Get Started
      </button>
    </div>
  )
}

export default Home 
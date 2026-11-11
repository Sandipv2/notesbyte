import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className='fixed w-full bg-black flex justify-around border-b-2 border-slate-700 items-center py-2'>
      <Link to="/">
        <h1 className='text-3xl font-extrabold text-cyan-400'>
          Notesbyte
        </h1>
      </Link>

      <Link to="/login">
        <button className='text-lg lg:text-xl rounded-full border-4 border-cyan-400 px-5 lg:px-10 font-bold flex items-center gap-4 hover:bg-cyan-400 hover:scale-95 hover:text-black duration-300 ease-linear cursor-pointer'>
          Login
          <FaArrowRight />
        </button>
      </Link>
    </nav>
  )
}

export default Navbar
import { useState, useEffect } from "react";

import { FaArrowRight } from "react-icons/fa";
import { SlHome } from "react-icons/sl";
import { FaPenNib } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

import { Link, NavLink } from "react-router-dom";

import { useAuthStore } from "../store/authStore";

function Navbar() {
  const [isProfileClicked, setIsProfileClicked] = useState(false);

  const { isLoggedIn, user, checkAuth, logout } = useAuthStore();

  useEffect(() => {
    checkAuth().catch((error) => {
      console.log(error.message)
    });
  }, [checkAuth])

  async function handleLogout() {
    await logout().catch((err) => {
      console.log(err.message)
    })
  }

  return (
    <nav className='fixed w-full bg-black flex justify-around border-b-2 border-slate-700 items-center py-2'>
      <Link to="/">
        <h1 className='text-3xl font-extrabold text-cyan-400'>
          Notesbyte
        </h1>
      </Link>


      {isLoggedIn && user.isAccountVerified
        ?
        <div onClick={() => setIsProfileClicked(!isProfileClicked)} className="relative bg-cyan-400 rounded-full w-10 h-10 cursor-pointer text-center content-center">
          <p className="font-bold text-xl text-black cursor-pointer">{user.name[0].toUpperCase()}</p>

          <ul className={`absolute border border-slate-600 top-12 right-0 text-left bg-black font-bold text-white rounded-md overflow-hidden w-45 ${isProfileClicked ? 'block' : 'hidden'}`}>
            <NavLink
              to='/'
              className={({ isActive }) => `${isActive ? 'bg-cyan-600' : ''} rounded block`}
            >
              <li className="hover:bg-cyan-600 hover:text-black duration-300 cursor-pointer p-2 px-3 flex gap-2 items-center content-center">
                <SlHome strokeWidth={50} />
                <p>Home</p>
              </li>
            </NavLink>

            <NavLink
              to='/notes'
              className={({ isActive }) => `${isActive ? 'bg-cyan-600' : ''} rounded block`}
            >
              <li className="hover:bg-cyan-600 hover:text-black duration-300 cursor-pointer p-2 px-3 flex gap-2 items-center content-center">
                <FaPenNib />
                <p>Notes</p>
              </li>
            </NavLink>

            <li onClick={handleLogout} className="hover:bg-cyan-600 hover:text-black duration-300 cursor-pointer p-2 px-3 flex gap-2 items-center content-center">
              <MdLogout size={20} />
              <p>Logout</p>
            </li>

            <NavLink
              to='/settings'
              className={({ isActive }) => `${isActive ? 'bg-cyan-600' : ''} rounded block`}
            >
              <li className="hover:bg-cyan-600 hover:text-black duration-300 cursor-pointer p-2 px-3 flex gap-2 items-center content-center">
                <IoSettingsOutline size={20} />
                <p>Settings</p>
              </li>
            </NavLink>
          </ul>
        </div>
        :
        <Link to="/login">
          <button className='text-lg lg:text-xl rounded-full border-4 border-cyan-400 px-5 lg:px-10 font-bold flex items-center gap-4 hover:bg-cyan-400 hover:scale-95 hover:text-black duration-300 ease-linear cursor-pointer'>
            Login
            <FaArrowRight />
          </button>
        </Link>
      }
    </nav>
  )
}

export default Navbar
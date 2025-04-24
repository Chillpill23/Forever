import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { NavLink, Link } from 'react-router-dom'

import { CiSearch, CiUser, CiShoppingCart, CiMenuFries, CiCircleChevLeft } from "react-icons/ci";
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {

  const {showSearch, setShowSearch, getCartCount, navigate, token, setToken, setCartItems} = useContext(ShopContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
    navigate('/login')
  }

  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to='/' title='Home'>
       <img src={assets.logo} className='w-36' alt="Forever Logo" />
      </Link>

      <ul className='hidden md:flex gap-5 text-sm text-gray-700 uppercase'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
            <p>Home</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
            <p>Collection</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink to='/about' className='flex flex-col items-center gap-1'>
            <p>About</p>

            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
            <p>Contact</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
      </ul>

      <div className='flex items-center gap-4 sm:gap-6'>
        <CiSearch onClick={() => setShowSearch(!showSearch)} className='w-7 h-7 cursor-pointer'/>
        <div className='group relative'>
          
          <CiUser onClick={() => token ? null : navigate('/login')} className='w-7 h-7 cursor-pointer'/>
          {token &&           
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                  <p className="cursor-pointer hover:text-black">My Profile</p>
                  <p onClick={() => token ? navigate('/orders') : navigate('/login')} className="cursor-pointer hover:text-black">Orders</p>
                  <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
                </div>
            </div>
          }
        </div>
        
        <Link to='/cart' className='relative'>
            <CiShoppingCart className='w-7 h-7 cursor-pointer'/>
            <p className='absolute right-[-5px] top-0 w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[9px]'>{getCartCount()}</p>
        </Link>

        <CiMenuFries onClick={() => {setIsVisible(!isVisible)}} className='w-7 h-7 cursor-pointer md:hidden'/>
      </div>

      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${isVisible ? 'w-full' : 'w-0'}`}>
        <div className="flex flex-col text-gray-600">
          <div onClick={() => {setIsVisible(!isVisible)}} className='flex items-center gap-2 p-3 cursor-pointer'>
            <CiCircleChevLeft className='w-7 h-7'/>
            <p>Back</p>
          </div>

          <NavLink to='/' onClick={()=> {setIsVisible(!isVisible)}} className='py-2 pl-6 border-b border-gray-300 uppercase'>
            <p>Home</p>
          </NavLink>

          <NavLink to='/collection' onClick={()=> {setIsVisible(!isVisible)}} className='py-2 pl-6 border-b border-gray-300 uppercase'>
              <p>Collection</p>
          </NavLink>

          <NavLink to='/about' onClick={()=> {setIsVisible(!isVisible)}} className='py-2 pl-6 border-b border-gray-300 uppercase'>
              <p>About</p>
          </NavLink>
          
          <NavLink to='/contact' onClick={()=> {setIsVisible(!isVisible)}} className='py-2 pl-6 border-b border-gray-300 uppercase'>
              <p>Contact</p>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar
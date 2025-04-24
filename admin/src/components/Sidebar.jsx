import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiViewList, CiBoxes } from "react-icons/ci";

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2 border-gray-300'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
        <NavLink to='/add' className="flex items-center gap-2 px-4 py-2 border border-gray-300 border-r-0">
          <IoIosAddCircleOutline className='w-6 h-6'/>
          <p className='hidden md:block'>Add Items</p>
        </NavLink>

        <NavLink to='/list' className="flex items-center gap-2 px-4 py-2 border border-gray-300 border-r-0">
          <CiViewList className='w-6 h-6'/>
          <p className='hidden md:block'>Products</p>
        </NavLink>

        <NavLink to='/order' className="flex items-center gap-2 px-4 py-2 border border-gray-300 border-r-0">
          <CiBoxes className='w-6 h-6'/>
          <p className='hidden md:block'>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-md'>
        <div>
          <img src={assets.logo} className='mb-5 w-32' alt="Forever Logo"/>
          <p className='w-full md:w-2/3 text-gray-600 text-sm'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>Company</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <Link title="Home" className='hover:text-yellow-700' to='/'>Home</Link>
            <Link title="About Us" className='hover:text-yellow-700' to='/about'>About Us</Link>
            <Link title="Delivery" className='hover:text-yellow-700' to='/delivery'>Delivery</Link>
            <Link title="Privacy Policy" className='hover:text-yellow-700' to='/privacy-policy'>Privacy Policy</Link>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>Get In Touch</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
             <li>+1-212-456-7890</li>
             <li>contact@foreveryou.com</li>
          </ul>
        </div>
      </div>
      <div className='mt-20'>
          <hr className='not-target:border border-gray-200'/>
          <p className='py-5 text-sm text-center'>Copyright 2024 @ Forever.com - All Rights Reserved</p>
        </div>
    </div>
  )
}

export default Footer
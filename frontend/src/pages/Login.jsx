import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendURL } = useContext(ShopContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (currentState === 'Sign Up') {

        const response = await axios.post(backendURL + '/api/user/register', { name, email, password });
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }

      } else {
        const response = await axios.post(backendURL + '/api/user/login', { email, password });
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if(localStorage.getItem('token')){
      navigate('/')
    }
  }, [token, navigate])
  

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-3 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {currentState === 'Login' ? '' : (
        <div className='w-full'>
          <label className=''>Name</label>
          <input id='name' value={name} onChange={(e) => { setName(e.target.value) }} className='w-full px-3 py-2 border border-gray-800' placeholder='John Doe' type='text' required />
        </div>
      )}

      <div className='w-full'>
        <label className=''>Email</label>
        <input id='email' value={email} onChange={(e) => { setEmail(e.target.value) }} className='w-full px-3 py-2 border border-gray-800' placeholder='JohnDoe@gmail.com' type='email' required />
      </div>

      <div className='w-full'>
        <label className=''>Password</label>
        <input id='password' value={password} onChange={(e) => { setPassword(e.target.value) }} className='w-full px-3 py-2 border border-gray-800' placeholder='Password' type='password' required />
        <div className='w-full flex justify-between text-sm mt-[8px]'>
          <p className='cursor-pointer text-gray-500'>Forgot your password?</p>
          {currentState === 'Login' ?
            <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create an account</p>
            :
            <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login here</p>
          }
        </div>
      </div>
      <button className='bg-slate-800 text-white font-light px-8 py-2 mt-4'>
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  )
}

export default Login
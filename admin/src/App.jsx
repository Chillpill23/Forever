import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Order from './pages/Order'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$"

const App = () => {

  const [token, setToken] = useState(
    localStorage.getItem('token') ? localStorage.getItem('token') : ''
  );

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])
  

  return (
    <div className='bg-gray-100 min-h-screen'>
      <ToastContainer/>
      {token === "" 
        ? <Login setToken={setToken}/>
        : <>
            <Navbar setToken={setToken}/>
            <div className='flex w-full'>
              <Sidebar />
              <div className='w-[70%] px-4 ml-[max(5w,25px)] my-8 text-gray-600 text-base'>
                  <Routes>
                    <Route path='/add' element={<Add token={token} />}/>
                    <Route path='/list' element={<List token={token} />}/>
                    <Route path='/order' element={<Order token={token} />}/>
                  </Routes>
              </div>
            </div>
          </>
      }
    </div>
  )
}

export default App
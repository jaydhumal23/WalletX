import { message } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Header = () => {
  const [username, setUsername] = useState("")
  const navigate = useNavigate()
  useEffect(() => {
    async function logincheck() {
      try {
        const { data } = await axios.get("/api/v1/users/logincheck");
        setUsername(e => e = data.details.name)


      } catch (err) {
        console.log(err)
      }
    }
    logincheck()

  }, [])
  function gotoHome() {
    navigate("/home")
  }
  async function logout() {
    try {
      const { data } = await axios.get("/api/v1/users/logout")
      if (data.success) {
        console.log(data.success)
        message.success("Logout successful!");
        navigate("/login")
      }


    } catch (err) {
      console.log("logout err")

    }
    co
  }
  return (
    <nav>
      <div className='flex items-center px-2 gap-10 py-2 bg-gradient-to-r  bg-gray-500 justify-between '>
        <div className='flex justify-center items-center gap-10'>
          <a href='#' className='text-2xl text-amber-100 font-' ><i>Expense Tracker</i> </a >
          <a className='text-gray-200 text-xl cursor-pointer hover:text-gray-50 transition-colors duration-30' onClick={gotoHome} >Home</a>
        </div>
        <div className='flex justify-center items-center gap-3 select-none'>
          <div className='text-gray-300 text-md font-mono cursor-default '>{username}</div>
          <button onClick={logout} className='cursor-pointer '> <img className="h-8" src="https://jays3aws.s3.ap-south-1.amazonaws.com/assets/log-out.png" /></button>

        </div>

      </div>
      <hr className='text-gray-300 ' />
    </nav>
  )
}

export default Header
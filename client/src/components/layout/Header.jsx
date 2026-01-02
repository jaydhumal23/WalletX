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
        setUsername(data.details.name)


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
      console.log("logout err" + err)


    }

  }
  return (
    <nav className='backdrop-blur-sm bg-gray-500/20 mb-5 '>
      <div className='flex items-center px-2 gap-10 py-2    justify-between '>
        <div className='flex justify-center items-center gap-10 max-sm:gap-2'>
          <a onClick={gotoHome} href='' className='text-2xl text-gray-100 hover:text-white transition-colors duration-30 font-semibold  max-sm:text-[16px] ' ><i>WalletX</i> </a >

        </div>
        <div className='flex justify-center items-center gap-3 select-none'>
          <div className='text-gray-700 text-[15px] font-mono cursor-default hover:text-[17px] transition-all  duration-[.5s] hover:text-gray-800 hover:font-semibold-[500]  max-sm:text-[12px]'>Hi, {username}</div>
          <button onClick={logout} className='cursor-pointer '>   <img className="h-8 max-sm:h-5" src="https://jays3aws.s3.ap-south-1.amazonaws.com/assets/log-out.png" />

          </button>

        </div>

      </div>
    </nav>
  )
}

export default Header
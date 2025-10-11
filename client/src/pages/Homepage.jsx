import React, { use } from 'react'
import Layout from '../components/layout/Layout'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Homepage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Home"
    async function logincheck() {
      try {
        const { data } = await axios.get("/api/v1/users/logincheck")
        
        if (!data.success) {
          navigate("/login")
        }
      } catch (err) {
        console.log(err)
        navigate("/login")
      }
    }
    logincheck()

  }, [])

  return (
    <Layout>
      <h1 className='text-black'>Hello welcome to homepage</h1>
    </Layout>
  )
}

export default Homepage
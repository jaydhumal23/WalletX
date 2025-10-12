import React from 'react'
import Header from './Header'
import Footer from './Footer'
const Layout = ({ children }) => {
  return (

    <div className='w-full min-h-screen p-0 m-0 box-border  bg-[url(https://jays3aws.s3.ap-south-1.amazonaws.com/assets/ilust3.jpg)] bg-cover'>
      <Header />
      <div className='content mt-2'>
        {children}
      </div>
      <Footer />
    </div>

  )
}

export default Layout
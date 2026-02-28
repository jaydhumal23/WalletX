import React from 'react'


const Footer = ({ textColor = 'text-gray-300' }) => {
  return (
    <div className={`${textColor} font-semibold font-mono flex justify-end items-center w-full pr-2 pb-2 absolute bottom-0 right-0 z-50 pointer-events-none`}>
      <h6 className='text-right text-[12px]'>&copy; {new Date().getFullYear()} Jay Dhumal. All rights reserved.</h6>
    </div>
  )
}

export default Footer
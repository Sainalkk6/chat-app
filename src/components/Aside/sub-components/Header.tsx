import React from 'react'

const Header = () => {
  return (
    <div className='flex py-4 justify-between items-center'>
        <span className='text-field-label text-xl'>Messages</span>
        <img src="/icons/message-icon.svg" alt="" />   
    </div>
  )
}

export default Header

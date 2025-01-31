import React from 'react'
import ProfileStrip from './sub-components/ProfileStrip';
import Users from './sub-components/Users';

const Aside = () => {
  return (
    <div className='flex flex-col w-full max-w-[430px] p-6 gap-7 rounded-3xl bg-default'>
      <ProfileStrip/>
      <Users/>
    </div>
  )
}

export default Aside

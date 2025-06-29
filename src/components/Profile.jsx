import Image from 'next/image'
import React from 'react'
import { BiDotsVertical } from "react-icons/bi";

function Profile() {
  return (
    <div className='flex items-center justify-between'>
        <div className='flex items-center py-2 gap-2'>
            <Image 
                src={'/images/avatar.jpeg'}
                width={40}
                height={40}
                alt='avatar'
                className='rounded-full border-2 border-[var(--black3)]'
            />
            <h3 className='text-base font-semibold'>Guest</h3>
        </div>
        <button type='button' className='cursor-pointer active:scale-90 transition-all duration-300 hover:scale-110'><BiDotsVertical size={20}/></button>
    </div>
  )
}

export default Profile
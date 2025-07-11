import Image from 'next/image'
import React from 'react'

function UserList({avatar=null, name=null, phone=null, handleClick=null}) {
  return (
    <button type='button' onClick={()=>handleClick(phone, avatar, name)} className='p-4 w-full hover:bg-[var(--black3)] rounded-md cursor-pointer transition-all duration-200 active:scale-95 select-none'>
        <div className='flex items-center gap-2'>
            <Image 
                src={avatar?avatar: '/images/avatar.jpeg'}
                width={35}
                height={35}
                alt='avatar'
                className='rounded-full'
            />
            <h3>{name? name : phone}</h3>
        </div>
    </button>
  )
}

export default UserList
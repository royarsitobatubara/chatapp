import Image from 'next/image';
import React from 'react';
import { FaPhone, FaVideo  } from "react-icons/fa6";

function ChatUser({photo=null, name=''}) {
  return (
    <div className='w-full grid grid-rows-8 h-dvh'>

      <div className='row-span-1 bg-[var(--black2)] px-4 w-full flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Image 
            src={photo? photo :'/images/avatar.jpeg'}
            width={50}
            height={50}
            className='rounded-full'
          />
          <h2 className='font-bold'>{name || "Guest"}</h2>
        </div>
        <div className='flex gap-5 *:active:scale-95 *:cursor-pointer *:p-2 *:rounded-full *:hover:bg-[var(--blue1)] *:transition-all *:duration-300'>
          <button type="button" className=''><FaVideo size={18} /></button>
          <button type="button" className=''><FaPhone size={18} /></button>
        </div>
      </div>

      <div className='row-span-6 w-full'>2</div>
      <div className='row-span-1 bg-[var(--black2)] w-full'>3</div>
      
    </div>
  )
}

export default ChatUser
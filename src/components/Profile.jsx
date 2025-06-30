import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { BiDotsVertical } from "react-icons/bi";
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/router';

function Profile({handleSetting = null}) {

  const [isView, setView] = useState(false);
  const [decode, setDecode] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      setDecode(jwtDecode(token));
    }
  }, []);
  console.log(decode)
  function logoutHandle(){
    localStorage.clear('token');
    router.replace('/auth/login');
  }

  return (
    <div className='relative flex items-center px-5 justify-between'>
        <div className='flex items-center py-2 gap-2 '>
            <Image 
                src={decode?.profile?decode.profile:'/images/avatar.jpeg'}
                width={40}
                height={40}
                alt='avatar'
                className='rounded-full border-2 border-[var(--black3)]'
            />
            <h3 className='text-base font-semibold'>{decode?.name ? decode.name : "Guest"}</h3>
        </div>
        <button type='button' onClick={()=>setView(e=>!e)} className='cursor-pointer active:scale-90 transition-all duration-300 hover:scale-110'><BiDotsVertical size={20}/></button> 

        {isView && 
          <div className='absolute top-full right-0 bg-[var(--black2)] py-2 px-1 *:text-sm *:cursor-pointer *:hover:bg-[var(--black3)] *:w-full rounded-bl-md shadow-gray-500 border-l-[1px] border-b-[1px] border-gray-700'>
            <button onClick={()=>handleSetting(e=>!e)} className='px-4 py-2 rounded-sm'>Settings</button>
            <button onClick={logoutHandle} className='px-4 py-2 rounded-sm'>Logout</button>
          </div>
        }
    </div>
  )
}

export default Profile;
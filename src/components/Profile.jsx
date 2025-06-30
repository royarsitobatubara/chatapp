import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { BiDotsVertical } from "react-icons/bi";
import { useRouter } from 'next/router';
import { RiCloseLargeLine } from "react-icons/ri";
import { jwtDecode } from 'jwt-decode';

function Profile({ handleSetting = null, user=null }) {
  const [isView, setView] = useState(false);
  const router = useRouter();


  function logoutHandle() {
    localStorage.removeItem('token');
    router.replace('/auth/login');
  }

  return (
    <div className='relative flex items-center px-5 justify-between'>
      <div className='flex items-center py-2 gap-2'>
        <Image
          src={user?.photo || '/images/avatar.jpeg'}
          width={40}
          height={40}
          alt='avatar'
          className='rounded-full border-2 border-[var(--black3)]'
        />
        <h3 className='text-base font-semibold'>{user?.name || 'Guest'}</h3>
      </div>

      <button
        type='button'
        onClick={() => setView(prev => !prev)}
        className='cursor-pointer active:scale-90 transition-all duration-200'
      >
        {isView ? <RiCloseLargeLine size={20} /> : <BiDotsVertical size={20} />}
      </button>

      {isView && (
        <div className='overflow-hidden absolute top-full right-0'>
          <div className='slideDown bg-[var(--black2)] py-2 px-1 *:text-sm *:cursor-pointer *:hover:bg-[var(--black3)] *:w-full rounded-bl-md shadow-gray-500 border-l-[1px] border-b-[1px] border-gray-700'>
            <button onClick={() => handleSetting?.(prev => !prev)} className='px-4 py-2 rounded-sm'>Settings</button>
            <button onClick={logoutHandle} className='px-4 py-2 rounded-sm'>Logout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;

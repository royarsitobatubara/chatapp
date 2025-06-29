import Profile from '@/components/Profile';
import SearchingUser from '@/components/SearchingUser';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';


function Chat() {
  
  return (
    <div className='grid grid-cols-7 h-dvh'>

      <div className='bg-[var(--black2)] px-5 col-span-2 flex flex-col gap-2'>
        <Profile />
        <SearchingUser />
      </div>

      <div>

      </div>
    </div>
  )
}

export default Chat;
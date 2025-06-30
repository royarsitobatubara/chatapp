import Profile from '@/components/Profile';
import SearchingUser from '@/components/SearchingUser';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import SettingsProfile from './SettingsProfile';


function Chat() {

  const [isSetting, setViewSetting] = useState(false);
  
  return (
    <div className='grid grid-cols-7 h-dvh  '>

      {/* LEFT */}
      <div className='bg-[var(--black2)] col-span-2 flex flex-col gap-2 relative'>
        <Profile handleSetting={setViewSetting}/>
        <SearchingUser />
        {/* SETTING */}
        {isSetting && <SettingsProfile handleCloseProfile={()=>setViewSetting(false)} /> }
      </div>

      {/* RIGHT */}
      <div></div>


    </div>
  )
}

export default Chat;
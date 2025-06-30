import Profile from '@/components/Profile';
import SearchingUser from '@/components/SearchingUser';
import React, { useEffect, useState } from 'react';
import SettingsProfile from './SettingsProfile';
import { jwtDecode } from 'jwt-decode';


function Chat() {

  const [isSetting, setViewSetting] = useState(false);
  const [user, setUser] = useState(null);

  function getData(){
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error('Token tidak valid:', err);
      }
    }
  }
  
  useEffect(()=>{
    getData();
  },[]);

  return (
    <div className='grid grid-cols-7 h-dvh  '>

      {/* LEFT */}
      <div className='bg-[var(--black2)] col-span-2 flex flex-col gap-2 relative'>
        <Profile handleSetting={setViewSetting} user={user}/>
        <SearchingUser />
        {/* SETTING */}
        {isSetting && <SettingsProfile handleCloseProfile={()=>setViewSetting(false)} refreshData={getData}/> }
      </div>

      {/* RIGHT */}
      <div></div>


    </div>
  )
}

export default Chat;
import Profile from '@/components/Profile';
import SearchingUser from '@/components/SearchingUser';
import React, { useEffect, useState } from 'react';
import SettingsProfile from './SettingsProfile';
import { jwtDecode } from 'jwt-decode';
import UserList from '@/components/UserList';
import axios from 'axios';
import AddContact from './AddContact';
import ChatUser from './ChatUser';

function Chat() {
  const [isSetting, setViewSetting] = useState(false);
  const [isAddContact, setViewAddContact] = useState(false);
  const [user, setUser] = useState(null);
  const [userList, setUserList] = useState([]);


  function getData() {
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

  const getUserList =async(phone)=>{
    try {
      const res = await axios.get(`/api/contact/${phone}`);
      const data = await res.data
      setUserList(data);
    } catch (error) {
      console.error('Gagal ambil daftar kontak:', error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (user?.phone) {
      getUserList(user?.phone);
    }
  }, [user]);
  return (
    <div className='grid grid-cols-7 h-dvh relative'>
      {/* LEFT */}
      <div className='bg-[var(--black2)] col-span-2 flex flex-col gap-2 relative'>
        <Profile handleSetting={setViewSetting} user={user}/>
        <SearchingUser handleClick={()=>setViewAddContact(e=>!e)} />
        {/* User List */}
        <div className='flex-1 overflow-auto px-5'>
          <div className='pb-10'>
            {userList.map((item, idx) => (
              <UserList 
                key={idx}
                name={item.name}
                phone={item.phone}
                avatar={item.photo}  
              />
            ))}
          </div>
        </div>
        {/* SETTING */}
        {isSetting && (
          <SettingsProfile
            handleCloseProfile={() => setViewSetting(false)}
            refreshData={getData}
            iduser={user.id}
          />
        )}
      </div>

      {/* RIGHT */}
      <div className='col-span-5 w-full'>
        <ChatUser />
      </div>

      {isAddContact && <AddContact handleClose={()=>setViewAddContact(e=>!e)} phone={user?.phone} />}
    </div>
  );
}

export default Chat;

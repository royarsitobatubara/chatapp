import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { FaPhone, FaVideo  } from "react-icons/fa6";
import EmojiPicker from 'emoji-picker-react';
import { FaSmile } from 'react-icons/fa';
import { IoIosSend } from "react-icons/io";
import { ImFilePicture } from "react-icons/im";
import { RiCloseLargeLine } from 'react-icons/ri';

function ChatUser({photo=null, name=''}) {

  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleEditClick = () => {
    fileInputRef.current.click();
  };


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

      <div className='row-span-1 bg-[var(--black2)] flex items-center px-10 gap-4 relative'>
        <div className='flex items-center bg-[var(--black3)] py-2 px-4 rounded-md gap-4 w-full'>
          <button type="button" className='cursor-pointer hover:scale-105 transition-all duration-200'><FaSmile size={15} /></button>
          <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} name="" id="" placeholder='Type here...' className='text-sm outline-none w-full border-none'/>
          <button type="button" onClick={handleEditClick} className='cursor-pointer hover:scale-105 transition-all duration-200'><ImFilePicture size={15} /></button>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} name="" id="" className='hidden' />
        </div>
        <button type="button" className='p-2 bg-[var(--blue1)] rounded-full cursor-pointer active:scale-95'><IoIosSend size={20} /></button>

        {preview && <div className='absolute bottom-full bg-[var(--black2)] translate-x-1/2 px-4 py-2 rounded-t-md '>
          <div className='w-full'>
            <button type="button" onClick={()=>setPreview(null)} className='float-end py-2 active:scale-95 cursor-pointer'><RiCloseLargeLine size={20}/></button>
          </div>
          <Image src={preview} width={200} height={200}/> 
        </div>}
      </div>
      
    </div>
  )
}

export default ChatUser;
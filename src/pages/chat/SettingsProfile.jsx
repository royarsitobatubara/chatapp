import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { RiCloseLargeLine } from "react-icons/ri";

function SettingsProfile({handleCloseProfile}) {

    const [preview, setPreview] = useState('');
    const fileInputRef = useRef(null);

    const handleFileChange = (e) =>{
        const file = e.target.files[0];
        if(file){
            const url = URL.createObjectURL(file);
            setPreview(url);
        }
    }

    const handleEditClick = () =>{
        fileInputRef.current.click();
    }

  return (
    <div className='absolute bottom-5 left-5 overflow-hidden shadow-xl rounded-sm '>
        <div className='slideUp  bg-[var(--black3)] px-4 py-2'>
            <div className='flex items-center justify-between pt-2 pb-4 w-60'>
                <h3 className='text-lg font-semibold'>Setting</h3>
                <button onClick={handleCloseProfile} type='button' className='cursor-pointer text-red-400 active:scale-90' ><RiCloseLargeLine /></button>
            </div>
            <div className='flex flex-col items-center'>
                <Image src={preview?preview:'/images/avatar.jpeg'} width={80} height={80} alt='avatar' className='rounded-full' />
                <button 
                    type="button"
                    onClick={handleEditClick}
                    className='text-[var(--blue1)] text-sm font-semibold cursor-pointer '
                >Edit</button>
                <input 
                    type="file" 
                    name="" 
                    id=""
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept='image/*' 
                    className='hidden' 
                />
            </div>
            <div>

            </div>
        </div>
    </div>
  )
}

export default SettingsProfile
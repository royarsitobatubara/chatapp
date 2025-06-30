import { InputSettingProfile } from '@/components/Input';
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { RiCloseLargeLine } from "react-icons/ri";
import { jwtDecode } from 'jwt-decode';
import { ButtonSubmit } from '@/components/Button';

function SettingsProfile({handleCloseProfile}) {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const [phone, setPhone] = useState('');
    const [profile, setProfile] = useState(null);
    const [message, setMessage] = useState('');
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

    const handleSubmit = (e) =>{
        e.preventDefault(); 
    }

  return (
    <div className='absolute w-[80%] bottom-0 h-full overflow-hidden shadow-xl rounded-sm '>
        <form action={''} className='slideUp rounded-r-lg h-full  bg-[var(--black3)] px-4 py-4 flex flex-col justify-between gap-2'>
            <div className='flex items-center justify-between pt-2 pb-4 w-full'>
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
            <div className='flex flex-col gap-2'>
                <InputSettingProfile
                    label='Name'
                    placeholder={name}
                    value={name}
                    handleChange={(e)=>setName(e.target.value)}
                />
                <InputSettingProfile
                    label='Phone'
                    placeholder={phone}
                    value={phone}
                    isCanChange={false}
                    handleChange={(e)=>setPhone(e.target.value)}
                />
                <InputSettingProfile
                    label='Password'
                    placeholder={password}
                    value={password}
                    handleChange={(e)=>setPassword(e.target.value)}
                />
                <InputSettingProfile
                    label='Bio'
                    placeholder={bio}
                    value={bio}
                    handleChange={(e)=>setBio(e.target.value)}
                    isTextArea={true}
                />
            </div>
            <ButtonSubmit
                type='sumbit'
                handleClick={handleSubmit}
                styles='bg-[var(--blue1)] w-full rounded-sm py-1 font-bold cursor-pointer text-sm'
            />
        </form>
    </div>
  )
}

export default SettingsProfile
import { ButtonSubmit } from '@/components/Button';
import { InputForm } from '@/components/Input'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { FaPhone, FaLock, FaUser   } from "react-icons/fa6";

function Registrasi() {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  async function RegisterHandle(e) {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', {
        name,
        phone,
        password,
      });

      const data = res.data;
      setMessage(data.message);
      if (res.status === 201) {
        router.push('/auth/login');
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Something went wrong');
      }
    }
  }


  return (
    <div className='bg-[var(--black1)] h-dvh w-full text-[var(--white)] flex items-center justify-center '>
        <form className='px-4 py-3 border-2 rounded-md border-[var(--black3)] flex flex-col gap-5'>
            <h1 className='text-2xl font-bold'>Register</h1>
            <InputForm 
              placeholder='Name' 
              Icon={FaUser} 
              value={name}
              onChange={setName}
              name='Name'
            />
            <InputForm 
              placeholder='Phone Number' 
              Icon={FaPhone} 
              value={phone}
              onChange={setPhone}
              name='phone'
            />
            <InputForm 
              placeholder='Password' 
              Icon={FaLock} 
              value={password}
              onChange={setPassword}
              name='Password'
              type='password'
            />
            {message && <p className='text-red-400 text-sm font-extralight '>*{message}</p>}
            <ButtonSubmit
              handleClick={RegisterHandle}
              styles='cursor-pointer bg-[var(--blue1)] hover:bg-[var(--blue2)] py-2 rounded-sm text-[var(--white)] font-bold'
            />
            <p className='text-sm'>
                already account? <Link href="/auth/login" className="text-[var(--blue1)] underline">Login</Link>
            </p>

        </form>
    </div>
  )
}

export default Registrasi;
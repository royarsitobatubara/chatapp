import { ButtonSubmit } from '@/components/Button';
import { InputForm } from '@/components/Input';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaPhone, FaLock } from "react-icons/fa6";
import { useUser } from '@/context/UserContext';
import { jwtDecode } from 'jwt-decode';

function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { setUser } = useUser(); // ⬅️ akses context

  async function LoginHandler(e) {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', {
        phone: phone,
        password: password
      });

      const data = res.data;
      setMessage(data.message);

      if (data.token) {
        localStorage.setItem('token', data.token);
        const decoded = jwtDecode(data.token); // ⬅️ ambil data user dari token
        setUser(decoded); // ⬅️ simpan ke context

        router.push('/');
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Something went wrong");
      }
    }
  }

  return (
    <div className='bg-[var(--black1)] h-dvh w-full text-[var(--white)] flex items-center justify-center'>
      <form className='px-4 py-3 border-2 rounded-md border-[var(--black3)] flex flex-col gap-5'>
        <h1 className='text-2xl font-bold'>Login</h1>

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
          handleClick={LoginHandler}
          styles='cursor-pointer bg-[var(--blue1)] hover:bg-[var(--blue2)] py-2 rounded-sm text-[var(--white)] font-bold'
        />

        <p className='text-sm'>
          No have account?{' '}
          <Link href="/auth/registrasi" className="text-[var(--blue1)] underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;

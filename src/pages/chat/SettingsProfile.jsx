import { InputSettingProfile } from '@/components/Input';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { RiCloseLargeLine } from 'react-icons/ri';
import { jwtDecode } from 'jwt-decode';
import { ButtonSubmit } from '@/components/Button';
import axios from 'axios';

function SettingsProfile({ handleCloseProfile, refreshData=null }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState('');
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState('');
  const [id, setID] = useState(null);
  const fileInputRef = useRef(null);

  // Ambil ID user dari token saat pertama kali
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setID(decoded.iduser);
      } catch (err) {
        console.error('Token tidak valid:', err);
      }
    }
  }, []);

  // Ambil data user dari server berdasarkan id
  const getData = async () => {
    if (!id) return;
    try {
      const res = await axios.get(`/api/users/${id}`);
      const data = res.data;
      setName(data.name || '');
      setPhone(data.phone || '');
      setBio(data.bio || '');
      setPhoto(data.photo || '');
    } catch (error) {
      console.error('Gagal ambil data user:', error);
    }
  };

  useEffect(() => {
    if (id) getData();
  }, [id]);

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timeout);
    }
  }, [message]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) return;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('bio', bio);
    formData.append('password', password);
    formData.append('phone', phone);
    if (fileInputRef.current?.files[0]) {
      formData.append('photo', fileInputRef.current.files[0]);
    }

    try {
      const res = await axios.patch(`/api/users/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const data = res.data;
      setMessage(data.message || 'Berhasil diperbarui');

      if (data.token) {
        localStorage.setItem('token', data.token);
        getData(); // ambil data ulang
        setPreview('');
        refreshData();
      }
    } catch (err) {
      console.error(err);
      setMessage('Terjadi kesalahan saat menyimpan');
    }
  };

  return (
    <div className="absolute w-[80%] bottom-0 h-full overflow-hidden shadow-xl rounded-sm">
      <form
        onSubmit={handleSubmit}
        className="slideUp rounded-r-lg h-full bg-[var(--black3)] px-4 py-4 flex flex-col justify-between gap-2"
      >
        <div className="flex items-center justify-between pt-2 pb-4 w-full">
          <h3 className="text-lg font-semibold">Setting</h3>
          <button
            onClick={handleCloseProfile}
            type="button"
            className="cursor-pointer text-red-400 active:scale-90"
          >
            <RiCloseLargeLine />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <Image
            src={preview || photo || '/images/avatar.jpeg'}
            width={80}
            height={80}
            alt="avatar"
            className="rounded-full"
          />
          <button
            type="button"
            onClick={handleEditClick}
            className="text-[var(--blue1)] text-sm font-semibold cursor-pointer"
          >
            Edit
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        <div className="flex flex-col gap-2">
          <InputSettingProfile
            label="Name"
            placeholder="Masukkan nama"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <InputSettingProfile
            label="Phone"
            placeholder="Nomor telepon"
            value={phone}
            isCanChange={false}
            handleChange={(e) => setPhone(e.target.value)}
          />
          <InputSettingProfile
            label="Password"
            placeholder="Password"
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
          />
          <InputSettingProfile
            label="Bio"
            placeholder="Bio"
            value={bio}
            handleChange={(e) => setBio(e.target.value)}
            isTextArea={true}
          />
        </div>

        {message && <p className="text-center text-sm text-green-400">{message}</p>}
        <ButtonSubmit
          type="submit"
          handleClick={handleSubmit}
          styles="bg-[var(--blue1)] w-full rounded-sm py-1 font-bold cursor-pointer text-sm"
        />
      </form>
    </div>
  );
}

export default SettingsProfile;

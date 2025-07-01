import { InputSettingProfile } from '@/components/Input';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { RiCloseLargeLine } from 'react-icons/ri';
import { ButtonSubmit } from '@/components/Button';
import axios from 'axios';

function SettingsProfile({ handleCloseProfile, iduser = '', refreshData=null }) {
  const [dataUser, setDataUser] = useState({
    name: '',
    phone: '',
    bio: '',
    password: '',
    photo: null,
    createAt: null
  });
  const [photoFile, setPhotoFile] = useState(null);
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState(null);

  const getDataUser = async () => {
    try {
      const response = await axios.get(`/api/users/${iduser}`);
      const data = response.data;
      if (data?.datas) {
        const user = data.datas;
        setDataUser({
          name: user.name,
          phone: user.phone,
          bio: user.bio,
          password: user.password,
          photo: user.photo,
          createAt: user.created_at
        });
      }
    } catch (error) {
      setMessage(error.response?.data.message || error.message);
    }
  };

  useEffect(() => {
    if (iduser) getDataUser();
  }, [iduser]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setDataUser({
      ...dataUser,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setPhotoFile(file);
    }
  };

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', dataUser.name);
      formData.append('bio', dataUser.bio);
      formData.append('password', dataUser.password);
      formData.append('phone', dataUser.phone);
      if (photoFile) {
        formData.append('photo', photoFile);
      }
      
      const response = await axios.patch(`/api/users/${iduser}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      localStorage.removeItem('token');
      localStorage.setItem('token', response.data.token);
      setMessage(response.data.message || 'Berhasil diperbarui');
      getDataUser();
      refreshData();
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="absolute w-[80%] bottom-0 h-full overflow-hidden shadow-xl rounded-sm">
      <form
        onSubmit={handleSubmit}
        className="slideUp rounded-r-lg h-full bg-[var(--black3)] px-4 py-4 flex flex-col justify-between gap-3"
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
            src={preview || dataUser.photo || '/images/avatar.jpeg'}
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

        {/* INPUTAN */}
        <div className="flex flex-col">
          <InputSettingProfile
            value={dataUser.name}
            name={'name'}
            handleChange={handleInput}
            placeholder={dataUser.name}
          />
          <InputSettingProfile
            value={dataUser.phone}
            name={'phone'}
            handleChange={handleInput}
            placeholder={dataUser.phone}
            isCanChange={true}
          />
          <InputSettingProfile
            value={dataUser.password}
            name={'password'}
            handleChange={handleInput}
            placeholder={dataUser.password}
          />
          <InputSettingProfile
            value={dataUser.bio}
            name={'bio'}
            handleChange={handleInput}
            placeholder={dataUser.bio}
            isTextArea={true}
          />
        </div>

        {/* BUTTON + MESSAGE */}
        {message && <p className="text-sm text-red-400">{message}</p>}
        <ButtonSubmit
          styles="bg-[var(--blue1)] py-1 font-semibold rounded-sm hover:bg-[var(--blue2)] cursor-pointer"
        />
      </form>
    </div>
  );
}

export default SettingsProfile;

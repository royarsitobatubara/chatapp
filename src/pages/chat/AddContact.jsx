import { InputAddContact } from '@/components/Input';
import React, { useState } from 'react';
import { RiCloseLargeLine } from "react-icons/ri";
import { FaPhone, FaUser } from "react-icons/fa6";
import axios from 'axios';

function AddContact({ handleClose = null, phone = null }) {
  const [message, setMessage] = useState('');
  const [dataContact, setDataContact] = useState({
    name: '',
    phone: ''
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setDataContact({
      ...dataContact,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dataContact.name || !dataContact.phone) {
      setMessage('Name and phone are required.');
      return;
    }

    try {
      const response = await axios.post(`/api/contact/${phone}`, {
        contact2: dataContact.phone,
        name: dataContact.name
      });
      setMessage(response.data.message);
      setDataContact({ name: '', phone: '' }); 
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="bg-[var(--black3)] slideUp flex flex-col gap-10 p-4 relative rounded-md shadow-2xl shadow-[var(--black3)]">
        <div className="flex items-center justify-between">
          <h3 className="font-bold">Add Contact</h3>
          <button type="button" className="cursor-pointer active:scale-95" onClick={handleClose}>
            <RiCloseLargeLine size={25} />
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <InputAddContact
            name="name"
            placeholder="Enter name"
            value={dataContact.name}
            handleChange={handleInput}
            Icon={FaUser}
          />
          <InputAddContact
            name="phone"
            placeholder="Enter phone"
            value={dataContact.phone}
            handleChange={handleInput}
            Icon={FaPhone}
          />
        </div>
        {message && <p className="text-sm text-red-400">{message}</p>}
        <button
          type="submit"
          className="cursor-pointer bg-[var(--blue1)] hover:bg-[var(--blue2)] font-semibold rounded-sm py-1 active:scale-95 transition-all duration-200"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default AddContact;

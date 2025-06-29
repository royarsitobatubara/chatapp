import React from 'react'
import { IoSearch } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";

function SearchingUser() {
  return (
    <div className='flex items-center gap-3 justify-between'>
        <div className='flex w-full items-center gap-2 bg-[var(--black3)] px-4 py-1 rounded-full'>
            <IoSearch />
            <input 
                type="text" 
                name="" 
                placeholder='Search here' 
                id="" 
                className='w-full outline-none border-none px-2 '
            />
        </div>
        <button
            type='button'
            className='bg-[var(--blue1)] p-2 rounded-full cursor-pointer'
        ><FaPlus /></button>
    </div>
  )
}

export default SearchingUser;
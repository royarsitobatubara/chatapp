import React from 'react'
import { IoSearch } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";

function SearchingUser({handleClick}) {
  return (
    <div className='flex items-center gap-3 justify-between px-5'>
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
            onClick={handleClick}
            className='bg-[var(--blue1)] p-2 rounded-full cursor-pointer active:scale-90 transition-all hover:bg-[var(--blue2)]'
        ><FaPlus /></button>
    </div>
  )
}

export default SearchingUser;
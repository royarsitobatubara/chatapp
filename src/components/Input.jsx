import { useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa6";

export function InputForm({
  name = '',
  value = '',
  onChange,
  placeholder = '',
  type = 'text',
  Icon = null,
}) {
  return (
    <div className="flex flex-col gap-1">
      {name && (
        <label htmlFor={name} className="text-sm text-gray-400 capitalize">
          {name}
        </label>
      )}
      <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-[var(--black3)] text-white">
        {Icon && <Icon size={20} className="text-gray-400" />}
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={(e)=>onChange(e.target.value)}
          placeholder={placeholder}
          className="bg-transparent outline-none w-full border-l-[1px] px-2 text-sm placeholder-gray-500"
        />
      </div>
    </div>
  );
}

export function InputSettingProfile({
  name='',
  placeholder = '',
  value = null,
  handleChange=null,
  isCanChange = true,
  isTextArea = false
}) {
  const [isEdit, setEdit] = useState(false);

  const handleEditInput = () => {
    setEdit((e) => !e);
  };

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm pl-2 font-extralight">
        {name}
      </label>
      <div className="flex gap-2">
        {isTextArea ? (
          <textarea
            id={name}
            disabled={!isEdit}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            maxLength={100}
            name={name}
            className={`w-full rounded-md px-3 py-1 outline-none border-none resize-none ${
              isEdit ? "bg-[var(--black2)]" : ""
            }`}
            rows={3}
          />
        ) : (
          <input
            type="text"
            id={name}
            disabled={!isEdit}
            value={value}
            name={name}
            onChange={handleChange}
            placeholder={placeholder}
            className={`w-full rounded-md px-3 py-1 outline-none border-none ${
              isEdit ? "bg-[var(--black2)]" : ""
            }`}
          />
        )}
        {isCanChange && (
          <button
            type="button"
            onClick={handleEditInput}
            className="cursor-pointer active:scale-90"
          >
            <RiEdit2Fill />
          </button>
        )}
      </div>
    </div>
  );
}

export function InputAddContact({name='', value=null, handleChange=null, placeholder='', Icon=null}){
  return(
    <div className="flex flex-col">
      <label htmlFor={name} className="text-sm font-extralight">{name}</label>
      <div className="flex items-center px-2 gap-2 py-1 bg-[var(--black2)] rounded-sm">
        {Icon && <Icon />}
        <input 
          type="text" 
          name={name} 
          id={name} 
          value={value} 
          onChange={handleChange}
          placeholder={placeholder}
          className="outline-none border-none "
        />
      </div>
    </div>
  );
}

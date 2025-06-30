import { useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";

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
  label = '',
  placeholder = '',
  value = '',
  handleChange = () => {},
  isCanChange = true,
  isTextArea = false
}) {
  const [isEdit, setEdit] = useState(false);

  const handleEditInput = () => {
    setEdit((e) => !e);
  };

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={label} className="text-sm pl-2 font-extralight">
        {label}
      </label>
      <div className="flex gap-2">
        {isTextArea ? (
          <textarea
            id={label}
            disabled={!isEdit}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            maxLength={100}
            className={`w-full rounded-md px-3 py-1 outline-none border-none resize-none ${
              isEdit ? "bg-[var(--black2)]" : ""
            }`}
            rows={3}
          />
        ) : (
          <input
            type="text"
            id={label}
            disabled={!isEdit}
            value={value}
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

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

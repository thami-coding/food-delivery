export default function FromInput({
  handleChange,
  value,
  name,
  placeholder,
  labelText,
  type,
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm text-gray-300 mb-1 ml-2">
        {labelText}
      </label>
      <input
        id={name}
        onChange={handleChange}
        value={value}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg bg-[#202020] border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#ffb900] focus:ring-1 focus:ring-[#ffb900]"
      />
    </div>
  )
}

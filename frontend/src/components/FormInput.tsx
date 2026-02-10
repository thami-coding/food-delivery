import { useState } from "react"
import ViewPassword from "../features/auth/components/ViewPassword"
import ErrorMessage from "./ErrorMessage"


interface Props {
  type?: string
  value: string
  name?: string
  message?:string
  labelText?: string
  placeholder?: string
  id: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}
export default function FormInput({
  type,
  value,
  name,
  message,
  setValue,
  placeholder,
  id,
  labelText
}: Props) {
  const [isView, setIsView] = useState(false)
  return (
    <div className="flex flex-col relative mb-2.5 h-24">
      <label htmlFor={id}>{labelText}</label>
      <input
        type={type || isView ? "text" : "password"}
        className="border rounded-md py-2.5 pl-3 text-gray-300 mt-1 focus:border-yellow-400 focus:outline focus:outline-yellow-400"
        placeholder={placeholder}
        value={value}
        name={name}
        id={id}
        onChange={(e) => setValue(e.target.value)}
      />
      {(name === "password" || name === "confirmPassword") && <ViewPassword setIsView={setIsView} isView={isView} />}
      <ErrorMessage message={message} />
    </div>
  )
}

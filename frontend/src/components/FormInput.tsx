import { CgDanger } from "react-icons/cg";
interface Props {
  type: string;
  value: string;
  name?: string;
  label?:string;
  placeholder?: string;
  errorMessage: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}
export default function FormInput({
  type,
  value,
  name,
  setValue,
  errorMessage,
  placeholder,
  label
}: Props) {
  return (
    <div className="flex flex-col">
      <label htmlFor="name" className="capitalize">
        {label}
      </label>
      <input
        type={type}
        className="border rounded-md py-2.5 pl-3 text-gray-300  focus:border-yellow-400 focus:outline focus:outline-yellow-400"
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={(e) => setValue(e.target.value)}
      />
      {errorMessage && (
        <div className=" pl-1 pt-1.5 text-red-700 flex items-center gap-1">
          <CgDanger /> <span> {errorMessage}</span>
        </div>
      )}
    </div>
  );
}

import { CgDanger } from "react-icons/cg";
interface Props {
  type: string;
  value: string;
  name: string;
  errorMessage: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}
export default function FormInput({
  type,
  value,
  name,
  setValue,
  errorMessage,
}: Props) {
  return (
    <div className="flex flex-col mb-6">
      <label htmlFor="name">
        {name.slice(0, 1).toUpperCase() + name.slice(1)}
      </label>
      <input
        type={type}
        className="border rounded-md mt-2  py-1.5 pl-3 text-gray-300  focus:border-yellow-400 focus:outline focus:outline-yellow-400"
        placeholder={`${
          name == "confirm password" ? "Confirm Password" : "Enter " + name
        }`}
        value={value}
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

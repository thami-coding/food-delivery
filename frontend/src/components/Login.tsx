import { useEffect, useRef, useState } from "react";
import { VscAccount } from "react-icons/vsc";
import UserProfile from "./UserProfile";


export default function Login() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const element = dropdownRef.current;
      if (element && !element.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <div ref={dropdownRef}>
      <button
        className="text-2xl cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <VscAccount />
      </button>
      {open && (
      <UserProfile />
      )}
    </div>
  );
}

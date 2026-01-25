import { CgDanger } from "react-icons/cg";

export default function ErrorMessage({ message }: { message?: string }) {
  return (
    <div data-testid="error-message" className={`pl-1 text-red-500 flex items-center text-xs gap-1 mt-1
    overflow-hidden
    transition-all duration-150 ease-in-out
    ${message ? 'opacity-100 max-h-10 translate-y-0' : 'opacity-0 max-h-0 -translate-y-1 pointer-events-none'}`}>
      <CgDanger /> <span> {message}</span>
    </div>
  )
}

import clsx from "clsx"
import Loading from "./Loading"

type ButtonProps = {
  isPending?: boolean
  isBlocked?: boolean
  handleClick: (e: any) => Promise<void>
  loadingText?: string
  buttonText: string
  type?: "submit" | "button"
}
export default function Button({
  isPending,
  isBlocked,
  handleClick,
  loadingText,
  buttonText,
  type,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={isPending || isBlocked}
      onClick={handleClick}
      className={clsx(
        "w-full text-black py-2.5 rounded-md flex justify-center capitalize mt-8 disabled:opacity-50",
        isBlocked
          ? "bg-zinc-500 cursor-not-allowed"
          : "bg-yellow-300 hover:bg-yellow-400 cursor-pointer",
      )}
    >
      {!isPending && buttonText}
      {isPending && <Loading text={loadingText} />}
    </button>
  )
}

import { useState, type FormEvent } from "react"
import isEmail from "validator/lib/isEmail"
import { toast } from "react-toastify"
import { Link } from "react-router"
import logo from "../assets/logo.png"
import EmailSent from "../features/user/components/EmailSent"
import { useForgotPassword } from "../features/auth/hooks"
import ErrorMessage from "../components/ErrorMessage"

export default function ForgotPaswordPage() {
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const { mutate, isPending, isSuccess, isError, error, data } =
    useForgotPassword()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isEmail(email)) {
      setEmailError("Invalid Email Address")
      return
    }
    setEmailError("")
    mutate(email)
  }


  if (isSuccess) {
    return <EmailSent email={email} />
  }

  return (
    <article className="ml-auto mr-auto mt-10 py-15  rounded-md text-neutral-50 px-8 w-[28rem] bg-[#202020] ">
      <Link to="/" className="border w-fit mr-auto ml-auto mb-10 block">
        <img src={logo} alt="" />
      </Link>
      {/* <h3 className="text-center text-2xl mb-6">Forgot your Password?</h3> */}
      <p className="mb-3 text-center text-neutral-300">
        Enter your email address and we will send you instructons to reset your
        password.
      </p>
      <form onSubmit={handleSubmit} className="mt-8">
        <div className="flex flex-col relative mb-2.5 h-20">
          <input
            className="border rounded-md py-2.5 pl-3 text-gray-300 mt-1 focus:border-yellow-400 focus:outline focus:outline-yellow-400"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <ErrorMessage message={emailError} />
        </div>

        <button
          disabled={isPending}
          className={`w-full text-neutral-900 text-[1.2rem] py-2 rounded-md cursor-pointer hover:bg-amber-400 ${
            isPending ? "bg-gray-500" : "bg-amber-300"
          }`}
        >
          Continue
        </button>
        <Link
          to="/"
          className="underline block mt-4 text-center capitalize hover:text-yellow-400"
        >
          Back home
        </Link>
      </form>
    </article>
  )
}

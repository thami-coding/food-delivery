import { useState, type FormEvent } from "react"
import FormInput from "../components/FormInput"
import isEmail from "validator/lib/isEmail"
import { useForgotPassword } from "../hooks/useAuth"
import { toast } from "react-toastify"
import { Link } from "react-router"
import logo from "../assets/logo.png"
import EmailSent from "../features/user/components/EmailSent"

export default function ForgotPaswordPage() {
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const { mutate, isPending, isSuccess, isError, error, data } =
    useForgotPassword()

  const notify = (error: string | undefined) => toast(error)
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isEmail(email)) {
      setEmailError("Invalid Email Address")
      return
    }
    setEmailError("")
    mutate(email)
  }

  if (isError) {
    notify(error?.message)
  }
  if (isSuccess) {
    return <EmailSent email={email} />
  }

  return (
    <article className="ml-auto mr-auto mt-10 py-15  rounded-md text-neutral-50 px-8 w-[28rem] bg-[#202020] ">
      <Link to="/" className="border w-fit mr-auto ml-auto mb-10 block">
        <img src={logo} alt="" />
      </Link>
      <h3 className="text-center text-2xl mb-6">Forgot your Password?</h3>
      <p className="mb-3 text-center text-neutral-300">
        Enter your email address and we will send you instructons to reset your
        password.
      </p>
      <form onSubmit={handleSubmit} className="mt-8">
        <FormInput
          type="email"
          name=""
          value={email}
          placeholder="Enter email to reset password"
          errorMessage={emailError}
          setValue={setEmail}
        />

        <button
          disabled={isPending}
          className={`w-full text-neutral-900 text-[1.2rem] py-2 mt-3 rounded-md cursor-pointer hover:bg-amber-400 ${
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

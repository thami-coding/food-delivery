import { useState, type FormEvent } from 'react'
import { useResetPassword } from '../hooks/useAuth'
import FormInput from '../components/FormInput'
import { toast } from 'react-toastify'
import { Link, useNavigate, useSearchParams } from 'react-router'


import logo from "../assets/logo.png"
import PasswordChanged from '../components/PasswordChanged'
export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const { mutate: resetPassword, isError, error, isPending, data, isSuccess } = useResetPassword()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const notify = (message: string) => toast(message)
  const token = searchParams.get("token")
  const handleResetPassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (newPassword.length < 5) {
      setPasswordError("Password needs to be at least 6 characters")
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("passwords don't match")
      return;
    }
    setPasswordError("")
    resetPassword({ newPassword, token })

  }

  if (isError) {
    notify(error?.message)
  }

  if (isSuccess) {
   return <PasswordChanged />
  }

  return (
    <article className="ml-auto mr-auto mt-20 shadow-lg shadow-neutral-900 rounded-md text-white py-12 px-8 w-[28rem] bg-[#202020] ">
      <Link to="/" className="border w-fit mr-auto ml-auto mb-8 block">
        <img src={logo} alt="" />
      </Link>
      <h3 className='text-center text-2xl mb-8'>Change your password</h3>
      <p className='text-center mb-6 text-neutral-300'>Enter a new password below to change your password.</p>
      <form onSubmit={handleResetPassword} className='grid gap-y-4 px-4'>
        <FormInput
          type="password"
          name="New Password"
          placeholder="New password *"
          value={newPassword}
          errorMessage=""
          setValue={setNewPassword}
        />
        <FormInput
          type="password"
          name="*"
          value={confirmPassword}
          errorMessage={passwordError}
          setValue={setConfirmPassword}
          placeholder="Re-enter new password *"
        />

        <button
          disabled={isPending}
          className={`w-full text-black py-2.5 rounded-md cursor-pointer hover:bg-amber-400 mt-2 ${isPending ? "bg-gray-500" : "bg-amber-300"
            }`}
        >
          Reset password
        </button>

      </form>
    </article>
  )
}

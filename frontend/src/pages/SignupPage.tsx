import { Link, useNavigate } from "react-router"
import { useEffect, useState } from "react"

import FormInput from "../components/FormInput"
import { useSignup } from "../hooks/useAuth"
import Loading from "../components/Loading"
import { ErrorAlert } from "../components/ErrorAlert"
import { useQueryClient } from "@tanstack/react-query"
import logo from "../assets/logo.png"
import { validateSignupInputs } from "../lib/validators"

const SignupPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { isPending, isSuccess, isError, error, data, mutate } = useSignup()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors({})
    const errors = validateSignupInputs({ email, password, confirmPassword })
    const isErrors = Object.keys(errors).length !== 0

    if (isErrors) {
      setErrors(errors)
      return
    }
    mutate({ email, password, confirmPassword })
  }

  useEffect(() => {
    if (isSuccess) {
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      queryClient.setQueryData(["user"], { user: data?.user })
      navigate("/login", { replace: true })
    }
  }, [data?.user, isSuccess, navigate, queryClient])

  if (isError && error?.statusCode >= 500) {
    return (
      <div className="grid place-content-center mt-15">
        <ErrorAlert
          retry={false}
          message=" Please refresh the page or try again shortly."
        />
      </div>
    )
  }

  const fieldErrors = error?.fields

  return (
    <section className="relative min-h-screen bg-[url(/grill-background.jpg)] bg-cover bg-center bg-no-repeat pt-8">
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      <div className="z-50 relative mx-auto border border-white rounded-md text-white px-10 pb-4 max-w-112.5 bg-[#202020]">
        <Link to="/" className="border w-fit mr-auto ml-auto mt-8 mb-5 block">
          <img src={logo} alt="" />
        </Link>
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            id="email"
            labelText="Email"
            message={errors.email || fieldErrors?.email}
            placeholder="Enter Email"
            value={email}
            setValue={setEmail}
          />
          <FormInput
            name="password"
            id="password"
            labelText="Password"
            message={errors.password || errors.confirmPassword || fieldErrors?.password}
            value={password}
            placeholder="Enter Password"
            setValue={setPassword}
          />
          <FormInput
            name="confirmPassword"
            id="confirmPassword"
            labelText="Re-enter password"
            message={errors.confirmPassword ||fieldErrors?.password}
            value={confirmPassword}
            placeholder="Re-enter Password"
            setValue={setConfirmPassword}
          />
          <button
            disabled={isPending}
            className="w-full text-black py-2.5 rounded-md flex justify-center capitalize mt-6 disabled:opacity-50 bg-yellow-300 hover:bg-yellow-400 cursor-pointer"
          >
            {isPending ? <Loading /> : "Register"}
          </button>
        </form>
        <p className="text-xs text-center mt-2">
          <>
            Already have an account?{"  "}
            <Link to="/login" className="text-yellow-400 underline">
              Login
            </Link>
          </>
        </p>
      </div>
    </section>
  )
}

export default SignupPage

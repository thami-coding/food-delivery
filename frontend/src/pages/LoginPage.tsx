import { Link, useNavigate } from "react-router"
import { useEffect, useState } from "react"

import FormInput from "../components/FormInput"
import { useQueryClient } from "@tanstack/react-query"
import { validateLoginInputs } from "../lib/validators"
import logo from "../assets/logo.png"
import { useLogin } from "../features/auth/hooks"
import Button from "../components/Button"

const LoginPage = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { isPending, isSuccess, isError, error, data, mutate } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})

    const errors = validateLoginInputs({ email, password })
    const isErrors = Object.keys(errors).length !== 0

    if (isErrors) {
      setErrors(errors)
      return
    }
    mutate({ email, password })
  }

  useEffect(() => {
    if (isSuccess) {
      setEmail("")
      setPassword("")
      navigate("/products", { replace: true })
    }
  }, [data, isSuccess, navigate, queryClient])

  const fieldErrors = error?.fields
  const isBlocked = isError && error?.statusCode === 429

  return (
    <section className="relative min-h-screen bg-[url(/grill-background.jpg)] bg-cover bg-center bg-no-repeat pt-8">
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      <div className="z-50 relative mx-auto border border-white rounded-md text-white p-8 max-w-112.5 bg-[#202020]">
        <Link to="/" className="border w-fit mr-auto ml-auto mb-9 block">
          <img src={logo} alt="" />
        </Link>
        <form>
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
            message={
              errors.password || errors.confirmPassword || fieldErrors?.password
            }
            value={password}
            placeholder="Enter Password"
            setValue={setPassword}
          />

          <Link
            to="/forgot-password"
            className="text-sm block text-left hover:underline"
          >
            Forgot password?
          </Link>
          <Button
            handleClick={handleSubmit}
            type="submit"
            buttonText="Login"
            isBlocked={isBlocked}
            isPending={isPending}
          />
        </form>
        <p className="text-xs text-center mt-4">
          <>
            Don't have an account ?{" "}
            <Link to="/signup" className="text-yellow-400 underline">
              Signup
            </Link>
          </>
        </p>
      </div>
    </section>
  )
}

export default LoginPage

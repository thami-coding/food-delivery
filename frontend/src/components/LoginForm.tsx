import { Link, useNavigate } from "react-router";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import FormInput from "./FormInput";
import * as z from "zod";
import { useLogin, useSignup } from "../hooks/useAuth";

const LoginForm = ({ pathname }: { pathname: string }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { mutate: login, isPending: isLoginPending, isError, error: errorLogin } = useLogin();
  const { mutate: signup, isPending: isSignupPending } = useSignup();

  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
  });

  const isSignup = pathname === "/signup";
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let emailErrorMessage = "";
    let passwordErrorMessage = "";

    const emailValidation = z.string().email();
    const passwordValidation = z
      .string({ message: "Password field can not be empty" })
      .min(5, { message: "Password must be at least 5 characters long." });
    const passwordResult = passwordValidation.safeParse(password);
    const emailResult = emailValidation.safeParse(email);

    emailErrorMessage = emailResult.error?.issues[0].message || "";
    passwordErrorMessage = passwordResult.error?.issues[0].message || "";

    if (emailErrorMessage || passwordErrorMessage) {
      setError({
        emailError: emailErrorMessage,
        passwordError: passwordErrorMessage,
      });
      return;
    }

    if (isSignup) {
      const passwordsMatch = z
        .object({
          password: z
            .string({
              message: "Password must be at least 5 characters long.",
            })
            .min(5, {
              message: "Password must be at least 5 characters long.",
            }),
          confirm: z
            .string({
              message: "Password must be at least 5 characters long.",
            })
            .min(5, {
              message: "Password must be at least 5 characters long.",
            }),
        })
        .refine((data) => data.password === data.confirm, {
          message: "Passwords don't match",
          path: ["password"],
        });
      const passwordMatchResult = passwordsMatch.safeParse({
        password,
        confirm: confirmPassword,
      });
      passwordErrorMessage = passwordMatchResult.error?.issues[0].message || "";
      if (passwordErrorMessage) {
        setError({
          emailError: passwordErrorMessage,
          passwordError: emailErrorMessage,
        });
        return;
      }

      signup({ email, password });
      setError({ passwordError: "", emailError: "" });
      return;
    }

    login({ email, password });
    setError({ passwordError: "", emailError: "" });
  };

  useEffect(() => {
    if (isError) {
      console.log(errorLogin);

      setError({ ...error, passwordError: "The email or password you entered is incorrect" })
    }
  }, [isError])
  return (
    <article className="fixed top-[3rem] left-2/5 border border-white rounded-md text-white p-8 w-[28rem] bg-[#202020] ">
      <Link to="/" className="border w-fit mr-auto ml-auto mb-9 block">
        <img src={logo} alt="" />
      </Link>
      <form onSubmit={handleSubmit} className="grid gap-y-5">
        <FormInput
          type="email"
          name="email"
          label="email address"
          value={email}
          errorMessage={error.emailError}
          setValue={setEmail}
        />
        <FormInput
          type="password"
          name="password"
          label="Password"
          value={password}
          errorMessage={error.passwordError}
          setValue={setPassword}
        />
        {!isSignup && (
          <Link
            to="/forgot-password"
            className="text-sm block text-left hover:underline"
          >
            forgotten password?
          </Link>
        )}

        {isSignup && (
          <FormInput
            type="password"
            name="confirmPassword"
            label="Re-enter Password"
            value={confirmPassword}
            errorMessage=""
            setValue={setConfirmPassword}
          />
        )}

        <button
          disabled={isLoginPending || isSignupPending}
          className={`w-full text-black py-2.5 rounded-md cursor-pointer hover:bg-amber-400 mt-4 ${isLoginPending || isSignupPending ? "bg-gray-500" : "bg-amber-300"
            }`}
        >
          {isSignup ? "Create account" : "Login"}
        </button>
      </form>
      <p className="text-xs text-center mt-3">
        {isSignup ? (
          <>
            Already have an account?{"  "}
            <Link to="/login" className="text-yellow-400 underline">
              Login
            </Link>
          </>
        ) : (
          <>
            Don't have an account ?{" "}
            <Link to="/signup" className="text-yellow-400 underline">
              Signup
            </Link>
          </>
        )}
      </p>
    </article>
  );
};

export default LoginForm;

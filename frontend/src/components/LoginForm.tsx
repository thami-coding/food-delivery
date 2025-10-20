import { Link, useNavigate } from "react-router";
import logo from "../assets/logo.png";
import { useState } from "react";
import FormInput from "./FormInput";
import * as z from "zod";
import { useLogin, useSignup } from "../hooks/useAuth";

const LoginForm = ({ pathname }: { pathname: string }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { mutate: login, isPending: isLoginPending } = useLogin();
  const { mutate: signup, isPending: isSignupPending } = useSignup();

  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
  });

  const isSignup = pathname === "/signup";
  const navigate = useNavigate();
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

      const username = email.split("@")[0];
      signup({ username, email, password });
      setError({ passwordError: "", emailError: "" });
      navigate("/login");
      return;
    }

    login({ email, password });
    setError({ passwordError: "", emailError: "" });
  };

  return (
    <article className="fixed top-[3rem] left-2/5 border border-white rounded-md text-white p-8 w-[28rem] bg-[#202020] ">
      <div className="border w-fit mr-auto ml-auto mb-9">
        <img src={logo} alt="" />
      </div>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          name="email"
          value={email}
          errorMessage={error.emailError}
          setValue={setEmail}
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          errorMessage={error.passwordError}
          setValue={setPassword}
        />
        {!isSignup && (
          <Link
            to="/reset-password"
            className="text-xs block -mt-4 text-left mb-10 hover:underline"
          >
            forgotten?
          </Link>
        )}

        {isSignup && (
          <FormInput
            type="password"
            name="confirm password"
            value={confirmPassword}
            errorMessage=""
            setValue={setConfirmPassword}
          />
        )}

        <button
          disabled={isLoginPending || isSignupPending}
          className={`w-full text-black p-1.5 rounded-md cursor-pointer hover:bg-amber-400 ${
            isLoginPending || isSignupPending ? "bg-gray-500" : "bg-amber-300"
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

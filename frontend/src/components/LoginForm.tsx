import { Link, useNavigate } from "react-router";
import logo from "../assets/logo.png";
import { fetchCart, login, signUp } from "../lib/apiClient";
import { useState } from "react";
import { useGlobalState } from "../hooks/useGlobalState";

const LoginForm = ({ pathname }: { pathname: string }) => {
  const [username, setUsername] = useState("second");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { dispatch } = useGlobalState();

  const isSignup = pathname === "/signup";
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!username || !password || !email) {
        throw new Error("Some fields are missing");
      }

      if (isSignup) {
        await signUp(username, email, password);
        navigate("/login");
        return;
      }
      const { data: user } = await login(email, password);
      const cart = await fetchCart();
      dispatch({ type: "LOGIN", payload: user });
      dispatch({ type: "SET_CART", payload: cart });
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <article className="fixed top-[3rem] left-2/5 border border-white rounded-md text-white p-8 w-90 bg-[#202020] ">
      <div className="border w-fit mr-auto ml-auto mb-9">
        <img src={logo} alt="" />
      </div>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <div className="flex flex-col mb-6">
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              className="border rounded-md mt-2  py-1.5 pl-3 text-gray-300  focus:border-yellow-400 focus:outline focus:outline-yellow-400"
              placeholder="Enter your username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}

        <div className="flex flex-col mb-6">
          <label htmlFor="name">Email*</label>
          <input
            type="email"
            className="border rounded-md mt-2  py-1.5 pl-3 text-gray-300  focus:border-yellow-400 focus:outline focus:outline-yellow-400"
            placeholder="Enter your email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-6">
          <label htmlFor="name">Password*</label>
          <input
            type="password"
            className="border rounded-md mt-2  py-1.5 pl-3 text-gray-300  focus:border-yellow-400 focus:outline focus:outline-yellow-400"
            placeholder="Enter password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isSignup && (
            <Link
              to="/reset-password"
              className="text-end text-xs mt-1 hover:underline"
            >
              forgotten?
            </Link>
          )}
        </div>
        {isSignup && (
          <div className="flex flex-col mb-6">
            <label htmlFor="confirmPassword">Confirm Password*</label>
            <input
              type="password"
              className="border rounded-md mt-2  py-1.5 pl-3 text-gray-300  focus:border-yellow-400 focus:outline focus:outline-yellow-400"
              placeholder="Confirm password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        )}

        <button
          disabled={loading}
          className="bg-amber-300 w-full text-black p-1.5 rounded-md cursor-pointer hover:bg-amber-400"
        >
          {isSignup ? "Create account" : "Login"}
        </button>
      </form>
      <p className="text-xs text-center mt-3">
        {isSignup ? (
          <>
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-400 underline">
              Login
            </Link>
          </>
        ) : (
          <>
            Don't have an account?{" "}
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

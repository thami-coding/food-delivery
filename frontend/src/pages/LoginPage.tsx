import { useLocation } from "react-router";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <section className="bg-[url(/grill-background.jpg)] bg-center w-full h-screen">
      <div className="absolute inset-0 bg-black/60"></div>
      <LoginForm pathname={pathname} />
    </section>
  );
};

export default LoginPage;

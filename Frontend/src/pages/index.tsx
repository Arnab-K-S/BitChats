import { ThemeSwitch } from "@/components/theme-switch";
import LoginForm from "../components/auth/loginForm";

export default function IndexPage() {
  const handleLoginSuccess = () => {
    console.log("Login Success");
  };
  return (
    <>
      <div>
          <div className="m-10 p-2 absolute right-2 bg-slate-200 rounded" >
            <ThemeSwitch />
          </div>

          <div className="flex justify-center items-center h-screen">
            <LoginForm  onLoginSuccess={handleLoginSuccess}/>
          </div>
        </div>
    </>
  );
}

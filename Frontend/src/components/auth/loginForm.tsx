import React, { useState, ChangeEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Spinner } from "@nextui-org/react";

import AuthForm from "./authForm";

import { ThemeSwitch } from "@/components/theme-switch";
// import Home from "@/components/Home/home";
// import DefaultLayout from "@/layouts/default";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const HOST = import.meta.env.VITE_HOST;
  const [newUser, setNewUser] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageloading, setPageLoading] = useState<boolean>(true);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const userLogin = () => {
    setPageLoading(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData;

    if (newUser && (!name || !email || !password || !confirmPassword)) {
      toast.error("All fields are required for registration!");

      return false;
    }
    if (!newUser && (!email || !password)) {
      toast.error("Email and Password are required for login!");

      return false;
    }
    if (newUser && password !== confirmPassword) {
      toast.error("Passwords do not match!");

      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    if (newUser) {
      const registrationData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      console.log("Registration Data: ", registrationData);

      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.post(
          `${HOST}/api/user`,
          registrationData,
          config
        );

        console.log(data);
        toast.success("Registration Successful");
        localStorage.setItem("userInfo", JSON.stringify(data));
      } catch (error: unknown) {
        console.error("Error:", error);
        toast.error(`Error Occurred! ${error}`);
      } finally {
        setLoading(false);
      }
    } else {
      const loginData = {
        email: formData.email,
        password: formData.password,
      };

      console.log("Login Data: ", loginData);

      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.post(
          `${HOST}/api/user/login`,
          loginData,
          config
        );

        console.log(data);
        toast.success("Login Successful");
        localStorage.setItem("userInfo", JSON.stringify(data));
        onLogin();
      } catch (error: unknown) {
        console.error("Error:", error);
        toast.error(`Error Occurred! ${error}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleNewUser = () => {
    setNewUser(!newUser);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div>
      <ToastContainer />
      {pageloading ? (
        <>
          <Spinner />
          {userLogin()}
        </>
      ) : (
        <>
          <div className="m-10 p-2 absolute right-2 bg-slate-200 rounded">
            <ThemeSwitch />
          </div>
          <AuthForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={loading}
            newUser={newUser}
            toggleNewUser={toggleNewUser}
          />
        </>
      )}
    </div>
  );
};

export default LoginForm;

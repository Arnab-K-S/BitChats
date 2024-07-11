import React, { useState, useEffect, ChangeEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ThemeSwitch } from "@/components/theme-switch";
import Home from "@/components/Home/home";
import DefaultLayout from "@/layouts/default";
import AuthForm from "./authForm";
import { Spinner } from "@nextui-org/react";

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
  const [newUser, setNewUser] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageloading, setPageLoading] = useState<boolean>(true);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const isLoggedIn = Boolean(localStorage.getItem("userInfo"));
  const userLogin=() => {
    setLoggedIn(isLoggedIn);
    setPageLoading(false);
  }
  useEffect(() => {
    setLoggedIn(isLoggedIn);
  }, [isLoggedIn,localStorage.getItem("userInfo")]);

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
          "http://localhost:3000/api/user",
          registrationData,
          config
        );
        console.log(data);
        toast.success("Registration Successful");
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoggedIn(true);
      } catch (error: any) {
        console.error("Error:", error.response || error.message);
        toast.error(`Error Occurred! ${error.response?.data?.message || error.message}`);
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
          "http://localhost:3000/api/user/login",
          loginData,
          config
        );
        console.log(data);
        toast.success("Login Successful");
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoggedIn(true);
        onLogin();
      } catch (error: any) {
        console.error("Error:", error.response || error.message);
        toast.error(`Error Occurred! ${error.response?.data?.message || error.message}`);
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

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setLoggedIn(false);
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
                newUser={newUser}
                loading={loading}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                toggleNewUser={toggleNewUser}
              />
        </>
      )}
    </div>
  );
};

export default LoginForm;

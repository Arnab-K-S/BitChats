import React, { useState,useEffect, ChangeEvent } from "react";
import { Card, Input } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginFormProps {
  onLoginSuccess: () => void; 
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => { 
  const [newUser, setNewUser] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [LoggedIn, setLoggedIn] = useState<boolean>(false); 

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const isLoggedIn = Boolean(localStorage.getItem("userInfo")); 

  
  useEffect(() => {
    setLoggedIn(isLoggedIn);
  }, [isLoggedIn]);

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
        const { data } = await axios.post("http://localhost:3000/api/user", registrationData, config);
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
        const { data } = await axios.post("http://localhost:3000/api/user/login", loginData, config);
        console.log(data);
        toast.success("Login Successful");
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoggedIn(true); 
        onLoginSuccess(); 
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

  return (
    <div>
      <ToastContainer />
      {LoggedIn ? (
        <div>Welcome back! You are logged in.</div>
      ) : (
        newUser ? (
          <Card className="h-full w-80 p-10 shadow-xl border" isBlurred>
            <div className="w-full flex flex-col gap-4">
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Input
                  type="text"
                  name="name"
                  variant="underlined"
                  label="Name"
                  placeholder="Enter your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Input
                  type="email"
                  name="email"
                  variant="underlined"
                  label="Email"
                  placeholder="Enter your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Input
                  type="password"
                  name="password"
                  variant="underlined"
                  label="Password"
                  placeholder="Enter your Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Input
                  type="password"
                  name="confirmPassword"
                  variant="underlined"
                  label="Confirm Password"
                  placeholder="Confirm your Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button color="primary" variant="bordered" className="mt-5 mb-5" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </Button>
              <Button color="warning" variant="bordered" onClick={toggleNewUser} disabled={loading}>
                Already Registered?
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="h-full w-80 p-10 shadow-xl border" isBlurred>
            <div className="w-full flex flex-col gap-4">
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Input
                  type="email"
                  name="email"
                  variant="underlined"
                  label="Email"
                  placeholder="Enter your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Input
                  type="password"
                  name="password"
                  variant="underlined"
                  label="Password"
                  placeholder="Enter your Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button color="primary" variant="bordered" className="mt-5 mb-5" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
              <Button color="warning" variant="bordered" onClick={toggleNewUser} disabled={loading}>
                Register
              </Button>
            </div>
          </Card>
        )
      )}
    </div>
  );
};

export default LoginForm;

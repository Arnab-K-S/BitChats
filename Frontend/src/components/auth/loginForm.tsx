import React, { useState } from "react";
import { Card, Input } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LoginForm: React.FC = () => {
  const [newUser, setNewUser] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (newUser) {
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }

      // Handle registration form submission
      const registrationData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };
      console.log("Registration Data: ", registrationData);
    } else {
      // Handle login form submission
      const loginData = {
        email: formData.email,
        password: formData.password,
      };
      console.log("Login Data: ", loginData);
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
    // <div className="bg-slate-200 dark:bg-slate-800 rounded">
    <div>
      <ToastContainer />
      {newUser ? (
        <Card className="h-full w-80 p-10 shadow-xl border" isBlurred>
          <div className="w-full flex flex-col gap-4">
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Input
                type="name"
                name="name"
                variant="underlined"
                label="Name"
                placeholder="Enter your Name"
                value={formData.name}
                onChange={handleChange}
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
              />
            </div>
            <Button color="primary" variant="bordered" className="mt-5 mb-5" onClick={handleSubmit}>
              Register
            </Button>
            <Button color="warning" variant="bordered" onClick={toggleNewUser}>
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
              />
            </div>
            <Button color="primary" variant="bordered" className="mt-5 mb-5" onClick={handleSubmit}>
              Login
            </Button>
            <Button color="warning" variant="bordered" onClick={toggleNewUser}>
              Register
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default LoginForm;

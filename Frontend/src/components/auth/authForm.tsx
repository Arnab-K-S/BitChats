import React, { ChangeEvent } from "react";
import { Card } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/react";

import InputField from "./inputField";

interface AuthFormProps {
  newUser: boolean;
  loading: boolean;
  formData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  toggleNewUser: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  newUser,
  loading,
  formData,
  handleChange,
  handleSubmit,
  toggleNewUser,
}) => (
  <Card
    isBlurred
    className="h-full w-80 p-10 shadow-xl border dark:bg-slate-800"
  >
    <div className="w-full flex flex-col gap-4">
      {newUser && (
        <InputField
          label="Name"
          name="name"
          placeholder="Enter your Name"
          required={true}
          type="text"
          value={formData.name}
          variant="underlined"
          onChange={handleChange}
        />
      )}
      <InputField
        label="Email"
        name="email"
        placeholder="Enter your Email"
        required={true}
        type="email"
        value={formData.email}
        variant="underlined"
        onChange={handleChange}
      />
      <InputField
        label="Password"
        name="password"
        placeholder="Enter your Password"
        required={true}
        type="password"
        value={formData.password}
        variant="underlined"
        onChange={handleChange}
      />
      {newUser && (
        <InputField
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Confirm your Password"
          required={true}
          type="password"
          value={formData.confirmPassword}
          variant="underlined"
          onChange={handleChange}
        />
      )}
      <Button
        className="mt-5 mb-5"
        color="primary"
        disabled={loading}
        variant="bordered"
        onClick={handleSubmit}
      >
        {loading ? (
          newUser ? (
            <>
              <Spinner />
              Registering...
            </>
          ) : (
            <>
              <Spinner />
              Logging in...
            </>
          )
        ) : newUser ? (
          "Register"
        ) : (
          "Login"
        )}
      </Button>
      <Button
        color="warning"
        disabled={loading}
        variant="bordered"
        onClick={toggleNewUser}
      >
        {newUser ? "Already Registered?" : "Register"}
      </Button>
    </div>
  </Card>
);

export default AuthForm;

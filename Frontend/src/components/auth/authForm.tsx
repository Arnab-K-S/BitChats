import React, { ChangeEvent } from "react";
import { Card } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import InputField from "./inputField";
import { Spinner } from "@nextui-org/react";

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
  <Card className="h-full w-80 p-10 shadow-xl border dark:bg-slate-800" isBlurred>
    <div className="w-full flex flex-col gap-4">
      {newUser && (
        <InputField
          type="text"
          name="name"
          variant="underlined"
          label="Name"
          placeholder="Enter your Name"
          value={formData.name}
          required={true}
          onChange={handleChange}
        />
      )}
      <InputField
        type="email"
        name="email"
        variant="underlined"
        label="Email"
        placeholder="Enter your Email"
        value={formData.email}
        required={true}
        onChange={handleChange}
      />
      <InputField
        type="password"
        name="password"
        variant="underlined"
        label="Password"
        placeholder="Enter your Password"
        value={formData.password}
        required={true}
        onChange={handleChange}
      />
      {newUser && (
        <InputField
          type="password"
          name="confirmPassword"
          variant="underlined"
          label="Confirm Password"
          placeholder="Confirm your Password"
          value={formData.confirmPassword}
          required={true}
          onChange={handleChange}
        />
      )}
      <Button
        color="primary"
        variant="bordered"
        className="mt-5 mb-5"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? (newUser ?
          (
            <>
              <Spinner />
              Registering...
            </>
          )
          : (
            <>
              <Spinner />
              Logging in...
            </>
          )
        ) : newUser ? "Register" : "Login"}
      </Button>
      <Button
        color="warning"
        variant="bordered"
        onClick={toggleNewUser}
        disabled={loading}
      >
        {newUser ? "Already Registered?" : "Register"}
      </Button>
    </div>
  </Card>
);

export default AuthForm;

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";

const LogoutComponent: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
};

export default LogoutComponent;

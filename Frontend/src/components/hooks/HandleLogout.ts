import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';
const handleLogout = () => {
  localStorage.removeItem('userInfo');
  // navigate('/login');
};
const LogoutComponent: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };
  return (
    <Button onclick={handleLogout}>
    Logout
    </Button>
  );
};
export default LogoutComponent;

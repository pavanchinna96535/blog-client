
import React from 'react';
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../Context/Authcontext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      logout();
      navigate('/');
    }
  };

  const items = [
    {
      key: 'home',
      label: <Link to="/">Home</Link>,
    },
    ...(user
      ? [
          {
            key: 'create',
            label: <Link to="/create">Create Blog</Link>,
          },
          {
            key: 'logout',
            label: 'Logout',
          },
        ]
      : [
          {
            key: 'login',
            label: <Link to="/login">Login</Link>,
          },
          {
            key: 'register',
            label: <Link to="/register">Signup</Link>,
          },
        ]),
  ];

  return (
    <Menu
      mode="horizontal"
      theme="dark"
      selectable={false}
      items={items}
      onClick={handleMenuClick}
    />
  );
}

/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './styles/DropItem.module.css';
import { useRouter } from 'next/router';

const DropItem = ({
  url,
  goToMenu,
  leftIcon,
  rightIcon,
  children,
  setActiveMenu,
}) => {
  const router = useRouter();

  const handleClick = e => {
    if (goToMenu) {
      setActiveMenu(goToMenu);
    }
    e.preventDefault();
    router.push(url);
  };
  return (
    <a href="#" className="menuItem" onClick={handleClick}>
      <span className="iconButton">{leftIcon}</span>
      {children}
      <span className="iconRight">{rightIcon}</span>
    </a>
  );
};

export default DropItem;

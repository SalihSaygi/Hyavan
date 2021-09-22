import React from 'react';
import useScheme from '../../hooks/useScheme';
import Button from '@material-ui/core/Button';
import './scheme.css';

const SchemedButton = ({ size, isIconLeft, icon, text, disabled, onClick }) => {
  const scheme = useScheme();
  if (isIconLeft === true) {
    return (
      <Button
        className={scheme}
        size={size}
        startIcon
        disabled={disabled}
        onClick={onClick}
      >
        {icon ? icon : ''}
        {text}
      </Button>
    );
  }
  return (
    <Button
      className={scheme}
      size={size}
      endIcon
      disabled={disabled}
      onClick={onClick}
    >
      {icon ? icon : ''}
      {text}
    </Button>
  );
};

export default SchemedButton;

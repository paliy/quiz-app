import React from 'react';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Button = ({ onClick, disabled = false, children, className = '' }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`button ${className} ${disabled ? 'button--disabled' : ''}`}
    >
      {children}
    </button>
  );
};

export default Button;

import React from 'react';
import { button } from '@/components/Button/Button.css';

interface ButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
}

export const Button = ({ onClick, children }: ButtonProps) => (
  <button className={button} onClick={onClick}>
    {children ?? 'Click'}
  </button>
);

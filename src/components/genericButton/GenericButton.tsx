import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface GenericButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'cancelar' | 'confirmar' | 'text' | 'outlined' | 'contained';
  children: React.ReactNode;
}

const GenericButton: React.FC<GenericButtonProps> = ({
  variant,
  children,
  ...props
}) => {
  const getStyles = () => {
    switch (variant) {
      case 'cancelar':
        return {
          backgroundColor: '#fafcfe',
          color: '#000',
          borderColor: '#7734e7',
          fontSize: 'small',
        };
      case 'confirmar':
        return {
          backgroundColor: '#7734e7',
          color: '#fafcfe',
          fontSize: 'small',
        };
      default:
        return {
          backgroundColor: '#e0e0e0',
          color: '#000',
          fontSize: 'small',
        };
    }
  };

  return (
    <Button
      variant={
        variant === 'cancelar' || variant === 'confirmar'
          ? 'outlined'
          : variant || 'outlined'
      }
      sx={{ ...getStyles() }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default GenericButton;

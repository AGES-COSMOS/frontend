import { Button } from '@mui/material';
import './button.scss';

interface ButtonProps {
  type: 'primary' | 'secondary';
  onClick: () => void;
  children: React.ReactNode;
  size: 3 | 2 | 1;
  icon?: React.ReactNode;
  borderRadius?: number;
  fullWidth?: boolean;
}
export const ButtonComponent: React.FC<ButtonProps> = ({
  type,
  onClick,
  children,
  size,
  icon,
  borderRadius = 5,
  fullWidth,
}) => {
  return (
    <Button
      className={`button-container button-container-${type} button-container-size-${size}`}
      style={{ borderRadius: borderRadius + 'px' }}
      color="primary"
      variant="contained"
      onClick={onClick}
      fullWidth={fullWidth}
    >
      <div>
        {icon !== undefined && icon}
        {children}
      </div>
    </Button>
  );
};

import { Button, CircularProgress } from '@mui/material';
import './button.scss';

interface ButtonProps {
  type: 'primary' | 'secondary';
  onClick: () => void;
  children: React.ReactNode;
  size: 3 | 2 | 1;
  icon?: React.ReactNode;
  borderRadius?: number;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

export const ButtonComponent: React.FC<ButtonProps> = ({
  type,
  onClick,
  children,
  size,
  icon,
  borderRadius = 5,
  fullWidth,
  loading = false,
  disabled = false,
}) => {
  return (
    <Button
      className={`button-container button-container-${type} button-container-size-${size}`}
      style={{ borderRadius: borderRadius + 'px' }}
      color="primary"
      variant="contained"
      onClick={onClick}
      fullWidth={fullWidth}
      disabled={loading || disabled}
    >
      <div className="button-content">
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          <>
            {icon && <span className="button-icon">{icon}</span>}
            {children}
          </>
        )}
      </div>
    </Button>
  );
};

import React, { useState } from 'react';
import { TextField, Tooltip, InputAdornment, IconButton } from '@mui/material';
import { ErrorText } from 'pages/Register/Register.style';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface GenericInputProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string; // 'text', 'number', 'email', etc.
  placeholder?: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  className?: string | undefined;
}

const GenericInput: React.FC<GenericInputProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
  error = false,
  errorMessage,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      <TextField
        label={label}
        value={value}
        onChange={onChange}
        type={showPassword && type === 'password' ? 'text' : type}
        placeholder={placeholder}
        variant="outlined"
        error={error}
        required={required}
        InputProps={{
          endAdornment: type === 'password' && (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {error && errorMessage && (
        <Tooltip title={errorMessage} arrow>
          <ErrorText>{errorMessage}</ErrorText>
        </Tooltip>
      )}
    </div>
  );
};

export default GenericInput;

import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Tooltip from '@mui/material/Tooltip';

interface PasswordInputProps {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  password,
  setPassword,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [touched, setTouched] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const validatePassword = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isLengthValid = password.length >= 8;

    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return hasUpperCase && hasLowerCase && hasSpecialChar && isLengthValid;
  };

  const isPasswordValid = validatePassword(password);
  const shouldShowError = touched && !isPasswordValid;
  const errorMessage =
    'A senha deve conter uma letra maíuscula, uma minúscula  e um caractere especial e no mínimo 8 caracteres';

  return (
    <FormControl
      sx={{ m: 1, width: '25ch' }}
      variant="outlined"
      error={shouldShowError} // Define o erro para o FormControl
    >
      <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
      <Tooltip
        title={errorMessage}
        open={shouldShowError && touched}
        placement="left"
      >
        <span>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handleChangePassword}
            onBlur={handleBlur} // Adiciona o evento onBlur
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: shouldShowError ? 'red' : undefined,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: shouldShowError ? 'red' : undefined,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: shouldShowError ? 'red' : undefined,
              },
            }}
          />
        </span>
      </Tooltip>
    </FormControl>
  );
};

export default PasswordInput;

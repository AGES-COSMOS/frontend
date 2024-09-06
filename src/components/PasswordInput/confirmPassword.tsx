import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Tooltip from '@mui/material/Tooltip';

interface ConfirmPasswordProps {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>; // Adiciona uma prop para o estado de confirmação
}

const ConfirmPassword: React.FC<ConfirmPasswordProps> = ({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [touched, setTouched] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleChangeConfirmPassword = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(event.target.value); // Atualiza o estado de confirmação de senha
  };

  const handleBlur = () => {
    setTouched(true);
  };

  // Valida a senha
  const validatePassword = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLengthValid = password.length >= 8;

    return hasUpperCase && hasLowerCase && hasSpecialChar && isLengthValid;
  };

  const isPasswordValid = validatePassword(password);
  const passwordsMatch = confirmPassword === password;
  const shouldShowError = touched && (!isPasswordValid || !passwordsMatch);

  // Mensagens de erro
  const errorMessage = shouldShowError
    ? confirmPassword && !passwordsMatch
      ? 'As senhas não coincidem'
      : 'Senha inválida'
    : '';

  return (
    <FormControl
      sx={{ m: 1, width: '25ch' }}
      variant="outlined"
      error={shouldShowError} // Define o erro para o FormControl
    >
      <InputLabel htmlFor="outlined-adornment-confirm-password">
        Confirmar Senha
      </InputLabel>
      <Tooltip
        title={errorMessage}
        open={shouldShowError && touched}
        placement="right"
      >
        <span>
          <OutlinedInput
            id="outlined-adornment-confirm-password"
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={handleChangeConfirmPassword} // Atualiza a confirmação de senha
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
            label="Confirmar Senha"
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

export default ConfirmPassword;

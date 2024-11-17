import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { FormControl, Input, InputAdornment, InputLabel } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import './dialogLogin.scss';
import { loginUser } from 'services/authService';
import { LoginDto } from 'services/types';

interface BootstrapDialogTitleProps {
  children: React.ReactNode;
  onClose: () => void;
  id?: string;
}

interface DialogLoginProps {
  open: boolean;
  onClose: () => void;
}

const BootstrapDialogTitle: React.FC<BootstrapDialogTitleProps> = (props) => {
  const { children, onClose, id, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other} id={id}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  id: PropTypes.string,
};

const DialogLogin: React.FC<DialogLoginProps> = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    try {
      const loginData: LoginDto = { email, password };
      await loginUser(loginData);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      alert('Falha ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="dialogPaper">
      <BootstrapDialogTitle onClose={onClose}>Cosmos</BootstrapDialogTitle>
      <DialogContent dividers className="dialogContent">
        <TextField
          sx={{ m: 1, width: '25ch' }}
          variant="standard"
          id="email"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormControl sx={{ m: 1, width: '25ch' }} fullWidth variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button onClick={handleLogin} className="loginButton">
          Login
        </Button>
        <a className="forgotPassword" href="#">
          Esqueceu sua senha?
        </a>
      </DialogContent>
      <DialogActions className="dialogActions">
        Ainda não tem cadastro? <a href="/cadastro">Clique aqui.</a>
      </DialogActions>
    </Dialog>
  );
};

export default DialogLogin;

import React, { ChangeEvent, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import TextField from '@mui/material/TextField';

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ value, onChange }) => {
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  // Função para validar o formato do email
  const validateEmail = (email: string): boolean => {
    // Expressão regular para verificar o padrão de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const emailValue = event.target.value;

    // Atualiza o estado de validade
    setIsInvalid(!validateEmail(emailValue));

    // Atualiza o valor do email
    onChange(emailValue);
  };

  return (
    <div style={{ position: 'inherit' }}>
      <TextField
        type="email"
        placeholder="Seu e-mail"
        value={value}
        onChange={handleChange}
        error={isInvalid}
        style={{
          width: '230',
          fontSize: '16px',
          border: isInvalid ? '1px solid red' : '1px solid #ccc',
          borderRadius: '4px',
        }}
        InputProps={{
          endAdornment: isInvalid ? (
            <Tooltip title="Email inválido" arrow>
              <IconButton>
                <ErrorOutlineIcon color="error" />
              </IconButton>
            </Tooltip>
          ) : null,
        }}
      />
    </div>
  );
};

export default EmailInput;

import React, { ChangeEvent, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import TextField from '@mui/material/TextField';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange }) => {
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  // Função para formatar o número de telefone com DDD
  const formatPhoneNumber = (value: string): string => {
    const numbers = value.replace(/\D/g, '');

    // Aplica a formatação com base na quantidade de números
    if (numbers.length <= 2) {
      return `(${numbers}`;
    }
    if (numbers.length <= 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 11)}`;
    }
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 11)}`;
  };

  // Função para validar o número de telefone
  const validatePhoneNumber = (value: string): boolean => {
    const numbers = value.replace(/\D/g, '');
    return numbers.length === 11; // Verifica se o número tem exatamente 11 dígitos
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const formattedValue = formatPhoneNumber(rawValue);

    // Atualiza o estado de validade
    setIsInvalid(!validatePhoneNumber(formattedValue));

    // Atualiza o valor formatado
    onChange(formattedValue);
  };

  return (
    <div style={{ position: 'relative' }}>
      <TextField
        type="text"
        placeholder="Telefone"
        value={value}
        onChange={handleChange}
        inputProps={{ maxLength: 14 }} // Limita o comprimento total sem o hífen
        error={isInvalid}
        style={{
          width: '230px',
          fontSize: '16px',
          border: isInvalid ? '1px solid red' : '1px solid #ccc',
          borderRadius: '4px',
        }}
        InputProps={{
          endAdornment: isInvalid ? (
            <Tooltip title="Número inválido" arrow>
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

export default PhoneInput;

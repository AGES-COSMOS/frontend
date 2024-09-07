import React, { ChangeEvent, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import TextField from '@mui/material/TextField';

interface InputCpfOrCnpjProps {
  value: string;
  onChange: (value: string) => void;
}

const InputCpfOrCnpj: React.FC<InputCpfOrCnpjProps> = ({ value, onChange }) => {
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  // Função para formatar CPF
  const formatCpf = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6)
      return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
    if (numbers.length <= 9)
      return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
  };

  // Função para formatar CNPJ
  const formatCnpj = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 5)
      return `${numbers.slice(0, 2)}.${numbers.slice(2)}`;
    if (numbers.length <= 8)
      return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`;
    if (numbers.length <= 12)
      return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`;
    return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`;
  };

  // Função para validar CPF
  const validateCpf = (value: string): boolean => {
    const cpf = value.replace(/\D/g, '');
    if (cpf.length !== 11) return false;
    // Validação simples do CPF (você pode usar uma biblioteca para uma validação mais robusta)
    return true; // Aqui você deve implementar a lógica de validação ou usar uma biblioteca
  };

  // Função para validar CNPJ
  const validateCnpj = (value: string): boolean => {
    const cnpj = value.replace(/\D/g, '');
    if (cnpj.length !== 14) return false;
    // Validação simples do CNPJ (você pode usar uma biblioteca para uma validação mais robusta)
    return true; // Aqui você deve implementar a lógica de validação ou usar uma biblioteca
  };

  // Função para identificar se é CPF ou CNPJ e validar
  const identifyAndValidate = (value: string): boolean => {
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length === 11) {
      return validateCpf(value);
    } else if (cleanValue.length === 14) {
      return validateCnpj(value);
    }
    return false;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    let formattedValue: string = rawValue;
    const cleanValue = rawValue.replace(/\D/g, '');

    if (cleanValue.length === 11) {
      formattedValue = formatCpf(rawValue);
    } else if (cleanValue.length === 14) {
      formattedValue = formatCnpj(rawValue);
    }

    const valid = identifyAndValidate(formattedValue);
    setIsInvalid(!valid);
    onChange(formattedValue);
  };

  return (
    <div style={{ position: 'relative' }}>
      <TextField
        type="text"
        placeholder="Digite CPF ou CNPJ"
        value={value}
        onChange={handleChange}
        inputProps={{ maxLength: 18 }} // Limita o comprimento total
        error={isInvalid}
        style={{
          width: '225px',
          fontSize: '16px',
          border: isInvalid ? '1px solid red' : '1px solid #ccc',
          borderRadius: '4px',
        }}
        InputProps={{
          endAdornment: isInvalid ? (
            <Tooltip title="CPF ou CNPJ inválido" arrow>
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

export default InputCpfOrCnpj;

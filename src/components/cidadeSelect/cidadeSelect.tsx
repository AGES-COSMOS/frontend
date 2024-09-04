import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';

interface Option {
  value: string;
  label: string;
}

interface CidadeSelectProps {
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  options: Option[];
}

const CidadeSelect: React.FC<CidadeSelectProps> = ({
  value,
  onChange,
  options,
}) => (
  <FormControl fullWidth>
    <InputLabel id="cidade-select-label">Cidade</InputLabel>
    <Select
      labelId="cidade-select-label"
      value={value}
      onChange={onChange}
      label="Cidade"
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default CidadeSelect;

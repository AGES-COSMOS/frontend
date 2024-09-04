// components/estadoSelect.tsx
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

interface estadoSelectProps {
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  options: Option[];
}

const estadoSelect: React.FC<estadoSelectProps> = ({
  value,
  onChange,
  options,
}) => (
  <FormControl fullWidth>
    <InputLabel id="estado-select-label">Estado</InputLabel>

    <Select
      label="Cidade"
      labelId="estado-select-label"
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default estadoSelect;

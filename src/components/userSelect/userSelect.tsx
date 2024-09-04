// components/UserSelect.tsx
import React from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';

interface Option {
  value: string;
  label: string;
}

interface UserSelectProps {
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  options: Option[];
}

const UserSelect: React.FC<UserSelectProps> = ({
  value,
  onChange,
  options,
}) => (
  <FormControl fullWidth>
    <Select
      className="user-select-type"
      labelId="user-select-label"
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

export default UserSelect;

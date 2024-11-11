import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './filterField.scss';
import { useState } from 'react';

interface FilterFieldProps {
  title: string;
  placeholder: string;
  onAddClick?: (value: string) => void;
}

export const FilterField = ({
  title,
  placeholder,
  onAddClick,
}: FilterFieldProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddClick = () => {
    if (onAddClick) {
      onAddClick(inputValue);
    }
    setInputValue(''); // Clear the input field after adding
  };
  return (
    <div className="category-filter">
      <Typography variant="h6" className="category-filter__title">
        {title}
      </Typography>
      <TextField
        variant="outlined"
        placeholder={placeholder}
        className="category-filter__input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={handleAddClick}>
                <AddCircleOutlineIcon className="category-filter__icon" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

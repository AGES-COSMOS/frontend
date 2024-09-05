import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './searchField.scss';

export const SearchField = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    console.log('Valor atual:', event.target.value);
  };

  return (
    <TextField
      className="search-field"
      placeholder="Procurar projetos..."
      value={searchValue}
      onChange={handleSearchChange}
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon className="search-icon" />
          </InputAdornment>
        ),
      }}
    />
  );
};

import React, { ChangeEvent, useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import './searchField.scss';

interface SearchFieldProps {
  onFilterClick: () => void;
  isFilterOpen: boolean;
}

export const SearchField = ({
  onFilterClick,
  isFilterOpen,
}: SearchFieldProps) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
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
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon className="search-icon" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                className="filter-icon-button"
                onClick={onFilterClick}
              >
                <FilterListIcon className="filter-icon" />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

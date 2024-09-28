import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { ButtonComponent } from 'components/Button/button';
import './filterSelector.scss';

interface FilterSelectorProps {
  title: string;
  options: string[];
  onFilterChange?: (selectedOption: string) => void;
}

export const FilterSelector = ({
  title,
  options,
  onFilterChange,
}: FilterSelectorProps) => {
  const [selectedFilter, setSelectedFilter] = useState<string>(options[0]);

  const handleFilterClick = (option: string) => {
    setSelectedFilter(option);
    if (onFilterChange) {
      onFilterChange(option);
    }
  };

  return (
    <div className="filter-selector">
      <Typography variant="h6" className="filter-selector__title">
        {title}
      </Typography>
      <div className="filter-selector__buttons">
        {options.map((option) => (
          <ButtonComponent
            key={option}
            type={selectedFilter === option ? 'primary' : 'secondary'}
            onClick={() => handleFilterClick(option)}
            size={1} // ajuste o tamanho conforme necessário
            borderRadius={8}
          >
            {option}
          </ButtonComponent>
        ))}
      </div>
    </div>
  );
};

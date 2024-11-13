import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { ButtonComponent } from 'components/Button/button';
import './filterSelector.scss';

interface FilterSelectorProps {
  title: string;
  options: string[];
  onFilterChange?: (selectedOption: string) => void;
  exclusive?: boolean;
  selectedFilter?: string;
}

export const FilterSelector = ({
  title,
  options,
  onFilterChange,
  exclusive = false,
  selectedFilter = '',
}: FilterSelectorProps) => {
  const [selectedOption, setSelectedOption] = useState<string>(selectedFilter);

  useEffect(() => {
    setSelectedOption(selectedFilter);
  }, [selectedFilter]);

  const handleFilterClick = (option: string) => {
    const newFilter = exclusive && selectedOption === option ? '' : option;
    setSelectedOption(newFilter);
    if (onFilterChange) {
      onFilterChange(newFilter);
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

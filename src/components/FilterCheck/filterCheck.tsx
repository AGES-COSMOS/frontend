import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { ButtonComponent } from 'components/Button/button';
import './filterCheck.scss';

interface FilterCheckProps {
  title: string;
  options: string[];
  onSelectionChange?: (selectedOptions: string[]) => void;
  selectedOptions?: string[];
}

export const FilterCheck = ({
  title,
  options,
  onSelectionChange,
  selectedOptions = [],
}: FilterCheckProps) => {
  const [selected, setSelected] = useState<string[]>(selectedOptions);

  useEffect(() => {
    setSelected(selectedOptions);
  }, [selectedOptions]);

  const handleOptionClick = (option: string) => {
    let updatedSelection: string[];
    if (selected.includes(option)) {
      updatedSelection = selected.filter((item) => item !== option);
    } else {
      updatedSelection = [...selected, option];
    }
    setSelected(updatedSelection);

    if (onSelectionChange) {
      onSelectionChange(updatedSelection);
    }
  };

  return (
    <div className="filter-check">
      <Typography variant="h6" className="filter-check__title">
        {title}
      </Typography>
      <div className="filter-check__options">
        {options.map((option) => (
          <ButtonComponent
            key={option}
            type={selectedOptions.includes(option) ? 'primary' : 'secondary'}
            onClick={() => handleOptionClick(option)}
            size={1}
            borderRadius={8}
          >
            {option}
          </ButtonComponent>
        ))}
      </div>
    </div>
  );
};

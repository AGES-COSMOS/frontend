import React from 'react';
import { Button } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import './filterTag.scss';

interface FilterTagProps {
  name: string;
  onClick: () => void;
}

export const FilterTag = ({ name, onClick }: FilterTagProps) => {
  return (
    <Button
      className="filter-tag-button"
      endIcon={<CancelIcon />}
      onClick={onClick}
    >
      {name}
    </Button>
  );
};

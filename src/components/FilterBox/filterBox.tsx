import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import './filterBox.scss';

interface FilterBoxProps {
  title: string;
  filters: { id: string; name: string }[];
}

export default function FilterBox({ title, filters }: FilterBoxProps) {
  const [state, setState] = React.useState<{ [key: string]: boolean }>(
    filters.reduce(
      (acc, filter) => ({
        ...acc,
        [filter.id]: false,
      }),
      {},
    ),
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Box className="filter-box">
      <Typography className="filter-title">{title}</Typography>
      <Box className="filter-list-container">
        <Typography className="filter-placeholder">
          Selecione Palavras-Chaves
          <ExpandLessIcon className="arrow-icon" />
        </Typography>
        <FormControl component="fieldset" variant="standard">
          <FormGroup className="filter-list">
            {filters.map((filter) => (
              <FormControlLabel
                key={filter.id}
                control={
                  <Checkbox
                    checked={state[filter.id]}
                    onChange={handleChange}
                    name={filter.id}
                    className="filter-checkbox"
                  />
                }
                label={filter.name}
                labelPlacement="start"
                className="filter-label"
              />
            ))}
          </FormGroup>
        </FormControl>
      </Box>
    </Box>
  );
}

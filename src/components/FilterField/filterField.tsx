import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './filterField.scss';

interface FilterFieldProps {
  title: string;
  placeholder: string;
  onAddClick?: () => void;
}

export const FilterField = ({
  title,
  placeholder,
  onAddClick,
}: FilterFieldProps) => {
  return (
    <div className="category-filter">
      <Typography variant="h6" className="category-filter__title">
        {title}
      </Typography>
      <TextField
        variant="outlined"
        placeholder={placeholder}
        className="category-filter__input"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={onAddClick}>
                <AddCircleOutlineIcon className="category-filter__icon" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

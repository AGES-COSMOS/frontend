import React from 'react';
import { Button, styled } from '@mui/material';

const OutlinedButton = styled(Button)({
  borderColor: '#7734e7',
  color: '#7734e7',
  '&:hover': {
    borderColor: '#7734e7',
    backgroundColor: 'rgba(119, 52, 231, 0.1)',
  },
});

const ContainedButton = styled(Button)({
  backgroundColor: '#7734e7',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#5e28d1',
  },
});

const registerTheme: React.FC = () => (
  <div>
    <OutlinedButton variant="outlined">Cancelar</OutlinedButton>
    <ContainedButton variant="contained">CONFIRMAR</ContainedButton>
  </div>
);

export default registerTheme;

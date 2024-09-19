// src/styles/register.style.tsx

import { Box, styled, Tooltip, Typography } from '@mui/material';

export const RegisterContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '2rem',
  backgroundColor: 'var(--cloud2)',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.down('sm')]: {
    width: '90%',
    padding: '1rem',
  },
}));

export const RegisterTitle = styled(Typography)(() => ({
  color: 'var(--purple)',
  fontSize: '1.5rem',
  fontWeight: 700,
  marginBottom: '1rem',
  textAlign: 'center',
}));

export const RegisterSubtitle = styled(Typography)(() => ({
  color: 'var(--slate)',
  fontSize: '1rem',
  fontWeight: 400,
  textAlign: 'center',
  marginBottom: '2rem',
}));

export const ErrorText = styled(Typography)(() => ({
  color: 'red',
  fontSize: '0.875rem',
  textAlign: 'right',
}));

export const ToolTipErrorMessage = styled(Tooltip)(() => ({
  backgroundColor: 'red',
  paddingTop: '0.25rem',
}));

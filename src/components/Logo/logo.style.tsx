import { Box, styled } from '@mui/material';

export const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: 'auto',
  marginBottom: '2rem',
  '& img': {
    width: '75%',
    height: 'auto',
    maxWidth: '18.75rem',
  },
  [theme.breakpoints.down('sm')]: {
    '& img': {
      width: '50%',
    },
  },
  [theme.breakpoints.down('xs')]: {
    '& img': {
      width: '40%',
    },
  },
}));

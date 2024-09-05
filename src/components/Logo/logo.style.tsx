import { Box, styled } from '@mui/material';

export const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: 'auto',
  marginBottom: '40px',
  '& img': {
    width: '75%',
    height: 'auto',
    maxWidth: '300px',
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

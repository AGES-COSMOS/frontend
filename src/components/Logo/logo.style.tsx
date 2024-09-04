import { Box, styled } from '@mui/material';

export const LogoContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: 'auto',
  marginBottom: '40px',
  '& img': {
    width: '70%',
    height: 'auto',
  },
});

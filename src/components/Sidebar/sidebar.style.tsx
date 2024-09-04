import { Box, Button, styled } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

export const SidebarContainer = styled(Box)({
  width: '300px',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: 'var(--cloud1)',
  color: '#fff',
  padding: '20px',
});

export const StyledPersonOutlineIcon = styled(PersonOutlineIcon)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '50px',
  backgroundColor: 'lightgray',
  borderRadius: '50%',
  padding: '40px',
  border: '3px solid #000',
  marginLeft: '4.5rem',
});

export const UserSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '50px',
});

export const NavButton = styled(Button)({
  color: '#000',
  justifyContent: 'flex-start',
  textTransform: 'none',
  padding: '10px 20px',
  width: '100%',
  '&:hover': {
    backgroundColor: '#444',
  },
});

// export const Logo = styled(Box)({
//   marginBottom: '40px',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   '& img': {
//     width: '100%',
//     height: 'auto',
//   },
// });

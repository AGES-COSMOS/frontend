import { Box, Button, styled } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import GroupsSharpIcon from '@mui/icons-material/GroupsSharp';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';

export const ButtonContainer = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  justifyContent: 'center',
  width: '100%',
  maxWidth: '250px',
  margin: '0 auto',
});

export const NavButton = styled(Button)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '120px',
  maxWidth: '160px',
  // color: '#000',
  color: 'grey',
  fontSize: '10px',
  fontFamily: 'Poppins',
  backgroundColor: 'var(--cloud1)',
  textTransform: 'none',
  border: '1px solid #ccc',
  borderRadius: 'none',
  '&:hover': {
    backgroundColor: 'white',
    border: 'none',
    transform: 'scale(1.15)',
    boxShadow: '0 0 0 3px white',
    '& svg': {
      color: 'var(--purple)',
    },
  },
  '& svg': {
    fontSize: '28px',
    color: '#000',
    marginBottom: '8px',
  },
});

export const SidebarContainer = styled(Box)(({ theme }) => ({
  width: '23rem',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: 'var(--cloud1)',
  color: '#fff',
  padding: '20px',

  [theme.breakpoints.down('sm')]: {
    width: '15rem',
  },
  [theme.breakpoints.down('xs')]: {
    width: '12rem',
  },
}));

export const StyledPersonOutlineIcon = styled(PersonOutlineIcon)(
  ({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '8rem',
    backgroundColor: 'lightgray',
    borderRadius: '50%',
    padding: '20px',
    color: '#636262',
    border: '7px solid white',
    boxShadow: '0 0 0 2px #636262',
    marginLeft: '0',

    [theme.breakpoints.down('sm')]: {
      fontSize: '40px',
      padding: '30px',
      marginLeft: '3rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '30px',
      padding: '20px',
      marginLeft: '2rem',
    },
  }),
);

export const UserSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '50px',
});

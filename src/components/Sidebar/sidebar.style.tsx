import { Box, Button, styled, Typography } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

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
  height: '7.5rem',
  maxWidth: '10rem',
  color: 'var(--light-slate)',
  fontSize: '0.7rem',
  fontFamily: 'Poppins',
  fontWeight: 600,
  backgroundColor: 'var(--cloud1)',
  textTransform: 'none',
  border: '1px solid #ccc',
  borderRadius: 'none',
  '&:hover': {
    backgroundColor: 'white',
    border: 'none',
    transform: 'scale(1.15)',
    boxShadow: '0 0 0 3px white',
    zIndex: 1,
    '& svg': {
      color: 'var(--purple)',
    },
    '& .iconeDiscordSideBar svg': {
      fill: 'var(--purple)',
    },
  },
  '& svg': {
    fontSize: '28px',
    color: '#000',
    marginBottom: '8px',
  },
  '& .iconeDiscordSideBar svg': {
    height: '2rem',
    marginBottom: '0px',
    fill: '#000',
  },
});

export const SidebarContainer = styled(Box)(({ theme }) => ({
  width: '23rem',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: 'var(--cloud2)',
  color: '#fff',
  padding: '2rem 1rem 1rem 1rem',

  [theme.breakpoints.down('sm')]: {
    width: '15rem',
  },
  [theme.breakpoints.down('xs')]: {
    width: '12rem',
  },
}));

export const SidebarFooterContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '1rem',
  marginBottom: '1rem',
}));

export const StyledPersonOutlineIcon = styled(PersonOutlineIcon)(
  ({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '8rem',
    backgroundColor: 'lightgray',
    borderRadius: '50%',
    padding: '2rem',
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
  marginBottom: '1rem',
});

export const StyledTitle = styled(Typography)({
  color: 'var(--slate)',
  fontSize: '1rem',
  fontWeight: 700,
  textAlign: 'center',
});

export const StyledTypography = styled(Typography)`
  color: var(--light-slate);
  font-size: 0.9rem;
  font-weight: 600;
  margin-top: 0.5rem;
  text-align: center;
  margin-bottom: 1rem;

  a {
    color: var(--purple);
    text-decoration: none;
  }
`;

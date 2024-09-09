import {
  NavButton,
  SidebarContainer,
  UserSection,
  StyledPersonOutlineIcon,
  ButtonContainer,
  SidebarFooterContainer,
  StyledTitle,
  StyledTypography,
} from './sidebar.style';
import Logo from '../Logo/logo';
import { Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import BookIcon from '@mui/icons-material/Book';
import SidebarFooter from '../SidebarFooter/sidebarFooter';
import { ReactSVG } from 'react-svg';
import DialogLogin from 'components/DialogLogin/dialogLogin';
import { useState } from 'react';

const Sidebar = () => {
  const [openLogin, setOpenLogin] = useState(false);

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };
  return (
    <SidebarContainer>
      <Box>
        <Logo />
        <UserSection>
          <StyledPersonOutlineIcon />
        </UserSection>
        <StyledTitle>Login</StyledTitle>
        <StyledTypography>
          Ainda não tem cadastro?{' '}
          <a href="#" onClick={handleOpenLogin}>
            Clique aqui.
          </a>
        </StyledTypography>
        <ButtonContainer>
          <NavButton>
            <DashboardIcon />
            Feed
          </NavButton>
          <NavButton>
            <ReactSVG
              src="assets/IconeDiscord.svg"
              className="iconeDiscordSideBar"
            />
            Comunidade
          </NavButton>
          <NavButton>
            <DateRangeOutlinedIcon />
            Eventos
          </NavButton>
          <NavButton>
            <BookIcon />
            Projetos
          </NavButton>
        </ButtonContainer>
      </Box>

      <SidebarFooterContainer>
        <SidebarFooter isLoggedIn={false} />
      </SidebarFooterContainer>
      <DialogLogin open={openLogin} onClose={handleCloseLogin} />
    </SidebarContainer>
  );
};

export default Sidebar;

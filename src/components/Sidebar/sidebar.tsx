import {
  NavButton,
  SidebarContainer,
  UserSection,
  StyledPersonOutlineIcon,
  ButtonContainer,
  SidebarFooterContainer,
  StyledTitle,
  StyledSubtitle,
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
        <StyledTitle>
          Rede de Acesso à Justiça e extensão universitária
        </StyledTitle>
        <UserSection>
          <StyledPersonOutlineIcon />
        </UserSection>
        <StyledSubtitle>Login</StyledSubtitle>
        <StyledTypography>
          Ainda não tem cadastro?{' '}
          <a href="#" onClick={handleOpenLogin}>
            Clique aqui.
          </a>
        </StyledTypography>
        <ButtonContainer>
          <NavButton href="/">
            <DashboardIcon />
            Feed
          </NavButton>
          <NavButton>
            <ReactSVG
              src="/assets/IconeDiscord.svg"
              className="iconeDiscordSideBar"
            />
            Comunidade
          </NavButton>
          <NavButton href="/eventos">
            <DateRangeOutlinedIcon />
            Eventos
          </NavButton>
          <NavButton href="/projetos">
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

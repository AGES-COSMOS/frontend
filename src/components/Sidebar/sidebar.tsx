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
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BookIcon from '@mui/icons-material/Book';
import SidebarFooter from '../SidebarFooter/sidebarFooter';
import { ReactSVG } from 'react-svg';
import DialogLogin from 'components/DialogLogin/dialogLogin';
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const handleLogout = () => {
    // Limpar dados de autenticação no localStorage
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');

    // Atualizar estado de autenticação
    setIsLoggedIn(false);
    setRole(null);
    window.location.reload();
  };

  useEffect(() => {
    // Verificar token e role_id no localStorage ao carregar o componente
    const token = localStorage.getItem('jwtToken');
    const storedRole = localStorage.getItem('role');

    setIsLoggedIn(!!token); // Define como logado se houver token
    setRole(storedRole);
  }, []);

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
        {false ? (
          <div>
            <StyledSubtitle>Login</StyledSubtitle>
            <StyledTypography>
              <a href="#" onClick={handleOpenLogin}>
                Clique aqui para fazer o login.
              </a>
            </StyledTypography>
          </div>
        ) : (
          <div>
            <StyledSubtitle>Olá, usuário!</StyledSubtitle>
            <br />
          </div>
        )}
        <ButtonContainer>
          <NavButton href="/">
            <DashboardIcon />
            Feed
          </NavButton>
          {false && (
            <NavButton>
              <ReactSVG
                src="/assets/IconeDiscord.svg"
                className="iconeDiscordSideBar"
              />
              Comunidade
            </NavButton>
          )}
          <NavButton href="/eventos">
            <DateRangeOutlinedIcon />
            Eventos
          </NavButton>
          <NavButton href="/projetos">
            <BookIcon />
            Projetos
          </NavButton>
          <NavButton href="/meus-eventos">
            <CalendarMonthIcon />
            Meus Eventos
          </NavButton>
          <NavButton href="/meus-projetos">
            <CollectionsBookmarkIcon />
            Meus Projetos
          </NavButton>
          <NavButton href="/painel-administrador">
            <AdminPanelSettingsIcon />
            Painel Admin
          </NavButton>
        </ButtonContainer>
      </Box>

      <SidebarFooterContainer>
        <SidebarFooter isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      </SidebarFooterContainer>
      <DialogLogin open={openLogin} onClose={handleCloseLogin} />
    </SidebarContainer>
  );
};

export default Sidebar;

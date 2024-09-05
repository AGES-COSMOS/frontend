import React from 'react';
import {
  NavButton,
  SidebarContainer,
  UserSection,
  StyledPersonOutlineIcon,
  ButtonContainer,
} from './sidebar.style';
import Logo from '../Logo/logo';
import { Box, Button, Typography } from '@mui/material';
import GroupsSharpIcon from '@mui/icons-material/GroupsSharp';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import { Feed } from 'pages/Feed/feed';
const Sidebar = () => {
  return (
    <SidebarContainer>
      <Box>
        <Logo />
        <UserSection>
          <StyledPersonOutlineIcon />
        </UserSection>
        <Typography variant="body1">User Name</Typography>
        <ButtonContainer>
          <NavButton>
            <DashboardOutlinedIcon />
            Feed
          </NavButton>
          <NavButton>
            <GroupsSharpIcon />
            Comunidade
          </NavButton>
          <NavButton>
            <DateRangeOutlinedIcon />
            Eventos
          </NavButton>
          <NavButton>
            <BookOutlinedIcon />
            Projeto
          </NavButton>
        </ButtonContainer>
      </Box>

      <Box>
        <Button>Help</Button>
        <Button>About</Button>
      </Box>
    </SidebarContainer>
  );
};

export default Sidebar;

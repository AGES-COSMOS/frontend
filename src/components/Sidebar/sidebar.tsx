import React from 'react';
import {
  NavButton,
  SidebarContainer,
  UserSection,
  StyledPersonOutlineIcon,
} from './sidebar.style';
import Logo from '../Logo/logo';
import { Box, Typography } from '@mui/material';

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Box>
        <Logo />
        <UserSection>
          <StyledPersonOutlineIcon />
          <Typography variant="h6">User Name</Typography>
        </UserSection>

        <NavButton>Home</NavButton>
        <NavButton>Profile</NavButton>
        <NavButton>Settings</NavButton>
        <NavButton>Logout</NavButton>
      </Box>

      <Box>
        <NavButton>Help</NavButton>
        <NavButton>About</NavButton>
      </Box>
    </SidebarContainer>
  );
};

export default Sidebar;

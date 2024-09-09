import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from 'theme/theme';
import Sidebar from 'components/Sidebar/sidebar';
import './mainLayout.scss';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <div className="main-layout">
        <Sidebar />
        <div className="content">{children}</div>
      </div>
    </ThemeProvider>
  );
};

export default MainLayout;

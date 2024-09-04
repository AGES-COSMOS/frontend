import { Routes, Route } from 'react-router-dom';
import { Feed } from 'pages/Feed/feed';
import { AboutUs } from 'pages/AboutUs/aboutUs';
import { ROUTES } from './constants';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import Sidebar from 'components/Sidebar/sidebar';

const AppRoutes = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path={ROUTES.SIDEBAR()} element={<Sidebar />} />
        <Route path={ROUTES.FEED()} element={<Feed />} />
        <Route path={ROUTES.ABOUT_US()} element={<AboutUs />} />
      </Routes>
    </ThemeProvider>
  );
};

export default AppRoutes;

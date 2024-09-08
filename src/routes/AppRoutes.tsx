import { Routes, Route } from 'react-router-dom';
import { Feed } from 'pages/Feed/feed';
import { AboutUs } from 'pages/AboutUs/aboutUs';
import { CreateProjects } from 'pages/CreateProjects/createProjects';
import { ROUTES } from './constants';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

const AppRoutes = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        {/* remove this */}
        <Route path="/" element={<CreateProjects />} />
        <Route path={ROUTES.FEED()} element={<Feed />} />
        <Route path={ROUTES.ABOUT_US()} element={<AboutUs />} />
        <Route path={ROUTES.CREATE_PROJECTS()} element={<CreateProjects />} />
      </Routes>
    </ThemeProvider>
  );
};

export default AppRoutes;

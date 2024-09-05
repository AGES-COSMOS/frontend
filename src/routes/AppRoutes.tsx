import { Routes, Route } from 'react-router-dom';
import { Feed } from 'pages/Feed/feed';
import { AboutUs } from 'pages/AboutUs/aboutUs';
import { ProjectListing } from 'pages/ProjectListing/projectListing';
import { ROUTES } from './constants';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

const AppRoutes = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path={ROUTES.FEED()} element={<Feed />} />
        <Route path={ROUTES.ABOUT_US()} element={<AboutUs />} />
        <Route path={ROUTES.PROJECT_LISTING()} element={<ProjectListing />} />
      </Routes>
    </ThemeProvider>
  );
};

export default AppRoutes;

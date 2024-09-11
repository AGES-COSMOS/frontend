import { Routes, Route } from 'react-router-dom';
import { Feed } from 'pages/Feed/feed';
import AboutUs from 'pages/AboutUs/index';
import { ProjectListing } from 'pages/ProjectListing/projectListing';
import { CreateProjects } from 'pages/CreateProjects/createProjects';
import { ROUTES } from './constants';
import MainLayout from 'layouts/mainLayout';

const AppRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        {/* remove this */}
        <Route path="/" element={<CreateProjects />} />
        <Route path={ROUTES.FEED()} element={<Feed />} />
        <Route path={ROUTES.ABOUT_US()} element={<AboutUs />} />
        <Route path={ROUTES.PROJECT_LISTING()} element={<ProjectListing />} />
        <Route path={ROUTES.CREATE_PROJECTS()} element={<CreateProjects />} />
      </Routes>
    </MainLayout>
  );
};

export default AppRoutes;

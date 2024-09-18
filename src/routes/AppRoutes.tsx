import { Routes, Route } from 'react-router-dom';
import { Feed } from 'pages/Feed/feed';
import AboutUs from 'pages/AboutUs/index';
import { ProjectListing } from 'pages/ProjectListing/projectListing';
import { CreateProjects } from 'pages/CreateProjects/createProjects';
import { AboutProjects }  from 'pages/AboutProjects/aboutProjects'
import { ROUTES } from './constants';
import MainLayout from 'layouts/mainLayout';

const AppRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path={ROUTES.FEED()} element={<Feed />} />
        <Route path={ROUTES.ABOUT_US()} element={<AboutUs />} />
        <Route path={ROUTES.PROJECT_LISTING()} element={<ProjectListing />} />
        <Route path={ROUTES.CREATE_PROJECTS()} element={<CreateProjects />} />
        <Route path={ROUTES.ABOUT_PROJECTS()} element={<AboutProjects />} />
      </Routes>
    </MainLayout>
  );
};

export default AppRoutes;

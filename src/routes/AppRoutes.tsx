import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './constants';
import MainLayout from 'layouts/mainLayout';
import { Feed } from 'pages/Feed/feed';
import AboutUs from 'pages/AboutUs/index';
import { ProjectListing } from 'pages/ProjectListing/projectListing';
<<<<<<< HEAD
import Register from 'pages/Register/Register';
=======
import { CreateProjects } from 'pages/CreateProjects/createProjects';
import { ROUTES } from './constants';
import MainLayout from 'layouts/mainLayout';
>>>>>>> 154ae93e0ee57e8c1b847509f4462a5955f5938f

const AppRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path={ROUTES.FEED()} element={<Feed />} />
        <Route path={ROUTES.ABOUT_US()} element={<AboutUs />} />
        <Route path={ROUTES.PROJECT_LISTING()} element={<ProjectListing />} />
<<<<<<< HEAD
        <Route path={ROUTES.REGISTER()} element={<Register />} />
=======
        <Route path={ROUTES.CREATE_PROJECTS()} element={<CreateProjects />} />
>>>>>>> 154ae93e0ee57e8c1b847509f4462a5955f5938f
      </Routes>
    </MainLayout>
  );
};

export default AppRoutes;

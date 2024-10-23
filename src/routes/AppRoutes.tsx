import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './constants';
import MainLayout from 'layouts/mainLayout';
import { Feed } from 'pages/Feed/feed';
import AboutUs from 'pages/AboutUs/aboutUs';
import { ProjectListing } from 'pages/ProjectListing/projectListing';
import { CreateProjects } from 'pages/CreateProjects/createProjects';
import { CreateEvents } from 'pages/CreateEvents/createEvents';
import Register from 'pages/Register/Register';
import { EventListing } from 'pages/EventListing/eventListing';
import { EditProfile } from 'pages/EditProfile/editProfile';
import MyProjectsPage from 'pages/MyProjects/MyProjectsPage';
import AdminPanel from 'pages/AdminPanel/adminPanel';
import AboutEvent from 'pages/AboutEvent/aboutEvent';

const AppRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path={ROUTES.FEED()} element={<Feed />} />
        <Route path={ROUTES.ABOUT_US()} element={<AboutUs />} />
        <Route path={ROUTES.PROJECT_LISTING()} element={<ProjectListing />} />
        <Route path={ROUTES.REGISTER()} element={<Register />} />
        <Route path={ROUTES.CREATE_PROJECTS()} element={<CreateProjects />} />
        <Route path={ROUTES.CREATE_EVENTS()} element={<CreateEvents />} />
        <Route path={ROUTES.EVENT_LISTING()} element={<EventListing />} />
        <Route path={ROUTES.EDIT_PROFILE()} element={<EditProfile />} />
        <Route path={ROUTES.MY_PROJECTS()} element={<MyProjectsPage />} />
        <Route path={ROUTES.ADMIN_PANEL()} element={<AdminPanel />} />
        <Route path={ROUTES.ABOUT_EVENT(':id')} element={<AboutEvent />} />
      </Routes>
    </MainLayout>
  );
};

export default AppRoutes;

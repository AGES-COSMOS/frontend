import { Routes, Route } from 'react-router-dom';
import { Feed } from 'pages/Feed/feed';
import { AboutUs } from 'pages/AboutUs/aboutUs';
import Register from 'pages/Register/Register';
import { ROUTES } from './constants';
import MainLayout from 'layouts/mainLayout';

const AppRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path={ROUTES.FEED()} element={<Feed />} />
        <Route path={ROUTES.ABOUT_US()} element={<AboutUs />} />
        <Route path={ROUTES.REGISTER()} element={<Register />} />
      </Routes>
    </MainLayout>
  );
};

export default AppRoutes;

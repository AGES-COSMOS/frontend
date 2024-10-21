import React from 'react';
import ProjectList from './ProjectList';
import './MyProjectsPage.scss';
import { Box, Typography } from '@mui/material';

const MyProjectPage: React.FC = () => {
  return (
    <Box className="my-project-page">
      <Typography className="my-project-page-title">Meus Projetos</Typography>
      <ProjectList />
    </Box>
  );
};

export default MyProjectPage;

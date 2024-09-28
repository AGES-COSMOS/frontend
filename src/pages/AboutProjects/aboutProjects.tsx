// import { Box, Container, Typography } from '@mui/material';
// import { useLocation } from 'react-router-dom'; // Importa useLocation
// import './aboutProjects.scss';

// const AboutProjects = () => {
//   const location = useLocation();
//   const project = location.state?.project; // Obtém o projeto do estado da navegação

//   if (!project) {
//     return <Typography variant="h6">Projeto não encontrado.</Typography>; // Mensagem de erro se o projeto não estiver disponível
//   }

//   return (
//     <Container>
//       <Box className="content">
//         <Typography variant="h4">{project.title}</Typography>
//         <p>
//           <strong>Instituição:</strong> {project.location}{' '}
//           {/* Altere conforme necessário */}
//         </p>
//         <p>
//           <strong>Status:</strong> {project.status}
//         </p>
//         <p>
//           <strong>Descrição:</strong> {project.description}
//         </p>
//         {/* Adicione outros detalhes conforme necessário */}
//       </Box>
//     </Container>
//   );
// };
import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { projectData } from '../ProjectListing/projectListing';
import './aboutProjects.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AboutProjects = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectData.find((project) => project.id === id);

  if (!project) {
    return (
      <Box className="about-projects">
        <Typography variant="h6">Projeto não encontrado.</Typography>
      </Box>
    );
  }

  return (
    <Box className="about-projects">
      {/* Botão de voltar */}
      <IconButton onClick={() => navigate(-1)} className="back-button">
        <ArrowBackIcon style={{ color: '#6C4DD3' }} />
      </IconButton>

      <Box className="CoverPage">
        {project.image && (
          <img
            src={project.image}
            alt={`${project.title} imagem`}
            className="about-projects-image"
          />
        )}
      </Box>

      <Box className="ContentPage">
        <Typography variant="h2" className="about-projects-title">
          {project.title}
        </Typography>
        <Typography variant="body1" className="about-projects-description">
          <strong>Instituição:</strong> {project.institution}
        </Typography>
        <Typography variant="body1" className="about-projects-description">
          <strong>Status:</strong> {project.status}
        </Typography>
        <Typography variant="body1" className="about-projects-description">
          <strong>Professor Responsável:</strong> {project.professor}
        </Typography>
        <Typography variant="body1" className="about-projects-description">
          <strong>Categoria:</strong> {project.category}
        </Typography>
        <Typography variant="body1" className="about-projects-description">
          <strong>Data Início:</strong> {project.startDate}
        </Typography>
        <Typography variant="body1" className="about-projects-description">
          <strong>Data Fim:</strong> {project.endDate}
        </Typography>
        <Typography variant="body1" className="about-projects-description">
          <strong>História:</strong> {project.history}
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutProjects;
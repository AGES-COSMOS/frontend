import { Box, Typography, IconButton } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './aboutProject.scss';

const AboutProject = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Recebe os dados do estado passado na navegação
  const project = location.state;

  if (!project) {
    return (
      <Box className="about-projects">
        <Typography variant="h6">Projeto não encontrado.</Typography>
      </Box>
    );
  }

  return (
    <Box className="about-projects">
      <Box className="button-box">
        <IconButton onClick={() => navigate(-1)} className="back-button">
          <ArrowBackIcon className="purple-icon" style={{ fontSize: '2rem' }} />
        </IconButton>
      </Box>
      <Box className="left-box">
        <Box className="content-box">
          {project.image && (
            <img
              src={project.image}
              alt={`${project.title} imagem`}
              className="about-projects-image"
            />
          )}
          <Box className="project-details">
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
              <strong>Data Fim:</strong> {project.endDate || 'Não definida'}
            </Typography>
            <Typography variant="body1" className="about-projects-description">
              <strong>História:</strong> {project.history}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutProject;

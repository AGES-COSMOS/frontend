import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './projectCard.scss';
import { useNavigate } from 'react-router-dom';

interface ProjectCardProps {
  id: number;
  title: string;
  institution: string;
  status: string;
  location: string;
  keyWords: string[];
  description: string;
  professor: string;
  category: string;
  startDate: string;
  endDate?: string;
  history: string;
  image: string;
}

export const ProjectCard = ({
  id,
  title,
  institution,
  status,
  location,
  keyWords,
  description,
  professor,
  category,
  startDate,
  endDate,
  history,
  image,
}: ProjectCardProps) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/projetos/${id}`, {
      state: {
        id,
        title,
        institution,
        status,
        professor,
        category,
        startDate,
        endDate,
        history,
        image,
      },
    });
  };

  return (
    <Card className="project-card">
      <Box className="container-box">
        <CardMedia
          component="img"
          className="card-media"
          image={image}
          title={title}
        />
        <Box className="content-box">
          <Typography variant="h6" className="title">
            {title}
          </Typography>
          <Typography variant="body2" className="status">
            {status}
          </Typography>
          <Box className="location-container">
            <LocationOnIcon className="location-icon" />
            <Typography variant="body2" className="location">
              {location}
            </Typography>
          </Box>
          <Typography variant="body2" className="keywords">
            <b>Palavras-Chave:</b> {keyWords.join(', ')}
          </Typography>
        </Box>
      </Box>
      <CardContent className="card-content">
        <Typography variant="body2" className="description">
          <b>Descrição:</b> {description}
        </Typography>
      </CardContent>
      <CardActions className="card-actions">
        <Button size="small" className="button" onClick={handleNavigate}>
          Ver Detalhes
        </Button>
      </CardActions>
    </Card>
  );
};

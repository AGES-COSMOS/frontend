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

export interface ProjectCardProps {
  id: string;
  title: string;
  status: string;
  institution: string;
  professor: string;
  category: string;
  startDate: string;
  endDate: string;
  history: string;
  location: string;
  keyWords: string[];
  description: string;
  image: string;
}

export const ProjectCard = ({
  id,
  title,
  status,
  institution,
  professor,
  category,
  startDate,
  endDate,
  history,
  location,
  keyWords,
  description,
  image,
}: ProjectCardProps) => {
  const navigate = useNavigate();

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
            <Typography variant="body2" className="location">
              {location}
            </Typography>
            <LocationOnIcon className="location-icon" />
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
        <Button
          size="small"
          className="button"
          onClick={() => navigate(`/projetos/${id}`)}
        >
          Ver Detalhes
        </Button>
      </CardActions>
    </Card>
  );
};
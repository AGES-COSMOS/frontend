import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import {
  Card,
  CardActions,
  Button,
  CardMedia,
  Typography,
} from '@mui/material';

import './MyProjectCard.scss';

interface MyProjectCardProps {
  title?: string;
  status?: string;
  institution?: string;
  imageUrl?: string;
  isProfessor?: boolean;
  onApprove?: () => void;
  isNewProjectCard?: boolean;
  onNewProjectClick?: () => void;
}

const MyProjectCard: React.FC<MyProjectCardProps> = ({
  title,
  status,
  institution,
  imageUrl,
  isProfessor,
  onApprove,
  isNewProjectCard,
  onNewProjectClick,
}) => {
  const navigate = useNavigate();

  const handleNewProjectClick = () => {
    navigate('/criar-projeto');
  };

  if (isNewProjectCard) {
    return (
      <div
        className="my-project-card my-new-project-card"
        onClick={handleNewProjectClick}
      >
        <AddCircleOutlineIcon
          style={{ fontSize: '120px', color: 'var(--purple)' }}
        />
        <p>Novo Projeto</p>
      </div>
    );
  }

  return (
    <Card className="my-project-card">
      {imageUrl && (
        <CardMedia
          component="img"
          image={imageUrl}
          title={title}
          className="my-project-image"
        />
      )}

      <Typography className="my-title">{title}</Typography>
      <Typography className="my-status">{status}</Typography>
      <Typography className="my-institution">
        <LocationOnIcon style={{ fontSize: '30px', color: 'var(--purple)' }} />
        {institution}
      </Typography>

      <CardActions>
        {isProfessor && status === 'Pendente' && (
          <Button className="approve-btn" onClick={onApprove}>
            Aprovar
          </Button>
        )}
        {status === 'Em Andamento' && (
          <Button className="details-btn">Ver Detalhes</Button>
        )}
      </CardActions>
    </Card>
  );
};

export default MyProjectCard;

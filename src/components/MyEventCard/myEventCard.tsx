import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import {
  Card,
  CardActions,
  Button,
  CardMedia,
  Typography,
  Box,
} from '@mui/material';

import './myEventCard.scss';

interface myEventCardProps {
  title?: string;
  date?: string;
  imageUrl?: string;
  isNewEventCard?: boolean;
  seeEventDetails?: () => void;
}

const myEventCard: React.FC<myEventCardProps> = ({
  title,
  date,
  imageUrl,
  isNewEventCard,
  seeEventDetails,
}) => {
  const navigate = useNavigate();

  const handleNewEventClick = () => {
    navigate('/criar-evento');
  };

  if (isNewEventCard) {
    return (
      <div
        className="my-event-card my-new-event-card"
        onClick={handleNewEventClick}
      >
        <AddCircleOutlineIcon
          style={{ fontSize: '120px', color: 'var(--purple)' }}
        />
        <p>Novo Evento</p>
      </div>
    );
  }

  return (
    <Card className="my-event-card">
      {imageUrl && (
        <CardMedia
          component="img"
          image={imageUrl}
          title={title}
          className="my-event-image"
        />
      )}

      <Typography className="my-title">{title}</Typography>
      <Box className="box-date">
        <CalendarTodayIcon className="calendar-icon" />
        <Typography className="date">{date}</Typography>
      </Box>

      <CardActions>
        <Button className="details-btn">Ver Detalhes</Button>
      </CardActions>
    </Card>
  );
};

export default myEventCard;

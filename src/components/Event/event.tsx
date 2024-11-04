import React from 'react';
import { Box } from '@mui/material';
import { ButtonComponent } from 'components/Button/button';
import { useNavigate } from 'react-router-dom';

import './event.scss';
import { ROUTES } from 'routes/constants';

interface EventProps {
  startTime: string;
  endTime: string;
  name: string;
  eventId: string;
}

export const Event = ({ name, eventId, startTime, endTime }: EventProps) => {
  const navigate = useNavigate();

  const handleMoreClick = () => {
    navigate(ROUTES.ABOUT_EVENT(eventId));
  };

  return (
    <Box className="event">
      <Box className="event-time">
        <span className="start-time">{startTime}</span>
        <span className="end-time">{endTime}</span>
      </Box>
      <Box className="separator" />
      <Box className="event-details">
        <Box className="event-header">
          <span className="event-label">Evento</span>
          <ButtonComponent type="primary" onClick={handleMoreClick} size={1}>
            Ver +
          </ButtonComponent>
        </Box>
        <span className="event-name">{name}</span>
      </Box>
    </Box>
  );
};

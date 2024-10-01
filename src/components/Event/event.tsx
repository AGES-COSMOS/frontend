import React from 'react';
import { Box } from '@mui/material';
import { ButtonComponent } from 'components/Button/button';
import './event.scss';

interface EventProps {
  startTime: string;
  endTime: string;
  name: string;
  onMoreClick: () => void;
}

export const Event = ({
  startTime,
  endTime,
  name,
  onMoreClick,
}: EventProps) => {
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
          <ButtonComponent type="primary" onClick={onMoreClick} size={1}>
            Ver +
          </ButtonComponent>
        </Box>
        <span className="event-name">{name}</span>
      </Box>
    </Box>
  );
};

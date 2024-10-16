import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { events } from '../../api/events';
import './aboutEvent.scss';

const AboutEvent = () => {
  const { id } = useParams();

  const event = events.find((event) => event.eventId === id);

  if (!event) {
    return (
      <Box className="about-event">
        <Typography variant="h6">Evento não encontrado.</Typography>
      </Box>
    );
  }

  return (
    <Box className="about-events">
      <Box className="CoverPage">
        {event.photo && (
          <img
            src={event.photo}
            alt={`${event.title} imagem`}
            className="about-events-image"
          />
        )}
      </Box>
      <Box className="ContentPage">
        <Typography variant="h2" className="about-event-title">
          {event.title}
        </Typography>
        <Box className="about-event-parameters">
          <Box className="about-event-parameter">
            <strong>Categoria:</strong>
            <span>{event.category}</span>
          </Box>

          <Box className="about-event-parameter">
            <strong>Localização:</strong>
            <span>{event.location}</span>
          </Box>

          <Box className="about-event-parameter">
            <strong>Data e Horário:</strong>
            <span>{new Date(event.startTime).toLocaleString()}</span>
          </Box>

          <Box className="about-event-parameter">
            <strong>Data Fim:</strong>
            <span>{new Date(event.endTime).toLocaleString()}</span>
          </Box>
        </Box>
        <Typography variant="body1" className="about-event-description">
          <strong>Descrição:</strong> {event.description}
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutEvent;

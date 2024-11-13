import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { events } from '../../api/events';
import './myEvents.scss';
import MyEventCard from 'components/MyEventCard/myEventCard';

const myEvents = () => {
  const navigate = useNavigate();

  const handleViewEvent = (id: string) => {
    navigate(`/event/${id}`);
  };

  return (
    <Box className="meusEventos-container">
      <Typography className="meusEventos-titles">Meus Eventos</Typography>
      <Box className="cards-container">
        <MyEventCard isNewEventCard />
        {events.map((event) => (
          <MyEventCard
            key={event.eventId}
            title={event.title}
            date={new Date(event.startTime).toLocaleString()}
            imageUrl={event.photo}
          />
        ))}
      </Box>
    </Box>
  );
};

export default myEvents;

import { Box } from '@mui/material';
import { Event } from 'components/Event/event';
import './eventDate.scss';

interface EventDateProps {
  date: string;
  events: {
    startTime: string;
    endTime: string;
    name: string;
    eventId: string;
  }[];
}

export const EventDate = ({ date, events }: EventDateProps) => {
  const formattedDate = formatDate(date);

  return (
    <Box className="event-date-group">
      <Box className="event-date-title">{formattedDate}</Box>
      {events.map((event, index) => (
        <Event
          key={index}
          startTime={event.startTime}
          endTime={event.endTime}
          name={event.name}
          eventId={event.eventId}
        />
      ))}
    </Box>
  );
};

const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
  });
};

import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getEventById } from '../../services/eventsService';
import './aboutEvent.scss';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

export interface Category {
  id: number;
  name: string;
}

export interface EventCategory {
  category: Category;
}

const AboutEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEventById(id);
        setEvent(eventData);
      } catch (error) {
        setError(error);
      }
    };

    fetchEvent();
  }, [id]);

  const formatDateTime = (date: string, time: string): string => {
    if (!date || !time) return '';

    try {
      const combinedDateTime = new Date(
        `${date.split('T')[0]}T${new Date(time).toLocaleTimeString('pt-BR', { hour12: false })}`,
      );
      return format(combinedDateTime, 'dd/MM/yyyy, HH:mm');
    } catch {
      return 'Data ou Hora inválida';
    }
  };

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!event) {
    return (
      <Box className="about-event">
        <Typography variant="h6">Carregando evento...</Typography>
      </Box>
    );
  }

  return (
    <Box className="about-events">
      <Box className="CoverPage">
        {event.imageURL && (
          <img
            src={event.imageURL}
            alt={`${event.title} imagem`}
            className="about-events-image"
          />
        )}
      </Box>
      <Box className="ContentPage">
        <Box className="about-event-parameters">
          <Box className="about-event-parameter">
            <strong>Título:</strong>
            <span>{event.title}</span>
          </Box>

          <Box className="about-event-parameter">
            <strong>Data e Horário:</strong>
            <span>{formatDateTime(event.date, event.startHour)}</span>
          </Box>

          <Box className="about-event-parameter">
            <strong>Categorias:</strong>
            {event.EventCategory.length > 0 ? (
              <span>
                {event.EventCategory.map((ec: any, index: any) => (
                  <span key={ec.category.id}>
                    {ec.category.name}
                    {index < event.EventCategory.length - 1 && ', '}
                  </span>
                ))}
              </span>
            ) : (
              <span>Não especificada</span>
            )}
          </Box>

          <Box className="about-event-parameter">
            <strong>Localização:</strong>
            <span>{event.address}</span>
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

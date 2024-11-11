import { useEffect, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { EventDate } from 'components/EventDate/eventDate';
import { FilterTag } from 'components/FilterTag/filterTag';
import { SearchField } from 'components/SearchField/searchField';
import { FilterField } from 'components/FilterField/filterField';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import './eventListing.scss';
import { FilterSelector } from 'components/FilterSelector/filterSelector';
import { FilterCheck } from 'components/FilterCheck/filterCheck';
import { getAllEvents } from 'services/eventsService';
import { parseISO, format } from 'date-fns';

interface FormattedEvent {
  startTime: string;
  endTime: string;
  name: string;
  eventId: string;
}

interface EventCategory {
  category_id: number;
}

interface Event {
  id: number;
  title: string;
  imageURL: string | null;
  description: string;
  date: string;
  startHour: string;
  endHour: string;
  IsOnline: boolean;
  address: string;
  EventCategory: EventCategory[];
}

export const EventListing = () => {
  const [isMobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [error, setError] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [eventsByDate, setEventsByDate] = useState<{
    [key: string]: FormattedEvent[];
  }>({});

  const fetchEvents = async () => {
    try {
      const response = await getAllEvents();
      const formattedEvents = formatEventsByDate(response.data);
      setEventsByDate(formattedEvents);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleFilters = () => {
    if (isMobile) {
      setMobileFiltersOpen(!isMobileFiltersOpen);
    }
  };

  const formatEventsByDate = (events: {
    [key: string]: Event[];
  }): { [key: string]: FormattedEvent[] } => {
    return Object.keys(events).reduce(
      (acc, date) => {
        acc[date] = events[date].map((event) => ({
          name: event.title,
          eventId: event.id.toString(),
          startTime: formatHour(event.startHour),
          endTime: formatHour(event.endHour),
        }));
        return acc;
      },
      {} as { [key: string]: FormattedEvent[] },
    );
  };

  const formatHour = (hour: string): string => {
    if (!hour) return '';

    try {
      const date = parseISO(hour);
      return format(date, 'HH:mm');
    } catch {
      return 'Hora inválida';
    }
  };

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Box className="main-container">
      <Box className="event-listing">
        <SearchField
          onFilterClick={toggleFilters}
          isFilterOpen={isMobileFiltersOpen}
          placeholder="Procurar eventos..."
        />
        <Typography variant="body1" className="filter-title">
          Filtros ativos
        </Typography>
        <Box className="filter-tags">
          <FilterTag name="Palestras" onClick={() => console.log('Teste')} />
          <FilterTag name="Esta semana" onClick={() => console.log('Teste')} />
          <FilterTag name="PUCRS" onClick={() => console.log('Teste')} />
        </Box>
        <Typography variant="body1" className="results-title">
          Resultados:
        </Typography>
        <Box className="event-cards">
          {Object.keys(eventsByDate)
            .sort()
            .map((date) => (
              <EventDate key={date} date={date} events={eventsByDate[date]} />
            ))}
        </Box>
      </Box>
      <Box
        className={`filters-container ${isMobileFiltersOpen ? 'open' : 'closed'}`}
      >
        <Box className="filters-box">
          <Box className="filters-header">
            <IconButton className="filters-icon" onClick={toggleFilters}>
              {isMobileFiltersOpen ? <CloseIcon /> : <FilterListIcon />}
            </IconButton>
            <Typography variant="h4" className="filters-title">
              Filtros
            </Typography>
          </Box>
          <FilterField title="Instituição" placeholder="Nome da Instituição" />
          <FilterField
            title="Localização"
            placeholder="Endereço ou Link da transmissão"
          />
          <FilterSelector
            title="Data do Evento"
            options={['Esta semana', 'Este mês', 'Este ano']}
            onFilterChange={(selected) =>
              console.log(`Filtro selecionado: ${selected}`)
            }
          />
          <FilterCheck
            title="Categorias"
            options={['Palestras', 'Oficinas', 'Reuniões']}
            onSelectionChange={(selected) =>
              console.log(`Categorias selecionadas: ${selected}`)
            }
          />
          <FilterCheck
            title="Modalidades"
            options={['Presencial', 'Online']}
            onSelectionChange={(selected) =>
              console.log(`Modalidades selecionadas: ${selected}`)
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

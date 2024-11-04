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
import { events } from '../../api/events';

export const EventListing = () => {
  const [isMobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [eventsByDate, setEventsByDate] = useState<{ [key: string]: any[] }>(
    {},
  );

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

  useEffect(() => {
    const formattedEvents = formatEventsByDate(events);
    setEventsByDate(formattedEvents);
  }, []);

  const formatEventsByDate = (events: any[]) => {
    return events.reduce(
      (acc, event) => {
        const date = event.date;
        if (!acc[date]) acc[date] = [];
        acc[date].push({
          name: event.title,
          eventId: event.eventId,
          startTime: event.startTime,
          endTime: event.endTime,
        });
        return acc;
      },
      {} as { [key: string]: any[] },
    );
  };

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
          {Object.keys(eventsByDate).map((date) => (
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

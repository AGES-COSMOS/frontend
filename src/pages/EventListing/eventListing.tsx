import { useCallback, useEffect, useState } from 'react';
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
import { findEvents } from '../../services/eventsService';
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [eventsByDate, setEventsByDate] = useState<{
    [key: string]: FormattedEvent[];
  }>({});
  const [filters, setFilters] = useState({
    startDate: undefined,
    endDate: undefined,
    eventName: '',
    isOnline: undefined,
    dateInterval: '',
    selectedModalidades: [] as string[],
    category: [] as string[],
    institutionName: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const toggleFilters = () => {
    if (isMobile) {
      setMobileFiltersOpen((prev) => !prev);
    }
  };

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth <= 1024);
  }, []);
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const loadEvents = useCallback(async () => {
    setLoading(true);
    try {
      const events = await findEvents(
        filters.isOnline,
        filters.startDate,
        filters.endDate,
        filters.eventName,
        filters.category,
        filters.institutionName,
      );
      const formattedEvents = formatEventsByDate(events.data);
      setEventsByDate(formattedEvents);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const updateFilter = useCallback((key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

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

  const handleRemoveFilter = useCallback(
    (filterName: string, filterType: string) => {
      switch (filterType) {
        case 'dateInterval':
          updateFilter('dateInterval', '');
          updateFilter('startDate', undefined);
          updateFilter('endDate', undefined);
          break;
        case 'eventName':
          updateFilter('eventName', '');
          break;
        case 'modalidade':
          updateFilter(
            'selectedModalidades',
            filters.selectedModalidades.filter((item) => item !== filterName),
          );
          break;
        case 'categoria':
          updateFilter(
            'category',
            filters.category.filter((item) => item !== filterName),
          );
          break;
        case 'instituicao':
          updateFilter(
            'institutionName',
            filters.institutionName.filter((item) => item !== filterName),
          );
          break;
        default:
          break;
      }
    },
    [filters, updateFilter],
  );

  useEffect(() => {
    const currentDate = new Date();
    let startDate, endDate;
    switch (filters.dateInterval) {
      case 'Esta semana':
        startDate = new Date(
          currentDate.setDate(currentDate.getDate() - currentDate.getDay()),
        );
        endDate = new Date(
          currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6),
        );
        break;
      case 'Este mês':
        startDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1,
        );
        endDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0,
        );
        break;
      case 'Este ano':
        startDate = new Date(currentDate.getFullYear(), 0, 1);
        endDate = new Date(currentDate.getFullYear(), 11, 31);
        break;
      default:
        startDate = undefined;
        endDate = undefined;
        break;
    }
    updateFilter('startDate', startDate);
    updateFilter('endDate', endDate);
  }, [filters.dateInterval, updateFilter]);

  useEffect(() => {
    if (filters.selectedModalidades.length === 1) {
      updateFilter('isOnline', filters.selectedModalidades[0] === 'Online');
    } else {
      updateFilter('isOnline', undefined);
    }
  }, [filters.selectedModalidades, updateFilter]);
  return (
    <Box className="main-container">
      <Box className="event-listing">
        <SearchField
          onFilterClick={toggleFilters}
          isFilterOpen={isMobileFiltersOpen}
          placeholder="Procurar eventos..."
          onSearchChange={(value) => updateFilter('eventName', value)}
        />
        <Typography variant="body1" className="filter-title">
          Filtros ativos
        </Typography>
        <Box className="filter-tags">
          {filters.dateInterval && (
            <FilterTag
              name={filters.dateInterval}
              onClick={() =>
                handleRemoveFilter(filters.dateInterval, 'dateInterval')
              }
            />
          )}
          {filters.eventName && (
            <FilterTag
              name={filters.eventName}
              onClick={() => handleRemoveFilter(filters.eventName, 'eventName')}
            />
          )}
          {filters.selectedModalidades.map((modalidade) => (
            <FilterTag
              key={modalidade}
              name={modalidade}
              onClick={() => handleRemoveFilter(modalidade, 'modalidade')}
            />
          ))}
          {filters.category.map((category) => (
            <FilterTag
              key={category}
              name={category}
              onClick={() => handleRemoveFilter(category, 'categoria')}
            />
          ))}
          {filters.institutionName.map((institution) => (
            <FilterTag
              key={institution}
              name={institution}
              onClick={() => handleRemoveFilter(institution, 'instituicao')}
            />
          ))}
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
          <FilterField
            title="Instituição"
            placeholder="Nome da Instituição"
            onAddClick={(value) =>
              value &&
              updateFilter('institutionName', [
                ...filters.institutionName,
                value,
              ])
            }
          />
          <FilterField
            title="Localização"
            placeholder="Endereço ou Link da transmissão"
          />
          <FilterSelector
            exclusive={true}
            title="Data do Evento"
            options={['Esta semana', 'Este mês', 'Este ano']}
            onFilterChange={(selected) =>
              updateFilter('dateInterval', selected)
            }
            selectedFilter={filters.dateInterval}
          />
          <FilterCheck
            title="Categorias"
            options={['Palestras', 'Oficinas', 'Reuniões']}
            onSelectionChange={(selected) => updateFilter('category', selected)}
            selectedOptions={filters.category}
          />
          <FilterCheck
            title="Modalidades"
            options={['Presencial', 'Online']}
            onSelectionChange={(selected) =>
              updateFilter('selectedModalidades', selected)
            }
            selectedOptions={filters.selectedModalidades}
          />
        </Box>
      </Box>
    </Box>
  );
};

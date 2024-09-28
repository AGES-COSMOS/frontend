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

export const EventListing = () => {
  const [isMobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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

  const handleMoreClick = (eventName: string) => {
    alert(`Mais detalhes sobre o evento: ${eventName}`);
  };

  const eventsByDate: {
    [key: string]: {
      startTime: string;
      endTime: string;
      name: string;
      onMoreClick: () => void;
    }[];
  } = {
    '2024-09-28': [
      {
        startTime: '08:30',
        endTime: '09:30',
        name: 'A Prática Jurídica na Comunidade',
        onMoreClick: () => handleMoreClick('A Prática Jurídica na Comunidade'),
      },
      {
        startTime: '10:00',
        endTime: '11:00',
        name: 'Construindo Pontes com a Sociedade',
        onMoreClick: () =>
          handleMoreClick('Construindo Pontes com a Sociedade'),
      },
    ],
    '2024-09-29': [
      {
        startTime: '13:30',
        endTime: '15:00',
        name: 'Projetos de Extensão e Impacto Social',
        onMoreClick: () =>
          handleMoreClick('Projetos de Extensão e Impacto Social'),
      },
    ],
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
          <FilterTag name="Palestras" onClick={() => alert('Teste')} />
          <FilterTag name="Esta semana" onClick={() => alert('Teste')} />
          <FilterTag name="PUCRS" onClick={() => alert('Teste')} />
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
              console.log(`Categorias selecionadas: ${selected}`)
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

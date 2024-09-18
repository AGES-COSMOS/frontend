import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { ProjectCard } from 'components/ProjectCard/projectCard';
import { FilterTag } from 'components/FilterTag/filterTag';
import { SearchField } from 'components/SearchField/searchField';
import FilterBox from 'components/FilterBox/filterBox';
import { FilterField } from 'components/FilterField/filterField';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import './projectListing.scss';
import { findProjects, Pagination } from '../../services/projectsService';

export interface ProjectListing {
  id: number;
  name: string;
  history: string;
  purpose: string;
  contact?: string;
  start_date: Date;
  end_date?: Date;
  status: string;
  teacher_id: number;
  institution_id: number;
  updatedAt: Date;
  updatedBy: string;
  imageURL: string;
  ProjectKeyword: { keyword: { id: number; word: string } }[];
}

const mockFilters = [
  { id: '1', name: 'Prisão domiciliar' },
  { id: '2', name: 'Habeas corpus' },
  { id: '3', name: 'Crimes de ódio' },
];

const useProjectPagination = (initialPage = 1, limit = 10) => {
  const [projects, setProjects] = useState<Pagination<ProjectListing> | null>(
    null,
  );
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMoreProjects = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newProjects = await findProjects(page, limit);
      setProjects((prevProjects) => {
        if (!prevProjects) return newProjects;
        return {
          ...prevProjects,
          data: [...prevProjects.data, ...newProjects.data],
          page: newProjects.page,
          lastPage: newProjects.lastPage,
          total: newProjects.total,
        };
      });
      setHasMore(page < newProjects.lastPage);
      setPage((prevPage) => prevPage + 1);
    } catch {
      setError('Ocorreu um erro ao carregar os projetos.');
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, loading]);

  return { projects, loadMoreProjects, loading, error, hasMore };
};

export const ProjectListing = () => {
  const { projects, loadMoreProjects, loading, error, hasMore } =
    useProjectPagination();
  const [isMobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const observerTarget = useRef<HTMLDivElement | null>(null);

  // Debounce para o resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    const debounceResize = debounce(handleResize, 300);
    window.addEventListener('resize', debounceResize);
    return () => window.removeEventListener('resize', debounceResize);
  }, []);

  // IntersectionObserver para paginação infinita
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          loadMoreProjects();
        }
      },
      { threshold: 1 },
    );
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, loadMoreProjects, hasMore, loading]);

  const toggleFilters = () => {
    if (isMobile) {
      setMobileFiltersOpen(!isMobileFiltersOpen);
    }
  };

  return (
    <Box className="main-container">
      <Box className="project-listing">
        <SearchField
          onFilterClick={toggleFilters}
          isFilterOpen={isMobileFiltersOpen}
        />
        <Typography variant="body1" className="filter-title">
          Filtros ativos
        </Typography>
        <Box className="filter-tags">
          <FilterTag
            name="Prisão domiciliar"
            onClick={() => {
              alert('Teste');
            }}
          />
          <FilterTag
            name="Crimes de ódio"
            onClick={() => {
              alert('Teste');
            }}
          />
          <FilterTag
            name="Discriminação por orientação sexual"
            onClick={() => {
              alert('Teste');
            }}
          />
          <FilterTag
            name="Progressão de regime"
            onClick={() => {
              alert('Teste');
            }}
          />
        </Box>
        <Typography variant="body1" className="results-title">
          Resultados:
        </Typography>
        <Box className="project-cards">
          {projects?.data.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.name}
              status={project.status}
              location="location"
              keyWords={project.ProjectKeyword.map((item) => item.keyword.word)}
              description={project.purpose}
              image={'http://localhost:3001/public/' + project.imageURL}
            />
          ))}
          <div ref={observerTarget}></div>
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
          <FilterField title="Categorias" placeholder="Nome da Categoria" />
          <FilterField title="Instituição" placeholder="Nome da Instituição" />
          <FilterField
            title="Localização"
            placeholder="Endereço ou Link da transmissão"
          />
          <FilterBox title="Palavras-Chaves" filters={mockFilters} />
        </Box>
      </Box>
    </Box>
  );
};

// Debounce utility
function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number,
) {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>): void {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

import { useEffect, useState } from 'react';
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
import Loading from 'components/Loading/loading';

export interface IProjectListing {
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

export const ProjectListing = () => {
  const [isMobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const [projects, setProjects] = useState<Pagination<IProjectListing> | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const newProjects = await findProjects(1, 10);
        setProjects(newProjects);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
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

  if (loading) return <Loading />;

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Box className="main-container">
      <Box className="project-listing">
        <SearchField
          onFilterClick={toggleFilters}
          isFilterOpen={isMobileFiltersOpen}
          placeholder="Procurar projetos..."
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
          {projects?.data &&
          Array.isArray(projects.data) &&
          projects.data.length > 0 ? (
            <>
              {projects.data.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.name}
                  status={project.status}
                  location="location"
                  keyWords={project.ProjectKeyword.map(
                    (item) => item.keyword.word,
                  )}
                  description={project.purpose}
                  image={project.imageURL}
                />
              ))}
            </>
          ) : (
            <Typography variant="body1" className="no-results">
              Nenhum projeto encontrado.
            </Typography>
          )}
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

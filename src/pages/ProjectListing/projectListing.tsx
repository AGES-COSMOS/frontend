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

// Mockup de dados dos projetos
export const projectData = [
  {
    id: '1',
    title: 'Projeto 1',
    status: 'Em Andamento',
    institution: 'PUCRS',
    professor: 'Prof. Dr. João Silva',
    category: 'Direito',
    startDate: '2023-01-10',
    endDate: '2024-06-10',
    history:
      'Este projeto visa a análise de direitos humanos em casos de discriminação.',
    location: 'PUCRS',
    keyWords: [
      'Prisão domiciliar',
      'crimes de ódio',
      'discriminação por orientação sexual',
      'progressão de regime',
    ],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget augue malesuada nisl dapibus condimentum sit amet a mi. Maecenas vel est metus. Donec sagittis convallis dui non rhoncus.',
    image:
      'https://rockcontent.com/br/wp-content/uploads/sites/2/2020/02/projeto-pessoal.png.webp',
  },
  {
    id: '2',
    title: 'Projeto 2',
    status: 'Concluído',
    institution: 'PUCRS',
    professor: 'Prof. Dr. Maria Oliveira',
    category: 'Direito Penal',
    startDate: '2022-02-15',
    endDate: '2023-08-30',
    history: 'Análise de casos de crimes de ódio e suas consequências legais.',
    location: 'PUCRS',
    keyWords: [
      'Habeas corpus',
      'crimes de ódio',
      'discriminação por orientação sexual',
    ],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget augue malesuada nisl dapibus condimentum sit amet a mi. Maecenas vel est metus. Donec sagittis convallis dui non rhoncus.',
    image:
      'https://rockcontent.com/br/wp-content/uploads/sites/2/2020/02/projeto-pessoal.png.webp',
  },
  {
    id: '3',
    title: 'Projeto 3',
    status: 'Em Andamento',
    institution: 'PUCRS',
    professor: 'Prof. Dr. Ana Costa',
    category: 'Direito Civil',
    startDate: '2023-05-20',
    endDate: '2024-12-01',
    history: 'Estudo sobre as implicações legais da prisão domiciliar.',
    location: 'PUCRS',
    keyWords: ['Prisão domiciliar', 'direitos humanos', 'reforma penal'],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget augue malesuada nisl dapibus condimentum sit amet a mi. Maecenas vel est metus. Donec sagittis convallis dui non rhoncus.',
    image:
      'https://rockcontent.com/br/wp-content/uploads/sites/2/2020/02/projeto-pessoal.png.webp',
  },
];

const mockFilters = [
  { id: '1', name: 'Prisão domiciliar' },
  { id: '2', name: 'Habeas corpus' },
  { id: '3', name: 'Crimes de ódio' },
];

export const ProjectListing = () => {
  const [isMobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024); // Ajuste para considerar iPads também
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
          {projectData.map((project) => (
            <ProjectCard
              key={project.id} // Adicione a chave única
              id={project.id}
              title={project.title}
              status={project.status}
              institution={project.institution}
              professor={project.professor}
              category={project.category}
              startDate={project.startDate}
              endDate={project.endDate}
              history={project.history}
              location={project.location}
              keyWords={project.keyWords}
              description={project.description}
              image={project.image}
            />
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

import { Box, Typography } from '@mui/material';
import { ProjectCard } from 'components/ProjectCard/projectCard';
import { FilterTag } from 'components/FilterTag/filterTag';
import { SearchField } from 'components/SearchField/searchField';
import './projectListing.scss';

export const ProjectListing = () => {
  return (
    <Box className="project-listing">
      <SearchField />
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
        <ProjectCard
          title="Projeto 1"
          status="Em Andamento"
          location="PUCRS"
          keyWords={[
            'Prisão domiciliar',
            'crimes de ódio',
            'discriminação por orientação sexual',
            'progressão de regime',
          ]}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget augue malesuada nisl dapibus condimentum sit amet a mi. Maecenas vel est metus. Donec sagittis convallis dui non rhoncus. Donec non pretium nulla, sit amet convallis justo. Proin varius erat non tellus convallis, nec fermentum tortor facilisis. Nam volutpat in est non interdum. Maecenas malesuada, tellus in feugiat eleifend, lectus ligula auctor."
          image="https://rockcontent.com/br/wp-content/uploads/sites/2/2020/02/projeto-pessoal.png.webp"
        />
        <ProjectCard
          title="Projeto 2"
          status="Em Andamento"
          location="PUCRS"
          keyWords={[
            'Prisão domiciliar',
            'crimes de ódio',
            'discriminação por orientação sexual',
            'progressão de regime',
          ]}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget augue malesuada nisl dapibus condimentum sit amet a mi. Maecenas vel est metus. Donec sagittis convallis dui non rhoncus. Donec non pretium nulla, sit amet convallis justo. Proin varius erat non tellus convallis, nec fermentum tortor facilisis. Nam volutpat in est non interdum. Maecenas malesuada, tellus in feugiat eleifend, lectus ligula auctor."
          image="https://rockcontent.com/br/wp-content/uploads/sites/2/2020/02/projeto-pessoal.png.webp"
        />
      </Box>
    </Box>
  );
};

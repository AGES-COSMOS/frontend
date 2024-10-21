import React, { useState } from 'react';
import MyProjectCard from 'components/MyProjectCard/MyProjectCard';
import './ProjectList.scss';
import { Button, Box, Typography } from '@mui/material';

const mockProjects = [
  {
    id: 1,
    title: 'Educação Legal para Jovens',
    status: 'Em Andamento',
    institution: 'PUCRS',
    imageUrl:
      'https://doity.com.br/blog/app/uploads/2022/05/Stand-em-eventos-como-utilizar-essa-estrategia-1000x279.png',
  },
  {
    id: 2,
    title: 'Projeto de Assistência Jurídica Comunitária',
    status: 'Pendente',
    institution: 'PUCRS',
    imageUrl:
      'https://doity.com.br/blog/app/uploads/2022/05/Vantagens-dos-eventos-academicos-e-cientificos-online.png',
  },
  {
    id: 3,
    title: 'Conscientização sobre Direitos Humanos',
    status: 'Em Andamento',
    institution: 'UFRGS',
    imageUrl:
      'https://doity.com.br/blog/app/uploads/2022/05/Como-promover-o-engajamento-dos-participantes-em-eventos-online-1000x279.png',
  },
  {
    id: 4,
    title: 'Consultoria Jurídica para Startups',
    status: 'Pendente',
    institution: 'Unisinos',
    imageUrl:
      'https://doity.com.br/blog/app/uploads/2022/05/SEO-para-eventos-Como-fazer-com-que-seu-evento-seja-encontrado-no-Google.png',
  },
];

const ProjectList: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<
    'Todos' | 'Em Andamento' | 'Pendente'
  >('Todos');
  const isProfessor = true;

  const filteredProjects = mockProjects.filter((project) => {
    if (statusFilter === 'Todos') return true;
    return project.status === statusFilter;
  });

  return (
    <Box className="project-page">
      {isProfessor && (
        <Typography className="filter-section">
          <Button
            className={statusFilter === 'Em Andamento' ? 'active' : ''}
            onClick={() => setStatusFilter('Em Andamento')}
          >
            Em Andamento
          </Button>
          <Button
            className={statusFilter === 'Pendente' ? 'active' : ''}
            onClick={() => setStatusFilter('Pendente')}
          >
            Pendente
          </Button>
          <Button
            className={statusFilter === 'Todos' ? 'active' : ''}
            onClick={() => setStatusFilter('Todos')}
          >
            Todos
          </Button>
        </Typography>
      )}

      <Box className="project-list">
        <MyProjectCard
          isNewProjectCard
          onNewProjectClick={() => console.log('Adicionar novo projeto')}
        />

        {filteredProjects.map((project) => (
          <MyProjectCard
            key={project.id}
            title={project.title}
            status={project.status}
            institution={project.institution}
            imageUrl={project.imageUrl}
            isProfessor={isProfessor}
            onApprove={() => console.log(`Aprovado: ${project.id}`)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ProjectList;

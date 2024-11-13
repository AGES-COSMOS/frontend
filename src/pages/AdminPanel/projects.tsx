import React, { useEffect, useState } from 'react';
import './projects.scss';
import { ButtonComponent } from '../../components/Button/button';
import { useNavigate } from 'react-router-dom';

import { getProjects } from 'services/projectsService';
import EditIcon from '@mui/icons-material/Edit';

interface ProjectData {
  id: number;
  nome: string;
  instituicao: string;
  professor: string;
  status: string;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const navigate = useNavigate();
  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const response = await getProjects();

        if (response.data && Array.isArray(response.data)) {
          console.log(response.data);
          const transformedProjects = response.data.map((project) => ({
            id: project.id,
            nome: project.name,
            instituicao: project.institution?.name || 'Desconhecida',
            professor: 'Null',
            status: project.status ?? 'Desconhecido',
          }));

          setProjects(transformedProjects);
        } else {
          throw new Error('A resposta da API não contém dados válidos.');
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erro desconhecido'));
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = projects.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(projects.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleEditClick = (id: number) => {
    navigate(`/projetos/${id}`);
  };

  return (
    <>
      <div className="titulo">
        <h2>Gerenciamento de Projetos</h2>
      </div>
      <div className="main-container">
        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p>Erro: {error.message}</p>
        ) : (
          <table>
            <thead className="theader">
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Instituição</th>
                <th>Professor</th>
                <th>Status</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody className="tabela">
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.nome}</td>
                  <td>{item.instituicao}</td>
                  <td>{item.professor}</td>{' '}
                  {/* Adicionar os dados de nome do professor */}
                  <td>{item.status}</td>
                  <td>
                    <EditIcon
                      className="edit-button"
                      onClick={() => handleEditClick(item.id)}
                    ></EditIcon>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="pagination">
        <ButtonComponent
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          type={'secondary'}
          size={1}
        >
          Anterior
        </ButtonComponent>
        <ButtonComponent
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === pageNumbers.length}
          type={'primary'}
          size={1}
        >
          Próxima
        </ButtonComponent>
      </div>
    </>
  );
};

export default Projects;

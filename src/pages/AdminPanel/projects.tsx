import React, { useState } from 'react';
import './projects.scss'; // Importa o arquivo de estilos SCSS
import { ButtonComponent } from '../../components/Button/button';

const Projects = () => {
  const data = [
    {
      id: 1,
      nome: 'João Silva',
      idade: 30,
      cidade: 'São Paulo',
      profissao: 'Desenvolvedor',
      status: 'Ativo',
    },
    {
      id: 2,
      nome: 'Maria Oliveira',
      idade: 25,
      cidade: 'Rio de Janeiro',
      profissao: 'Designer',
      status: 'Inativo',
    },
    {
      id: 3,
      nome: 'Carlos Souza',
      idade: 35,
      cidade: 'Belo Horizonte',
      profissao: 'Gerente',
      status: 'Ativo',
    },
    {
      id: 4,
      nome: 'Ana Souza',
      idade: 28,
      cidade: 'Recife',
      profissao: 'Arquitetura',
      status: 'Ativo',
    },
    {
      id: 5,
      nome: 'Paulo Almeida',
      idade: 40,
      cidade: 'Fortaleza',
      profissao: 'Gerente',
      status: 'Inativo',
    },
    {
      id: 6,
      nome: 'Lucas Pereira',
      idade: 22,
      cidade: 'Salvador',
      profissao: 'Designer',
      status: 'Ativo',
    },
    {
      id: 7,
      nome: 'Fernanda Costa',
      idade: 34,
      cidade: 'Porto Alegre',
      profissao: 'Desenvolvedor',
      status: 'Ativo',
    },
    {
      id: 8,
      nome: 'Júlia Santos',
      idade: 26,
      cidade: 'Curitiba',
      profissao: 'Desenvolvedor',
      status: 'Inativo',
    },
    {
      id: 9,
      nome: 'Ricardo Lima',
      idade: 32,
      cidade: 'São Paulo',
      profissao: 'Gerente',
      status: 'Ativo',
    },
    {
      id: 10,
      nome: 'Roberta Oliveira',
      idade: 27,
      cidade: 'Belo Horizonte',
      profissao: 'Analista',
      status: 'Ativo',
    },
    {
      id: 11,
      nome: 'Eduardo Costa',
      idade: 50,
      cidade: 'Rio de Janeiro',
      profissao: 'Analista',
      status: 'Inativo',
    },
    {
      id: 12,
      nome: 'Marcelo Almeida',
      idade: 38,
      cidade: 'São Paulo',
      profissao: 'Analista',
      status: 'Ativo',
    },
    // Adicione mais dados conforme necessário
  ];

  // Estado para a página atual e quantidade de itens por página
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Número de itens por página

  // Função para mudar a página
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calcular os índices das linhas a serem exibidas
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular o número total de páginas
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="titulo">
        <h2>Gerenciamento de Projetos</h2>
      </div>
      <div className="main-container">
        <table>
          <thead className="theader">
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Idade</th>
              <th>Cidade</th>
              <th>Profissão</th>
              <th>Status</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody className="tabela">
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nome}</td>
                <td>{item.idade}</td>
                <td>{item.cidade}</td>
                <td>{item.profissao}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Navegação de páginas */}
      <div className="pagination">
        <ButtonComponent
          type="secondary"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          size={1}
        >
          Anterior
        </ButtonComponent>
        <div className="spacing"></div>
        <ButtonComponent
          type="primary"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === pageNumbers.length}
          size={1}
        >
          Próxima
        </ButtonComponent>
      </div>
    </>
  );
};

export default Projects;

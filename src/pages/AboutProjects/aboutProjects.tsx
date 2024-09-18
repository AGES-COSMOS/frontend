import React from 'react';
// import { Box, Grid2, Typography } from '@mui/material';
// import './aboutProjects.scss';

// interface IGeneralParameter {
//   parameter: string;
//   content: string;
// }

interface IAboutProjectInfo {
  title: string;
  intitution: string;
  status: string;
  teacher: string;
  category: string;
  startDate: string;
  endDate: string;
  history: string;
}

export const intialState: IAboutProjectInfo = {
  title: '',
  intitution: '',
  status: '',
  teacher: '',
  category: '',
  startDate: '',
  endDate: '',
  history: '',
};

export const dataMockUp: IAboutProjectInfo = {
  title: 'DEFENSA – Assessoria Criminal Popular',
  intitution: 'Universidade Federal de Pelotas - UFPel',
  status: 'Ativo',
  teacher: 'Bruno Rotta Almeida',
  category: 'Defesa em Processo Penal',
  startDate: '01/05/2011',
  endDate: '25/05/2025',
  history:
    'O DEFENSA – Assessoria Criminal Popular se constitui em uma assessoria jurídica com ênfase nas ciências criminais que traz como objetivo principal a implementação de um trabalho interdisciplinar que venha a desenvolver o ambiente de aprendizagem do estudante do curso de Direito, em direção à formação de um profissional crítico, qualificado e envolvido com o compromisso social e os direitos humanos.O projeto realiza atendimentos à comunidade pelotense no prédio do Serviço de Assistência Judiciária da UFPel. Os atendimentos ocorrem nas terças-feiras, das 11h às 12h, e nas sextas-feiras, das 15h às 16h.',
};

export const AboutProjects = () => {
  return <div>oláaaaaaaaaaaaaaaaaa</div>;
};

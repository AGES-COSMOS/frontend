import React, { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import './adminPanel.scss';
import { ButtonComponent } from 'components/Button/button';
import GeneralInfos from './generalInfos';
import Categories from './categories';
import Events from './events';
import Projects from './projects';

const Index = () => {
  const [activeTab, setActiveTab] = useState('informacoes');

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <Box className="container">
      <Typography variant="h4" className="subtitle">
        Painel de Controle
      </Typography>

      <Box id="admin-menu" className="tab-container">
        <Box>
          <ButtonComponent
            type={activeTab === 'eventos' ? 'primary' : 'secondary'}
            onClick={() => handleTabClick('eventos')}
            size={2}
          >
            Eventos
          </ButtonComponent>
        </Box>
        <Box>
          <ButtonComponent
            type={activeTab === 'projetos' ? 'primary' : 'secondary'}
            onClick={() => handleTabClick('projetos')}
            size={2}
          >
            Projetos
          </ButtonComponent>
        </Box>
        <Box>
          <ButtonComponent
            type={activeTab === 'informacoes' ? 'primary' : 'secondary'}
            onClick={() => handleTabClick('informacoes')}
            size={2}
          >
            Informações Gerais
          </ButtonComponent>
        </Box>
        <Box>
          <ButtonComponent
            type={activeTab === 'categorias' ? 'primary' : 'secondary'}
            onClick={() => handleTabClick('categorias')}
            size={2}
          >
            Cadastro de Categorias
          </ButtonComponent>
        </Box>
      </Box>

      {activeTab === 'informacoes' && <GeneralInfos />}
      {activeTab === 'categorias' && <Categories />}
      {activeTab === 'eventos' && <Events />}
      {activeTab === 'projetos' && <Projects />}
    </Box>
  );
};

export default Index;

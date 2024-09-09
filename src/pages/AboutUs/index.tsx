import React, { useEffect, useState } from 'react';
import { Instagram, YouTube, LinkedIn } from '@mui/icons-material';
import './index.scss';
import { Box, Grid2, Typography } from '@mui/material';

interface IGeneralParameter {
  parameter: string;
  content: string;
}

interface IAboutUsInfo {
  about: string;
  phone: string;
  email: string;
  socialIcons: IGeneralParameter[];
}

const socialIcons: { [key: string]: React.ReactNode } = {
  instagram: <Instagram fontSize="large" />,
  youtube: <YouTube fontSize="large" />,
  linkedin: <LinkedIn fontSize="large" />,
};

const partnersList = [
  { name: 'CNPq', logo: 'cnpq.png' },
  { name: 'Capes', logo: 'capes.png' },
  { name: 'UFPEL', logo: 'ufpel.png' },
  { name: 'PUCRS', logo: 'pucrs.png' },
];

const intialState: IAboutUsInfo = {
  about: '',
  socialIcons: [],
  phone: '',
  email: '',
};

const dataMockUp: IAboutUsInfo = {
  about:
    'Aplicativo em formato de rede social que visa unir projetos de extensão desenvolvidos por cursos de direito.Foco: Acesso à Justiça.Objetivo: Criar uma rede de projetos.',
  socialIcons: [
    { parameter: 'instagram', content: 'insta.com/bla' },
    { parameter: 'youtube', content: 'yt.com/bla' },
    { parameter: 'linkedin', content: 'link.com/bla' },
  ],
  phone: '(51) 99999-9999',
  email: 'cosmos@email.com',
};

const AboutUs = () => {
  const [state, setState] = useState<IAboutUsInfo>(intialState);

  const fetchAboutUs = () => {
    setState(dataMockUp);
  };

  const generateSocialIcons = () => {
    return (
      <Box className="social-icons">
        {state.socialIcons.map((param) => {
          if (socialIcons[param.parameter]) {
            return (
              <a
                key={param.parameter}
                href={param.content}
                aria-label={
                  param.parameter.charAt(0).toUpperCase() +
                  param.parameter.slice(1)
                }
                className={`social-icon ${param.parameter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {socialIcons[param.parameter]}
              </a>
            );
          }
          return null;
        })}
      </Box>
    );
  };

  const formatContent = (content: string) => {
    return content
      .split('.')
      .filter(Boolean)
      .map((sentence, index) => (
        <Typography variant="body1" className="body-text" key={index}>
          {sentence.trim()}.
        </Typography>
      ));
  };

  useEffect(() => {
    fetchAboutUs();
  }, []);

  return (
    <>
      <Grid2
        container
        spacing={0}
        sx={{ display: 'grid', gridTemplateColumns: 'auto auto' }}
        className="bout-us-container"
      >
        <Grid2 id="sidebar" className="sidebar ">
          SIDEBAR
        </Grid2>
        <Grid2 id="about-cosmos" className="content" pl={10} pt={10}>
          <Box className="about-cosmos">
            <Box id="about-us">
              <Typography variant="h2" className="padding-bottom subtitle">
                Sobre nós
              </Typography>
              <Box className="about-us-content">
                {formatContent(state.about)}
              </Box>
            </Box>
            <Box id="contacts">
              <Typography variant="h2" className="subtitle padding-bottom">
                Contatos
              </Typography>
              <Typography variant="body1" className="body-text">
                Telefone: {state.phone}
              </Typography>
              <Typography variant="body1" className="body-text">
                Email: {state.email}
              </Typography>
            </Box>
            <Box id="social-media">
              <Typography variant="h2" className="subtitle padding-bottom">
                Conecte-se Conosco
              </Typography>
              <Box className="social-icons">{generateSocialIcons()}</Box>
            </Box>
            <Box id="partners" className="partners">
              {partnersList.map((partner, index) => (
                <img
                  key={index}
                  src={`assets/imgs/${partner.logo}`}
                  alt={partner.name}
                  className="logo"
                />
              ))}
            </Box>
          </Box>
        </Grid2>
      </Grid2>
    </>
  );
};

export default AboutUs;

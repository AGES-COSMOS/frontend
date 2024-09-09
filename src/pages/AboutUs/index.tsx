import React, { useEffect, useState } from 'react';
import { Instagram, YouTube, LinkedIn } from '@mui/icons-material';
import './index.scss';
import { Box, Grid2, Typography } from '@mui/material';
import ages from '../../assets/Images/ages.png';
import capes from '../../assets/Images/capes.png';
import cnpq from '../../assets/Images/cnpq.png';
import pucrs from '../../assets/Images/pucrs.png';
import ufpel from '../../assets/Images/ufpel.png';

interface IGeneralParameter {
  parameter: string;
  content: string;
}

interface IAboutUsInfo {
  about: string;
  socialIcons: IGeneralParameter[];
}

const socialIcons: { [key: string]: React.ReactNode } = {
  instagram: <Instagram fontSize="large" />,
  youtube: <YouTube fontSize="large" />,
  linkedin: <LinkedIn fontSize="large" />,
};

const intialState: IAboutUsInfo = {
  about: '',
  socialIcons: [],
};

const dataMockUp: IAboutUsInfo = {
  about:
    'Aplicativo em formato de rede social que visa unir projetos de extensão desenvolvidos por cursos de direito.Foco: Acesso à Justiça.Objetivo: Criar uma rede de projetos.',
  socialIcons: [
    { parameter: 'instagram', content: 'insta.com/bla' },
    { parameter: 'youtube', content: 'yt.com/bla' },
    { parameter: 'linkedin', content: 'link.com/bla' },
  ],
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
                Telefone: {'(51) 99999-9999'}
              </Typography>
              <Typography variant="body1" className="body-text">
                Email: {'cosmos@email.com'}
              </Typography>
            </Box>
            <Box id="social-media">
              <Typography variant="h2" className="subtitle padding-bottom">
                Conecte-se Conosco
              </Typography>
              <Box className="social-icons">{generateSocialIcons()}</Box>
            </Box>
            <Box id="partners" className="partners">
              <img src={ages} alt="Ages" className="partner logo" />
              <img src={capes} alt="Capes" className="partner logo logoCapes" />
              <img src={cnpq} alt="CNPq" className="partner logo" />
              <img src={pucrs} alt="PUCRS" className="partner logo" />
              <img src={ufpel} alt="UFPEL" className="partner logo" />
            </Box>
          </Box>
        </Grid2>
      </Grid2>
    </>
  );
};

export default AboutUs;

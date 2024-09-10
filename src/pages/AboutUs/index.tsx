import React, { useEffect, useState } from 'react';
import { Instagram, YouTube, LinkedIn } from '@mui/icons-material';
import { Box, Grid2, Typography } from '@mui/material';
import './index.scss';

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
  { name: 'Capes', logo: 'capes.png', className: 'logoCapes' },
  { name: 'CNPq', logo: 'cnpq.png', className: 'logoCnpq' },
  { name: 'UFPEL', logo: 'ufpel.png', className: 'logoUfpel' },
  { name: 'PUCRS', logo: 'pucrs.png', className: 'logoPucrs' },
  { name: 'AGES', logo: 'ages.png', className: 'logoAges' },
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
      <Grid2>
        <Grid2 id="about-cosmos" className="content">
          <Box className="about-cosmos">
            <Box id="about-us">
              <Typography variant="h4" className="subtitle padding-bottom">
                Sobre nós
              </Typography>
              <Box className="about-us-content">
                {formatContent(state.about)}
              </Box>
            </Box>
            <Box id="contacts">
              <Typography
                variant="h4"
                className="subtitle padding-bottom padding-top"
              >
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
              <Typography
                variant="h4"
                className="subtitle padding-bottom padding-top"
              >
                Conecte-se Conosco
              </Typography>
              <Box className="social-icons">{generateSocialIcons()}</Box>
            </Box>
            <Box className="footer-section" id="partners">
              <Box id="partners" className="partners">
                {partnersList.map((partner, index) => (
                  <img
                    key={index}
                    src={`assets/imgs/${partner.logo}`}
                    alt={partner.name}
                    className={`logo ${partner.className}`}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Grid2>
      </Grid2>
    </>
  );
};

export default AboutUs;

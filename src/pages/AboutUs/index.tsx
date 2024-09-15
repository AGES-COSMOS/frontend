import React, { useEffect, useState } from 'react';
import { Instagram, YouTube, LinkedIn } from '@mui/icons-material';
import { Box, Grid2, Typography } from '@mui/material';
import './index.scss';
import { getAboutUs } from 'services/aboutUsService';
import Loading from 'components/Loading/loading';

interface IAboutUsInfo {
  parameter: IParameterInfo[];
  content: string;
}

interface IParameterInfo {
  name: string;
  value: string;
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

const AboutUs = () => {
  const [aboutUsInfo, setAboutUsInfo] = useState<IAboutUsInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const generateSocialIcons = () => {
    if (!aboutUsInfo?.parameter || !Array.isArray(aboutUsInfo.parameter)) {
      return null;
    }

    return (
      <Box className="social-icons">
        {aboutUsInfo.parameter.map((param) => {
          if (
            param.name === 'Instagram' ||
            param.name === 'YouTube' ||
            param.name === 'LinkedIn'
          ) {
            return (
              <a
                key={param.name}
                href={param.value}
                className={`social-icon ${param.name}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {socialIcons[param.name.toLowerCase()]}{' '}
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
    const fetchData = async () => {
      try {
        const result: any = await getAboutUs();
        // por que o back esta retornando um array? faz sentido?
        if (Array.isArray(result) && result.length > 0) {
          setAboutUsInfo(result[0]);
        }
      } catch (err) {
        setError(err);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  if (error) return <div>{error}</div>;

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
                {formatContent(aboutUsInfo?.content ?? '')}
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
                Telefone:{' '}
                {
                  aboutUsInfo?.parameter?.find(
                    (param) => param.name === 'Telefone',
                  )?.value
                }
              </Typography>
              <Typography variant="body1" className="body-text">
                Email:{' '}
                {
                  aboutUsInfo?.parameter?.find(
                    (param) => param.name === 'Email',
                  )?.value
                }
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

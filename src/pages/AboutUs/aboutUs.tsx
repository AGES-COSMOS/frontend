import React, { useEffect, useState } from 'react';
import { Instagram, YouTube, LinkedIn } from '@mui/icons-material';
import { Box, Grid2, Typography } from '@mui/material';
import { getAboutUs } from 'services/aboutUsService';
import Loading from 'components/Loading/loading';
import './aboutUs.scss';

interface IAboutUsInfo {
  content: string;
  parameter: string;
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
  const [aboutUsInfo, setAboutUsInfo] = useState<IAboutUsInfo[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const generateSocialIcons = () => {
    if (!aboutUsInfo) return null;

    return (
      <Box className="social-icons">
        {aboutUsInfo
          .filter((param) =>
            ['Instagram', 'YouTube', 'LinkedIn'].includes(param.parameter),
          )
          .map((param) => (
            <a
              key={param.parameter}
              href={param.content}
              className={`social-icon ${param.parameter.toLowerCase()}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {socialIcons[param.parameter.toLowerCase()]}{' '}
            </a>
          ))}
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
        const result: IAboutUsInfo[] = await getAboutUs();
        if (Array.isArray(result) && result.length > 0) {
          setAboutUsInfo(result);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;

  if (error) {
    return <div>{error.message}</div>;
  }

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
                {formatContent(
                  aboutUsInfo?.find((param) => param.parameter === 'SobreNos')
                    ?.content ?? '',
                )}
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
                  aboutUsInfo?.find((param) => param.parameter === 'Telefone')
                    ?.content
                }
              </Typography>
              <Typography variant="body1" className="body-text">
                Email:{' '}
                {
                  aboutUsInfo?.find((param) => param.parameter === 'E-mail')
                    ?.content
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

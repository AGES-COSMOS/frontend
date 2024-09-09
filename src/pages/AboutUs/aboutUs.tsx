import Loading from 'components/Loading/loading';
import { useEffect, useState } from 'react';
import { getAboutUs } from 'services/aboutUsService'; // Remover importação de updateAboutUs
import { Instagram, YouTube, LinkedIn } from '@mui/icons-material'; // Importação dos ícones do Material UI
import './aboutUs.scss';
import { Box, Grid2 } from '@mui/material';

// Interface para definir o tipo de dado que será recebido da API
interface AboutUsInfo {
  id: number;
  content: string;
  instagramURL: string;
  youtubeURL: string;
  linkedinURL: string;
  updatedAt: string;
}

interface User {
  isAdmin: boolean; // Verifica se o usuário é administrador
}

export const AboutUs = () => {
  const [aboutUsInfo, setAboutUsInfo] = useState<AboutUsInfo | null>(null); // Armazena os dados do backend
  const [user, setUser] = useState<User>({ isAdmin: false }); // Simula a verificação do usuário

  // Dados simulados, removidos se back-end funcionar
  const data = {
    id: 1234,
    content:
      'Aplicativo em formato de rede social que visa unir projetos de extensão desenvolvidos por cursos de direito. \nFoco: Acesso à Justiça. \nObjetivo: Criar uma rede de projetos.',
    instagramURL: 'insta.com/bla',
    youtubeURL: 'yt.com/bla',
    linkedinURL: 'link.com/bla',
    updatedAt: new Date().toISOString(),
  };

  // Função para buscar os dados do backend
  useEffect(() => {
    async function fetchAboutUs() {
      // data = await getAboutUs(); // não tá funcionando o back
      setAboutUsInfo(data);
    }

    // Simular a verificação de se o usuário é admin (você pode conectar isso à autenticação real)
    const fetchUser = async () => {
      const userData = { isAdmin: true }; // Simulação de usuário admin
      setUser(userData);
    };

    fetchAboutUs();
    fetchUser();
  }, []);

  // Se os dados ainda estão sendo carregados, exibe um loading
  if (!aboutUsInfo) {
    return <Loading />;
  }

  return (
    <Grid2 className="about-us-container">
      <div id="1st_column">
        <div className="logo-cosmos"></div>
      </div>

      <Grid2 id="2nd_column" className="about-us-text-container">
        <h2 className="about-us-title">Sobre nós</h2>

        <Box>
          <p className="about-us-content">{aboutUsInfo.content}</p>

          <Box className="contact-section">
            <h3>Contatos</h3>
            <p>Telefone: (51) 99999-9999</p>
            <p>Email: exemplo@pucrs.com.br</p>
          </Box>

          <div className="social-section">
            <h3>Conecte-se Conosco</h3>
            <div className="social-icons">
              <a
                href={aboutUsInfo.instagramURL}
                aria-label="Instagram"
                className="social-icon instagram"
              >
                <Instagram fontSize="large" />
              </a>
              <a
                href={aboutUsInfo.youtubeURL}
                aria-label="YouTube"
                className="social-icon youtube"
              >
                <YouTube fontSize="large" />
              </a>
              <a
                href={aboutUsInfo.linkedinURL}
                aria-label="LinkedIn"
                className="social-icon linkedin"
              >
                <LinkedIn fontSize="large" />
              </a>
            </div>
          </div>
        </Box>

        <Box className="logos-section">
          <img
            src="assets/imgs/capes.png"
            alt="Capes"
            className="logo logoCapes"
          />
          <img src="assets/imgs/cnpq.png" alt="CNPq" className="logo" />
          <img src="assets/imgs/pucrs.png" alt="PUCRS" className="logo" />
          <img src="assets/imgs/ufpel.png" alt="UFPEL" className="logo" />
          <img src="assets/imgs/ages.png" alt="Ages" className="logo" />
        </Box>
      </Grid2>
    </Grid2>
  );
};

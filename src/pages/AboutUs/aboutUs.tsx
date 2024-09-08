import Loading from 'components/Loading/loading';
import { useEffect, useState } from 'react';
import { getAboutUs, updateAboutUs } from 'services/aboutUsService';
import { Instagram, YouTube, LinkedIn } from '@mui/icons-material'; // Importação dos ícones do Material UI
import './aboutUs.scss';
//import React from 'react';
//import agesImage from '../assets/imagens/ages.png';
//import capesImage from '../assets/imagens/capes.png';
//import cnpqImage from '../assets/imagens/cnpq.png';
//import pucrsImage from '../assets/imagens/pucrs.png';
//import ufpelImage from '../assets/imagens/cnpq.png';

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
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<User>({ isAdmin: false }); // Simula a verificação do usuário

  // pq precisa pegar esses dados do backend???
  const data = { id: 1234, content: 'content', instagramURL: 'insta.com/bla', youtubeURL: 'yt.com/bla', linkedinURL: 'link.com/bla', updatedAt: new Date().toISOString() };

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

  const handleSave = async () => {
    if (aboutUsInfo) {
      try {
        // Converte o ID de number para string
        await updateAboutUs(aboutUsInfo.id.toString(), aboutUsInfo);
        setIsEditing(false); // Sai do modo de edição após salvar com sucesso
      } catch (error) {
        console.error('Erro ao atualizar os dados:', error);
      }
    }
  };

  // Se os dados ainda estão sendo carregados, exibe um loading
  if (!aboutUsInfo) {
    return <Loading />;
  }

  return (
    <div className="about-us-container">
      <div id="1st_column">
        <div className="logo-cosmos">

        </div>
      </div>

      <div id="2nd_column" className='about-us-text-container'>

        <h2 className="about-us-title">Sobre nós</h2>

        {isEditing && user.isAdmin ? (
          // Modo de edição para administradores
          <div>
            <textarea
              value={aboutUsInfo.content}
              onChange={(e) => setAboutUsInfo({ ...aboutUsInfo, content: e.target.value })}
              rows={10}
              cols={50}
            />
            <br />
            <label>Instagram:</label>
            <input
              type="text"
              value={aboutUsInfo.instagramURL}
              onChange={(e) => setAboutUsInfo({ ...aboutUsInfo, instagramURL: e.target.value })}
            />
            <label>YouTube:</label>
            <input
              type="text"
              value={aboutUsInfo.youtubeURL}
              onChange={(e) => setAboutUsInfo({ ...aboutUsInfo, youtubeURL: e.target.value })}
            />
            <label>LinkedIn:</label>
            <input
              type="text"
              value={aboutUsInfo.linkedinURL}
              onChange={(e) => setAboutUsInfo({ ...aboutUsInfo, linkedinURL: e.target.value })}
            />
            <button onClick={handleSave}>Salvar</button>
          </div>
        ) : (
          // Modo de visualização
          <div>
            <p className="about-us-content">{aboutUsInfo.content}</p>

            <div className="social-section">
              <h3>Conecte-se Conosco</h3>
              <div className="social-icons">
                <a href={aboutUsInfo.instagramURL} aria-label="Instagram" className="social-icon instagram">
                  <Instagram fontSize="large" />
                </a>
                <a href={aboutUsInfo.youtubeURL} aria-label="YouTube" className="social-icon youtube">
                  <YouTube fontSize="large" />
                </a>
                <a href={aboutUsInfo.linkedinURL} aria-label="LinkedIn" className="social-icon linkedin">
                  <LinkedIn fontSize="large" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Mostrar botão de editar apenas para administradores */}
        {user.isAdmin && !isEditing && (
          <button onClick={() => setIsEditing(true)}>Editar</button>
        )}

        <div className="contact-section">
          <h3>Contatos</h3>
          <p>Telefone: (51) 99999-9999</p>
          <p>Email: exemplo@pucrs.com.br</p>
        </div>

        <div className="logos-section">
          <img src="../assets/imagens/ages.png" alt="Capes" className="logo" />
          <img src="../assets/imagens/capes.png" alt="CNPq" className="logo" />
          <img src="../assets/imagens/cnpq.png" alt="PUCRS" className="logo" />
          <img src="../assets/imagens/pucrs.png" alt="UFPEL" className="logo" />
          <img src="../assets/imagens/ufpel.png" alt="Ages" className="logo" />
        </div>
      </div>
    </div>
  );
};

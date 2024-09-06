import { useEffect, useState } from 'react';
import { getAboutUs, updateAboutUs } from 'services/aboutUsService';
import { Instagram, YouTube, LinkedIn } from '@mui/icons-material'; // Importação dos ícones do Material UI
import './aboutUs.scss';

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

  // Função para buscar os dados do backend
  useEffect(() => {
    async function fetchAboutUs() {
      const data = await getAboutUs();
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

  // Função para salvar as alterações no backend
  const handleSave = async () => {
    if (aboutUsInfo) {
      await updateAboutUs(aboutUsInfo); // Função de atualização no backend
      setIsEditing(false); // Sai do modo de edição
    }
  };

  // Se os dados ainda estão sendo carregados, exibe um loading
  if (!aboutUsInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="about-us-container">
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
        <img src="path_to_capes_logo" alt="Capes" className="logo" />
        <img src="path_to_cnpq_logo" alt="CNPq" className="logo" />
        <img src="path_to_pucrs_logo" alt="PUCRS" className="logo" />
        <img src="path_to_ufpel_logo" alt="UFPEL" className="logo" />
        <img src="path_to_ages_logo" alt="Ages" className="logo" />
      </div>
    </div>
  );
};

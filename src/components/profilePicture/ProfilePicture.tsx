import * as React from 'react';
import './ProfilePicture.scss';
import { useRef, useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Icon from '@mui/material/Icon';
import Avatar from '@mui/material/Avatar';

const ProfilePicture: React.FC = () => {
  // Cria uma referência para o input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estado para armazenar a URL da imagem
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);

  // Função que é chamada quando a div é clicada
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Dispara o clique no input de file
    }
  };

  // Função para lidar com a mudança do input de arquivo
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result); // Define a URL da imagem no estado
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="profilePictureEdit" onClick={handleClick}>
        <Icon style={{ fontSize: 32, color: 'white' }}>
          <AddPhotoAlternateIcon />
        </Icon>
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/png, image/jpeg"
          ref={fileInputRef} // Referência ao input
          style={{ display: 'none' }}
          onChange={handleFileChange} // Adiciona o handler de mudança
        />
      </div>
      <div className="profilePictureImg">
        <Avatar
          alt="Profile Picture"
          src={imageSrc ? String(imageSrc) : undefined} // Usa a imagem carregada ou undefined para o Avatar padrão
          sx={{ width: 145, height: 145 }} // Ajuste o tamanho conforme necessário
        >
          {/* Opcional: texto alternativo para Avatar, pode ser o nome do usuário ou iniciais */}
        </Avatar>
      </div>
    </>
  );
};

export default ProfilePicture;

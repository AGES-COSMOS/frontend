import * as React from 'react';
import './ProfilePicture.scss';
import { useRef, useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Icon from '@mui/material/Icon';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip'; // Importa o Tooltip

interface ProfilePictureProps {
  onImageChange: (url: string | ArrayBuffer | null) => void; // Adiciona uma prop para o callback
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ onImageChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Dispara o clique no input de file
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setImageSrc(result); // Define a URL da imagem no estado
        onImageChange(result); // Passa a URL para o componente pai
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profilePictureImg">
      <Avatar
        alt="Profile Picture"
        src={imageSrc ? String(imageSrc) : undefined} // Usa a imagem carregada ou undefined para o Avatar padrão
        sx={{ width: 145, height: 145 }} // Ajuste o tamanho conforme necessário
      >
        {/* Opcional: texto alternativo para Avatar, pode ser o nome do usuário ou iniciais */}
      </Avatar>
      <Tooltip title="Editar Imagem" arrow>
        <div className="profilePictureEdit" onClick={handleClick}>
          <Icon
            style={{
              fontSize: 35,
              color: 'white',
              position: 'relative',
              bottom: 6,
              left: 1,
            }}
          >
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
      </Tooltip>
    </div>
  );
};

export default ProfilePicture;

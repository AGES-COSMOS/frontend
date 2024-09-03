import * as React from 'react';
import './ProfilePicture.scss';
import { useRef } from 'react';

const ProfilePicture: React.FC = () => {
  // Cria uma referência para o input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Função que é chamada quando a div é clicada
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Dispara o clique no input de file
    }
  };

  return (
    <div className="profilePictureImg" onClick={handleClick}>
      <input
        type="file"
        id="avatar"
        name="avatar"
        accept="image/png, image/jpeg"
        ref={fileInputRef} // Adiciona a referência ao input
        style={{ display: 'none' }} // Oculta o input file
      />
      {/* Opcional: Pode adicionar algum conteúdo visual ou texto aqui */}
    </div>
  );
};
export default ProfilePicture;

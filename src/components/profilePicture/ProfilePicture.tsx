import * as React from 'react';
import './ProfilePicture.scss';
import { useRef, useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Icon from '@mui/material/Icon';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
interface ProfilePictureProps {
  onImageChange: (url: string | ArrayBuffer | null) => void;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ onImageChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setImageSrc(result);
        onImageChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profilePictureImg">
      <Avatar
        alt="Profile Picture"
        src={imageSrc ? String(imageSrc) : undefined}
        sx={{ width: 145, height: 145 }}
      ></Avatar>
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
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>
      </Tooltip>
    </div>
  );
};

export default ProfilePicture;

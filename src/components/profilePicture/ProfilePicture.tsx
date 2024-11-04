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

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const result = reader.result;
  //       setImageSrc(result);
  //       onImageChange(result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (ctx) {
            const MAX_WIDTH = 400;
            const MAX_HEIGHT = 400;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const newImgSrc = URL.createObjectURL(blob);
                  setImageSrc(newImgSrc);
                  onImageChange(newImgSrc);
                }
              },
              'image/jpeg',
              0.7,
            );
          }
        };
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
function imageCompression(
  file: any,
  options: {
    maxSizeMB: number; // Limite de 1 MB
    maxWidthOrHeight: number; // Largura ou altura máxima
    useWebWorker: boolean;
  },
) {
  throw new Error('Function not implemented.');
}

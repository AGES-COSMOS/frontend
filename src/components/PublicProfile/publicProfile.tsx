import React from 'react';
import { Modal, Box, Typography, IconButton, Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import './publicProfile.scss';

interface PublicProfileModalProps {
  open: boolean;
  onClose: () => void;
  user: {
    name: string;
    institution: string;
    projects: string[];
    imageUrl: string;
    socialLinks: {
      instagram: string;
      youtube: string;
      linkedin: string;
    };
  };
}

const UserProfileModal: React.FC<PublicProfileModalProps> = ({
  open,
  onClose,
  user,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="user-profile-modalPP">
        <Box className="container-topPP">
          <Typography className="space"></Typography>
          <Typography className="user-namePP">{user.name}</Typography>
          <IconButton className="close-buttonPP" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography className="line"></Typography>
        <Avatar
          src={user.imageUrl}
          alt={user.name}
          className="profile-imagePP"
        />
        <Typography className="institution-titlePP">Instituição</Typography>
        <Typography className="user-institutionPP">
          {user.institution}
        </Typography>
        <Typography className="projects-titlePP">Projetos</Typography>
        <ul className="user-projectsPP">
          {user.projects.map((project, index) => (
            <li key={index}>{project}</li>
          ))}
        </ul>
        <Typography className="social-titlePP">Redes Sociais</Typography>
        <Box className="social-iconsPP">
          <a
            href={user.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon className="instagramIcon" />
          </a>
          <a
            href={user.socialLinks.youtube}
            target="_blank"
            rel="noopener noreferrer"
          >
            <YouTubeIcon className="youtubeIcon" />
          </a>
          <a
            href={user.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon className="linkedinIcon" />
          </a>
        </Box>
      </Box>
    </Modal>
  );
};

export default UserProfileModal;

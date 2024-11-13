import React from 'react';
import { Box, Typography } from '@mui/material';
import './commentFeedModal.scss';

interface CommentFeedModalProps {
  username: string;
  text: string;
  imageUrl: string;
  onImageClick: () => void;
}

const CommentFeedModal: React.FC<CommentFeedModalProps> = ({
  username,
  text,
  imageUrl,
  onImageClick,
}) => {
  return (
    <Box className="comment-feed">
      <img
        src={imageUrl}
        alt={`${username}'s profile`}
        className="comment-image"
        onClick={onImageClick}
      />
      <Box className="comment-content">
        <Typography variant="subtitle2" className="comment-username">
          {username}
        </Typography>
        <Typography variant="body2" className="comment-text">
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

export default CommentFeedModal;

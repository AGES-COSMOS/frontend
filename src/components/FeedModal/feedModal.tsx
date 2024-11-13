import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  IconButton,
  TextField,
  Typography,
  Divider,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import CommentFeedModal from 'components/CommentFeedModal/commentFeedModal';
import './feedModal.scss';
import UserProfileModal from 'components/PublicProfile/publicProfile';

interface Comment {
  username: string;
  text: string;
  imageUrl: string;
}

const FeedModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [openPublicProfilmeModal, setOpenPublicProfilmeModal] = useState(false);
  const [comments, setComments] = useState<Comment[]>([
    {
      username: 'Márcio Hilg',
      text: 'Este projeto é muito bacana!',
      imageUrl: 'https://picsum.photos/seed/marcio/40',
    },
    {
      username: 'Laura Oliveira',
      text: 'Justiça é direito de todos',
      imageUrl: 'https://picsum.photos/seed/laura/40',
    },
    {
      username: 'Maria Silva',
      text: 'Estou adorando participar deste projeto.',
      imageUrl: 'https://picsum.photos/seed/maria/40',
    },
  ]);

  const user = {
    name: 'Gabriel Spiandorello',
    institution: 'Universidade PUCRS',
    projects: ['Projeto 1', 'Projeto 2', 'Projeto 3'],
    imageUrl: 'https://picsum.photos/seed/gabriel/100',
    socialLinks: {
      instagram: 'https://instagram.com/gabriel',
      youtube: 'https://youtube.com/gabriel',
      linkedin: 'https://linkedin.com/in/gabriel',
    },
  };

  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(32);

  const handleNewCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleSendComment = () => {
    if (newComment.trim()) {
      const newCommentObject: Comment = {
        username: 'Gabriel Spiandorello',
        text: newComment,
        imageUrl: 'https://picsum.photos/seed/gabriel/40',
      };
      setComments((prevComments) => [...prevComments, newCommentObject]);
      setNewComment('');
    }
  };

  const handleImageClick = (username: string) => {
    setOpenPublicProfilmeModal(true);
  };

  const handleLikeToggle = () => {
    setLiked(!liked);
    setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendComment();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <DialogContent className="modal-content">
        <Box className="modal-image">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyIl-PSc1pzMYOApF66Onp3X1vIWhwCAfTnA&s"
            alt="Projeto"
            className="project-image"
          />
        </Box>

        <Box className="modal-details">
          <Box className="modal-header">
            <Typography variant="h6" className="modal-title">
              Defensa - Assessoria Criminal Popular
            </Typography>
            <IconButton onClick={onClose} className="close-button">
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider className="divider" />

          <Box className="modal-comments">
            {comments.map((comment, index) => (
              <CommentFeedModal
                key={index}
                username={comment.username}
                text={comment.text}
                imageUrl={comment.imageUrl}
                onImageClick={() => handleImageClick(comment.username)}
              />
            ))}
          </Box>

          <Box className="modal-likes">
            <IconButton onClick={handleLikeToggle} className="like-button">
              {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <Typography variant="body2" className="likes-count">
              {likeCount}
            </Typography>
          </Box>

          <Box className="new-comment">
            <TextField
              value={newComment}
              onChange={handleNewCommentChange}
              onKeyUp={handleKeyUp}
              placeholder="Adicione um comentário..."
              variant="outlined"
              size="small"
              fullWidth
              className="comment-input"
            />
            <IconButton
              color="primary"
              onClick={handleSendComment}
              className="send-button"
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
        <UserProfileModal
          open={openPublicProfilmeModal}
          onClose={() => setOpenPublicProfilmeModal(false)}
          user={user}
        />
      </DialogContent>
    </Dialog>
  );
};

export default FeedModal;

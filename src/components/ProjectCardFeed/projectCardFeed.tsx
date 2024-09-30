import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './projectCardFeed.scss';

interface ProjectCardProps {
  title: string;
  photo: string;
  description: string;
  projectDate: Date;
  userPhoto: string;
}

export const ProjectCardFeed = ({
  title,
  photo,
  description,
  projectDate,
  userPhoto,
}: ProjectCardProps) => {
  // Formatação de data
  const formattedDate = new Date(projectDate).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  // State for like button
  const [liked, setLiked] = useState(false);

  // State for modal visibility
  const [open, setOpen] = useState(false);

  // State for comment text
  const [comment, setComment] = useState('');

  // Handle like button click
  const handleLikeClick = () => {
    setLiked(!liked); // Toggle like state
  };

  // Handle modal open/close
  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  // Handle comment post (this is just a placeholder for now)
  const handlePostComment = () => {
    if (comment.trim()) {
      console.log('Comment posted:', comment);
      setComment(''); // Clear comment field after posting
    } else {
      console.log('Cannot post an empty comment.');
    }
  };

  return (
    <>
      <Card className="card-project">
        <CardHeader
          avatar={
            <Avatar className="card__header-avatar" aria-label="project">
              {title.charAt(0)}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" className="card__header-action">
              <MoreVertIcon />
            </IconButton>
          }
          title={<span className="card__header-title">{title}</span>}
          subheader={
            <span className="card__header-subheader">{formattedDate}</span>
          }
          className="card__header"
        />
        <CardMedia
          component="img"
          height="150"
          image={photo}
          alt={title}
          className="card__media"
        />
        <CardContent className="card__content">
          <Typography className="card__content-description" variant="body2">
            {description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing className="card__actions">
          <IconButton
            aria-label="add to favorites"
            className="card__actions-icon"
            onClick={handleLikeClick}
          >
            <FavoriteIcon style={{ color: liked ? 'red' : 'gray' }} />
          </IconButton>
          <IconButton
            aria-label="comments"
            className="card__actions-icon"
            onClick={handleModalOpen} // Open modal when comment icon is clicked
          >
            <ChatBubbleOutlineIcon />
          </IconButton>
        </CardActions>
      </Card>

      {/* Modal */}
      <Dialog open={open} onClose={handleModalClose} fullWidth maxWidth="md">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <div className="modal-content">
            {/* Left side: project image */}
            <div className="modal-image">
              <img src={photo} alt={title} style={{ width: '100%' }} />
            </div>
            {/* Right side: comments */}
            <div className="modal-comments">
              <Typography variant="h6">Comments</Typography>
              {/* Comment input */}
              <TextField
                label="Add a comment"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{ marginTop: '1rem' }}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Close
          </Button>
          <Button
            onClick={handlePostComment}
            color="primary"
            variant="contained"
          >
            Post Comment
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

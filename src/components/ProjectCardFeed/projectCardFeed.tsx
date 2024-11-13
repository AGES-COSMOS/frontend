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
import './projectCardFeed.scss';
import { useState } from 'react';
import FeedModal from 'components/FeedModal/feedModal';

interface ProjectCardProps {
  title: string;
  photo: string;
  description: string;
  projectDate: Date;
}

export const ProjectCardFeed = ({
  title,
  photo,
  description,
  projectDate,
}: ProjectCardProps) => {
  const [open, setOpen] = useState(false);
  const formattedDate = new Date(projectDate).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
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
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton
          aria-label="share"
          className="card__actions-icon"
          onClick={() => setOpen(true)}
        >
          <ChatBubbleOutlineIcon />
        </IconButton>
        <FeedModal open={open} onClose={() => setOpen(false)} />
      </CardActions>
    </Card>
  );
};

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './projectCard.scss';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface ProjectCardProps {
  title: string;
  photo: string;
  description: string;
  projectDate: Date;
  userPhoto: string;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

export const ProjectCard = ({
  title,
  photo,
  description,
}: ProjectCardProps) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className="card">
      {' '}
      {/* Classe SCSS aplicada */}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader="September 14, 2016"
        className="card__header"
      />
      <CardMedia
        component="img"
        height="194"
        image={photo}
        alt={title}
        className="card__media"
      />
      <CardContent className="card__content">
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
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
        <IconButton aria-label="share" className="card__actions-icon">
          <ChatBubbleOutlineIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {/* Aqui vão os detalhes adicionais do card quando expandido */}
        </CardContent>
      </Collapse>
    </Card>
  );
};
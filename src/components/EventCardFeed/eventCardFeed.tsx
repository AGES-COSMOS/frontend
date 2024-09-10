import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './eventCardFeed.scss';

interface EventCardProps {
  photo: string;
  title: string;
  description: string;
}

export const EventCardFeed = ({
  photo,
  title,
  description,
}: EventCardProps) => {
  return (
    <Card className="card-event">
      <CardMedia className="card-media" image={photo} />
      <CardContent className="card-content">
        <Typography className="title" gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography className="description" variant="body2">
          {description}
        </Typography>
      </CardContent>
      <CardActions className="card-actions">
        <Button className="button" size="small">
          Compartilhar
        </Button>
        <Button className="button" size="small">
          Detalhes
        </Button>
      </CardActions>
    </Card>
  );
};

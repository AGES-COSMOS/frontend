import 'react-multi-carousel/lib/styles.css';
import './feed.scss';
import { Box } from '@mui/material';
import { ProjectCardFeed } from 'components/ProjectCardFeed/projectCardFeed';
import { EventCardFeed } from 'components/EventCardFeed/eventCardFeed';
import Carousel from 'react-multi-carousel';
import { projects } from 'api/projects';
import { events } from 'api/events';

const responsiveConfig = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

export const Feed = () => {
  return (
    <Box className="feed-container">
      <Box className="carousel-container">
        <h2 className="feed-titles">Eventos</h2>
        <Carousel
          responsive={responsiveConfig}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          transitionDuration={1000}
          arrows={true}
          slidesToSlide={1}
          renderButtonGroupOutside
          containerClass="carousel-container"
          itemClass="carousel-item-spacing"
        >
          {events.map((eventCard) => (
            <EventCardFeed
              key={eventCard.title}
              photo={eventCard.photo}
              title={eventCard.title}
              eventId={eventCard.eventId}
              description={eventCard.description}
            />
          ))}
        </Carousel>
      </Box>
      <Box className="projects-container">
        <h2 className="feed-titles">Projetos</h2>
        <div className="cards-container">
          {projects.map((projectCard) => (
            <ProjectCardFeed
              key={projectCard.title}
              userPhoto={projectCard.userPhoto}
              projectDate={projectCard.projectDate}
              title={projectCard.title}
              photo={projectCard.photo}
              description={projectCard.description}
            />
          ))}
        </div>
      </Box>
    </Box>
  );
};

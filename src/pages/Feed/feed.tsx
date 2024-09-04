import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './feed.scss';
import { EventCard } from 'components/EventsCard/EventCard';

const events = [
  {
    photo: 'Here goes the photo',
    title: 'Evento 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in justo lorem. Duis mauris dolor, euismod in neque maximus, dignissim maximus massa. Fusce varius massa vel imperdiet semper. Sed quam libero, dictum ac neque id, ornare ultricies lorem. 1',
  },
  {
    photo: 'Here goes the photo',
    title: 'Evento 2',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in justo lorem. Duis mauris dolor, euismod in neque maximus, dignissim maximus massa. Fusce varius massa vel imperdiet semper. Sed quam libero, dictum ac neque id, ornare ultricies lorem. 2',
  },
  {
    photo: 'Here goes the photo',
    title: 'Evento 3',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in justo lorem. Duis mauris dolor, euismod in neque maximus, dignissim maximus massa. Fusce varius massa vel imperdiet semper. Sed quam libero, dictum ac neque id, ornare ultricies lorem. 3',
  },
  {
    photo: 'Here goes the photo',
    title: 'Evento 4',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in justo lorem. Duis mauris dolor, euismod in neque maximus, dignissim maximus massa. Fusce varius massa vel imperdiet semper. Sed quam libero, dictum ac neque id, ornare ultricies lorem. 4',
  },
  {
    photo: 'Here goes the photo',
    title: 'Evento 5',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in justo lorem. Duis mauris dolor, euismod in neque maximus, dignissim maximus massa. Fusce varius massa vel imperdiet semper. Sed quam libero, dictum ac neque id, ornare ultricies lorem. 5',
  },
];

const projects = [
  {
    title: 'Projeto 1',
    photo: 'Here goes the photo',
    description: 'Descrição do projeto 1',
  },
  {
    title: 'Projeto 2',
    photo: 'Here goes the photo',
    description: 'Descrição do projeto 2',
  },
  {
    title: 'Projeto 3',
    photo: 'Here goes the photo',
    description: 'Descrição do projeto 3',
  },
  {
    title: 'Projeto 4',
    photo: 'Here goes the photo',
    description: 'Descrição do projeto 4',
  },
  {
    title: 'Projeto 5',
    photo: 'Here goes the photo',
    description: 'Descrição do projeto 5',
  },
];

export const Feed = () => {
  return (
    <div className="feed-container">
      <div>
        <h2 className="feed-titles">Eventos</h2>
        <Carousel
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 3,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 2,
              partialVisibilityGutter: 30,
            },
          }}
        >
          {events.map((event, i) => {
            return (
              <EventCard
                key={i}
                photo={event.photo}
                title={event.title}
                description={event.description}
              />
            );
          })}
        </Carousel>
      </div>
      <div>
        <h2 className="feed-titles">Projetos</h2>
        <Carousel
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 3,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 2,
              partialVisibilityGutter: 30,
            },
          }}
        >
          {projects.map((projects, i) => {
            return (
              <EventCard
                key={i}
                title={projects.title}
                photo={projects.photo}
                description={projects.description}
              />
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

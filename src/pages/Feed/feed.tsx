import 'react-multi-carousel/lib/styles.css';
import './feed.scss';
import { Box } from '@mui/material';
import { ProjectCardFeed } from 'components/ProjectCardFeed/projectCardFeed';
import { EventCardFeed } from 'components/EventCardFeed/eventCardFeed';
import Carousel from 'react-multi-carousel';

const events = [
  {
    photo: 'https://doity.com.br/blog/app/uploads/2022/05/073-1000x279.png',
    title: 'Conversa Direito Internacional',
    description:
      'Terá por tema central o Direito Internacional e os Objetivos de Desenvolvimento Sustentável.',
  },
  {
    photo:
      'https://doity.com.br/blog/app/uploads/2022/05/organizacao-de-eventos-1.png',
    title: 'Palestra Direito Civil',
    description:
      'A palestra será ministrada pelo coordenador do curso de Direito da UFG, professor Fernando Vieira Marinho.',
  },
  {
    photo:
      'https://doity.com.br/blog/app/uploads/2022/05/organizacao-de-eventos-1.png',
    title: 'Palestra Direito Ambiental',
    description:
      'O evento trará discussões fundamentais sobre os desafios e avanços no campo do direito ambiental.',
  },
  {
    photo:
      'https://doity.com.br/blog/app/uploads/2022/05/tipos-de-eventos-1.png',
    title: 'Conversa Direito Internacional',
    description:
      'Terá por tema central o Direito Internacional e os Objetivos de Desenvolvimento Sustentável.',
  },
];

const projects = [
  {
    userPhoto: 'https://randomuser.me/api/portraits/women/2.jpg',
    projectDate: new Date('2024-09-10'),
    title: 'Educação Legal para Jovens',
    photo:
      'https://doity.com.br/blog/app/uploads/2022/05/Stand-em-eventos-como-utilizar-essa-estrategia-1000x279.png',
    description:
      'O projeto visa educar jovens sobre seus direitos e deveres legais, promovendo uma compreensão mais profunda das leis e do sistema jurídico.',
  },
  {
    userPhoto: 'https://randomuser.me/api/portraits/men/1.jpg',
    projectDate: new Date('2024-09-01'),
    title: 'Projeto de Assistência Jurídica Comunitária',
    photo:
      'https://doity.com.br/blog/app/uploads/2022/05/Vantagens-dos-eventos-academicos-e-cientificos-online.png',
    description:
      'Este projeto oferece assistência jurídica gratuita para comunidades carentes, ajudando a resolver questões legais básicas e promover a justiça social.',
  },
  {
    userPhoto: 'https://randomuser.me/api/portraits/men/3.jpg',
    projectDate: new Date('2024-09-15'),
    title: 'Conscientização sobre Direitos Humanos',
    photo:
      'https://doity.com.br/blog/app/uploads/2022/05/Como-promover-o-engajamento-dos-participantes-em-eventos-online-1000x279.png',
    description:
      'Um projeto dedicado à promoção e defesa dos direitos humanos através de seminários, workshops e campanhas de conscientização.',
  },
  {
    userPhoto: 'https://randomuser.me/api/portraits/men/5.jpg',
    projectDate: new Date('2024-09-25'),
    title: 'Consultoria Jurídica para Startups',
    photo:
      'https://doity.com.br/blog/app/uploads/2022/05/SEO-para-eventos-Como-fazer-com-que-seu-evento-seja-encontrado-no-Google.png',
    description:
      'O projeto oferece orientação legal para startups e empreendedores, ajudando na estruturação legal de novos negócios e na resolução de questões jurídicas iniciais.',
  },
  {
    userPhoto: 'https://randomuser.me/api/portraits/women/4.jpg',
    projectDate: new Date('2024-09-20'),
    title: 'Apoio Jurídico a Vítimas de Violência Doméstica',
    photo:
      'https://doity.com.br/blog/app/uploads/2022/05/topo-live-1000x279.png',
    description:
      'Este projeto fornece suporte legal e emocional para vítimas de violência doméstica, incluindo consultoria jurídica e assistência na obtenção de ordens de proteção.',
  },
  {
    userPhoto: 'https://randomuser.me/api/portraits/men/5.jpg',
    projectDate: new Date('2024-09-25'),
    title: 'Consultoria Jurídica para Startups',
    photo:
      'https://doity.com.br/blog/app/uploads/2022/05/SEO-para-eventos-Como-fazer-com-que-seu-evento-seja-encontrado-no-Google.png',
    description:
      'O projeto oferece orientação legal para startups e empreendedores, ajudando na estruturação legal de novos negócios e na resolução de questões jurídicas iniciais.',
  },
  {
    userPhoto: 'https://randomuser.me/api/portraits/women/2.jpg',
    projectDate: new Date('2024-09-10'),
    title: 'Educação Legal para Jovens',
    photo:
      'https://doity.com.br/blog/app/uploads/2022/05/Stand-em-eventos-como-utilizar-essa-estrategia-1000x279.png',
    description:
      'O projeto visa educar jovens sobre seus direitos e deveres legais, promovendo uma compreensão mais profunda das leis e do sistema jurídico.',
  },
  {
    userPhoto: 'https://randomuser.me/api/portraits/men/1.jpg',
    projectDate: new Date('2024-09-01'),
    title: 'Projeto de Assistência Jurídica Comunitária',
    photo:
      'https://doity.com.br/blog/app/uploads/2022/05/Vantagens-dos-eventos-academicos-e-cientificos-online.png',
    description:
      'Este projeto oferece assistência jurídica gratuita para comunidades carentes, ajudando a resolver questões legais básicas e promover a justiça social.',
  },
  {
    userPhoto: 'https://randomuser.me/api/portraits/men/3.jpg',
    projectDate: new Date('2024-09-15'),
    title: 'Conscientização sobre Direitos Humanos',
    photo:
      'https://doity.com.br/blog/app/uploads/2022/05/Como-promover-o-engajamento-dos-participantes-em-eventos-online-1000x279.png',
    description:
      'Um projeto dedicado à promoção e defesa dos direitos humanos através de seminários, workshops e campanhas de conscientização.',
  },
  {
    userPhoto: 'https://randomuser.me/api/portraits/men/5.jpg',
    projectDate: new Date('2024-09-25'),
    title: 'Consultoria Jurídica para Startups',
    photo:
      'https://doity.com.br/blog/app/uploads/2022/05/SEO-para-eventos-Como-fazer-com-que-seu-evento-seja-encontrado-no-Google.png',
    description:
      'O projeto oferece orientação legal para startups e empreendedores, ajudando na estruturação legal de novos negócios e na resolução de questões jurídicas iniciais.',
  },
  {
    userPhoto: 'https://randomuser.me/api/portraits/women/4.jpg',
    projectDate: new Date('2024-09-20'),
    title: 'Apoio Jurídico a Vítimas de Violência Doméstica',
    photo:
      'https://doity.com.br/blog/app/uploads/2022/05/topo-live-1000x279.png',
    description:
      'Este projeto fornece suporte legal e emocional para vítimas de violência doméstica, incluindo consultoria jurídica e assistência na obtenção de ordens de proteção.',
  },
  {
    userPhoto: 'https://randomuser.me/api/portraits/men/5.jpg',
    projectDate: new Date('2024-09-25'),
    title: 'Consultoria Jurídica para Startups',
    photo:
      'https://doity.com.br/blog/app/uploads/2022/05/SEO-para-eventos-Como-fazer-com-que-seu-evento-seja-encontrado-no-Google.png',
    description:
      'O projeto oferece orientação legal para startups e empreendedores, ajudando na estruturação legal de novos negócios e na resolução de questões jurídicas iniciais.',
  },
];

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

import 'react-multi-carousel/lib/styles.css';
import './feed.scss';
import { Box } from '@mui/material';
import { ProjectCard } from 'components/ProjectCards/projectCard';

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
    userPhoto: 'https://randomuser.me/api/portraits/men/1.jpg',
    projectDate: new Date('2024-09-01'),
    title: 'Projeto de Assistência Jurídica Comunitária',
    photo:
      'https://www.rotajuridica.com.br/wp-content/uploads/2017/04/curso-de-Direito.jpg',
    description:
      'Este projeto oferece assistência jurídica gratuita para comunidades carentes, ajudando a resolver questões legais básicas e promover a justiça social.',
  },
  {
    userPhoto: 'https://randomuser.me/api/portraits/women/2.jpg',
    projectDate: new Date('2024-09-10'),
    title: 'Educação Legal para Jovens',
    photo:
      'https://faculdadesensu.edu.br/wp-content/uploads/2023/03/direito-digital-site.jpg',
    description:
      'O projeto visa educar jovens sobre seus direitos e deveres legais, promovendo uma compreensão mais profunda das leis e do sistema jurídico.',
  },
  {
    userPhoto: 'https://randomuser.me/api/portraits/men/3.jpg',
    projectDate: new Date('2024-09-15'),
    title: 'Conscientização sobre Direitos Humanos',
    photo:
      'https://www.dmanapolis.com.br/images/noticias/21566/d300d8067f3daf7909fff15ed909fdba.jpg',
    description:
      'Um projeto dedicado à promoção e defesa dos direitos humanos através de seminários, workshops e campanhas de conscientização.',
  },
  {
    userPhoto: 'https://randomuser.me/api/portraits/women/4.jpg',
    projectDate: new Date('2024-09-20'),
    title: 'Apoio Jurídico a Vítimas de Violência Doméstica',
    photo:
      'https://aprimoraweb.com.br/wp-content/uploads/2022/07/simbolo-do-direito-e-da-justica-1.jpg.webp',
    description:
      'Este projeto fornece suporte legal e emocional para vítimas de violência doméstica, incluindo consultoria jurídica e assistência na obtenção de ordens de proteção.',
  },
  {
    userPhoto: 'https://randomuser.me/api/portraits/men/5.jpg',
    projectDate: new Date('2024-09-25'),
    title: 'Consultoria Jurídica para Startups',
    photo:
      'https://www.fenalaw.com.br/wp-content/uploads/2021/06/shutterstock_1081695920.jpg',
    description:
      'O projeto oferece orientação legal para startups e empreendedores, ajudando na estruturação legal de novos negócios e na resolução de questões jurídicas iniciais.',
  },
  {
    userPhoto: 'https://randomuser.me/api/portraits/men/5.jpg',
    projectDate: new Date('2024-09-25'),
    title: 'Consultoria Jurídica para Startups',
    photo:
      'https://img.imageboss.me/revista-cdn/cdn/19297/f27ff0fd7adeedc515108f2bf4a73c0c9bdf8c0b.jpg?1558553848',
    description:
      'O projeto oferece orientação legal para startups e empreendedores, ajudando na estruturação legal de novos negócios e na resolução de questões jurídicas iniciais.',
  },
  {
    userPhoto: 'https://randomuser.me/api/portraits/men/1.jpg',
    projectDate: new Date('2024-09-01'),
    title: 'Projeto de Assistência Jurídica Comunitária',
    photo:
      'https://www.rotajuridica.com.br/wp-content/uploads/2017/04/curso-de-Direito.jpg',
    description:
      'Este projeto oferece assistência jurídica gratuita para comunidades carentes, ajudando a resolver questões legais básicas e promover a justiça social.',
  },
  {
    userPhoto: 'https://randomuser.me/api/portraits/women/2.jpg',
    projectDate: new Date('2024-09-10'),
    title: 'Educação Legal para Jovens',
    photo:
      'https://faculdadesensu.edu.br/wp-content/uploads/2023/03/direito-digital-site.jpg',
    description:
      'O projeto visa educar jovens sobre seus direitos e deveres legais, promovendo uma compreensão mais profunda das leis e do sistema jurídico.',
  },
  {
    userPhoto: 'https://randomuser.me/api/portraits/men/3.jpg',
    projectDate: new Date('2024-09-15'),
    title: 'Conscientização sobre Direitos Humanos',
    photo:
      'https://www.dmanapolis.com.br/images/noticias/21566/d300d8067f3daf7909fff15ed909fdba.jpg',
    description:
      'Um projeto dedicado à promoção e defesa dos direitos humanos através de seminários, workshops e campanhas de conscientização.',
  },
  {
    userPhoto: 'https://randomuser.me/api/portraits/women/4.jpg',
    projectDate: new Date('2024-09-20'),
    title: 'Apoio Jurídico a Vítimas de Violência Doméstica',
    photo:
      'https://aprimoraweb.com.br/wp-content/uploads/2022/07/simbolo-do-direito-e-da-justica-1.jpg.webp',
    description:
      'Este projeto fornece suporte legal e emocional para vítimas de violência doméstica, incluindo consultoria jurídica e assistência na obtenção de ordens de proteção.',
  },
  {
    userPhoto: 'https://randomuser.me/api/portraits/men/5.jpg',
    projectDate: new Date('2024-09-25'),
    title: 'Consultoria Jurídica para Startups',
    photo:
      'https://www.fenalaw.com.br/wp-content/uploads/2021/06/shutterstock_1081695920.jpg',
    description:
      'O projeto oferece orientação legal para startups e empreendedores, ajudando na estruturação legal de novos negócios e na resolução de questões jurídicas iniciais.',
  },
  {
    userPhoto: 'https://randomuser.me/api/portraits/men/5.jpg',
    projectDate: new Date('2024-09-25'),
    title: 'Consultoria Jurídica para Startups',
    photo:
      'https://img.imageboss.me/revista-cdn/cdn/19297/f27ff0fd7adeedc515108f2bf4a73c0c9bdf8c0b.jpg?1558553848',
    description:
      'O projeto oferece orientação legal para startups e empreendedores, ajudando na estruturação legal de novos negócios e na resolução de questões jurídicas iniciais.',
  },
];

export const Feed = () => {
  return (
    <Box className="feed-container">
      <Box>
        <h2 className="feed-titles">Eventos</h2>
      </Box>
      <Box>
        <h2 className="feed-titles">Projetos</h2>
        <div className="cards-container">
          {projects.map((projectCard) => {
            return (
              <ProjectCard
                userPhoto={projectCard.userPhoto}
                projectDate={projectCard.projectDate}
                key={projectCard.title}
                title={projectCard.title}
                photo={projectCard.photo}
                description={projectCard.description}
              />
            );
          })}
        </div>
      </Box>
    </Box>
  );
};

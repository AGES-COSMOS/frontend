import './EventCard.scss';

type eventCardProps = {
  photo: string;
  title: string;
  description: string;
};

export const EventCard = ({ photo, title, description }: eventCardProps) => {
  return (
    <div className="event-card-container">
      <div className="events-photo">{photo}</div>
      <h2 className="event-title">{title}</h2>
      <p>{description}</p>
      <div className="events-buttons-container">
        <button className="events-buttons">SHARE</button>
        <button className="events-buttons">LEARN MORE</button>
      </div>
    </div>
  );
};

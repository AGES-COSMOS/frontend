import React, { useState } from 'react';
import './editEvents.scss';
import { ButtonComponent } from 'components/Button/button';
import { TextField } from 'components/TextFields/textfield';
import { Select } from 'components/Select/select';
import { EventCategory } from 'pages/AboutEvent/aboutEvent';

export interface Event {
  id: number;
  title: string;
  imageURL: string | null;
  description: string;
  date: Date;
  startHour: Date;
  endHour: Date;
  IsOnline: boolean;
  latitude: number;
  longitude: number;
  address: string;
  institution_id: number;
  project_id: number | null;
  updatedAt: Date;
  updatedBy: string;
  EventCategory: EventCategory[];
}

// Mock data for eventData
const mockEventData: Event = {
  id: 90,
  title: 'verumtamen veritas communis',
  imageURL: null,
  description:
    'Crapula rerum saepe. Civis adsum supellex quaerat quia. Vergo adipisci carus cognomen taedium vilicus tum colligo.',
  date: new Date('2024-11-15T00:00:00.000Z'),
  startHour: new Date('1970-01-01T09:30:05.630Z'),
  endHour: new Date('1970-01-01T10:30:30.630Z'),
  IsOnline: false,
  address: '22587 East Avenue',
  latitude: 45.5898,
  longitude: -173.9671,
  institution_id: 1,
  project_id: null,
  updatedAt: new Date('2024-11-11T20:27:26.747Z'),
  updatedBy: 'Mazie',
  EventCategory: [
    {
      category: { id: 1, name: 'Direito Civil' },
    },
  ],
};

const generateTimeSlots = (): string[] => {
  const times: string[] = [];
  let currentHour = 0;
  let currentMinute = 0;

  while (currentHour < 24) {
    const hour = String(currentHour).padStart(2, '0');
    const minute = String(currentMinute).padStart(2, '0');
    times.push(`${hour}:${minute}`);

    currentMinute += 30;
    if (currentMinute >= 60) {
      currentMinute = 0;
      currentHour += 1;
    }
  }

  return times;
};

export const EditEvents = () => {
  const [eventData] = useState<Event>(mockEventData);
  const [eventDetails, setEventDetails] = useState<Event>(eventData);

  const [institutions] = useState([
    { id: 1, name: 'PUCRS' },
    { id: 2, name: 'UFRGS' },
  ]);

  const [modalityOptions] = useState([
    { id: 1, name: 'Online', isOnline: true },
    { id: 2, name: 'Presencial', isOnline: false },
  ]);

  const [categories] = useState([
    { id: 1, name: 'Direito Civil' },
    { id: 2, name: 'Direito Penal' },
  ]);

  const [selectedCategories, setSelectedCategories] = useState<number[]>(
    eventData.EventCategory.map((ec) => ec.category.id),
  );
  const [image, setImage] = useState(
    eventData.imageURL || '/assets/projectPlaceholder.png',
  );
  const [imageFile, setImageFile] = useState<string>('');

  const timeSlots = generateTimeSlots();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    if (name === 'date') {
      setEventDetails({ ...eventDetails, date: new Date(value) });
    } else if (name === 'startHour' || name === 'endHour') {
      const [hours, minutes] = value.split(':');
      const updatedHour = new Date(eventDetails.date);
      updatedHour.setUTCHours(Number(hours), Number(minutes), 0);
      setEventDetails({
        ...eventDetails,
        [name]: updatedHour,
      });
    } else if (name === 'IsOnline') {
      setEventDetails({
        ...eventDetails,
        IsOnline: value === 'Online',
      });
    } else {
      setEventDetails({ ...eventDetails, [name]: value });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file?.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInstitutionChange = (value: string) => {
    const institution = institutions.find((inst) => inst.name === value);
    setEventDetails({ ...eventDetails, institution_id: institution?.id || 0 });
  };

  const handleCategoryChange = (value: string) => {
    const selected = categories
      .filter((category) => value.includes(category.name))
      .map((category) => category.id);
    setSelectedCategories(selected);
  };

  const handleSubmit = async () => {
    try {
      const eventPayload = {
        ...eventDetails,
        categories: selectedCategories.map((id) => ({
          event_id: eventDetails.id,
          category_id: id,
        })),
        image: imageFile,
      };
      console.log('Event update payload:', eventPayload);
      alert('Evento atualizado com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar evento');
    }
  };

  return (
    <div className="edit-event">
      <h1>Edição de Evento</h1>
      <div className="image-container">
        <img
          src={image}
          alt="Imagem de Capa do Evento"
          className="event-image"
        />
        <div className="add-image-button">
          <ButtonComponent
            type="primary"
            onClick={() => document.getElementById('imageInput')?.click()}
            size={2}
          >
            Alterar Imagem
          </ButtonComponent>
        </div>
      </div>
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
      <form className="form">
        <TextField
          label="Nome do Evento"
          placeholder="Digite o título do evento"
          required
          value={eventDetails.title}
          onChange={(value) =>
            setEventDetails({ ...eventDetails, title: value })
          }
        />

        <Select
          options={institutions.map((inst) => inst.name)}
          label="Instituição"
          placeholder="Selecione a Instituição"
          value={
            institutions.find((inst) => inst.id === eventDetails.institution_id)
              ?.name
          }
          onChange={handleInstitutionChange}
          required
        />

        <div>
          <h4>Data do Evento</h4>
          <input
            type="date"
            className="item"
            name="date"
            value={eventDetails.date.toISOString().split('T')[0]}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <h4>Hora de Início</h4>
          <select
            className="item time-picker"
            name="startHour"
            value={eventDetails.startHour.toISOString().substr(11, 5)}
            onChange={handleInputChange}
            required
          >
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h4>Hora de Término</h4>
          <select
            className="item time-picker"
            name="endHour"
            value={eventDetails.endHour.toISOString().substr(11, 5)}
            onChange={handleInputChange}
            required
          >
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        <Select
          options={modalityOptions.map((modality) => modality.name)}
          label="Modalidade"
          placeholder="Selecione a Modalidade"
          value={
            eventDetails.IsOnline
              ? modalityOptions.find((modality) => modality.isOnline)?.name
              : modalityOptions.find((modality) => !modality.isOnline)?.name
          }
          onChange={(value) => {
            const selectedModality = modalityOptions.find(
              (modality) => modality.name === value,
            );
            setEventDetails({
              ...eventDetails,
              IsOnline: selectedModality?.isOnline || false,
            });
          }}
        />

        <Select
          options={categories.map((category) => category.name)}
          label="Categorias"
          placeholder="Selecione as Categorias"
          value={selectedCategories
            .map(
              (id) =>
                categories.find((category) => category.id === id)?.name || '',
            )
            .join(', ')}
          onChange={handleCategoryChange}
        />

        <TextField
          label="Endereço do Evento"
          placeholder="Digite o endereço do evento"
          required
          value={eventDetails.address}
          onChange={(value) =>
            setEventDetails({ ...eventDetails, address: value })
          }
        />

        <textarea
          name="description"
          className="large-textarea"
          value={eventDetails.description}
          onChange={handleInputChange}
          placeholder="Descrição"
          required
        />
        <ButtonComponent type="primary" size={2} onClick={handleSubmit}>
          Salvar Alterações
        </ButtonComponent>
      </form>
    </div>
  );
};

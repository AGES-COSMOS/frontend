import React, { useState } from 'react';
import './createEvents.scss';
import { createEvent } from 'services/eventsService';
import { ButtonComponent } from 'components/Button/button';
import { TextField } from 'components/TextFields/textfield';
import { Select } from 'components/Select/select';

export interface Event {
  id: number;
  title: string;
  description: string;
  date: Date;
  hour: Date;
  IsOnline: boolean;
  address: string;
  institution_id: number;
  project_id: number;
  updatedAt: Date;
  updatedBy: string;
}

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

export const CreateEvents = () => {
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

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [image, setImage] = useState('/assets/projectPlaceholder.png');

  const [eventData, setEventData] = useState<Event>({
    id: 0,
    title: '',
    description: '',
    address: '',
    IsOnline: false,
    date: new Date(),
    hour: new Date(),
    project_id: 0,
    institution_id: 0,
    updatedAt: new Date(),
    updatedBy: '',
  });

  const timeSlots = generateTimeSlots();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    if (name === 'date') {
      setEventData({ ...eventData, date: new Date(value) });
    } else if (name === 'hour') {
      const [hours, minutes] = value.split(':');
      const updatedHour = new Date(eventData.date);
      updatedHour.setUTCHours(Number(hours), Number(minutes), 0);
      setEventData({ ...eventData, hour: updatedHour });
    } else if (name === 'IsOnline') {
      setEventData({
        ...eventData,
        IsOnline: value === 'Online',
      });
    } else {
      setEventData({ ...eventData, [name]: value });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInstitutionChange = (value: string) => {
    const institution = institutions.find((inst) => inst.name === value);
    setEventData({ ...eventData, institution_id: institution?.id || 0 });
  };

  const handleCategoryChange = (value: string) => {
    const selected = categories
      .filter((category) => value.includes(category.name))
      .map((category) => category.id);
    setSelectedCategories(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const eventPayload = {
        ...eventData,
        categories: selectedCategories,
      };
      await createEvent(eventPayload);
      alert('Evento criado com sucesso!');
    } catch (error) {
      alert('Erro ao criar evento');
    }
  };

  return (
    <div className="create-event">
      <h1>Cadastro de Evento</h1>
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
            Adicionar Imagem
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
      <form className="form" onSubmit={handleSubmit}>
        <TextField
          label="Nome do Evento"
          placeholder="Digite o título do evento"
          required
          value={eventData.title}
          onChange={(value) => setEventData({ ...eventData, title: value })}
        />

        <Select
          options={institutions.map((inst) => inst.name)}
          label="Instituição"
          placeholder="Selecione a Instituição"
          value={
            institutions.find((inst) => inst.id === eventData.institution_id)
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
            value={eventData.date.toISOString().split('T')[0]}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <h4>Hora do Evento</h4>
          <select
            className="item time-picker"
            name="hour"
            value={eventData.hour.toISOString().substr(11, 5)}
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
            eventData.IsOnline
              ? modalityOptions.find((modality) => modality.isOnline)?.name
              : modalityOptions.find((modality) => !modality.isOnline)?.name
          }
          onChange={(value) => {
            const selectedModality = modalityOptions.find(
              (modality) => modality.name === value,
            );
            setEventData({
              ...eventData,
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
          value={eventData.address}
          onChange={(value) => setEventData({ ...eventData, address: value })}
        />

        <textarea
          name="description"
          className="large-textarea"
          value={eventData.description}
          onChange={handleInputChange}
          placeholder="Descrição"
          required
        />
        <ButtonComponent
          type="primary"
          onClick={() => {
            console.log('');
          }}
          size={2}
        >
          Cadastrar Evento
        </ButtonComponent>
      </form>
    </div>
  );
};

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

export const CreateEvents = () => {
  const [institutions] = useState([
    { id: 1, name: 'PUCRS' },
    { id: 2, name: 'UFRGS' },
  ]);

  const [modality] = useState([
    { id: 1, name: 'Online' },
    { id: 2, name: 'Presencial' },
  ]);

  const [categories] = useState([
    { id: 1, name: 'Direito Civil' },
    { id: 2, name: 'Direito Penal' },
  ]);

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedModality, setSelectedModality] = useState<number[]>([]);
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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { title, value } = e.target;
    setEventData({ ...eventData, [title]: value });

    if (title === 'date' || title === 'hour') {
      setEventData({ ...eventData, [title]: new Date(value) });
    } else {
      setEventData({ ...eventData, [title]: value });
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

  const categoryOptions = categories.map((category) => category.name);
  const modalityOptions = modality.map((modality) => modality.name);
  const institutionOptions = institutions.map(
    (institution) => institution.name,
  );

  const handleCategoryChange = (value: string) => {
    const selected = categories
      .filter((category) => value.includes(category.name))
      .map((category) => category.id);
    setSelectedCategories(selected);
  };

  const handleModalityChange = (value: string) => {
    const selected = modality
      .filter((modality) => value.includes(modality.name))
      .map((modality) => modality.id);
    setSelectedModality(selected);
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
          options={institutionOptions}
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
            name="start_date"
            value={eventData.date.toISOString().split('T')[0]}
            onChange={handleInputChange}
            required
          />
        </div>

        <Select
          options={categoryOptions}
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

        <Select
          options={modalityOptions}
          label="Modalidade"
          placeholder="Selecione a Modalidade"
          value={selectedModality
            .map(
              (id) =>
                modality.find((modality) => modality.id === id)?.name || '',
            )
            .join(', ')}
          onChange={handleModalityChange}
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

import React, { useState } from 'react';
import './createProjects.scss';
import { createProject } from 'services/projectsService';
import { ButtonComponent } from 'components/Button/button';
import { TextField } from 'components/TextFields/textfield';
import { Select } from 'components/Select/select';
import { DatePicker } from 'components/DatePicker/datePicker';
import { TextArea } from 'components/TextArea/textArea';
import { Project } from 'models/project';

export const CreateProjects = () => {
  const [institutions] = useState([
    { id: 1, name: 'PUCRS' },
    { id: 2, name: 'UFRGS' },
  ]);

  const [teachers] = useState([
    { id: 1, name: 'Jorge Batista' },
    { id: 2, name: 'Maria Silva' },
  ]);

  const [categories] = useState([
    { id: 1, name: 'Direito Civil' },
    { id: 2, name: 'Direito Penal' },
  ]);

  const [keywords] = useState([
    { id: 1, name: 'Civil' },
    { id: 2, name: 'Direito' },
  ]);

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<number[]>([]);
  const [image, setImage] = useState('/assets/projectPlaceholder.png');
  const [imageFile, setImageFile] = useState<string>('');

  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>(
    {
      name: '',
      institution_id: '',
      start_date: '',
      teacher_id: '',
      status: '',
      history: '',
      purpose: '',
    },
  );

  const [projectData, setProjectData] = useState<Project>({
    name: '',
    history: '',
    purpose: '',
    // O que mandar nesse campo? É necessário?
    contact: '',
    start_date: new Date(),
    end_date: undefined,
    status: '',
    teacher_id: 0,
    institution_id: 0,
    updatedAt: new Date(),
    // Alterar esse campo quando tiver login e usuários
    updatedBy: 'Admin',
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });

    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      [name]: value ? '' : prevErrors[name],
    }));

    if (name === 'start_date' || name === 'end_date') {
      setProjectData({ ...projectData, [name]: new Date(value) });
    } else {
      setProjectData({ ...projectData, [name]: value });
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
    setProjectData({ ...projectData, institution_id: institution?.id || 0 });

    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      institution_id: institution ? '' : prevErrors.institution_id,
    }));
  };

  const handleTeacherChange = (value: string) => {
    const teacher = teachers.find((teacher) => teacher.name === value);
    setProjectData({ ...projectData, teacher_id: teacher?.id || 0 });

    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      teacher_id: teacher ? '' : prevErrors.teacher_id,
    }));
  };

  const handleStatusChange = (value: string) => {
    setProjectData({ ...projectData, status: value });

    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      status: value ? '' : prevErrors.status,
    }));
  };

  const categoryOptions = categories.map((category) => category.name);
  const keywordOptions = keywords.map((keyword) => keyword.name);
  const institutionOptions = institutions.map(
    (institution) => institution.name,
  );
  const teacherOptions = teachers.map((teacher) => teacher.name);
  const statusOptions = ['Em Andamento', 'Finalizado'];

  const handleCategoryChange = (value: string) => {
    const selected = categories
      .filter((category) => value.includes(category.name))
      .map((category) => category.id);
    setSelectedCategories(selected);
  };

  const handleKeywordChange = (value: string) => {
    const selected = keywords
      .filter((keyword) => value.includes(keyword.name))
      .map((keyword) => keyword.id);
    setSelectedKeywords(selected);
  };

  const validateForm = () => {
    const errors = {
      name: '',
      institution_id: '',
      start_date: '',
      teacher_id: '',
      status: '',
      history: '',
      purpose: '',
    };

    if (!projectData.name) errors.name = 'O nome do projeto é obrigatório';
    if (!projectData.institution_id)
      errors.institution_id = 'A instituição é obrigatória';
    if (!projectData.start_date)
      errors.start_date = 'A data de início do projeto é obrigatória';
    if (!projectData.teacher_id)
      errors.teacher_id = 'O professor é obrigatório';
    if (!projectData.status)
      errors.status = 'O status do projeto é obrigatório';
    if (!projectData.history)
      errors.history = 'A história do projeto é obrigatória';
    if (!projectData.purpose)
      errors.purpose = 'O propósito do projeto é obrigatório';

    setErrorMessages(errors);

    return !Object.values(errors).some((error) => error !== '');
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const formData = new FormData();

        formData.append('name', projectData.name);
        formData.append('history', projectData.history);
        formData.append('purpose', projectData.purpose);
        formData.append('contact', projectData.contact || '');
        formData.append('start_date', projectData.start_date.toISOString());
        if (projectData.end_date) {
          formData.append('end_date', projectData.end_date.toISOString());
        }
        formData.append('status', projectData.status);
        formData.append('teacher_id', projectData.teacher_id.toString());
        formData.append(
          'institution_id',
          projectData.institution_id.toString(),
        );
        formData.append('updatedAt', projectData.updatedAt.toISOString());
        formData.append('updatedBy', projectData.updatedBy);

        if (imageFile) {
          formData.append('image', imageFile);
        }

        await createProject(formData);
        alert('Projeto criado com sucesso!');
      } catch (error) {
        alert('Erro ao criar projeto');
      }
    }
  };

  return (
    <div className="create-project">
      <h1>Cadastro de Projeto</h1>
      <div className="image-container">
        <img
          src={image}
          alt="Imagem de Capa do Projeto"
          className="project-image"
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
      <form className="form">
        <TextField
          label="Nome do Projeto"
          placeholder="Digite o nome do projeto"
          required
          value={projectData.name}
          onChange={(value) => setProjectData({ ...projectData, name: value })}
          errormessage={errorMessages.name}
        />

        <Select
          options={institutionOptions}
          label="Instituição"
          placeholder="Selecione a Instituição"
          value={
            institutions.find((inst) => inst.id === projectData.institution_id)
              ?.name
          }
          onChange={handleInstitutionChange}
          required
          errorMessage={errorMessages.institution_id}
        />

        <DatePicker
          label="Data de Início"
          name="start_date"
          value={projectData.start_date.toISOString().split('T')[0]}
          onChange={handleInputChange}
          required
          errormessage={errorMessages.start_date}
        />

        <DatePicker
          label="Data de Fim"
          name="end_date"
          value={projectData.end_date?.toISOString().split('T')[0] || ''}
          onChange={handleInputChange}
        />

        <Select
          options={teacherOptions}
          label="Professor"
          placeholder="Selecione o Professor"
          value={
            teachers.find((teacher) => teacher.id === projectData.teacher_id)
              ?.name
          }
          onChange={handleTeacherChange}
          required
          errorMessage={errorMessages.teacher_id}
        />

        <Select
          options={statusOptions}
          label="Status do Projeto"
          placeholder="Selecione o Status"
          value={projectData.status}
          onChange={handleStatusChange}
          required
          errorMessage={errorMessages.status}
        />

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
          options={keywordOptions}
          label="Palavras-Chave"
          placeholder="Selecione as Palavras-Chave"
          value={selectedKeywords
            .map(
              (id) => keywords.find((keyword) => keyword.id === id)?.name || '',
            )
            .join(', ')}
          onChange={handleKeywordChange}
        />

        <div className="textAreas">
          <TextArea
            label="História"
            name="history"
            value={projectData.history}
            placeholder="História"
            required
            onChange={handleInputChange}
            errormessage={errorMessages.history}
          />

          <TextArea
            label="Propósito"
            name="purpose"
            value={projectData.purpose}
            placeholder="Propósito"
            required
            onChange={handleInputChange}
            errormessage={errorMessages.purpose}
          />
        </div>

        <div className="button-container">
          <ButtonComponent
            type="primary"
            onClick={() => {
              handleSubmit();
            }}
            size={2}
          >
            Cadastrar Projeto
          </ButtonComponent>
        </div>
      </form>
    </div>
  );
};

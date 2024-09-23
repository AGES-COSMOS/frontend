import React, { useState } from 'react';
import './createProjects.scss';
import { createProject } from 'services/projectsService';
import { ButtonComponent } from 'components/Button/button';
import { TextField } from 'components/TextFields/textfield';
import { Select } from 'components/Select/select';

export interface Project {
  id: number;
  name: string;
  history: string;
  purpose: string;
  contact?: string;
  start_date: Date;
  end_date?: Date;
  status: string;
  teacher_id: number;
  institution_id: number;
  updatedAt: Date;
  updatedBy: string;
}

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

  const [projectData, setProjectData] = useState<Project>({
    id: 0,
    name: '',
    history: '',
    purpose: '',
    contact: '',
    start_date: new Date(),
    end_date: undefined,
    status: '',
    teacher_id: 0,
    institution_id: 0,
    updatedAt: new Date(),
    updatedBy: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });

    if (name === 'start_date' || name === 'end_date') {
      setProjectData({ ...projectData, [name]: new Date(value) });
    } else {
      setProjectData({ ...projectData, [name]: value });
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
    setProjectData({ ...projectData, institution_id: institution?.id || 0 });
  };

  const handleTeacherChange = (value: string) => {
    const teacher = teachers.find((teacher) => teacher.name === value);
    setProjectData({ ...projectData, teacher_id: teacher?.id || 0 });
  };

  const handleStatusChange = (value: string) => {
    setProjectData({ ...projectData, status: value });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const projectPayload = {
        ...projectData,
        categories: selectedCategories,
        keywords: selectedKeywords,
      };
      await createProject(projectPayload);
      alert('Projeto criado com sucesso!');
    } catch (error) {
      alert('Erro ao criar projeto');
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
      <form className="form" onSubmit={handleSubmit}>
        <TextField
          label="Nome do Projeto"
          placeholder="Digite o nome do projeto"
          required
          value={projectData.name}
          onChange={(value) => setProjectData({ ...projectData, name: value })}
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
        />

        <div>
          <h4>Data de Início</h4>
          <input
            type="date"
            className="item"
            name="start_date"
            value={projectData.start_date.toISOString().split('T')[0]}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <h4>Data de Fim</h4>
          <input
            type="date"
            className="item"
            name="end_date"
            value={projectData.end_date?.toISOString().split('T')[0] || ''}
            onChange={handleInputChange}
          />
        </div>

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
        />

        <Select
          options={statusOptions}
          label="Status do Projeto"
          placeholder="Selecione o Status"
          value={projectData.status}
          onChange={handleStatusChange}
          required
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

        <textarea
          name="history"
          className="large-textarea"
          value={projectData.history}
          onChange={handleInputChange}
          placeholder="História"
          required
        />
        <textarea
          name="purpose"
          className="large-textarea"
          value={projectData.purpose}
          onChange={handleInputChange}
          placeholder="Propósito"
          required
        />
        <ButtonComponent
          type="primary"
          onClick={() => {
            console.log('');
          }}
          size={2}
        >
          Cadastrar Projeto
        </ButtonComponent>
      </form>
    </div>
  );
};

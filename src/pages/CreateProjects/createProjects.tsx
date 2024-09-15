import React, { useState } from 'react';
import './createProjects.css';
import { createProject } from 'services/projectsService';
import Select from 'react-select';
import { ButtonComponent } from 'components/Button/button';

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

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const keywordOptions = keywords.map((keyword) => ({
    value: keyword.id,
    label: keyword.name,
  }));

  const handleCategoryChange = (selectedOptions: any) => {
    const selected = selectedOptions.map((option: any) => option.value);
    setSelectedCategories(selected);
  };

  const handleKeywordChange = (selectedOptions: any) => {
    const selected = selectedOptions.map((option: any) => option.value);
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
      <form onSubmit={handleSubmit} className="form">
        <textarea
          name="name"
          value={projectData.name}
          onChange={handleInputChange}
          placeholder="Nome do Projeto"
          required
          className="textarea-project-name"
        />
        <select
          className="item"
          name="institution_id"
          value={projectData.institution_id}
          onChange={handleInputChange}
          required
        >
          <option value="">Instituição</option>
          {institutions.map((institution) => (
            <option key={institution.id} value={institution.id}>
              {institution.name}
            </option>
          ))}
        </select>

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
        <select
          className="item"
          name="teacher_id"
          value={projectData.teacher_id}
          onChange={handleInputChange}
          required
        >
          <option value="">Professor</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.name}
            </option>
          ))}
        </select>
        <select
          className="item"
          name="status"
          value={projectData.status}
          onChange={handleInputChange}
          required
        >
          <option value="">Status do Projeto</option>
          <option value="Em Andamento">Em Andamento</option>
          <option value="Finalizado">Finalizado</option>
        </select>
        <Select
          isMulti
          name="categories"
          options={categoryOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleCategoryChange}
          placeholder="Categorias"
        />
        <Select
          isMulti
          name="keywords"
          options={keywordOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleKeywordChange}
          placeholder="Palavras-Chave"
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
            console.log('aaa');
          }}
          size={2}
        >
          Cadastrar Projeto
        </ButtonComponent>
      </form>
    </div>
  );
};

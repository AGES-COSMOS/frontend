import { httpService } from './httpService';
import { IProjectListing } from '../pages/ProjectListing/projectListing';
import { ProjectResponse } from './types';
import { Pagination } from './types';

export const createProject = async (projectData: FormData): Promise<number> => {
  try {
    const response = await httpService.post('/project', projectData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.id;
  } catch (error) {
    throw new Error('Erro ao criar projeto.');
  }
};

export const findProjects = async (
  page = 1,
  limit = 10,
): Promise<Pagination<IProjectListing>> => {
  try {
    const response = await httpService.get('/project', {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao listar projetos.');
  }
};

export const getProjects = async (): Promise<ProjectResponse> => {
  try {
    const response = await httpService.get<ProjectResponse>('/project');
    return response.data;
  } catch (error) {
    throw new Error('Erro ao carregar os dados da página Sobre Nós.');
  }
};

export const uploadPdfToProject = async (
  projectId: number,
  pdfFile: File,
): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append('pdf', pdfFile);

    await httpService.post(`/project/${projectId}/pdf`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    throw new Error('Erro ao fazer upload do PDF.');
  }
};

export const updateProjectPdf = async (
  pdfId: number,
  pdfFile: File,
): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append('pdf', pdfFile);

    await httpService.put(`/project/pdf/${pdfId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    throw new Error('Erro ao atualizar o PDF.');
  }
};

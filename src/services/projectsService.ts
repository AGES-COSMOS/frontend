import { httpService } from './httpService';
import { IProjectListing } from '../pages/ProjectListing/projectListing';

export const createProject = async (projectData: FormData): Promise<void> => {
  try {
    const response = await httpService.post('/project', projectData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar projeto.');
  }
};

export interface Pagination<Type> {
  data: Type[];
  total: number;
  page: number;
  lastPage: number;
}

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

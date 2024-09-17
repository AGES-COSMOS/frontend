import { httpService } from './httpService';
import { Project } from '../pages/CreateProjects/createProjects';
import { ProjectListing } from '../pages/ProjectListing/projectListing';

export const createProject = async (projectData: Project): Promise<Project> => {
  try {
    const response = await httpService.post('/projects', projectData);
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
): Promise<Pagination<ProjectListing>> => {
  try {
    const response = await httpService.get('/project', {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao listar projetos.');
  }
};

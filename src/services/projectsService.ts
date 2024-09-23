import { httpService } from './httpService';
import { Project } from '../pages/CreateProjects/createProjects';

export const createProject = async (projectData: Project): Promise<Project> => {
  try {
    const response = await httpService.post('/projects', projectData);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar projeto.');
  }
};

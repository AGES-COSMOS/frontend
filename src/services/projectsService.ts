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

export const findProjects = async (): Promise<ProjectListing[]> => {
  try {
    const response = await httpService.get('/project');
    return response.data;
  } catch (error) {
    throw new Error('Erro ao listar projetos.');
  }
};

import { httpService } from './httpService';

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

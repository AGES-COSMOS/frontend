import { httpService } from './httpService';

export const getAboutUs = async () => {
  try {
    const response = await httpService.get('/general-parameters');
    return response.data;
  } catch (error) {
    throw new Error('Erro ao carregar os dados da página Sobre Nós.');
  }
};

export const updateAboutUs = async (id: string, data: any) => {
  try {
    const response = await httpService.put(`/about-us/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao atualizar os dados da página Sobre Nós.');
  }
};

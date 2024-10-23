import { httpService } from './httpService';

export const getUser = async (id: number) => {
  try {
    const response = await httpService.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao carregar os dados do usuário.');
  }
};

export const updateUser = async (id: number, data: any) => {
  try {
    const response = await httpService.put(`/user/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao atualizar os dados do usuário.');
  }
};

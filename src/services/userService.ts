import { httpService } from './httpService';
import { CreateUser } from './types';

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

export const createUser = async (data: CreateUser) => {
  try {
    const response = await httpService.post(`/user`, data);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao adicionar novo usuário.');
  }
};

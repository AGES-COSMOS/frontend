import { httpService } from './httpService';

export const getPublicProfile = async (id: number) => {
  try {
    const response = await httpService.get(`/public-profile/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao carregar os dados do perfil.');
  }
};

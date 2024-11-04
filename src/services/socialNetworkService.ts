import { httpService } from './httpService';

export interface SocialNetwork {
  id: number;
  name: string;
  icon: string;
  updatedAt: string;
  updatedBy: string;
}

export const createSocialNetwork = async (
  socialNetworkData: SocialNetwork,
): Promise<void> => {
  try {
    const response = await httpService.post(
      '/social-network',
      socialNetworkData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar rede social.');
  }
};

export const getSocialNetworkById = async (
  id: number,
): Promise<SocialNetwork> => {
  try {
    const response = await httpService.get(`/social-network/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar rede social.');
  }
};

export const updateSocialNetwork = async (
  id: number,
  socialNetworkData: SocialNetwork,
): Promise<void> => {
  try {
    const response = await httpService.put(
      `/social-network/${id}`,
      socialNetworkData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error('Erro ao atualizar rede social.');
  }
};

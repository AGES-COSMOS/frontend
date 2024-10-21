import { httpService } from './httpService';
import { GeneralParameter } from './types'; // Importe a interface onde está definida

export const getAllParameters = async (): Promise<GeneralParameter[]> => {
  try {
    const response = await httpService.get<GeneralParameter[]>(
      '/general-parameters',
    );
    return response.data;
  } catch (error) {
    throw new Error('Erro ao carregar os dados da página Sobre Nós.');
  }
};

export const updateParameter = async (data: GeneralParameter[]) => {
  try {
    const response = await httpService.put('/general-parameters', data);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao atualizar as informações.');
  }
};

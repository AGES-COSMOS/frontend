import { httpService } from './httpService';
import { Event } from '../pages/CreateEvents/createEvents';

export const createEvent = async (eventData: Event): Promise<Event> => {
  try {
    const response = await httpService.post('/event', eventData);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar evento.');
  }
};

export const findEvents = async (
  isOnline?: boolean,
  startDate?: Date,
  endDate?: Date,
  name?: string,
  categoryName?: string[],
  institutionName?: string[],
) => {
  try {
    const response = await httpService.get('/listagem-eventos', {
      params: {
        isOnline,
        startDate,
        endDate,
        name,
        categoryName,
        institutionName,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao listar eventos.');
  }
};

export const getEventById = async (id: any) => {
  try {
    const response = await httpService.get(`/event/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar evento.');
  }
};

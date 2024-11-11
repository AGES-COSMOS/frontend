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

export const getAllEvents = async () => {
  try {
    const response = await httpService.get('/listagem-eventos');
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar eventos.');
  }
};

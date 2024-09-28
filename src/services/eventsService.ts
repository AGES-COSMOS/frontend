import { httpService } from './httpService';
import { Event } from '../pages/CreateEvents/createEvents';

export const createEvent = async (eventData: Event): Promise<Event> => {
  try {
    const response = await httpService.post('/events', eventData);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar evento.');
  }
};

import { httpService } from './httpService';

export const getAboutUs = async () => {
  try {
    const response = await httpService.get('/about-us');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching about us data');
  }
};

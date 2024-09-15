import { httpService } from './httpService';

export const getAboutUs = async () => {
  try {
    const response = await httpService.get('/general-parameters');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching about us data');
  }
};

export const updateAboutUs = async (id: string, data: any) => {
  try {
    const response = await httpService.put(`/about-us/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error('Error updating about us data');
  }
};

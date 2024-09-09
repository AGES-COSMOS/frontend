import { httpService } from './httpService';

export const getAboutUs = async () => {
  try {
    const response = await getParameter('sobre');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching about us data');
  }
};

export const getParameter = async (param: string) => {
  try {
    const response = await httpService.get(
      `/general-parameters/parameter/${param}`,
    );
    return response.data;
  } catch (error) {
    throw new Error('Error fetching about us data');
  }
};

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
    throw new Error(`Error fetching parameter: ${param}`);
  }
};

export const getAllParameters = async () => {
  try {
    const response = await httpService.get('/general-parameters');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching all parameters');
  }
};

export const createParameter = async (data: any) => {
  try {
    const response = await httpService.post('/general-parameters', data);
    return response.data;
  } catch (error) {
    throw new Error('Error creating parameter');
  }
};

export const updateParameter = async (data: any) => {
  try {
    const response = await httpService.put('/general-parameters', data);
    return response.data;
  } catch (error) {
    throw new Error('Error updating parameter');
  }
};

export const getParametersByQuery = async (parameters: string[]) => {
  try {
    const queryString = parameters.join(',');
    const response = await httpService.get(
      `/general-parameters/by-parameters?parameters=${queryString}`,
    );
    return response.data;
  } catch (error) {
    throw new Error('Error fetching parameters by query');
  }
};

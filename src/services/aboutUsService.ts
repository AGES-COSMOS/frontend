import { httpService } from './httpService';
import axios from 'axios';
// Em aboutUsService.ts
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

//const BASE_URL = 'http://localhost:3000';


export const getAboutUs = async () => {
  try {
    const response = await httpService.get('/about-us');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching about us data');
  }
};

// Função para atualizar os dados de "About Us"
export const updateAboutUs = async (id: string, data: any) => {
  try {
    const response = await httpService.put(`/about-us/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error('Error updating about us data');
  }
};



// essa função não existe!!!!!!!!!!
//export const updateAboutUs = () => {return null};

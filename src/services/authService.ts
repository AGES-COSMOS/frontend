import { httpService } from './httpService';
import { LoginDto } from './types';

export const loginUser = async (loginData: LoginDto): Promise<void> => {
  try {
    const response = await httpService.post('/login', loginData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { id, role_id, token } = response.data;

    // Salvar dados no localStorage
    localStorage.setItem('userId', id);
    localStorage.setItem('roleId', role_id);
    localStorage.setItem('jwtToken', token);
  } catch (error) {
    throw new Error('Erro ao realizar login.');
  }
};

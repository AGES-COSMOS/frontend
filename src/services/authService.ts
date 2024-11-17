import { httpService } from './httpService';
import { LoginDto } from './types';

export const loginUser = async (loginData: LoginDto): Promise<void> => {
  try {
    const response = await httpService.post('/auth/login', loginData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { user_id, role_id, role, access_token } = response.data;

    // Salvar dados no localStorage
    localStorage.setItem('userId', user_id);
    localStorage.setItem('role', role);
    localStorage.setItem('roleId', role_id);
    localStorage.setItem('jwtToken', access_token);
  } catch (error) {
    throw new Error('Erro ao realizar login.');
  }
};

import { httpService } from './httpService';
import { CreateCategory, UpdateCategory } from './types';

export const getAllCategories = async () => {
  try {
    const response = await httpService.get('/control-panel-category');
    return response.data;
  } catch (error) {
    throw new Error('Erro ao carregar as categorias.');
  }
};

export const addCategory = async (category: CreateCategory) => {
  try {
    const response = await httpService.post(
      '/control-panel-category',
      category,
    );
    return response.data;
  } catch (error) {
    throw new Error('Erro ao adicionar a categoria.');
  }
};

export const updateCategory = async (category: Partial<UpdateCategory>) => {
  try {
    const response = await httpService.put('/control-panel-category', category);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao adicionar a categoria.');
  }
};

export const deleteCategory = async (categoryId: number) => {
  try {
    const response = await httpService.delete(
      `/control-panel-category/${categoryId}`,
    );
    return response.data;
  } catch (error) {
    throw new Error('Erro ao deletar categoria.');
  }
};

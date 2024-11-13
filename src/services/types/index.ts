export interface GeneralParameter {
  id: number;
  parameter: string;
  content: string;
  updatedBy: string;
}

export interface Pagination<Type> {
  data: Type[];
  total: number;
  page: number;
  lastPage: number;
}
export interface CreateUser {
  name: string;
  email: string;
  password: string;
  phone?: string;
  cpfcnpj?: string;
  photoURL?: string;
  blocked: boolean;
  registration_number?: string;
  institution_id: number;
  role_id: number;
}

export interface LoginDto {
  email: string;
  password: string;
}

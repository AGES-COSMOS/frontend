export interface GeneralParameter {
  id: number;
  parameter: string;
  content: string;
  updatedBy: string;
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

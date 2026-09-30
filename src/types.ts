export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
  createdAt: string;
}

export interface ONG {
  id: string;
  name: string;
  area: string;
  description: string;
  mission: string;
  vision: string;
  values: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  website?: string;
  volunteerCount: number;
  openings: number;
  image: string;
  founded: string;
}

export interface Area {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  count: number;
}

export type Page =
  | 'home'
  | 'login'
  | 'register'
  | 'areas'
  | 'ongs'
  | 'ong-detail'
  | 'donate';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

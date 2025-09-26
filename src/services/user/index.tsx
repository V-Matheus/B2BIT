import { api } from '../api';

export interface UserProps {
  name: string;
  email: string;
  avatar: {
    high: string;
    low: string;
    medium: string;
  }
}

export async function getUser() {
  const response = await api.get<UserProps>('/auth/profile/');

  return response.data;
}

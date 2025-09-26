import { api } from '../api';
import { destroyCookie, setCookie } from 'nookies';

interface LoginProps {
  tokens: {
    access: string;
    refresh: string;
  };
  user: {
    created: string;
    id: number;
    is_active: boolean;
    modified: string;
    role: string;
    type: string;
    name: string;
    email: string;
    avatar: string | null;
  };
}

interface LoginParams {
  email: string;
  password: string;
}

export async function login({ email, password }: LoginParams) {
  const response = await api.post<LoginProps>('auth/login/', {
    email,
    password,
  });

  setCookie(undefined, 'auth.access_token', response.data.tokens.access, {
    maxAge: 60 * 60 * 24 * 30, // 30 dias
    secure: true,
    sameSite: 'strict',
  });

  setCookie(undefined, 'auth.refresh_token', response.data.tokens.refresh, {
    maxAge: 60 * 60 * 24 * 30, // 30 dias
    secure: true,
    sameSite: 'strict',
  });

  return response.data.user;
}

export function signOut() {
  destroyCookie(undefined, 'auth.access_token');
  destroyCookie(undefined, 'auth.refresh_token');
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

interface SearchUserDataProps {
  name: string;
  email: string;
  avatar: string | null;
}

const useUserData = () => {
  const [userData, setUserData] = useState<SearchUserDataProps>({
    name: '',
    email: '',
    avatar: '',
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('tokenUser');
      if (token) navigate('/profile');

      const response = await fetch(
        'https://api.homologation.cliqdrive.com.br/auth/login/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json;version=v1_web',
          },
          body: JSON.stringify({ email, password }),
        },
      );

      const loginData: LoginProps = await response.json();
      const tokenUser = loginData.tokens.access;

      localStorage.setItem('tokenUser', tokenUser);

      if (email === 'cliente@youdrive.com' && password === 'password')
        navigate('/profile');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchUserData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('tokenUser');
      
      if (!token) navigate('/');
      const response = await fetch(
        'https://api.homologation.cliqdrive.com.br/auth/profile/',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json;version=v1_web',
            'Content-Type': 'application/json',
          },
        },
      );

      const userData: SearchUserDataProps = await response.json();
      setUserData(userData);
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  return { userData, loading, login, searchUserData };
};

export default useUserData;

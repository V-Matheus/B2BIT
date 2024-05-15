import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

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
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('tokenUser');
      if (token) {
        navigate('/profile');
        return null;
      }

      const response = await axios.post(
        'https://api.homologation.cliqdrive.com.br/auth/login/',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json;version=v1_web',
          },
        },
      );

      const loginData: LoginProps = await response.data;
      const tokenUser = loginData.tokens.access;

      localStorage.setItem('tokenUser', tokenUser);
    } catch (error) {
      toast.error('Invalid email or password', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } finally {
      setLoading(false);
    }
  };

  const searchUserData = async (token: string | null) => {
    try {
      setLoading(true);

      if (!token) {
        navigate('/');
        return null;
      }

      const response = await axios.get(
        'https://api.homologation.cliqdrive.com.br/auth/profile/',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json;version=v1_web',
            'Content-Type': 'application/json',
          },
        },
      );

      const userData: SearchUserDataProps = await response.data;
      return userData;
    } catch (error) {
      toast.error('Error when fetching user data', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } finally {
      setLoading(false);
    }
  };

  const autoLogin = (token: string | null) => {
    if (token) {
      navigate('/profile');
    }
  };

  return { searchUserData, loading, login, autoLogin };
};

export default useUserData;

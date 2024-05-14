import React, { useEffect } from 'react';
import logo from '../assets/logo.svg';

interface DadosUserProps {
  tokens: {
    access: string,
    refresh: string
  },
  user: {
    avatar: string | null,
    created: string,
    email: string,
    id: number,
    is_active: boolean,
    modified: string,
    name: string,
    role: string,
    type: string
  }
}

const Auth: React.FC = () => {
  useEffect(() => {
    async function login() {
      const data = {
        email: 'cliente@youdrive.com',
        password: 'password',
      };

      try {
        const response = await fetch(
          'https://api.homologation.cliqdrive.com.br/auth/login/',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json;version=v1_web',
            },
            body: JSON.stringify(data),
          },
        );

        const dadosUser: DadosUserProps = await response.json();
        const tokenUser = dadosUser.tokens.access

        localStorage.setItem('tokenUser', tokenUser);
      } catch (error) {
        console.error('Erro:', error);
      }
    }

    login();
  }, []);

  function handleLogin(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
  }

  return (
    <main className="border-4 border-none py-8 px-5 w-[438px] shadow-3xl rounded-3xl">
      <div className="flex justify-center">
        <img src={logo} width="309.6px" height="94.81px" alt="Logo b2bit" />
      </div>

      <form action="" className="flex flex-col w-full gap-2 mt-5">
        <label className="text-lg w-full" htmlFor="email">
          E-mail
        </label>
        <input
          className="font-normal bg-gray-100 pl-2 rounded-md"
          id="email"
          type="email"
          placeholder="@gmail.com"
        />

        <label className="text-lg w-full" htmlFor="password">
          Password
        </label>
        <input
          className="font-normal bg-gray-100 pl-2 rounded-md"
          id="password"
          type="password"
          placeholder="****************"
        />

        <button
          onClick={(event) => handleLogin(event)}
          className="bg-blue-950 text-gray-100 rounded-lg"
        >
          Sign In
        </button>
      </form>
    </main>
  );
};

export default Auth;

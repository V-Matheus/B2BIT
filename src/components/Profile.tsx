import React, { useEffect, useState } from 'react';
import profileSkeleton from '../assets/profileSkeleton.jpg';
import { useNavigate } from 'react-router-dom';

interface UserDadosProps {
  name: string;
  email: string;
  avatar: string | null;
}

export const Profile: React.FC = () => {
  const [userDados, setUserDados] = useState<UserDadosProps>({
    name: '',
    email: '',
    avatar: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function searchUserData() {
      try {
        const token = localStorage.getItem('tokenUser');

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

        const dadosUser: UserDadosProps = await response.json();
        setUserDados({
          name: dadosUser.name,
          email: dadosUser.email,
          avatar: dadosUser.avatar,
        });
      } catch (error) {
        console.error('Erro:', error);
      }
    }

    searchUserData();
  }, []);

  function handleLogout() {
    localStorage.removeItem('tokenUser');
    navigate('/');
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <header className="fixed top-0 left-0 w-full bg-white z-10">
        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            className="bg-blue-950 text-gray-100 rounded-lg m-4 w-40"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="bg-white border-none py-8 px-5 w-[438px] shadow-md rounded-3xl">
        <div className="flex flex-col justify-center items-center text-center">
          <h1>Profile picture</h1>
          <img
            className="rounded-lg"
            src={userDados.avatar ? userDados.avatar : profileSkeleton}
            width={58}
            alt=""
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex w-full flex-col">
            <label className="text-lg font-normal">
              Your <strong>Name</strong>
            </label>

            <input
              disabled
              className="font-normal bg-gray-100 pl-2 rounded-md w-full"
              value={userDados.name}
            />
          </div>

          <div className="flex w-full flex-col">
            <label className="text-lg font-normal">
              Your <strong>E-mail</strong>
            </label>

            <input
              disabled
              className="font-normal bg-gray-100 pl-2 rounded-md w-full"
              value={userDados.email}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

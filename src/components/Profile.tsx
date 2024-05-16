import profileSkeleton from '../assets/profileSkeleton.jpg';
import { useNavigate } from 'react-router-dom';
import useUserData from '../hooks/useUserData';
import { useEffect, useState } from 'react';

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

  const { searchUserData, loading } = useUserData();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('tokenUser');
      const userData = await searchUserData(token);
      if (userData) setUserDados(userData);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleLogout() {
    localStorage.removeItem('tokenUser');
    navigate('/');
  }

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white z-10">
        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            className="bg-blue-950 text-gray-100 rounded-lg m-4 w-40 hover:bg-blue-700 transition-all"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="border-4 border-none py-8 px-5 w-[438px] shadow-3xl rounded-3xl">
        <div className="flex flex-col justify-center items-center text-center">
          <h1>Profile picture</h1>

          {loading ? (
            <div
              className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-black"
              role="status"
            ></div>
          ) : (
            <img
              className="rounded-lg"
              src={userDados.avatar ? userDados.avatar : profileSkeleton}
              width={58}
              alt="profile image"
            />
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex w-full flex-col">
            <p className="text-lg font-normal" data-testId='name-p'>
              Your <strong>Name</strong>
            </p>

            <h1 className="font-normal bg-gray-100 pl-2 rounded-md w-full"  data-testid="name-h1">
              {loading ? (
                <div
                  className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-black"
                  role="status"
                ></div>
              ) : (
                `${userDados.name}`
              )}
            </h1>
          </div>

          <div className="flex w-full flex-col">
            <p className="text-lg font-normal" data-testId='email-p'>
              Your <strong>E-mail</strong>
            </p>

            <h1 className="font-normal bg-gray-100 pl-2 rounded-md w-full" data-testid="email-h1">
              {loading ? (
                <div
                  className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-black"
                  role="status"
                ></div>
              ) : (
                `${userDados.email}`
              )}
            </h1>
          </div>
        </div>
      </main>
    </>
  );
};

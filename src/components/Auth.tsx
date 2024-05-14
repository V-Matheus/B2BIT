import React from 'react';
import logo from '../assets/logo.svg';

const Auth: React.FC = () => {
  return (
    <main className="border-4 border-none py-8 px-5 w-[438px] shadow-3xl rounded-3xl">
      <div className='flex justify-center'>
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

        <button className="bg-blue-950 text-gray-100 rounded-lg">
          Sign In
        </button>
      </form>
    </main>
  );
};

export default Auth;

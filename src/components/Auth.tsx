import React from 'react';
import logo from '../assets/logo.svg';

const Auth: React.FC = () => {
  return (
    <main className='border-4 border-none p-10 shadow-2xl rounded-3xl'>
      <img src={logo} width="309.6px" height="94.81px" alt="Logo b2bit" />

      <form action="" className="flex flex-col w-full gap-4 mt-5">
        <label className="text-lg w-full" htmlFor="email">
          E-mail
        </label>
        <input className='font-normal  bg-gray-100' id="email" type="email" placeholder="@gmail.com" />

        <label className="text-lg w-full" htmlFor="password">
          Password
        </label>
        <input className='font-normal bg-gray-100' id="password" type="password" placeholder="****************" />

        <button className='bg-blue-800 text-gray-100 rounded-lg'>Sign In</button>
      </form>
    </main>
  );
};

export default Auth;



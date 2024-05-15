import React from 'react';
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <main className="border-4 border-none py-8 px-5 w-[438px] shadow-3xl rounded-3xl">
      <div className="flex justify-center">
        <img src={logo} width="309.6px" height="94.81px" alt="Logo b2bit" />
      </div>

      <div className="flex justify-center items-center flex-col w-full py-5">
        <h1 className="text-[3rem]">Error 404</h1>
        <p className="text-xl pt-2">Page not found</p>
      </div>

      <Link
        to={'/'}
        type="submit"
        className="bg-blue-950 text-gray-100 rounded-lg mt-5 flex items-center justify-center gap-5 h-14 hover:bg-blue-700 transition-all"
      >
        Back to Home
      </Link>
    </main>
  );
};

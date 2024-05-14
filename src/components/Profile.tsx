import React from 'react';
import profileSkeleton from '../assets/profileSkeleton.jpg';

export const Profile: React.FC = () => {
  return (
    <body className="flex flex-col justify-center items-center">
      <header className="fixed top-0 left-0 w-full bg-white z-10">
        <div className="flex justify-end">
          <button className="bg-blue-950 text-gray-100 rounded-lg m-4 w-40">
            Logout
          </button>
        </div>
      </header>

      <main className="bg-white border-none py-8 px-5 w-[438px] shadow-md rounded-3xl">
        <div className="flex flex-col justify-center items-center text-center">
          <h1>Profile picture</h1>
          <img className='rounded-lg' src={profileSkeleton} width={58} alt="" />
        </div>

        <div className='flex flex-col gap-4'>
          <div className="flex w-full flex-col">
            <label className="text-lg font-normal">Your <strong>Name</strong></label>

            <input
              className="font-normal bg-gray-100 pl-2 rounded-md w-full"
              value="Victor Matheus"
            />
          </div>

          <div className="flex w-full flex-col">
          <label className="text-lg font-normal">Your <strong>E-mail</strong></label>

            <input
              className="font-normal bg-gray-100 pl-2 rounded-md w-full"
              value="victormatheus507@gmail.com"
            />
          </div>
        </div>
      </main>
    </body>
  );
};

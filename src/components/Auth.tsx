import React from 'react';
import logo from '../assets/logo.svg';

const Auth: React.FC = () => {
  return (
    <main>
      <img src={logo} width="309.6px" height="94.81px" alt="Logo b2bit" />

      <form action="" className="flex flex-col w-full gap-4">
        <label className="size-[18px] w-full" htmlFor="email">
          E-mail
        </label>
        <input id="email" type="email" placeholder="@gmail.com" />

        <label className="size-[18px] w-full" htmlFor="password">
          Password
        </label>
        <input id="password" type="password" placeholder="****************" />
      </form>
    </main>
  );
};

export default Auth;



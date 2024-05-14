import React, { useEffect } from 'react';
import logo from '../assets/logo.svg';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

interface DadosUserProps {
  tokens: {
    access: string;
    refresh: string;
  };
  user: {
    avatar: string | null;
    created: string;
    email: string;
    id: number;
    is_active: boolean;
    modified: string;
    name: string;
    role: string;
    type: string;
  };
}

const Auth: React.FC = () => {
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .min(3, 'Too Short!')
      .max(70, 'Too Long!')
      .required('Required'),
  });

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
        const tokenUser = dadosUser.tokens.access;

        localStorage.setItem('tokenUser', tokenUser);
      } catch (error) {
        console.error('Erro:', error);
      }
    }

    login();
  }, []);

  return (
    <main className="border-4 border-none py-8 px-5 w-[438px] shadow-3xl rounded-3xl">
      <div className="flex justify-center">
        <img src={logo} width="309.6px" height="94.81px" alt="Logo b2bit" />
      </div>

      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {() => (
          <Form action="" className="flex flex-col w-full gap-2 mt-5">
            <label className="text-lg w-full" htmlFor="email">
              E-mail
            </label>
            <Field
              className="font-normal bg-gray-100 pl-2 rounded-md"
              name="email"
              id="email"
              type="email"
              placeholder="@gmail.com"
            />

            <div className='flex justify-between  w-full'>
              <label className="text-lg self-center" htmlFor="password">
                Password
              </label>
            </div>
            <Field
              className="font-normal bg-gray-100 pl-2 rounded-md"
              name="password"
              id="password"
              type="password"
              placeholder="****************"
            />

            <button
              type="submit"
              className="bg-blue-950 text-gray-100 rounded-lg"
            >
              Sign In
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default Auth;

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

export const Auth: React.FC = () => {
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
        {({ errors, touched, setTouched }) => (
          <Form action="" className="flex flex-col w-full gap-5 mt-5">
            <div>
              <div className="flex justify-between w-full">
                <label
                  className="text-center text-lg self-center"
                  htmlFor="email"
                >
                  E-mail
                </label>
                {errors.email && touched.email && (
                  <span className="text-red-400">{errors.email}</span>
                )}
              </div>
              <Field
                className={`font-normal bg-gray-100 pl-2 rounded-md w-full ${
                  errors.email && touched.email ? 'border-2 border-red-400' : ''
                }`}
                name="email"
                id="email"
                type="email"
                placeholder="@gmail.com"
                onBlur={() => setTouched({ ...touched, email: true })}
              />
            </div>

            <div>
              <div className="flex justify-between w-full">
                <label
                  className="text-center text-lg self-center"
                  htmlFor="password"
                >
                  Password
                </label>
                {errors.password && touched.password && (
                  <span className="text-red-400">{errors.password}</span>
                )}
              </div>
              <Field
                className={`font-normal bg-gray-100 pl-2 rounded-md w-full ${
                  errors.password && touched.password
                    ? 'border-2 border-red-400'
                    : ''
                }`}
                name="password"
                id="password"
                type="password"
                placeholder="****************"
                onBlur={() => setTouched({ ...touched, password: true })}
              />
            </div>

            <button
              type="submit"
              className="bg-blue-950 text-gray-100 rounded-lg mt-5"
            >
              Sign In
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
};

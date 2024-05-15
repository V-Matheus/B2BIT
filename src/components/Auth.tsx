import logo from '../assets/logo.svg';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import useUserData from '../hooks/useUserData';
import { useEffect } from 'react';

export const Auth: React.FC = () => {
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .min(3, 'Too Short!')
      .max(70, 'Too Long!')
      .required('Required'),
  });

  const { login, autoLogin, loading } = useUserData();

  useEffect(() => {
    const token = localStorage.getItem('tokenUser');
    autoLogin(token);
  }, [autoLogin]);

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
          login(values.email, values.password);
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
              className="bg-blue-950 text-gray-100 rounded-lg mt-5 flex items-center justify-center gap-5 h-14 hover:bg-blue-700 transition-all"
              disabled={loading}
            >
              {loading ? (
                <div
                  className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                  role="status"
                ></div>
              ) : (
                'Sign In'
              )}
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
};

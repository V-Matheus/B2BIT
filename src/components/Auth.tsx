import logo from '../assets/logo.svg';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import useUserData from '../hooks/useUserData';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from './ui/button';
import { Loader2Icon } from 'lucide-react';

export function Auth() {
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
    <>
      <Helmet>
        <title>B2BIT | Login</title>
        <meta
          name="description"
          content="Streamline access to your account with our secure login page."
        />
        <link rel="canonical" href="/" />
      </Helmet>

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
                    errors.email && touched.email
                      ? 'border-2 border-red-400'
                      : ''
                  }`}
                  name="email"
                  id="email"
                  type="email"
                  data-testid="email-field"
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
                  data-testid="password-field"
                  placeholder="****************"
                  onBlur={() => setTouched({ ...touched, password: true })}
                />
              </div>

              <Button
                className="bg-[#02274F] text-white hover:bg-[#02274F]/90 h-10"
                disabled={loading}
              >
                {loading ? <Loader2Icon className="animate-spin" /> : 'Sign In'}
              </Button>
            </Form>
          )}
        </Formik>
      </main>
    </>
  );
}

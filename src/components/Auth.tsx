import logo from '../assets/logo.svg';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { Input } from './ui/input';
import { login } from '@/services/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, FieldProps } from 'formik';
import * as Yup from 'yup';
import { Label } from './ui/label';
import { useState } from 'react';

const LoginSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Password must be at least 3 characters')
    .required('Password is required'),
});

interface LoginFormValues {
  email: string;
  password: string;
}

export function Auth() {
  const [loading, setLoading] = useState(false);

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };

  const navigate = useNavigate();

  const handleSubmit = async ({ email, password }: LoginFormValues) => {
    try {
      setLoading(true);
      const user = await login({ email, password });

      if (user) navigate('/profile');
    } catch (error) {
      console.error('Login error:', error);

      toast.error('Invalid email or password', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col border-4 border-none py-8 px-5 w-[438px] shadow-3xl rounded-3xl bg-white gap-5">
      <div className="flex justify-center">
        <img src={logo} width="309.6px" height="94.81px" alt="Logo b2bit" />
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="flex flex-col gap-5">
            <div className="grid w-full items-center gap-3">
              <Label htmlFor="email" className="font-bold">
                Email
              </Label>
              <Field name="email">
                {({ field }: FieldProps) => (
                  <Input
                    {...field}
                    type="email"
                    id="email"
                    className={`placeholder:font-light ${
                      errors.email && touched.email ? 'border-red-500' : ''
                    }`}
                    placeholder="@gmail.com"
                  />
                )}
              </Field>
              <ErrorMessage
                name="email"
                component="p"
                className="text-sm text-red-500 font-medium"
              />
            </div>

            <div className="grid w-full items-center gap-3">
              <Label htmlFor="password" className="font-bold">
                Password
              </Label>
              <Field name="password">
                {({ field }: FieldProps) => (
                  <Input
                    {...field}
                    type="password"
                    id="password"
                    className={`placeholder:font-light ${
                      errors.password && touched.password
                        ? 'border-red-500'
                        : ''
                    }`}
                    placeholder="Your Password"
                  />
                )}
              </Field>
              <ErrorMessage
                name="password"
                component="p"
                className="text-sm text-red-500 font-medium"
              />
            </div>

            <Button
              type="submit"
              className="bg-[#02274F] text-white hover:bg-[#02274F]/90 h-10 w-full"
              disabled={loading || isSubmitting}
            >
              {loading || isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                'Sign In'
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </main>
  );
}

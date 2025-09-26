import logo from '../assets/logo.svg';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useUserData from '../hooks/useUserData';
import { Button } from './ui/button';
import { Loader2Icon } from 'lucide-react';
import { Input } from './ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { useForm } from 'react-hook-form';

const LoginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(3, 'Password must be at least 3 characters'),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

export function Auth() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { loading } = useUserData();

  const onSubmit = async (values: LoginFormValues) => {
    console.log('Form Values:', values);
  };

  return (
    <>
      {/* <Helmet>
        <title>B2BIT | Login</title>
        <meta
          name="description"
          content="Streamline access to your account with our secure login page."
        />
        <link rel="canonical" href="/" />
      </Helmet> */}

      <main className="flex flex-col border-4 border-none py-8 px-5 w-[438px] shadow-3xl rounded-3xl bg-white gap-5">
        <div className="flex justify-center">
          <img src={logo} width="309.6px" height="94.81px" alt="Logo b2bit" />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      className="placeholder:font-light"
                      placeholder="@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="placeholder:font-light"
                      placeholder="Your Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="mt-5 bg-[#02274F] text-white hover:bg-[#02274F]/90 h-10 w-full"
              disabled={loading}
            >
              {loading ? <Loader2Icon className="animate-spin" /> : 'Sign In'}
            </Button>
          </form>
        </Form>
      </main>
    </>
  );
}

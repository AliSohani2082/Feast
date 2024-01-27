'use client';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loader from '@/components/shared/Loader';
import { useToast } from '@/components/ui/use-toast';

import { SigninValidation } from '@/lib/validation';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/shared/Logo';
import { signIn } from '@/lib/api';
import { Card } from '@/components/ui/card';

const SigninForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const { login } = useAuth()
  const handleSignin = async (user: z.infer<typeof SigninValidation>) => {
    try {
      const result = await signIn({
        username: `@${user.username}`,
        password: user.password
      })
      // const userData = JSON.parse(result.data) 
      // console.log("ddd")
      console.log(result.data.content)
      const userData = {
        id: `${result.data.content[0][0]}` as string,
        username: result.data.content[0][4] as string,
        email: result.data.content[0][2] as string,
        imageUrl: result.data.content[0][5] as string,
      }
      login(userData)
      // localStorage.setItem("profile", userData)
      router.push("/")
      toast.success("signed In seccessfully")
    } catch(error) {
      console.log("error ocured", error)
    }
  };

  return (
    <Card className='flex justify-center items-center p-10 sm:w-420 w-1/2'>
      <Form {...form}>
        <div className="w-full flex-center flex-col">
          <Logo size="md" />

          <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
            Log in to your account
          </h2>
          <p className="text-light-3 small-medium md:base-regular mt-2">
            Welcome back! Please enter your details.
          </p>
          <form
            onSubmit={form.handleSubmit(handleSignin)}
            className="flex flex-col gap-5 w-full mt-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Username</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
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
                  <FormLabel className="shad-form_label">Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="shad-button_primary">
              Log in
            </Button>

            <p className="text-small-regular text-light-2 text-center mt-2">
              Don&apos;t have an account?
              <Link
                href="/sign-up"
                className="text-primary-500 text-small-semibold ml-1"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </Form>
    </Card>
  );
};

export default SigninForm;

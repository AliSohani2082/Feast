'use client';

import { useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loader from '@/components/shared/Loader';
import { useToast } from '@/components/ui/use-toast';

// import { createUserAccount, signInAccount } from '@/lib/appwrite/api';
import { SignupValidation } from '@/lib/validation';
import Logo from '@/components/shared/Logo';
import { useAuth } from '@/context/AuthContext';
import { signUp } from '@/lib/api';
import { Card } from '@/components/ui/card';

const SignUpForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Handler
  const handleSignup = async (user: z.infer<typeof SignupValidation>) => {
    try {
      const result = await signUp({
        full_name: user.name,
        email: user.email,
        password: user.password,
        username: `@${user.username}`,
        profile_image: "",
        phone_number: "",
      })
      console.log(result.data[0])
      localStorage.setItem("profile", result.data[0])
      router.push("/")
    } catch(error) {
      console.log("Error fetching data: ", error)
    }
  };

  return (
    <Card className='flex justify-center items-center p-10 w-1/2 sm:w-[420px]'>
      <Form {...form}>
        <div className="w-full flex-center flex-col">
          <Logo size="md" />
          <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
            Create a new account
          </h2>
          <p className="text-light-3 small-medium md:base-regular mt-2">
            To use feast, Please enter your details
          </p>

          <form
            onSubmit={form.handleSubmit(handleSignup)}
            className="flex flex-col gap-5 w-full mt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Name</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Email</FormLabel>
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input type="password" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <Button type="submit" className="shad-button_primary">
              Sign Up
            </Button> */}

            <Button type="submit" className="shad-button_primary">
              
              Sign Up
            </Button>

            <p className="text-small-regular text-light-2 text-center mt-2">
              Already have an account?
              <Link
                href="/sign-in"
                className="text-primary-500 text-small-semibold ml-1"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </Form>
    </Card>
  );
};

export default SignUpForm;
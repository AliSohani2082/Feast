"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from "yup";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { yupResolver } from "@hookform/resolvers/yup";

const signInFormSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(4).required(),
});
type SignInFormValues = yup.InferType<typeof signInFormSchema>;

const signUpFormSchema = yup.object({
  username: yup.string().min(2).required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).required(),
  confirmPassword: yup
    .string()
    .min(4)
    .oneOf(
      [yup.ref("password")],
      "the password is deferent than the confirmed password."
    ),
});
type SignUpFormValues = yup.InferType<typeof signUpFormSchema>;

const AuthForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [variant, setVariant] = useState<"login" | "register">("login");

  const title = variant === "login" ? "SignIn" : "SignUp";

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const signInForm = useForm<SignInFormValues>({
    resolver: yupResolver(signInFormSchema),
  });

  const signUpForm = useForm<SignUpFormValues>({
    resolver: yupResolver(signUpFormSchema),
  });

  const login = async (data: SignInFormValues) => {
    try {
      console.log(data);
      // setTimeout(() => console.log("data before login: ", data), 10000);

      // await signIn("credentials", {
      //   ...data,
      //   callbackUrl: "/",
      // });
    } catch (error) {
      console.log(error);
    }
  };

  const signUp = async (data: SignUpFormValues) => {
    console.log("data in the client: ", data);
    try {
      console.log(data);
      // const response = await axios.post("/api/register", data);

      // if (response.status === 200) {
      //   login({ email: data.email, password: data.password });
      // }
    } catch (error) {
      console.log("Axios error: ", error);
    }
  };

  return (
    <Tabs
      defaultValue="signIn"
      className="w-[500px] h-[600px]"
      onValueChange={toggleVariant}
    >
      <TabsList className="grid w-full grid-cols-2 my-2">
        <TabsTrigger value="signIn">SignIn</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{variant === "login" ? "SignIn" : "SignUp"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col justify-center items-stretch gap-3 w-full">
            <Button type="button" variant="secondary">
              Sing in with google
            </Button>
            <Button type="button" variant="secondary">
              Sing in with github
            </Button>
          </div>
          <TabsContent value="signIn">
            <Form {...signInForm}>
              <form
                onSubmit={signInForm.handleSubmit(login)}
                className="space-y-8 w-full h-full"
              >
                <div className="flex flex-col items-stretch justify-start gap-1">
                  <FormField
                    control={signInForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Email here"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signInForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            type="password"
                            placeholder="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button disabled={loading} className="ml-auto" type="submit">
                  {title}
                </Button>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="register">
            <Form {...signUpForm}>
              <form
                onSubmit={signUpForm.handleSubmit(signUp)}
                className="space-y-8 w-full h-full"
              >
                <div className="flex flex-col items-stretch justify-start gap-1">
                  <FormField
                    control={signUpForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Username here"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signUpForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Email here"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signUpForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            type="password"
                            placeholder="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signUpForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm password</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            type="password"
                            placeholder="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button disabled={loading} className="ml-auto" type="submit">
                  {title}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
};

export default AuthForm;

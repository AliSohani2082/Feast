import React from 'react';
import SignInForm from './components/signInForm';

type Props = {};

const signIn = (props: Props) => {
  return (
    <div className="flex w-full items-center justify-center">
      <SignInForm />
    </div>
  );
};

export default signIn;

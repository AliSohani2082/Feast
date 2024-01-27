import React from 'react';
import SignUpForm from './components/signUpForm';

type Props = {};

const signUp = (props: Props) => {
  return (
    <div className="flex justify-center items-center w-full">
      <SignUpForm />
    </div>
  );
};

export default signUp;

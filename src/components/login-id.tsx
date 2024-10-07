
import {
  Card,
  Input,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import { useContext, useEffect, useState } from 'react';
import TransactionDataContext from '../context/TransactionDataContextProvider';

export default function LoginId() {
  const { prompt, screen, state, getLink, getFieldErrors } = useContext(TransactionDataContext);
  const [email, setEmail] = useState('');
  const [signupLink, setSignupLink] = useState('');
  // const [forgotPasswordLink, setForgotPasswordLink] = useState('');
  const usernameErrors = getFieldErrors("username") || [];

  useEffect(() => {
    console.log('Prompt:', prompt);
    console.log('Screen:', screen);
    const signuplink = getLink('signup');
    setSignupLink(signuplink);
   // const forgotPasswordLink = getLink('forgot_password');
    // setForgotPasswordLink(forgotPasswordLink);
  }, [prompt, screen, getLink]);

  // const handleSubmit = (event: any) => {
  //   event.preventDefault(); // Prevent page reload
  //   console.log('Email:', email);
  // };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      {/* @ts-ignore */}
      <Card color="transparent" shadow={false}>
        {/* @ts-ignore */}
        <Typography variant="h3" color="blue-gray" className="text-center mb-6">
          Sign In
        </Typography>
        <form method="POST" className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <input type="hidden" name="state" value={state} />
          <div className="mb-1 flex flex-col gap-6">
            {/* @ts-ignore */}
            <Input
              label="Email"
              name="username"
              size="lg"
              placeholder="name@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex flex-col gap-4"
            />
            {/* Display email errors using Alert */}
            {usernameErrors.map((error, index) => (
              <Alert key={index} color="red" className="mt-1">
                {error.message}
              </Alert>
            ))}
          </div>
          {/* @ts-ignore */}
          <Button type="submit" name="action" value="default" className="mt-6" fullWidth>
            Continue
          </Button>
          {/* @ts-ignore */}
          <Typography color="gray" className="mt-4 text-center font-normal">
            Dont have an account?{" "}
            <a href={signupLink} className="font-medium text-gray-900">
              Signup
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
}

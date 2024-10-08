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
  const { prompt, screen, state, getLink, getFieldErrors, client, tenant } = useContext(TransactionDataContext);
  const [email, setEmail] = useState('');
  const [signupLink, setSignupLink] = useState('');
  const usernameErrors = getFieldErrors("username") || [];

  useEffect(() => {
    console.log('Prompt:', prompt);
    console.log('Screen:', screen);
    console.log('Client:', client.name);
    const signuplink = getLink('signup');
    setSignupLink(signuplink);
  }, [prompt, screen, getLink]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* @ts-ignore */}
      <Card color="transparent" shadow={true} className="p-6 w-full max-w-md">
        {/* @ts-ignore */}
        <Typography variant="h3" color="blue-gray" className="text-center mb-6">
          Sign In
        </Typography>
        {/* @ts-ignore */}
        <Typography variant="paragraph" color="blue-gray" className="text-center mb-6">
          Log in to {tenant.friendly_name} to continue to {client.name}
        </Typography>
        <form method="POST" className="mt-4 mb-4">
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
          <Typography color="gray" className="mt-6 text-center font-normal">
            Don’t have an account?{" "}
            <a href={signupLink} className="ml-1 font-bold">
              Signup
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
}

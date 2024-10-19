
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-500">
      <Card shadow={true} className="p-10 w-full max-w-2xl h-auto bg-white rounded-lg border border-gray-300">
        <Typography variant="h3" color="blue-gray" className="text-center mb-6 font-bold text-indigo-600 text-3xl">
          Sign In
        </Typography>

        <Typography variant="lead" color="blue-gray" className="text-center block font-medium mb-2">
          Log in to {tenant.friendly_name} to continue to {client.name}
        </Typography>

        <form method="POST" className="space-y-8 mt-4 mb-4">
          <input type="hidden" name="state" value={state} />
          
          {/* Error Display */}
          {usernameErrors.length > 0 && (
            <Alert color="red" className="mb-4">
              {usernameErrors.map((error, index) => error.message).join(', ')}
            </Alert>
          )}

          <div className="flex flex-col gap-6">
            {/* Email Input */}
            <div>
              <Input
                label="Email"
                name="username"
                type="email"
                size="md"
                placeholder="name@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="!text-lg !py-4 !h-14 !w-full border-gray-300 focus:border-indigo-600 focus:ring-indigo-600"
                labelProps={{
                  className: 'text-base text-gray-700',
                }}
                //@ts-ignore 
                inputProps={{
                  className: 'text-lg placeholder:text-gray-400',
                  'aria-invalid': usernameErrors.length > 0,
                }}
                required
              />
            </div>
          </div>

          <Button size="lg" type="submit" name="action" value="default" className="w-full bg-indigo-600 hover:bg-indigo-700 text-lg py-3">
            Continue
          </Button>

          <Typography variant="lead" color="gray" className="mt-4 text-center text-xl">
            Don’t have an account?{" "}
            <a href={signupLink} className="ml-1 font-bold text-indigo-600 hover:text-indigo-700">
              Signup
            </a>
          </Typography>

          <Button variant="outlined" size="lg" type="submit" name="connection" value="google-oauth2" className="flex h-12 border-blue-gray-200 items-center justify-center gap-2 w-full">
            <img src={`https://www.material-tailwind.com/logos/logo-google.png`} alt="google" className="h-6 w-6" />{" "}
            sign in with google
          </Button>
        </form>
      </Card>
    </div>
  );
}

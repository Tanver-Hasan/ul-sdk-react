import { useContext, useEffect, useState } from 'react';
import TransactionDataContext from '../context/TransactionDataContextProvider';
import { Card, Input, Button, Typography, Alert } from "@material-tailwind/react";

const LoginPassword = () => {
    const { prompt, screen, state, getSubmittedFormData, getFieldErrors, getLink } = useContext(TransactionDataContext);

    // Get the submitted form data
    const submittedFormData = getSubmittedFormData;
    const username = getSubmittedFormData("username") || '';
    const [forgotPasswordLink, setForgotPasswordLink] = useState('');
    // Local state for email and password
    const [email, setEmail] = useState(username); // Populate with the username
    const [password, setPassword] = useState('');
    const [signupLink, setSignupLink] = useState('');

    // Get field errors for email and password
    const emailErrors = getFieldErrors("username") || [];
    const passwordErrors = getFieldErrors("password") || [];

    useEffect(() => {
        console.log(prompt);
        console.log(screen);
        console.log(state);
        console.log(submittedFormData);
        const forgotPasswordLink = getLink('forgot_password');
        setForgotPasswordLink(forgotPasswordLink);
        const signuplink = getLink('signup');
        setSignupLink(signuplink);
    }, [prompt, screen, state, submittedFormData, getLink]);

    // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault(); // Prevent page reload
    //     console.log('Email:', email);
    //     console.log('Password:', password);
    //     // Here you can handle the form submission logic (e.g., sending a POST request)
    // };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {/* @ts-ignore */}
            <Card color="transparent" shadow={true} className="p-6 w-full max-w-md">
                {/* @ts-ignore */}
                <Typography variant="h3" color="blue-gray" className='text-center mb-6'>
                    Sign In
                </Typography>
                <form method="POST" className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <input type="hidden" name="state" value={state} />
                    <div className="mb-1 flex flex-col gap-6">
                        {/* @ts-ignore */}
                        <Input
                            label='Email'
                            name="username"
                            size="lg"
                            placeholder="name@mail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex flex-col gap-4"
                        />
                        {/* Display email errors using Alert */}
                        {emailErrors.map((error, index) => (
                            <Alert key={index} color="red" className="mt-1">
                                {error.message}
                            </Alert>
                        ))}
                    </div>

                    <div className="mb-1 flex flex-col gap-6">
                        {/* @ts-ignore */}
                        <Input
                            label='Password'
                            name='password'
                            type="password"
                            size="lg"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="flex flex-col gap-4"
                        />
                        {/* Display password errors using Alert */}
                        {passwordErrors.map((error, index) => (
                            <Alert key={index} color="red" className="mt-1">
                                {error.message}
                            </Alert>
                        ))}
                    </div>
                    {/* @ts-ignore */}
                    <Button type="submit" className="mt-6" fullWidth>
                        Continue
                    </Button>
                    {/* @ts-ignore */}
                    <Typography color="gray" className="mt-4 text-center font-normal">
                        Dont have an account?{" "}
                        <a href={signupLink} className="font-medium text-gray-900">
                            Signup
                        </a>
                    </Typography>
                    {/* @ts-ignore */}
                    <Typography color="gray" type='text' className="mt-4 text-center font-normal">

                        <a href={forgotPasswordLink} className="font-medium text-gray-900">
                            Forgot Password
                        </a>
                    </Typography>
                </form>
            </Card>
        </div>
    );
};

export default LoginPassword;

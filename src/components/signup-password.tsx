import { useContext, useEffect, useState } from 'react';
import TransactionDataContext from '../context/TransactionDataContextProvider';
import { Card, Input, Button, Typography, Alert } from "@material-tailwind/react";

const SignUpPassword = () => {
    const { prompt, screen, state, getSubmittedFormData, getFieldErrors, getLink } = useContext(TransactionDataContext);

    // Get the submitted form data
    const submittedFormData = getSubmittedFormData;
    const _email = getSubmittedFormData("email") || '';

    const [email, setEmail] = useState(_email);
    const [password, setPassword] = useState('');
    const [loginLink, setLoginLink] = useState('');
    // Get field errors for email and password
    const emailErrors = getFieldErrors("email") || [];
    const passwordErrors = getFieldErrors("password") || [];

    useEffect(() => {
        console.log(prompt);
        console.log(screen);
        console.log(state);
        console.log(submittedFormData);
        const link = getLink('login')
        setLoginLink(link);
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
            <Card color="transparent" shadow={false}>
                {/* @ts-ignore */}
                <Typography variant="h3" color="blue-gray" className='text-center mb-6'>
                    Sign Up
                </Typography>
                <form method="POST" className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <input type="hidden" name="state" value={state} />
                    <div className="mb-1 flex flex-col gap-6">
                        {/* @ts-ignore */}
                        <Input
                            label='Email'
                            name="email"
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
                       
                        <a href={loginLink} className="font-medium text-gray-900">
                            Go Back
                        </a>
                    </Typography>
                </form>
            </Card>
        </div>
    );
};

export default SignUpPassword;

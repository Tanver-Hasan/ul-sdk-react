

import { useContext, useEffect, useState } from 'react';
import TransactionDataContext from '../context/TransactionDataContextProvider';
import { Card, Input, Button, Typography, Alert } from "@material-tailwind/react";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'; // Import eye icons

const LoginPassword = () => {
    const { prompt, screen, state, getSubmittedFormData, getFieldErrors, getLink } = useContext(TransactionDataContext);

    const submittedFormData = getSubmittedFormData;
    const username = getSubmittedFormData("username") || '';
    const [forgotPasswordLink, setForgotPasswordLink] = useState('');
    const [email, setEmail] = useState(username); // Populate with the username
    const [password, setPassword] = useState('');
    const [signupLink, setSignupLink] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility

    // Get field errors for email and password
    const emailErrors = getFieldErrors("username") || [];
    const passwordErrors = getFieldErrors("password") || [];
    const allErrors = [...emailErrors, ...passwordErrors];

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

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-500">
            <Card shadow={true} className="p-10 w-full max-w-2xl  h-auto bg-white rounded-lg border border-gray-300">
                <Typography variant="h3" color="blue-gray" className='text-center mb-6 font-bold text-indigo-600 text-3xl'>
                    Sign In
                </Typography>

                <form method="POST" className="space-y-8 mt-4 mb-4">
                    <input type="hidden" name="state" value={state} />

                    {/* Error Display for All Fields */}
                    {allErrors.length > 0 && (
                        <Alert color="red" className="mb-4">
                            {allErrors.map((error, index) => error.message).join(', ')}
                        </Alert>
                    )}

                    {/* Email Input */}
                    <div>
                        <Input
                            label='Email'
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
                                'aria-invalid': emailErrors.length > 0,
                            }}
                            required
                            disabled
                        />
                    </div>

                    {/* Password Input with Icon */}
                    <div className="relative">
                        <Input
                            label='Password'
                            name='password'
                            type={passwordVisible ? "text" : "password"} // Toggle password visibility
                            size="md"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="!text-lg !py-4 !h-14 !w-full border-gray-300 focus:border-indigo-600 focus:ring-indigo-600"
                            labelProps={{
                                className: 'text-base text-gray-700',
                            }}
                            //@ts-ignore 
                            inputProps={{
                                className: 'text-lg placeholder:text-gray-400',
                                'aria-invalid': passwordErrors.length > 0,
                            }}
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                            {passwordVisible ? (
                                <EyeSlashIcon className="h-5 w-5 text-gray-600" /> // Icon when password is hidden
                            ) : (
                                <EyeIcon className="h-5 w-5 text-gray-600" /> // Icon when password is visible
                            )}
                        </button>
                    </div>

                    <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-lg py-3">
                        Continue
                    </Button>

                    <Typography color="gray" className="mt-4 text-center text-xl">
                        Don’t have an account?{" "}
                        <a href={signupLink} className="ml-1 font-bold text-indigo-600 hover:text-indigo-700">
                            Signup
                        </a>
                    </Typography>

                    <Typography color="gray" className="mt-4 text-center font-normal">
                        <a href={forgotPasswordLink} className="font-medium text-indigo-600 hover:text-indigo-700">
                            Forgot Password?
                        </a>
                    </Typography>
                </form>
            </Card>
        </div>
    );
};

export default LoginPassword;

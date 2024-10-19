
import { useContext, useEffect, useState } from 'react';
import TransactionDataContext from '../context/TransactionDataContextProvider';
import { Card, Input, Button, Typography, Alert } from "@material-tailwind/react";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const SignUpPassword = () => {
    const { state, getSubmittedFormData, getFieldErrors, getLink } = useContext(TransactionDataContext);

    const _email = getSubmittedFormData("email") || '';
    const [email, setEmail] = useState(_email);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [loginLink, setLoginLink] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility

    const emailErrors = getFieldErrors("email") || [];
    const passwordErrors = getFieldErrors("password") || [];
    const firstNameErrors = getFieldErrors("first-name") || [];
    const lastNameErrors = getFieldErrors("last-name") || [];

    const allErrors = [
        ...emailErrors,
        ...passwordErrors,
        ...firstNameErrors,
        ...lastNameErrors,
    ];

    useEffect(() => {
        const link = getLink('login');
        setLoginLink(link);
    }, [getLink]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-500">
            <Card shadow={true} className="p-10 w-full max-w-2xl h-auto bg-white rounded-lg border border-gray-300">
                <Typography
                    variant="h3"
                    color="blue-gray"
                    className="text-center mb-6 font-bold text-indigo-600 text-3xl"
                >
                    Create Your Account
                </Typography>

                <form method="POST" className="space-y-8">
                    <input type="hidden" name="state" value={state} />

                    {/* Error Display */}
                    {allErrors.length > 0 && (
                        <Alert color="red" className="mb-4">
                            {allErrors.map((error) => error.message).join(', ')}
                        </Alert>
                    )}

                    <div className="space-y-6">
                        {/* Email Input */}
                        <div>
                            <Input
                                label="Email"
                                name="email"
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
                            />
                        </div>

                        {/* First Name and Last Name Inputs Side by Side */}
                        <div className="flex space-x-4">
                            {/* First Name Input */}
                            <div className="flex-1">
                                <Input
                                    label="First Name"
                                    name="first-name"
                                    type="text"
                                    size="md"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="!text-lg !py-4 !h-14 !w-full border-gray-300 focus:border-indigo-600 focus:ring-indigo-600"
                                    labelProps={{
                                        className: 'text-base text-gray-700',
                                    }}
                                    //@ts-ignore 
                                    inputProps={{
                                        className: 'text-lg placeholder:text-gray-400',
                                    }}
                                    required
                                />
                            </div>

                            {/* Last Name Input */}
                            <div className="flex-1">
                                <Input
                                    label="Last Name"
                                    type="text"
                                    size="md"
                                    placeholder="Doe"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="!text-lg !py-4 !h-14 !w-full border-gray-300 focus:border-indigo-600 focus:ring-indigo-600"
                                    labelProps={{
                                        className: 'text-base text-gray-700',
                                    }}
                                    //@ts-ignore 
                                    inputProps={{
                                        className: 'text-lg placeholder:text-gray-400',
                                    }}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <Input
                                label="Password"
                                name="password"
                                type={passwordVisible ? "text" : "password"} // Toggle password visibility
                                size="md"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="!text-lg !py-4 !h-14 !w-full border-gray-300 focus:border-indigo-600 focus:ring-indigo-600 pr-10" // Added padding to the right
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
                                className="absolute inset-y-0 right-0 flex items-center h-full p-2" // Center the icon
                                onClick={() => setPasswordVisible(!passwordVisible)}
                            >
                                {passwordVisible ? (
                                    <EyeSlashIcon className="h-5 w-5 text-gray-600" /> // Use EyeSlashIcon for visibility off
                                ) : (
                                    <EyeIcon className="h-5 w-5 text-gray-600" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-lg py-3">
                        Sign Up
                    </Button>

                    {/* Go Back Link */}
                    <Typography
                        color="gray"
                        className="mt-4 text-center text-xl"
                    >
                        Already have an account?
                        <a
                            href={loginLink}
                            className="font-medium text-indigo-600 hover:text-indigo-700 ml-1"
                        >
                            Go Back
                        </a>
                    </Typography>
                </form>
            </Card>
        </div>
    );
};

export default SignUpPassword;

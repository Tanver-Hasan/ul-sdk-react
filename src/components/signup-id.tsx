
import {
    Card,
    Input,
    Button,
    Typography,
    Alert,
} from "@material-tailwind/react";
import { useContext, useEffect, useState } from 'react';
import TransactionDataContext from '../context/TransactionDataContextProvider';

export default function SignupId() {
    const { prompt, screen, state, getLink, getFieldErrors, client, tenant } = useContext(TransactionDataContext);
    const [email, setEmail] = useState('');
    const [loginLink, setLoginLink] = useState('');
    const emailErrors = getFieldErrors('email');
    useEffect(() => {
        console.log('Prompt:', prompt);
        console.log('Screen:', screen);
        const link = getLink('login')
        setLoginLink(link);
    }, [prompt, screen, getLink]);

    // const handleSubmit = (event: any) => {
    //     event.preventDefault(); // Prevent page reload
    //     console.log('Email:', email);
    // };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 ">

            {/* @ts-ignore */}
            <Card color="transparent" shadow={true} className="p-6 w-full max-w-md">
                {/* @ts-ignore */}
                <Typography variant="h3" color="blue-gray" className="text-center mb-6">
                    Sign Up
                </Typography>
                {/* @ts-ignore */}
                <Typography variant="paragraph" color="blue-gray" className="text-center mb-6 ">
                    Sign Up to {tenant.friendly_name} to continue to {client.name}
                </Typography>
                <form method="POST" className="mt-4 mb-4">
                    <input type="hidden" name="state" value={state} />
                    <div className="mb-1 flex flex-col gap-6">
                        {/* @ts-ignore */}
                        <Input
                            label="Email"
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
                    {/* @ts-ignore */}
                    <Button type="submit" name="action" value="default" className="mt-6" fullWidth>
                        Continue
                    </Button>
                    {/* @ts-ignore */}
                    <Typography color="gray" className="mt-4 text-center font-normal">
                        Already have an account?{" "}
                        <a href={loginLink} className="ml-1 font-bold">
                            Login
                        </a>
                    </Typography>
                </form>
            </Card>
        </div>
    );
}

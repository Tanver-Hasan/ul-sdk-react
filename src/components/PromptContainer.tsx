import { useContext, useEffect } from 'react';
import TransactionDataContext from '../context/TransactionDataContextProvider';
import LoginId from './login-id';
import LoginPassword from './login-password';
import SignupId from './signup-id';
import SignUpPassword from './signup-password';

export default function PromptContainer() {
  const { prompt, screen } = useContext(TransactionDataContext);

  useEffect(() => {
    console.log('Prompt:', prompt);
    console.log('Screen:', screen);
  }, [prompt, screen]);

  const renderComponent = () => {
    switch (prompt) {
      case 'login-id':
        return <LoginId />;
      case 'login-password':
        return <LoginPassword />;
      case 'signup-id':
        return <SignupId />;
      case 'signup-password':
        return <SignUpPassword />;
      default:
        return (
          <div className="text-center">
            <p className="text-sm text-gray-600">
              <strong>Prompt</strong>: {prompt}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Screen</strong>: {screen}
            </p>
          </div>
        );
    }
  };

  return renderComponent();
}

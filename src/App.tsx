
import './App.css'
import PromptContainer from './components/PromptContainer';
 import { TransactionDataContextProvider } from './context/TransactionDataContextProvider';
function App() {
  return (
     <TransactionDataContextProvider>
      <PromptContainer />
     </TransactionDataContextProvider>
  );
}

export default App;
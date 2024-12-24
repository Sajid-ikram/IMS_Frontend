import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './providers/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <AppRoutes />
        </AnimatePresence>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
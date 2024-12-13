import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <AppRoutes />
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;
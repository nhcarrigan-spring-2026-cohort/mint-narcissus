import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LenderLayout from './layouts/LenderLayout';
import BorrowerLayout from './layouts/BorrowerLayout';

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { activeRole } = useSelector((state) => state.role);
  return (
    <Routes>
      <Route
        path='/*'
        element={
          activeRole === 'borrower' ? <BorrowerLayout /> : <LenderLayout />
        }
      />
    </Routes>
  );
}

export default App;

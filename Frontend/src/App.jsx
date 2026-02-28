import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import BorrowerLayout from './layouts/BorrowerLayout';
import LenderLayout from './layouts/LenderLayout';

import { Login, ProfileSetup, Register } from './pages/auth';
import { Browse, MyRequests, Saved } from './pages/borrower';
import { ListOutfit, MyOutfits, Requests } from './pages/lender';
import { Messages, NotFound, Settings } from './pages/shared';
import { Toaster } from './components/ui/sonner';

function App() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const activeRole = user?.activeRole;

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path='*' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    );
  }

  if (!user?.profileCompleted) {
    return <ProfileSetup />;
  }

  return (
    <>
      <Routes>
        {/* BORROWER */}
        {activeRole === 'borrower' && (
          <Route>
            <Route element={<BorrowerLayout />}>
              <Route path='/' element={<Browse />} />
              <Route path='/saved' element={<Saved />} />
              <Route path='/my-requests' element={<MyRequests />} />
              <Route path='/messages' element={<Messages />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Route>
        )}
        {/* LENDER */}
        {activeRole === 'lender' && (
          <Route>
            <Route element={<LenderLayout />}>
              <Route path='/' element={<MyOutfits />} />
              <Route path='/requests' element={<Requests />} />
              <Route path='/messages' element={<Messages />} />
              <Route path='/list' element={<ListOutfit />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Route>
        )}
      </Routes>
      <Toaster position='bottom-right' />
    </>
  );
}

export default App;

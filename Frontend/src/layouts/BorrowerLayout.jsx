import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import Browse from '@/pages/borrower/Browse';
import Saved from '@/pages/borrower/Saved';
import Messages from '@/pages/Messages';
import PageNotFound from '@/pages/PageNotFound';
import Settings from '@/pages/Settings';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const BorrowerLayout = () => {
  return (
    <div className='min-h-screen w-full flex flex-col'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Browse />} />
        <Route path='/saved' element={<Saved />} />
        <Route path='/messages' element={<Messages />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default BorrowerLayout;

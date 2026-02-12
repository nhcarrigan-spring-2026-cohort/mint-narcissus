import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import ListOutfit from '@/pages/lender/ListOutfit';
import MyOutfits from '@/pages/lender/MyOutfits';
import Requests from '@/pages/lender/Requests';
import Messages from '@/pages/Messages';
import PageNotFound from '@/pages/PageNotFound';
import Settings from '@/pages/Settings';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const LenderLayout = () => {
  return (
    <div className='min-h-screen w-full flex flex-col'>
      <Navbar />
      <Routes>
        <Route path='/' element={<MyOutfits />} />
        <Route path='/requests' element={<Requests />} />
        <Route path='/messages' element={<Messages />} />
        <Route path='/list' element={<ListOutfit />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default LenderLayout;

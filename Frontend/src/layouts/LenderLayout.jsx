import { Outlet } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const LenderLayout = () => {
  return (
    <div className='min-h-screen w-full flex flex-col'>
      <Navbar />
      <div className='flex-1'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default LenderLayout;

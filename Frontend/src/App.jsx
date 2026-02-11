import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import ComponentPreview from './pages/ComponentPreview';

import './App.css';
import Container from './layouts/AppLayout';

/* Page Components */
import Browse from './pages/Browse';
import Saved from './pages/Saved';
import Messages from './pages/Messages';
import AppLayout from './layouts/AppLayout';

/* Array passed to Container.jsx to initiate Links */
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { IoHeartOutline } from 'react-icons/io5';
import { FiMessageCircle } from 'react-icons/fi';

const navItems = [
  { label: 'Browse', path: '/browse', element: <Browse /> , icon: <HiOutlineMagnifyingGlass />},
  { label: 'Saved', path: '/saved', element: <Saved /> , icon: <IoHeartOutline />},
  { label: 'Messages', path: '/messages', element: <Messages />, icon: <FiMessageCircle /> },
];

function App() {
  return (
    <div className='flex min-h-svh flex-col items-center justify-center'>
      <BrowserRouter>
        <nav className='flex flex-wrap gap-3'>
          <Link to={'/'}>Home</Link>
          <Link to={'/about'}>About</Link>
          <Link to={'/componentPreview'}>Component Preview</Link>
        </nav>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='componentPreview' element={<ComponentPreview />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

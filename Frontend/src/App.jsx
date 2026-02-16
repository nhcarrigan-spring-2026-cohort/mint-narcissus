import './App.css';
import Container from './layouts/AppLayout';

/* Page Components */
import Browse from './pages/Browse';
import Saved from './pages/Saved';
import Messages from './pages/Messages';
import AppLayout from './layouts/AppLayout';
import Login from './pages/loginpage';

/* Array passed to Container.jsx to initiate Links */
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { IoHeartOutline } from 'react-icons/io5';
import { FiMessageCircle } from 'react-icons/fi';
import { HomeIcon } from 'lucide-react';
import ComponentPreview from './pages/ComponentPreview';

const navItems = [
  {
    label: 'Browse',
    path: '/browse',
    element: <Browse />,
    icon: <HiOutlineMagnifyingGlass />,
  },
  {
    label: 'Saved',
    path: '/saved',
    element: <Saved />,
    icon: <IoHeartOutline />,
  },
  {
    label: 'Messages',
    path: '/messages',
    element: <Messages />,
    icon: <FiMessageCircle />,
  },
];

function App() {
  return <AppLayout navItems={navItems}></AppLayout>;
}

export default App;

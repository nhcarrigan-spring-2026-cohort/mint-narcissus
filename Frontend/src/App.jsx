import './App.css';
import Container from './layouts/AppLayout';

/* Page Components */
import Browse from './pages/Browse';
import Saved from './pages/Saved';
import Messages from './pages/Messages';
import AppLayout from './layouts/AppLayout';

/* Array passed to Container.jsx to initiate Links */
const navItems = [
  { label: 'Browse', path: '/browse', element: <Browse /> },
  { label: 'Saved', path: '/saved', element: <Saved /> },
  { label: 'Messages', path: '/messages', element: <Messages /> },
];

function App() {
  /* Maybe add a footer section aswell later */
  return <AppLayout navItems={navItems}></AppLayout>;
}

export default App;

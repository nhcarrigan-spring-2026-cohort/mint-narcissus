import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { switchRole, logout } from '@/store/authSlice';
import RoleSwitch from '../shared/RoleSwitch';
import NavDrawer from '../shared/NavDrawer';
import Logo from './Logo';
import {
  FiHeart,
  FiInbox,
  FiMessageCircle,
  FiPlus,
  FiSearch,
  FiUser,
} from '@/utils/icons';

const borrowerNavItems = [
  {
    label: 'Browse',
    path: '/',
    icon: <FiSearch />,
  },
  {
    label: 'Saved',
    path: '/saved',
    icon: <FiHeart />,
  },
  {
    label: 'Messages',
    path: '/messages',
    icon: <FiMessageCircle />,
  },
];

const lenderNavItems = [
  {
    label: 'My Outfits',
    path: '/',
    icon: <FiUser />,
  },
  {
    label: 'Requests',
    path: '/requests',
    icon: <FiInbox />,
  },
  {
    label: 'Messages',
    path: '/messages',
    icon: <FiMessageCircle />,
  },
];

export default function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { activeRole } = user;
  const navItems =
    activeRole === 'borrower' ? borrowerNavItems : lenderNavItems;

  const handleSwitch = (role) => {
    dispatch(switchRole(role));
  };
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className='bg-app-fg flex items-center justify-between border-b w-full max-h-20 px-3 py-2 md:px-10 md:py-4 shadow'>
      {/* LEFT */}
      <div className='flex gap-4'>
        <Logo />
        {navItems.map(({ label, icon, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `hidden lg:flex justify-center items-center lg:gap-3 gap-1 lg:px-4 md:py-2 px-2 py-1 rounded-sm ${isActive ? 'bg-app-primary text-white' : 'hover:bg-app-hover'}`
            }
          >
            <span className='text-lg'>{icon}</span>
            <span className='text-sm font-medium leading-tight'>{label}</span>
          </NavLink>
        ))}
      </div>
      {/* MOBILE */}
      <div className='lg:hidden'>
        <NavDrawer
          navItems={navItems}
          user={user}
          onLogout={handleLogout}
          onSwitch={handleSwitch}
        />
      </div>
      {/* RIGHT */}
      <div className='hidden lg:flex items-center gap-4'>
        {activeRole === 'lender' && (
          <NavLink
            to='/list'
            className={`flex justify-center items-center text-sm font-medium lg:gap-2 gap-1 bg-app-primary text-white lg:px-4 md:py-2 px-2 py-1 rounded-sm`}
          >
            <FiPlus className='size-4' />
            <span>List Outfit</span>
          </NavLink>
        )}
        <RoleSwitch
          user={user}
          onLogout={handleLogout}
          onSwitch={handleSwitch}
        />
      </div>
    </nav>
  );
}

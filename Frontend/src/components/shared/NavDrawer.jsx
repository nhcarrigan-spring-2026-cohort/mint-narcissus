import React from 'react';
import { NavLink } from 'react-router-dom';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';

import {
  FiBriefcase,
  FiLogOut,
  FiMenu,
  FiSettings,
  FiUser,
  FiX,
} from '@/utils/icons';

const NavDrawer = ({ navItems, activeRole, onSwitch, onLogout }) => {
  return (
    <Drawer direction='right'>
      <DrawerTrigger>
        <FiMenu />
      </DrawerTrigger>
      <DrawerContent className='data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]'>
        <DrawerHeader>
          <DrawerTitle className='flex justify-between items-center'>
            Rahul Verma
            <DrawerClose className='shrink' asChild>
              <FiX />
            </DrawerClose>
          </DrawerTitle>
          <DrawerDescription>rahul.verma@example.com</DrawerDescription>
        </DrawerHeader>
        <div className='no-scrollbar overflow-y-auto px-4'>
          <p className='text-sm text-muted-foreground my-2'>Mode</p>
          <div className='flex justify-evenly items-center gap-2'>
            <span
              disabled={activeRole === 'borrower'}
              onClick={() => onSwitch('borrower')}
              className={`flex flex-col justify-center items-start border rounded-lg p-4 grow text-sm ${activeRole === 'borrower' ? 'border-app-primary bg-app-primary text-white' : ''}`}
            >
              <FiUser />
              Borrower
            </span>
            <span
              disabled={activeRole === 'lender'}
              onClick={() => onSwitch('lender')}
              className={`flex flex-col justify-center items-start border rounded-lg p-4 grow text-sm ${activeRole === 'lender' ? 'border-app-primary bg-app-primary text-white' : ''}`}
            >
              <FiBriefcase />
              Lender
            </span>
          </div>
          <hr className='my-2' />
          <p className='text-sm text-muted-foreground my-2'>Navigation</p>
          <div className='flex flex-col gap-2 '>
            {navItems.map(({ label, path, icon }) => (
              <NavLink
                key={path}
                to={path}
                className='flex gap-2 py-1 px-2 items-center text-sm hover:bg-app-hover focus:bg-app-primary focus:text-white rounded-sm'
              >
                {icon} {label}
              </NavLink>
            ))}
          </div>
          <hr className='my-2' />
          <div className='flex flex-col gap-2 '>
            <NavLink
              to='/settings'
              className='flex gap-2 py-1 px-2 items-center text-sm hover:bg-app-hover focus:bg-app-primary focus:text-white rounded-sm'
            >
              <FiSettings />
              Settings
            </NavLink>
            <NavLink
              to='/'
              className='flex gap-2 py-1 px-2 items-center text-sm hover:bg-destructive/70 focus:bg-destructive/80 focus:text-white rounded-sm'
              onClick={() => onLogout()}
            >
              <FiLogOut />
              Log out
            </NavLink>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default NavDrawer;

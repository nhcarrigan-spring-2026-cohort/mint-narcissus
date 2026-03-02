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
  LuBriefcase,
  LuLogOut,
  LuMenu,
  LuPlus,
  LuSettings,
  LuUser,
  LuX,
} from '@/utils/icons';

const NavDrawer = ({ navItems, user, onLogout, onSwitch }) => {
  if (!user) return null;
  const { activeRole, name, email } = user;
  return (
    <Drawer direction='right'>
      <DrawerTrigger>
        <LuMenu />
      </DrawerTrigger>
      <DrawerContent className='data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]'>
        <DrawerHeader>
          <DrawerTitle className='flex justify-between items-center'>
            {name}
            <DrawerClose className='shrink' asChild>
              <LuX />
            </DrawerClose>
          </DrawerTitle>
          <DrawerDescription>{email}</DrawerDescription>
        </DrawerHeader>
        <div className='no-scrollbar overflow-y-auto px-4'>
          <p className='text-sm text-muted-foreground my-2'>Mode</p>
          <div className='flex justify-evenly items-center gap-2'>
            <span
              disabled={activeRole === 'borrower'}
              onClick={() => onSwitch('borrower')}
              className={`flex flex-col justify-center items-start border rounded-lg p-4 grow text-sm ${activeRole === 'borrower' ? 'border-app-primary bg-app-primary text-white' : ''}`}
            >
              <LuUser />
              Borrower
            </span>
            <span
              disabled={activeRole === 'lender'}
              onClick={() => onSwitch('lender')}
              className={`flex flex-col justify-center items-start border rounded-lg p-4 grow text-sm ${activeRole === 'lender' ? 'border-app-primary bg-app-primary text-white' : ''}`}
            >
              <LuBriefcase />
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
            {activeRole === 'lender' && (
              <NavLink
                to='/list'
                className='flex gap-2 py-1 px-2 items-center text-sm hover:bg-app-hover focus:bg-app-primary focus:text-white rounded-sm'
              >
                <LuPlus className='size-4' /> List Outfit
              </NavLink>
            )}
          </div>
          <hr className='my-2' />
          <div className='flex flex-col gap-2 '>
            <NavLink
              to='/settings'
              className='flex gap-2 py-1 px-2 items-center text-sm hover:bg-app-hover focus:bg-app-primary focus:text-white rounded-sm'
            >
              <LuSettings />
              Settings
            </NavLink>
            <NavLink
              to='/'
              className='flex gap-2 py-1 px-2 items-center text-sm text-destructive hover:bg-destructive/10 focus:bg-destructive/10 dark:focus:bg-destructive/20 focus:text-destructive rounded-sm'
              onClick={() => onLogout()}
            >
              <LuLogOut />
              Log out
            </NavLink>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default NavDrawer;

import React from 'react';
import { Badge } from '../ui/badge';
import {
  FiBriefcase,
  FiChevronDown,
  FiLogOut,
  FiSettings,
  FiUser,
} from '@/utils/icons';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

import { Link } from 'react-router-dom';

const RoleSwitch = ({ activeRole, onLogout, onSwitch }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='flex items-center justify-center gap-2 hover:bg-app-hover px-4 py-2 rounded-lg cursor-pointer focus:outline-2 focus:outline-offset-2  focus:outline-app-secondary'>
          <Avatar>
            <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
            <AvatarFallback className='font-medium bg-app-primary text-white'>
              RV
            </AvatarFallback>
          </Avatar>
          <span className='text-sm font-medium'>Rahul</span>
          <Badge variant='outline' className='capitalize'>
            {activeRole}
          </Badge>
          <FiChevronDown className='size-4' />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-52'>
        <DropdownMenuLabel className='text-sm leading-4'>
          Rahul Verma
        </DropdownMenuLabel>
        <DropdownMenuLabel className='text-xs font-normal text-muted-foreground leading-1'>
          rahul.verma@example.com
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className='text-xs font-normal text-muted-foreground'>
            Switch Role
          </DropdownMenuLabel>
          <DropdownMenuItem
            disabled={activeRole === 'borrower'}
            onClick={() => onSwitch('borrower')}
            className='flex items-center gap-4'
          >
            <FiUser />
            Borrower
            {activeRole === 'borrower' && (
              <Badge className='ml-2' variant='outline'>
                Current
              </Badge>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={activeRole === 'lender'}
            onClick={() => onSwitch('lender')}
            className='flex items-center gap-4'
          >
            <FiBriefcase />
            Lender
            {activeRole === 'lender' && (
              <Badge className='ml-2' variant='outline'>
                Current
              </Badge>
            )}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to='/settings' className='flex items-center gap-4'>
            <FiSettings />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          variant='destructive'
          onClick={() => onLogout()}
          className='flex items-center gap-4'
        >
          <FiLogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RoleSwitch;

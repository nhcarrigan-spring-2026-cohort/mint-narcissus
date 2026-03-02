import { Link } from 'react-router-dom';
import { Badge } from '../ui/badge';
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
import {
  LuBriefcase,
  LuChevronDown,
  LuLogOut,
  LuSettings,
  LuUser,
} from '@/utils/icons';

const RoleSwitch = ({ user, onLogout, onSwitch }) => {
  if (!user) return null;
  const { activeRole, name, email } = user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='flex items-center justify-center gap-2 hover:bg-app-hover px-4 py-2 rounded-lg cursor-pointer focus:outline-2 focus:outline-offset-2  focus:outline-app-secondary'>
          <Avatar>
            {/* <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' /> */}
            <AvatarFallback className='font-medium bg-app-primary text-white'>
              {name?.charAt(0).toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <span className='text-sm font-medium'>{name || 'User'}</span>
          <Badge variant='outline' className='capitalize'>
            {activeRole}
          </Badge>
          <LuChevronDown className='size-4' />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-52'>
        <DropdownMenuLabel className='text-sm leading-4'>
          {name || 'User'}
        </DropdownMenuLabel>
        <DropdownMenuLabel className='text-xs font-normal text-muted-foreground leading-1'>
          {email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className='text-xs font-normal text-muted-foreground'>
            Switch Role
          </DropdownMenuLabel>
          <DropdownMenuItem
            disabled={activeRole === 'borrower'}
            onClick={() => onSwitch('borrower')}
            className='flex items-center gap-4 cursor-pointer'
          >
            <LuUser />
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
            className='flex items-center gap-4 cursor-pointer'
          >
            <LuBriefcase />
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
            <LuSettings />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onLogout()}
          variant='destructive'
          className='flex items-center gap-4'
        >
          <LuLogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RoleSwitch;

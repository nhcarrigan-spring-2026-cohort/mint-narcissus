import { NavLink } from 'react-router-dom';

export default function Logo() {
  return (
    <div className='flex items-center gap-2'>
      <NavLink
        to='/'
        className='lg:h-8 lg:w-8 h-6 w-6 sm:h-6 sm:w-7 font-semibold text-white text-xs lg:text-base leading-0 bg-app-primary rounded-full flex justify-center items-center'
      >
        CC
      </NavLink>
      <span className='md:text-xl sm:text-sm font-medium leading-6 tracking-tighter hidden sm:block text-app-primary'>
        Career Closet
      </span>
    </div>
  );
}

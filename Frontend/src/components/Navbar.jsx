import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import Profile from './Profile';

export default function Navbar({ navItems }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='bg-white border-b sticky top-0 z-50 shadow-sm'>
      <div className='container mx-auto px-4 py-3'>
        <div className='flex items-center justify-between'>
          <Logo />
          <nav className='hidden md:flex space-x-1'>
            <ul className='flex gap-5 mx-5'>
              {navItems.map((link, index) => (
                <li key={index}>
                  <Link
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 has-[&gt;svg]:px-3"
                    to={link.path}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Profile />
          <button className='md:hidden' onClick={() => setIsOpen(!isOpen)}>
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path d='M4 6h16M4 12h16m-7 6h7' />
            </svg>
          </button>
        </div>

        {isOpen && (
          <nav className='md:hidden flex'>
            <ul className=' flex-col py-4 px-6 gap-4'>
              {navItems.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} onClick={() => setIsOpen(false)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

/*
<header class='bg-white border-b sticky top-0 z-50 shadow-sm'>
  <div class='container mx-auto px-4 py-3'>
    <div class='flex items-center justify-between'>
      <div class='flex items-center space-x-6'>   
        //Logo

        <nav class='hidden md:flex space-x-1'>
          <button
            data-slot='button'
            class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 has-[&gt;svg]:px-3"
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
              class='lucide lucide-search h-4 w-4 mr-2'
            >
              <circle cx='11' cy='11' r='8'></circle>
              <path d='m21 21-4.3-4.3'></path>
            </svg>
            Browse
          </button>
          <button
            data-slot='button'
            class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 h-9 px-4 py-2 has-[&gt;svg]:px-3"
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
              class='lucide lucide-heart h-4 w-4 mr-2'
            >
              <path d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'></path>
            </svg>
            Saved
          </button>
          <button
            data-slot='button'
            class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 h-9 px-4 py-2 has-[&gt;svg]:px-3"
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
              class='lucide lucide-message-circle h-4 w-4 mr-2'
            >
              <path d='M7.9 20A9 9 0 1 0 4 16.1L2 22Z'></path>
            </svg>
            Messages
          </button>
        </nav>
      </div>
      <div class='flex items-center space-x-3'>
        <button
          class='hidden md:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
          type='button'
          id='radix-:r2:'
          aria-haspopup='menu'
          aria-expanded='false'
          data-state='closed'
          data-slot='dropdown-menu-trigger'
        >
          <span
            data-slot='avatar'
            class='relative flex size-10 shrink-0 overflow-hidden rounded-full h-8 w-8'
          >
            <span
              data-slot='avatar-fallback'
              class='flex size-full items-center justify-center rounded-full bg-[#1A2B48] text-white'
            >
              R
            </span>
          </span>
          <div class='flex items-center gap-1'>
            <span class='text-sm font-medium text-[#1A2B48]'>Rahul</span>
            <span
              data-slot='badge'
              class='inline-flex items-center justify-center rounded-md border px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden [a&amp;]:hover:bg-accent [a&amp;]:hover:text-accent-foreground text-xs capitalize bg-[#C5A059]/10 text-[#1A2B48] border-[#C5A059]/30'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
                class='lucide lucide-user h-3 w-3 mr-1'
              >
                <path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'></path>
                <circle cx='12' cy='7' r='4'></circle>
              </svg>
              borrower
            </span>
          </div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
            class='lucide lucide-chevron-down h-4 w-4 text-muted-foreground'
          >
            <path d='m6 9 6 6 6-6'></path>
          </svg>
        </button>
        <button
          data-slot='sheet-trigger'
          class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 size-9 rounded-md md:hidden"
          type='button'
          aria-haspopup='dialog'
          aria-expanded='false'
          aria-controls='radix-:r4:'
          data-state='closed'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
            class='lucide lucide-menu h-5 w-5'
          >
            <line x1='4' x2='20' y1='12' y2='12'></line>
            <line x1='4' x2='20' y1='6' y2='6'></line>
            <line x1='4' x2='20' y1='18' y2='18'></line>
          </svg>
        </button>
      </div>
    </div>
  </div>
</header>;
*/

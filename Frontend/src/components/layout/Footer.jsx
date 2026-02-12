import { MdCopyright } from 'react-icons/md';

export default function Footer() {
  return (
    <footer className='w-full flex flex-col sm:flex-row items-center justify-center bg-app-primary text-xs sm:text-sm sm:max-h-14 max-h-12 text-white py-4 gap-1 sm:gap-2'>
      <span>Made with ❤️ by Career Closet</span>
      <span className='flex items-center gap-1'>
        <MdCopyright className='size-4' />
        <span>Copyright {new Date().getFullYear()}. All rights reserved.</span>
      </span>
    </footer>
  );
}

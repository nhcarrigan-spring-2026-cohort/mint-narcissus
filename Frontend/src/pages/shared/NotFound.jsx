import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function NotFound() {
  const { user } = useSelector((state) => state.auth);
  const { activeRole } = user;
  return (
    <section className='grow flex flex-col gap-4 items-center justify-center'>
      <h2 className='text-4xl font-bold'>Page Not Found</h2>
      <p className='text-xl'>
        The page you are looking for doesn't exist or has been moved
      </p>
      <Link
        to='/'
        className='py-2 px-4 bg-app-primary text-primary-foreground rounded-full'
      >
        {activeRole === 'lender' ? 'See your outfits' : 'Browse outfits'}
      </Link>
    </section>
  );
}

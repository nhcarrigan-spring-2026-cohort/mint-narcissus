import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '@/store/authSlice';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MOCK_USERS } from '@/utils/mockData';

const Register = () => {
  const dispatch = useDispatch();

  const handleEmailRegister = () => {
    dispatch(login(MOCK_USERS?.registerEmailUser));
  };

  const handleLinkedInRegister = () => {
    dispatch(login(MOCK_USERS.registerLinkedInUser));
  };

  return (
    <section className='bg-app-bg flex w-full h-screen items-center justify-center'>
      <Card className='w-80 sm:w-96 px-8 flex flex-col'>
        <div className='w-full flex justify-center items-center'>
          <img src='/favicon.ico' className='size-8' />
        </div>
        <h2 className='font-serif text-lg sm:text-2xl text-app-primary text-center font-semibold leading-2 sm:leading-4'>
          Welcome to Career Closet
        </h2>
        <p className='text-center text-xs sm:text-sm text-muted-foreground leading-px'>
          Register to borrow or lend interview outfits
        </p>
        <Button
          variant='outline'
          onClick={handleLinkedInRegister}
          className='w-full'
        >
          Sign up with LinkedIn
        </Button>
        <div className='flex items-center'>
          <Separator className='flex-1' />
          <span className='shrink-0 px-2 uppercase text-xs text-muted-foreground'>
            Or
          </span>
          <Separator className='flex-1' />
        </div>
        <Button onClick={handleEmailRegister} className='w-full'>
          Sign up (Demo Email)
        </Button>
        <p className='text-center text-xs sm:text-sm text-muted-foreground'>
          {' '}
          Already have an account?{' '}
          <Link to='/login' className='text-blue-600 hover:text-blue-700'>
            Log in
          </Link>
        </p>
      </Card>
    </section>
  );
};

export default Register;

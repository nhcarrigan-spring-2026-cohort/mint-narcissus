import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '@/store/authSlice';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { LuLinkedin } from '@/utils/icons';
import { MOCK_USERS } from '@/utils/mockData';
import { useState } from 'react';
import { toast } from 'sonner';

const Register = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLinkedInRegister = () => {
    toast.success('User Registered Successfully!');
  };
  const handleEmailRegister = (e) => {
    e.preventDefault();
    toast.success('User Registered Successfully!');
  };

  // TODO: Remove after demo
  const handleDemoEmailRegister = () => {
    dispatch(login(MOCK_USERS?.registerEmailUser));
  };

  // TODO: Remove after demo
  const handleDemoLinkedInRegister = () => {
    dispatch(login(MOCK_USERS.registerLinkedInUser));
  };

  return (
    <section className='min-h-screen w-full flex items-center justify-center bg-app-bg p-4'>
      <Card className='bg-card text-card-foreground flex flex-col gap-6 rounded-xl border w-full max-w-md shadow-xl border-app-primary/10'>
        <CardHeader>
          <div className='w-full flex justify-center items-center'>
            <img src='/favicon.ico' className='size-8' />
          </div>
          <CardTitle className='font-serif text-app-primary text-lg sm:text-2xl text-center'>
            Welcome to Career Closet
          </CardTitle>
          <CardDescription className='text-center text-muted-foreground text-xs sm:text-sm'>
            Register to borrow or lend interview outfits
          </CardDescription>
        </CardHeader>
        <CardContent className='px-6 space-y-4'>
          <Button
            variant='outline'
            className='w-full text-foreground hover:text-accent-foreground'
            onClick={handleLinkedInRegister}
          >
            <LuLinkedin className='mr-2 size-4' />
            Sign up with LinkedIn
          </Button>
          <div className='flex items-center'>
            <Separator className='flex-1' />
            <span className='shrink-0 px-2 uppercase text-xs text-muted-foreground'>
              Or Sign Up With Email
            </span>
            <Separator className='flex-1' />
          </div>

          <form className='space-y-4' onSubmit={handleEmailRegister}>
            <div className='space-y-2'>
              <Label className='text-app-neutral' htmlFor='name'>
                Full Name
              </Label>
              <Input
                id='name'
                type='text'
                placeholder='John Doe'
                autoComplete='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className='space-y-2'>
              <Label className='text-app-neutral' htmlFor='email'>
                Email
              </Label>
              <Input
                id='email'
                type='email'
                placeholder='john@example.com'
                autoComplete='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='space-y-2'>
              <Label className='text-app-neutral' htmlFor='password'>
                Password
              </Label>
              <Input
                id='password'
                type='password'
                placeholder='Enter a password'
                autoComplete='new-password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type='submit'
              className='bg-app-primary/95 hover:bg-app-primary w-full transition-colors'
              disabled={!name || !email || !password}
            >
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter className='w-full items-center justify-center px-6 flex'>
          <p className='text-center text-xs sm:text-sm text-muted-foreground'>
            Already have an account?{' '}
            <Link
              to='/login'
              className='font-medium text-app-primary/90 hover:text-app-primary cursor-pointer'
            >
              Log in
            </Link>
          </p>
        </CardFooter>

        {/* TODO: Remove after demo */}
        <div className='flex gap-1 px-4'>
          <Button
            variant='outline'
            onClick={handleDemoEmailRegister}
            className='flex-1'
          >
            Sign up (Demo Email)
          </Button>
          <Button
            variant='outline'
            onClick={handleDemoLinkedInRegister}
            className='flex-1'
          >
            Sign up (Demo LinkedIn)
          </Button>
        </div>
      </Card>
    </section>
  );
};

export default Register;

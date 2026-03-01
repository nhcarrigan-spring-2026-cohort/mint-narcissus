import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '@/store/authSlice';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { LuLinkedin } from '@/utils/icons';
import { MOCK_USERS } from '@/utils/mockData';
import { toast } from 'sonner';
import { Loader2 } from "lucide-react";
import { linkedinOAuthRedirect, loginApi } from '@/api/auth.api';

const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLinkedInLogin = () => {
    setIsLoading(true);
    try {
      dispatch(linkedinOAuthRedirect());
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = { email, password };
      const data = await loginApi(formData);
      console.log(data);
      dispatch(login(data));
      toast.success(data?.message);
    } catch (err) {
      toast.error(err.response?.data?.message)
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: Remove after demo
  const handleDemoEmailLogin = () => {
    dispatch(login(MOCK_USERS?.loginEmailUser));
  };

  // TODO: Remove after demo
  const handleDemoLinkedInLogin = () => {
    dispatch(login(MOCK_USERS?.loginLinkedInUser));
  };

  return (
    <section className='min-h-screen w-full flex items-center justify-center bg-app-bg p-4'>
      <Card className='bg-card text-card-foreground flex flex-col gap-6 rounded-xl border w-full max-w-md shadow-xl border-app-primary/10'>
        <CardHeader>
          <div className='w-full flex justify-center items-center'>
            <img src='/favicon.ico' className='size-8' />
          </div>
          <CardTitle className='font-serif text-app-primary text-lg sm:text-2xl text-center'>
            Welcome Back!
          </CardTitle>
          <CardDescription className='text-center text-muted-foreground text-xs sm:text-sm'>
            Sign in to borrow or lend interview outfits
          </CardDescription>
        </CardHeader>
        <CardContent className='px-6 space-y-4'>
          <Button
            variant='outline'
            disabled={isLoading}
            className='w-full text-foreground hover:text-accent-foreground'
            onClick={handleLinkedInLogin}
          >
            <LuLinkedin className='mr-2 size-4' />
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Loading..." : "Sign in with LinkedIn"}
          </Button>
          <div className='flex items-center'>
            <Separator className='flex-1' />
            <span className='shrink-0 px-2 uppercase text-xs text-muted-foreground'>
              Or Continue With Email
            </span>
            <Separator className='flex-1' />
          </div>

          <form className='space-y-4' onSubmit={handleEmailLogin}>
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
                autoComplete='current-password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type='submit'
              className='bg-app-primary/95 hover:bg-app-primary w-full transition-colors'
              disabled={!email || !password}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Loading..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className='w-full items-center justify-center px-6 flex'>
          <p className='text-center text-xs sm:text-sm text-muted-foreground'>
            Don't have an account?{' '}
            <Link
              to='/register'
              className='font-medium text-app-primary/90 hover:text-app-primary cursor-pointer'
            >
              Sign up
            </Link>
          </p>
        </CardFooter>

        {/* TODO: Remove after demo */}
        <div className='flex gap-1 px-4'>
          <Button
            variant='outline'
            onClick={handleDemoEmailLogin}
            className='flex-1'
          >
            Sign in (Demo Email)
          </Button>
          <Button
            variant='outline'
            onClick={handleDemoLinkedInLogin}
            className='flex-1'
          >
            Sign in (Demo LinkedIn)
          </Button>
        </div>
      </Card>
    </section>
  );
};

export default Login;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { switchRole, verifyLinkedIn } from '@/store/authSlice';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Field, FieldGroup } from '@/components/ui/field';
import {
  LuAward,
  LuBriefcase,
  LuLinkedin,
  LuMail,
  LuRuler,
  LuShield,
  LuStar,
  LuUser,
} from '@/utils/icons';
import { Loader2 } from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(false);

  const handleLinkedInConnection = () => {
    setIsLoading(true);
    try {
      dispatch(verifyLinkedIn());
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitch = (role) => {
    navigate('/');
    dispatch(switchRole(role));
  };
  return (
    <section className='grow container mx-auto px-4 py-8'>
      <div className='max-w-4xl mx-auto space-y-6'>
        <div>
          <h2 className='font-serif text-app-primary text-3xl font-bold'>
            Settings
          </h2>
          <p className='text-muted-foreground'>
            Manage your account and preferences
          </p>
        </div>
        {/* Profile Overview Card */}
        <Card>
          <CardHeader>
            <CardTitle className='text-xl leading-none text-app-primary font-serif'>
              Profile Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col md:flex-row gap-6'>
              <div className='flex items-center space-x-4 flex-1'>
                <Avatar className='size-20'>
                  <AvatarImage src={user?.image} alt={user?.name} />
                  <AvatarFallback className='capitalize text-2xl font-medium'>
                    {user?.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className='flex-1'>
                  <h3 className='font-serif text-xl font-semibold'>
                    {user?.name}
                  </h3>
                  <p className='text-sm text-muted-foreground'>{user?.email}</p>
                  <div className='flex flex-wrap items-center gap-2 mt-2'>
                    <Badge variant='outline' className='capitalize rounded-sm'>
                      {user?.activeRole}
                    </Badge>
                    {user?.isVerified && (
                      <Badge className='rounded-sm bg-blue-100 text-blue-700 border-blue-200'>
                        <LuShield className='size-3' />
                        LinkedIn Verified
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className='border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6'>
                <div className='space-y-3'>
                  <div className='flex items-center gap-2'>
                    {/* TODO: Add a rating system */}
                    <div className='flex items-center'>
                      <LuStar className='text-amber-400 fill-amber-400' />
                      <LuStar className='text-amber-400 fill-amber-400' />
                      <LuStar className='text-amber-400 fill-amber-400' />
                      <LuStar className='text-amber-400 fill-amber-400' />
                      <LuStar className='text-amber-400 fill-amber-400' />
                    </div>
                    <span className='text-sm font-semibold'>5</span>
                    <span className='text-xs text-muted-foreground'>
                      (0 reviews)
                    </span>
                  </div>
                  <div className='grid grid-cols-2 gap-3 text-sm'>
                    {/* TODO: Update this */}
                    <div className='text-center p-2 bg-emerald-50 rounded-md'>
                      <p className='text-lg font-bold text-emerald-700'>6</p>
                      <p className='text-xs text-emerald-600'>Outfits lent</p>
                    </div>
                    <div className='text-center p-2 bg-blue-50 rounded-md'>
                      <p className='text-lg font-bold text-blue-700'>3</p>
                      <p className='text-xs text-blue-600'>Borrowed</p>
                    </div>
                  </div>
                  {/* TODO: Award System */}
                  <div className='flex flex-wrap gap-1'>
                    <Badge className='rounded-sm text-xs bg-purple-100 text-purple-700 border-purple-200'>
                      <LuAward className='size-3' />
                      Trusted Lender
                    </Badge>
                    <Badge className='rounded-sm text-xs bg-purple-100 text-purple-700 border-purple-200'>
                      <LuAward className='size-3' />
                      Community Contributor
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Personal Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className='leading-none text-xl font-serif'>
              Personal Information
            </CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent>
            <form className='space-y-6'>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='name'>
                    <LuUser />
                    Full Name
                  </Label>
                  <Input
                    id='name'
                    placeholder='Your name'
                    value={user?.name}
                    disabled
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='email'>
                    <LuMail />
                    Email
                  </Label>
                  <Input
                    id='email'
                    placeholder='you@example.com'
                    value={user?.email}
                    disabled
                  />
                  <p className='text-xs text-muted-foreground'>
                    Email cannot be changed
                  </p>
                </div>
                <div className='space-y-2'>
                  <Label>
                    LinkedIn Status:{' '}
                    <span
                      className={`
                      text-sm ${user?.isVerified ? 'text-green-800' : 'text-red-600'}
                    `}
                    >
                      {user.isVerified ? 'Verified' : 'Not Verified'}
                    </span>
                  </Label>
                  {!user?.isVerified && (
                    <Button
                      variant='outline'
                      disabled={isLoading}
                      className='w-full text-foreground hover:text-accent-foreground'
                      onClick={handleLinkedInConnection}
                    >
                      <LuLinkedin className='mr-2 size-4' />
                      {isLoading && (
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      )}
                      {isLoading ? 'Loading...' : 'Get Verified with LinkedIn'}
                    </Button>
                  )}
                </div>
              </div>
              <Separator />
              <div className='space-y-4'>
                <div>
                  <h3 className='text-lg font-semibold flex items-center font-serif'>
                    <LuRuler className='size-5 mr-2' /> Size Information
                  </h3>
                  <p className='text-sm text-muted-foreground mt-1'>
                    Help us show you relevant outfits
                  </p>
                  <FieldGroup className='grid grid-cols-2 px-3 gap-3 mt-3'>
                    {/* HEIGHT */}
                    <Field>
                      <Label htmlFor='height'>Height</Label>
                      <Select value={user?.size?.height} disabled>
                        <SelectTrigger>
                          <SelectValue placeholder='Height' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='Short'>5'4–5'7</SelectItem>
                          <SelectItem value='Regular'>5'8–5'11</SelectItem>
                          <SelectItem value='Tall'>6'0+ </SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    {/* FIT PREFERENCE */}
                    <Field>
                      <Label htmlFor='fitType'>Fit Preference</Label>
                      <Select value={user?.size?.fitType} disabled>
                        <SelectTrigger>
                          <SelectValue placeholder='Fit Type' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='Slim'>Slim</SelectItem>
                          <SelectItem value='Regular'>Regular</SelectItem>
                          <SelectItem value='Relaxed'>Relaxed</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    {/* TOP SIZE */}
                    <Field>
                      <Label htmlFor='topSize'>Top Size</Label>
                      <Select value={user?.size?.topSize} disabled>
                        <SelectTrigger>
                          <SelectValue placeholder='Top Size' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='S'>S</SelectItem>
                          <SelectItem value='M'>M</SelectItem>
                          <SelectItem value='L'>L</SelectItem>
                          <SelectItem value='XL'>XL</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    {/* BOTTOM SIZE */}
                    <Field>
                      <Label htmlFor='bottomSize'>Bottom Size</Label>
                      <Select value={user?.size?.bottomSize} disabled>
                        <SelectTrigger>
                          <SelectValue placeholder='Bottom Size' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='28'>28</SelectItem>
                          <SelectItem value='30'>30</SelectItem>
                          <SelectItem value='32'>32</SelectItem>
                          <SelectItem value='34'>34</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  </FieldGroup>
                </div>
                <Separator />
                <div className='flex justify-end'>
                  <Button
                    className='bg-app-primary/90 hover:bg-app-primary/95 focus:bg-app-primary'
                    disabled
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        {/* Account & Community Standing Card */}
        <Card>
          <CardHeader>
            <CardTitle className='text-xl font-serif leading-none'>
              Account & Community Standing
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='flex justify-between text-sm'>
              <span className='text-muted-foreground'>Member Since</span>
              <span className='font-medium'>
                {user?.createdAt ||
                  new Date().toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })}
              </span>
            </div>
            <Separator />
            <div className='flex justify-between text-sm'>
              <span className='text-muted-foreground'>Account Type</span>
              <span className='font-medium capitalize'>{user?.activeRole}</span>
            </div>
            <Separator />
            <div className='flex justify-between text-sm'>
              <span className='text-muted-foreground'>Profile Status</span>
              <span className='font-medium'>
                <Badge
                  variant={`${user?.isProfileComplete ? 'default' : 'destructive'}`}
                  className={`rounded-sm ${user?.isProfileComplete ? 'bg-app-primary' : ''}`}
                >
                  {user?.isProfileComplete ? 'Complete' : 'Incomplete'}
                </Badge>
              </span>
            </div>
            <Separator />
            {/* TODO: Apply ratings */}
            <div className='flex justify-between text-sm'>
              <span className='text-muted-foreground'>Community Rating</span>
              <div className='flex items-center gap-1.5'>
                <LuStar className='text-amber-400 fill-amber-400' />
                <span className='font-medium'>5.0 / 5.0</span>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Account Mode Card */}
        {/* <Card>
          <CardHeader>
            <CardTitle className='text-xl font-serif text-app-primary leading-none'>
              Account Mode
            </CardTitle>
            <CardDescription>
              Switch between borrower and lender modes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <Button
                onClick={() => handleSwitch('borrower')}
                className={`p-6 border-2 rounded-lg text-left transition-all hover:shadow-md ${user?.activeRole === 'borrower' ? 'border-app-secondary bg-app-secondary/5 text-white' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <div className='flex items-center justify-between mb-3'>
                  <div className='flex items-center gap-2'>
                    <div
                      className={`p-2 rounded-lg ${user?.activeRole === 'borrower' ? 'bg-app-secondary/10' : 'bg-gray-100'}`}
                    >
                      <LuUser size='5' />
                    </div>
                    <h5 className='font-semibold font-serif text-app-primary'>
                      Borrower
                    </h5>
                  </div>
                </div>
                <p className='text-sm text-muted-foreground'>
                  Browse outfits, save favorites, and request to borrow for your
                  interviews
                </p>
              </Button>
              <Button
                disabled={user?.activeRole === 'lender'}
                onClick={() => handleSwitch('lender')}
                className={`flex flex-col justify-center items-start border rounded-lg p-4 grow text-sm ${user?.activeRole === 'lender' ? 'border-app-primary bg-app-primary text-white' : ''}`}
              >
                <LuBriefcase />
                Lender
              </Button>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </section>
  );
};

export default Settings;

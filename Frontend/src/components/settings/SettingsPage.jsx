import { Input } from '../ui/input';
import { Shield, Award, User, Mail, Phone, Ruler, Biefcase } from 'lucide-react';
import StarRating from './StarRatings';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

export default function SettingsPage() {
  return (
    <main className='container mx-auto px-4 py-8'>
      <div className='max-w-4xl mx-auto space-y-6'>
        <div>
          <h1 className='text-3xl font-bold'>Settings</h1>
          <p className='text-muted-foreground'>
            Manage your account and preferences
          </p>
        </div>
        <div className='bg-card text-card-foreground flex flex-col gap-6 rounded-xl border'>
          <div className='@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6'>
            <h4 className='leading-none'>Profile Overview</h4>
          </div>
          <div className='px-6 [&amp;:last-child]:pb-6'>
            <div className='flex flex-col md:flex-row gap-6'>
              <div className='flex items-center space-x-4 flex-1'>
                <span className='relative flex size-10 shrink-0 overflow-hidden rounded-full h-20 w-20'>
                  <span className='bg-muted flex size-full items-center justify-center rounded-full text-2xl'>
                    R
                  </span>
                </span>
                <div className='flex-1'>
                  <h3 className='text-xl font-semibold'>Rahul Verma</h3>
                  <p className='text-sm text-muted-foreground'>
                    rahul.verma@example.com
                  </p>
                  <div className='flex flex-wrap items-center gap-2 mt-2'>
                    <span className='inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden text-foreground [a&amp;]:hover:bg-accent [a&amp;]:hover:text-accent-foreground capitalize'>
                      borrower
                    </span>
                    <span className='inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden [a&amp;]:hover:bg-secondary/90 bg-blue-100 text-blue-700 border-blue-200'>
                      <Shield />
                      LinkedIn Verified
                    </span>
                  </div>
                </div>
              </div>
              <div className='border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6'>
                <div className='space-y-3'>
                  <div className='flex items-center gap-2'>
                    <div className='flex items-center'>
                      <StarRating rating={4.8} />
                    </div>
                    <span className='text-sm font-semibold'>4.8</span>
                    <span className='text-xs text-muted-foreground'>
                      (12 reviews)
                    </span>
                  </div>
                  <div className='grid grid-cols-2 gap-3 text-sm'>
                    <div className='text-center p-2 bg-emerald-50 rounded-md'>
                      <p className='text-lg font-bold text-emerald-700'>6</p>
                      <p className='text-xs text-emerald-600'>Outfits Lent</p>
                    </div>
                    <div className='text-center p-2 bg-blue-50 rounded-md'>
                      <p className='text-lg font-bold text-blue-700'>3</p>
                      <p className='text-xs text-blue-600'>Borrowed</p>
                    </div>
                  </div>
                  <div className='flex flex-wrap gap-1.5'>
                    <span className='inline-flex items-center justify-center rounded-md border px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden [a&amp;]:hover:bg-secondary/90 text-xs bg-purple-100 text-purple-700 border-purple-200'>
                      <Award />
                      Trusted Lender
                    </span>
                    <span
                      data-slot='badge'
                      className='inline-flex items-center justify-center rounded-md border px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden [a&amp;]:hover:bg-secondary/90 text-xs bg-purple-100 text-purple-700 border-purple-200'
                    >
                      <Award />
                      Community Contributor
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-card text-card-foreground flex flex-col gap-6 rounded-xl border'>
          <div className='@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6'>
            <h4 className='leading-none'>Personal Information</h4>
            <p className='text-muted-foreground'>
              Update your personal details
            </p>
          </div>
          <div className='px-6 [&amp;:last-child]:pb-6'>
            <form className='space-y-6'>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <label
                    className='flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50'
                    for='name'
                  >
                    <User />
                    Full Name
                  </label>
                  <Input
                    className='file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
                    value='Rahul Verma'
                  />
                </div>
                <div className='space-y-2'>
                  <label
                    className='flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50'
                    for='email'
                  >
                    <Mail />
                    Email
                  </label>
                  <Input
                    type='email'
                    data-slot='input'
                    className='file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-muted'
                    id='email'
                    disabled=''
                  />
                  <p className='text-xs text-muted-foreground'>
                    Email cannot be changed
                  </p>
                </div>
                <div className='space-y-2'>
                  <label
                    data-slot='label'
                    className='flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50'
                    for='bio'
                  >
                    Bio
                  </label>
                  <Textarea
                    data-slot='textarea'
                    className='resize-none border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-input-background px-3 py-2 text-base transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
                    id='bio'
                    placeholder='Tell us about yourself...'
                    rows='3'
                  ></Textarea>
                </div>
                <div className='space-y-2'>
                  <label
                    data-slot='label'
                    className='flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50'
                    for='phone'
                  >
                    {' '}
                    <Phone />
                    Phone Number
                  </label>
                  <Input
                    type='tel'
                    className='file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
                    id='phone'
                    placeholder='+1 (555) 000-0000'
                    value=''
                  />
                </div>
              </div>
              <div
                data-orientation='horizontal'
                role='none'
                data-slot='separator-root'
                className='bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px'
              ></div>
              <div className='space-y-4'>
                <div>
                  <h3 className='text-lg font-semibold flex items-center'>
                    <Ruler />
                    Size Information
                  </h3>
                  <p className='text-sm text-muted-foreground mt-1'>
                    Help us show you relevant outfits
                  </p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <div className='space-y-2'>
                    <label
                      className='flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50'
                      for='top-size'
                    >
                      Top Size
                    </label>
                    <Input
                      className='file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
                      id='top-size'
                      placeholder='e.g., M, 40, UK 12'
                      value=''
                    />
                  </div>
                  <div className='space-y-2'>
                    <label
                      className='flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50'
                      for='bottom-size'
                    >
                      Bottom Size
                    </label>
                    <input
                      className='file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
                      id='bottom-size'
                      placeholder='e.g., 32, UK 10'
                      value=''
                    />
                  </div>
                  <div className='space-y-2'>
                    <label
                      className='flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50'
                      for='shoe-size'
                    >
                      Shoe Size
                    </label>
                    <input
                      className='file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
                      id='shoe-size'
                      placeholder='e.g., 9, UK 7'
                      value=''
                    />
                  </div>
                </div>
              </div>
              <div
                role='none'
                data-slot='separator-root'
                className='bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px'
              ></div>
              <div className='flex justify-end'>
                <Button
                  data-slot='button'
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([className*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md px-6 has-[&gt;svg]:px-4"
                  type='submit'
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className='bg-card text-card-foreground flex flex-col gap-6 rounded-xl border'>
          <div className='@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6'>
            <h4 className='leading-none'>Account &amp; Community Standing</h4>
          </div>
          <div className='px-6 [&amp;:last-child]:pb-6 space-y-3'>
            <div className='flex justify-between text-sm'>
              <span className='text-muted-foreground'>Member Since</span>
              <span className='font-medium'>December 2024</span>
            </div>
            <div
              data-orientation='horizontal'
              role='none'
              data-slot='separator-root'
              className='bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px'
            ></div>
            <div className='flex justify-between text-sm'>
              <span className='text-muted-foreground'>Account Type</span>
              <span className='font-medium capitalize'>borrower</span>
            </div>
            <div
              data-orientation='horizontal'
              role='none'
              className='bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px'
            ></div>
            <div className='flex justify-between text-sm'>
              <span className='text-muted-foreground'>Profile Status</span>
              <span className='inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-primary text-primary-foreground [a&amp;]:hover:bg-primary/90'>
                Complete
              </span>
            </div>
            <div
              data-orientation='horizontal'
              role='none'
              className='bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px'
            ></div>
            <div className='flex justify-between text-sm'>
              <span className='text-muted-foreground'>Community Rating</span>
              <div className='flex items-center gap-1.5'>
                {' '}
                <StarRating rating='4.8' />
                <span className='font-medium'>4.8 / 5.0</span>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-card text-card-foreground flex flex-col gap-6 rounded-xl border'>
          <div className='@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6'>
            <h4 className='leading-none'>Account Mode</h4>
            <p className='text-muted-foreground'>
              Switch between borrower and lender modes
            </p>
          </div>
          <div className='px-6 [&amp;:last-child]:pb-6'>
            <div className='space-y-4'>
              <div>
                <h3 className='text-lg font-semibold mb-2'>Active Mode</h3>
                <p className='text-sm text-muted-foreground mb-4'>
                  Switch between borrower and lender modes to access different
                  features
                </p>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <button className='p-6 border-2 rounded-lg text-left transition-all hover:shadow-md border-[#1A2B48] bg-[#1A2B48]/5'>
                  <div className='flex items-center justify-between mb-3'>
                    <div className='flex items-center gap-2'>
                      <div className='p-2 rounded-lg bg-[#1A2B48]/10'>
                        <User />
                      </div>
                      <h4 className='font-semibold'>Borrower Mode</h4>
                    </div>
                    <span className='inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent text-primary-foreground [a&amp;]:hover:bg-primary/90 bg-[#1A2B48]'>
                      Active
                    </span>
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    Browse outfits, save favorites, and request to borrow for
                    your interviews
                  </p>
                </button>
                <button className='p-6 border-2 rounded-lg text-left transition-all hover:shadow-md border-gray-200 hover:border-gray-300'>
                  <div className='flex items-center justify-between mb-3'>
                    <div className='flex items-center gap-2'>
                      <div className='p-2 rounded-lg bg-gray-100'><Briefcase />
                      </div>
                      <h4
                        className='font-semibold'

                      >
                        Lender Mode
                      </h4>
                    </div>
                  </div>
                  <p
                    className='text-sm text-muted-foreground'

                  >
                    List your outfits, manage requests, and help others succeed
                    in their interviews
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

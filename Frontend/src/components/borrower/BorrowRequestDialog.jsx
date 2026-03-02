import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { toast } from 'sonner';
import { createRequest } from '@/store/requestSlice';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { LuCircleCheck, LuShirt } from '@/utils/icons';
import BorrowProgress from '../shared/BorrowProgress';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from '../ui/field';

const points = [
  'Treat the outfit with care and respect',
  'Return it clean and in the same condition',
  'Coordinate pickup and return times respectfully',
  'Communicate promptly if any issues arise',
];

const BorrowRequestDialog = ({ outfit, isAvailable }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const requests = useSelector((state) => state.requests.items);

  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const [agreed, setAgreed] = useState(false);

  const existingRequest = useMemo(() => {
    return requests.find(
      (r) =>
        r.outfitId === outfit.id &&
        r.borrowerId === user.id &&
        r.status !== 'rejected',
    );
  }, [requests, outfit.id, user.id]);

  const handleSendRequest = () => {
    dispatch(
      createRequest({
        id: nanoid(),
        outfitId: outfit.id,
        outfitTitle: outfit.title,
        borrowerId: user.id,
        borrowerName: user.name,
        lenderId: outfit.lenderDetails.lenderId,
        lenderName: outfit.lenderDetails.lenderName,
        message,
        status: 'pending',
        createdAt: new Date().toISOString(),
      }),
    );

    toast.success('Borrow request sent successfully');
  };

  // If already requested
  if (existingRequest) {
    return (
      <Dialog>
        <DialogTrigger asChild className='w-full'>
          <Button
            className='w-full bg-app-primary/90 hover:bg-app-primary'
            disabled={!isAvailable}
          >
            <LuShirt /> Request Sent
          </Button>
        </DialogTrigger>
        <DialogContent className='bg-app-bg'>
          <DialogHeader>
            <DialogTitle className='flex flex-col text-center items-center gap-2 w-full'>
              <div className='h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center'>
                <LuCircleCheck className='size-8 text-emerald-600' />
              </div>
              <div className='text-lg text-app-primary leading-none font-semibold font-serif'>
                Request Sent Successfully!
              </div>
            </DialogTitle>
            <DialogDescription className='text-center'>
              Your borrow request for "{outfit.title}" has already been sent to{' '}
              {outfit.lenderDetails.lenderName}.
            </DialogDescription>
          </DialogHeader>
          <div className='no-scrollbar -mx-4 max-h-[50vh] pb-1 overflow-y-auto px-4 space-y-4'>
            <BorrowProgress />
            <div className='p-4 bg-blue-50 border border-blue-100 rounded-lg'>
              <p className='text-sm text-blue-900 leading-relaxed'>
                <strong>What's next:</strong> You'll be notified when Michael
                Chen reviews your request. Once approved, you'll be able to
                message them directly to coordinate pickup details.
              </p>
            </div>
            <div className='p-4 bg-gray-50 rounded-lg'>
              <p className='text-sm text-muted-foreground'>
                💡 <strong>Tip:</strong> Most lenders respond within 24 hours.
                Check your notifications regularly.
              </p>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild className='w-full'>
              <Button className='w-full bg-app-primary/90 hover:bg-app-primary'>
                Got it, thanks!
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild className='w-full'>
        <Button
          className='w-full bg-app-primary/90 hover:bg-app-primary'
          disabled={!isAvailable}
        >
          <LuShirt /> {isAvailable ? 'Request to Borrow' : 'Currently Borrowed'}
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-app-bg'>
        <DialogHeader>
          <DialogTitle className='font-serif text-app-primary'>
            {step === 1 && 'Request to Borrow Outfit'}
            {step === 2 && 'Borrowing Agreement'}
          </DialogTitle>
          <DialogDescription>
            {step === 1 &&
              `Send a request to ${outfit.lenderDetails.lenderName} to borrow "${outfit.title}"`}
            {step === 2 &&
              `A simple commitment to help keep our community safe and respectful`}
          </DialogDescription>
        </DialogHeader>
        <div className='no-scrollbar -mx-4 max-h-[50vh] pb-1 overflow-y-auto px-4 space-y-4'>
          <>
            <BorrowProgress />
            {step === 1 && (
              <Field>
                <FieldLabel htmlFor='textarea-message'>
                  Introduce Yourself (Optional)
                </FieldLabel>
                <Textarea
                  className='bg-input-background dark:bg-input/30 resize-none min-h-16 '
                  placeholder='Share a bit about yourself and your upcoming interview. This helps build trust with the lender...'
                  onChange={(e) => setMessage(e.target.value)}
                />
                <FieldDescription className='text-xs'>
                  A personal message helps lenders feel confident about lending
                  to you
                </FieldDescription>
              </Field>
            )}
            {step === 2 && (
              <>
                <div className='bg-app-bg border border-y-app-secondary/20 rounded-lg p-4 space-y-3'>
                  <p className='text-sm font-medium text-app-primary'>
                    By requesting to borrow, you agree to:
                  </p>
                  <ul className='space-y-2 text-app-primary'>
                    {points.map((point) => (
                      <li key={point} className='flex items-start gap-2'>
                        <span className='text-app-secondary'>•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className='p-4 bg-gray-50 rounded-lg text-sm text-muted-foreground space-y-2'>
                  <p className='font-medium text-gray-900'>Why this matters:</p>
                  <p>
                    This platform is built on trust, not transactions. When you
                    borrow responsibly, you help create a community where people
                    feel confident supporting each other's success.
                  </p>
                </div>
                <FieldLabel className='bg-app-fg border-blue-200 cursor-pointer'>
                  <Field orientation='horizontal'>
                    <Checkbox
                      id='toggle-checkbox-2'
                      name='toggle-checkbox-2'
                      checked={agreed}
                      onCheckedChange={setAgreed}
                    />
                    <FieldContent>
                      <FieldTitle>
                        I agree to return the outfit responsibly and in good
                        condition.
                      </FieldTitle>
                      <FieldDescription>
                        This helps keep the community safe and respectful.
                      </FieldDescription>
                    </FieldContent>
                  </Field>
                </FieldLabel>
              </>
            )}
          </>
        </div>

        <DialogFooter className='flex gap-2'>
          {step === 1 && (
            <>
              <DialogClose className='flex-1' asChild>
                <Button variant='outline' type='button'>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                className='flex-1 bg-app-primary/90 hover:bg-app-primary'
                onClick={() => setStep(2)}
              >
                Continue
              </Button>
            </>
          )}
          {step === 2 && (
            <>
              <Button
                variant='outline'
                className='flex-1'
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                className='flex-1 bg-app-primary/90 hover:bg-app-primary'
                disabled={!agreed}
                onClick={handleSendRequest}
              >
                Send Request
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowRequestDialog;

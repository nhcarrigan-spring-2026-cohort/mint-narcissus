import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { completeProfile } from '../../store/authSlice';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from '@/components/ui/field';

export default function ProfileSetup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState('borrower');

  const handleComplete = () => {
    dispatch(
      completeProfile({
        activeRole: selectedRole,
      }),
    );
    navigate('/');
  };

  return (
    <section className='flex w-full h-screen items-center justify-center'>
      <Card className='w-80 sm:w-96 px-8 flex flex-col'>
        <h2 className='font-serif   text-lg text-app-primary font-semibold leading-px'>
          Complete Your Profile
        </h2>
        <p className='text-xs sm:text-sm text-muted-foreground leading-px'>
          Sign up to borrow or lend interview outfits
        </p>
        <RadioGroup defaultValue='borrower' className='w-full'>
          <FieldLabel
            htmlFor='borrower'
            onClick={() => setSelectedRole('borrower')}
          >
            <Field orientation='horizontal'>
              <FieldContent>
                <FieldTitle>Borrower</FieldTitle>
                <FieldDescription className="text-xs">
                  I'm looking to borrow professional outfits for interviews{' '}
                </FieldDescription>
              </FieldContent>
              <RadioGroupItem value='borrower' id='borrower' />
            </Field>
          </FieldLabel>
          <FieldLabel
            htmlFor='lender'
            onClick={() => setSelectedRole('lender')}
          >
            <Field orientation='horizontal'>
              <FieldContent>
                <FieldTitle className="text-sm">Lender</FieldTitle>
                <FieldDescription className="text-xs">
                  I want to lend my professional outfits to help others succeed
                </FieldDescription>
              </FieldContent>
              <RadioGroupItem value='lender' id='lender' />
            </Field>
          </FieldLabel>
        </RadioGroup>
        <Button disabled={!selectedRole} onClick={handleComplete}>
          Continue
        </Button>
      </Card>
    </section>
  );
}

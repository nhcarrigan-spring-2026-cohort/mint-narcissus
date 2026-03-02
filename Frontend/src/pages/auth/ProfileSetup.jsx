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
  FieldLegend,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field';
import SizeGuideModal from '@/components/shared/SizeGuideModal';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from '@/components/ui/select';
import { updateMeApi } from '@/api/auth.api';
import { toast } from 'sonner';

const ProfileSetup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('borrower');
  const [height, setHeight] = useState('');
  const [topSize, setTopSize] = useState('');
  const [bottomSize, setBottomSize] = useState('');
  const [fitPreference, setFitPreference] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleStep = () => {
    step === 1 ? setStep(2) : setStep(1);
  };

  const handleComplete = async () => {
    const profileData = {
      activeRole: selectedRole,
      sizeProfile: {
        height,
        topSize,
        bottomSize,
        fitPreference,
      }
    };
    setIsLoading(true);
    try {
      const data = await updateMeApi(profileData);
      dispatch(completeProfile(data.user));
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='bg-app-bg flex w-full h-screen items-center justify-center'>
      <Card className='w-80 sm:w-96 px-8 flex flex-col'>
        <h2 className='font-serif text-lg text-app-primary font-semibold leading-px'>
          Complete Your Profile
        </h2>
        <p className='text-xs sm:text-sm text-muted-foreground leading-normal'>
          We need some information to help us match you with the right outfits
        </p>
        {step === 1 ? (
          <FieldSet className='w-full max-w-xs'>
            <FieldLegend variant='label'>
              Select your preferred role:
            </FieldLegend>
            <RadioGroup value={selectedRole} onValueChange={setSelectedRole}>
              <FieldLabel htmlFor='borrower'>
                <Field orientation='horizontal'>
                  <FieldContent>
                    <FieldTitle>Borrower</FieldTitle>
                    <FieldDescription className='text-xs'>
                      I'm looking to borrow professional outfits for interviews
                    </FieldDescription>
                  </FieldContent>
                  <RadioGroupItem value='borrower' id='borrower' />
                </Field>
              </FieldLabel>
              <FieldLabel htmlFor='lender'>
                <Field orientation='horizontal'>
                  <FieldContent>
                    <FieldTitle className='text-sm'>Lender</FieldTitle>
                    <FieldDescription className='text-xs'>
                      I want to lend my professional outfits to help others
                      succeed
                    </FieldDescription>
                  </FieldContent>
                  <RadioGroupItem value='lender' id='lender' />
                </Field>
              </FieldLabel>
            </RadioGroup>
          </FieldSet>
        ) : (
          <FieldSet className='w-full max-w-xs'>
            <FieldLegend
              variant='label'
              className='flex w-full justify-between items-center'
            >
              <span className='text-base'>Your Size Details:</span>
              <SizeGuideModal />
            </FieldLegend>

            <div className='grid grid-cols-2 gap-4'>
              <Field>
                <FieldLabel htmlFor='height'>Height</FieldLabel>
                <Select value={height} onValueChange={setHeight}>
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
              <Field>
                <FieldLabel htmlFor='topSize'>Fit Preference</FieldLabel>
                <Select value={fitPreference} onValueChange={setFitPreference}>
                  <SelectTrigger>
                    <SelectValue placeholder='Fit Preference' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Slim'>Slim</SelectItem>
                    <SelectItem value='Regular'>Regular</SelectItem>
                    <SelectItem value='Relaxed'>Relaxed</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor='topSize'>Top Size</FieldLabel>
                <Select value={topSize} onValueChange={setTopSize}>
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
              <Field>
                <FieldLabel htmlFor='bottomSize'>Bottom Size</FieldLabel>
                <Select value={bottomSize} onValueChange={setBottomSize}>
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
            </div>
          </FieldSet>
        )}
        {step === 1 ? (
          <Button disabled={!selectedRole} onClick={handleStep}>
            Next
          </Button>
        ) : (
          <div className='flex items-center justify-between'>
            <Button onClick={handleStep}>Previous</Button>
            <Button
              disabled={
                !selectedRole ||
                !height ||
                !topSize ||
                !bottomSize ||
                !fitPreference
              }
              onClick={handleComplete}
            >
              Complete
            </Button>
          </div>
        )}
      </Card>
    </section>
  );
};

export default ProfileSetup;

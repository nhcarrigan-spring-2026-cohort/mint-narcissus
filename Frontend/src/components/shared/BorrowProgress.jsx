import React from 'react';
import {
  LuCircleCheck,
  LuHandshake,
  LuMessageCircle,
  LuPackage,
  LuStar,
} from '@/utils/icons';
import { Badge } from '../ui/badge';

const steps = [
  {
    name: 'Request',
    status: 'current',
    icon: <LuMessageCircle className='size-5' />,
  },
  {
    name: 'Approved',
    status: 'upcoming',
    icon: <LuCircleCheck className='size-5' />,
  },
  {
    name: 'Borrowed',
    status: 'upcoming',
    icon: <LuPackage className='size-5' />,
  },
  {
    name: 'Returned',
    status: 'upcoming',
    icon: <LuHandshake className='size-5' />,
  },
  {
    name: 'Rated',
    status: 'upcoming',
    icon: <LuStar className='size-5' />,
  },
];

const BorrowProgress = () => {
  const isLastStep = (step) => steps.indexOf(step) === steps.length - 1;
  return (
    <div className='bg-white border rounded-lg p-4 mb-4'>
      <div className='flex items-center justify-between'>
        {steps.map((step) => (
          <div
            className={`flex items-center ${isLastStep(step) ? 'flex-1' : 'flex-2'}`}
            key={step.name}
          >
            <div className='flex flex-col items-center gap-2 flex-1'>
              <div
                className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-colors  text-app-primary ${step.status === 'current' ? 'bg-app-primary/10 ring-2  ring-app-secondary' : 'bg-gray-100 text-gray-400'}`}
              >
                {step.icon}
              </div>
              <div className='text-center'>
                <p
                  className={`text-xs font-medium ${step.status === 'current' ? 'text-gray-900' : 'text-gray-400'}`}
                >
                  {step.name}
                </p>
                {step.status === 'current' && (
                  <Badge
                    variant='secondary'
                    className='rounded bg-app-secondary text-white'
                  >
                    Current
                  </Badge>
                )}
              </div>
            </div>
            {!isLastStep(step) && (
              <div className='flex-1 h-0.5 mx-2 -mt-5'>
                <div className='h-full bg-gray-200'></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BorrowProgress;

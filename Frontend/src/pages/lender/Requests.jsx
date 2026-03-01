import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

const Requests = () => {
  const statsMap = [
    {
      title: 'Pending Requests',
      value: 3,
      textColor: 'text-black',
    },
    {
      title: 'Approved',
      value: 1,
      textColor: 'text-app-secondary',
    },
    {
      title: 'Declined',
      value: 0,
      textColor: 'text-gray-500',
    },
  ];
  return (
    <section className='grow container mx-auto px-4 py-8'>
      <div className='space-y-6'>
        <div className='flex flex-col'>
          <h2 className='font-serif text-app-primary text-3xl font-bold'>
            Borrow Requests
          </h2>
          <p className='text-muted-foreground'>
            Review and respond to requests for your outfits
          </p>
        </div>
        {/* Stats Card */}
        <Card>
          <CardContent>
            <div className='flex items-center justify-between'>
              {statsMap.map((stat) => (
                <div key={stat.title} className='text-center flex-1'>
                  <p className={`text-3xl font-bold ${stat.textColor}`}>
                    {stat.value}
                  </p>
                  <p className='text-sm text-muted-foreground'>{stat.title}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Requests;

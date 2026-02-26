import React from 'react';
import OutfitsContainer from '@/components/outfits/OutfitsContainer';
import DashboardStats from '@/components/lender/DashboardStats';
import { MOCK_STATS } from '@/utils/mockData';


  
export default function MyOutfits() {

  return (
    <section className='grow mx-auto px-4 py-8'>
            <div className='flex items-center justify-between'>
              <div>
                <h1 className='text-3xl font-bold'>My Outfits</h1>
                <p className='text-muted-foreground'>Manage your listed outfits</p>
              </div>
            </div>
      <div><DashboardStats stats={MOCK_STATS} /></div>
      
      <div>{/* Can currently no filter component to filter only the lenders outfits: need to get filter feature in first*/}
        <OutfitsContainer />
      </div>
    </section>
  );
};



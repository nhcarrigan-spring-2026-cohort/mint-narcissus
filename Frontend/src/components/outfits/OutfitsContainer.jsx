import React from 'react';
import OutfitCard from './OutfitCard';

const OutfitsContainer = ({ outfits }) => {
  return (
    <div className='flex flex-col py-4 gap-4'>
      <p className='text-muted-foreground text-sm'>
        Showing {outfits.length} outfits
      </p>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {outfits.map((outfit) => (
          <OutfitCard key={outfit.id} outfit={outfit} />
        ))}
      </div>
    </div>
  );
};

export default OutfitsContainer;

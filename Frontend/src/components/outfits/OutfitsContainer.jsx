import React from 'react';

import { MOCK_OUTFITS } from '@/utils/mockData';
import { useState } from 'react';
import OutfitCard from './OutfitCard';
import OutfitDetailModal from './OutfitDetailModal';

export default function OutfitsContainer() {
  const [selectedOutfit, setSelectedOutfit] = useState(null);

  const [favorites, setFavorites] = useState({});

  
  const handleFavorite = (outfitId) => {
    setFavorites((prev) => ({ ...prev, [outfitId]: !prev[outfitId] }));
  };

  const handleCardClick = (outfit) => setSelectedOutfit(outfit);

  const handleCloseModal = () => setSelectedOutfit(null);


  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
        {MOCK_OUTFITS.map((outfit) => (
          <div
            className='cursor-pointer'
            key={outfit.id}
            onClick={() => handleCardClick(outfit)}
          >
            <OutfitCard
              title={outfit.title}
              imgSrc={outfit.imgSrc}
              status={outfit.status}
              tags={outfit.tags}
              category={outfit.category}
              fabric={outfit.fabric}
              fitInfo={outfit.fitInfo}
              topSize={outfit.topSize}
              bottomSize={outfit.bottomSize}
              description={outfit.description}
              quote={outfit.quote}
              owner={outfit.owner}
              
              
              isFavorite={favorites[outfit.id] || false}
              onFavoriteClick={() => handleFavorite(outfit.id)}
            />
          </div>
        ))}
      </div>

      <OutfitDetailModal
        outfit={selectedOutfit}
        isOpen={!!selectedOutfit}
        onClose={handleCloseModal}
        isFavorite={
          selectedOutfit ? favorites[selectedOutfit.id] || false : false
        }
        onFavoriteClick={() => {
          if (selectedOutfit) {
            handleFavorite(selectedOutfit.id);
          }
        }}
      />
    </>
  );
}

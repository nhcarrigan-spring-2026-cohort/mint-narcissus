import { useState } from 'react';
import OutfitCard from './OutfitCard';
import OutfitDetailModal from './OutfitDetailModal';

export default function OutfitGallery() {
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [favorites, setFavorites] = useState({});

  const sampleOutfits = [
    {
      id: 1,
      title: 'Classic Navy Suit',
      imgSrc:
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=800&fit=crop',
      status: 'Available',
      tags: ['Formal', 'Corporate', 'Finance'],
      fitInfo: "5'9-6'0, Average build",
      quote:
        'Wore this for my first investment banking interview at Goldman Sachs. Walk in with confidence.',
      owner: {
        name: 'Sarah Johnson',
        avatar:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      },
    },
  ];

  const handleFavorite = (outfitId) => {
    setFavorites((prev) => ({
      ...prev,
      [outfitId]: !prev[outfitId],
    }));
  };

  const handleCardClick = (outfit) => {
    setSelectedOutfit(outfit);
  };

  const handleCloseModal = () => {
    setSelectedOutfit(null);
  };

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
        {sampleOutfits.map((outfit) => (
          <div
            key={outfit.id}
            onClick={() => handleCardClick(outfit)}
            className='cursor-pointer'
          >
            <OutfitCard
              title={outfit.title}
              imgSrc={outfit.imgSrc}
              isFavorite={favorites[outfit.id] || false}
              onFavoriteClick={(e) => {
                e.stopPropagation();
                handleFavorite(outfit.id);
              }}
              status={outfit.status}
              tags={outfit.tags}
              fitInfo={outfit.fitInfo}
              quote={outfit.quote}
              owner={outfit.owner}
            />
          </div>
        ))}
      </div>

      <OutfitDetailModal
        outfit={selectedOutfit}
        isOpen={!!selectedOutfit}
        onClose={handleCloseModal}
        isFavorite={
          selectedOutfit ? favorites [selectedOutfit.id] || false : false
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

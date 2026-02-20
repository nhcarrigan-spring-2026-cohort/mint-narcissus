import { useCallback, useState } from 'react';
import OutfitCard from './OutfitCard';
import OutfitDetailModal from './OutfitDetailModal';
import { MOCK_OUTFITS } from '@/utils/mockData';
import { OutfitFilters } from './OutfitFilters'; // or OutfitFilters — whatever you named it

export default function OutfitsContainer() {
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [filteredOutfits, setFilteredOutfits] = useState(MOCK_OUTFITS);

  const handleFilterChange = useCallback((filters) => {
    console.log(filters);

    const filtered = MOCK_OUTFITS.filter((outfit) => {
      
      const matchesSearch =
        !filters.search ||
        outfit.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
        outfit.description
          ?.toLowerCase()
          .includes(filters.search.toLowerCase());

      const matchesCategory =
        filters.category === 'all' || outfit.category === filters.category;

      const matchesInterviewType =
        filters.interviewType === 'all' ||
        outfit.tags === filters.interviewType;

      const matchesStatus =
        filters.status === 'all' || outfit.status === filters.status;

      const matchesSize =
        !filters.size ||
        outfit.size?.toLowerCase().includes(filters.size.toLowerCase()) ||
        // If your outfits have topSize/bottomSize instead:
        outfit.topSize?.toLowerCase().includes(filters.size.toLowerCase()) ||
        outfit.bottomSize?.toLowerCase().includes(filters.size.toLowerCase());

      return (
        matchesSearch &&
        matchesCategory &&
        matchesInterviewType &&
        matchesStatus &&
        matchesSize
      );
    });

    setFilteredOutfits(filtered);
  },[]);

  const handleFavorite = (outfitId) => {
    setFavorites((prev) => ({ ...prev, [outfitId]: !prev[outfitId] }));
  };

  const handleCardClick = (outfit) => setSelectedOutfit(outfit);

  const handleCloseModal = () => setSelectedOutfit(null);

  return (
    <>
      <OutfitFilters onFilterChange={handleFilterChange} />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
        {filteredOutfits.map((outfit) => (
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
          if (selectedOutfit) handleFavorite(selectedOutfit.id);
        }}
      />
    </>
  );
}

import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Filter from '@/components/borrower/Filter';
import OutfitsContainer from '@/components/outfits/OutfitsContainer';
import { filterOutfits } from '@/utils/filterOutfit';
import EmptyState from '../shared/EmptyState';
import { LuHeart, TbHanger } from '@/utils/icons';

export default function Saved() {
  const savedItems = useSelector((state) => state.saved.items);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    interviewType: '',
    availability: '',
    topSize: '',
    bottomSize: '',
    height: '',
    fitType: '',
  });

  const filteredSaved = useMemo(() => {
    return filterOutfits(savedItems, filters);
  }, [savedItems, filters]);

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      interviewType: '',
      availability: '',
      topSize: '',
      bottomSize: '',
      height: '',
      fitType: '',
    });
  };

  return (
    <section className='grow py-8 px-4'>
      <h2 className='font-serif font-bold text-app-primary text-3xl leading-snug'>
        Saved Outfits
      </h2>
      <h3 className='text-muted-foreground text-sm'>
        Your collection of interview-ready outfits
      </h3>
      {savedItems.length === 0 ? (
        <EmptyState
          title='No saved outfits yet'
          description="You haven't saved any outfits yet. Browse available outfits and save your favorites."
          icon={<LuHeart size='40' className='text-app-saved/30' />}
          redirectPath='/'
          onAction={() => {}}
          actionLabel='Browse Outfits'
        />
      ) : (
        <div className='w-full my-6'>
          <Filter
            filters={filters}
            setFilters={setFilters}
            onClear={clearFilters}
          />
          <OutfitsContainer outfits={filteredSaved} />
        </div>
      )}
    </section>
  );
}

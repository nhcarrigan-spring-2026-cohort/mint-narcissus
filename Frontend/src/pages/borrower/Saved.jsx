import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Filter from '@/components/borrower/Filter';
import OutfitsContainer from '@/components/outfits/OutfitsContainer';
import { filterOutfits } from '@/utils/filterOutfit';
import EmptyState from '../shared/EmptyState';
import { LuHeart } from '@/utils/icons';

const defaultFilters = {
  category: 'All',
  interviewType: 'All',
  availability: 'All',
  topSize: 'All',
  bottomSize: 'All',
  height: 'All',
  fitType: 'All',
  search: '',
};

export default function Saved() {
  const savedItems = useSelector((state) => state.saved.items);

  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(
    () => ({
      search: searchParams.get('search') || '',
      category: searchParams.get('category') || '',
      interviewType: searchParams.get('interviewType') || '',
      availability: searchParams.get('availability') || '',
      topSize: searchParams.get('topSize') || '',
      bottomSize: searchParams.get('bottomSize') || '',
      height: searchParams.get('height') || '',
      fitType: searchParams.get('fitType') || '',
    }),
    [searchParams],
  );

  const updateFilter = (key, value) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (!value || value === 'All') {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
      return newParams;
    });
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const filteredSaved = useMemo(() => {
    return filterOutfits(savedItems, filters);
  }, [savedItems, filters]);

  return (
    <section className='grow py-8 px-4'>
      <h2
        id='saved-heading'
        className='font-serif font-bold text-app-primary text-3xl leading-snug'
      >
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
            updateFilter={updateFilter}
            onClear={clearFilters}
            defaultFilters={defaultFilters}
          />
          {filteredSaved.length === 0 ? (
            <EmptyState
              title='No outfits match your filters'
              description='Try adjusting your size filters to see more options.'
              actionLabel='Clear Filters'
              onAction={clearFilters}
            />
          ) : (
            <OutfitsContainer outfits={filteredSaved} />
          )}
        </div>
      )}
    </section>
  );
}

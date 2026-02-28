import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Filter from '@/components/borrower/Filter';
import OutfitsContainer from '@/components/outfits/OutfitsContainer';
import { MOCK_OUTFITS } from '@/utils/mockData';
import { filterOutfits } from '@/utils/filterOutfit';
import EmptyState from '../shared/EmptyState';
import { TbHangerOff } from '@/utils/icons';

export default function Browse() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    interviewType: searchParams.get('interviewType') || '',
    availability: searchParams.get('availability') || '',
    topSize: searchParams.get('topSize') || '',
    bottomSize: searchParams.get('bottomSize') || '',
    height: searchParams.get('height') || '',
    fitType: searchParams.get('fitType') || '',
  };

  const updateFilter = useCallback(
    (key, value) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        if (!value || value === 'All') {
          newParams.delete(key);
        } else {
          newParams.set(key, value);
        }
        return newParams;
      });
    },
    [setSearchParams],
  );

  const clearFilters = () => {
    setSearchParams({});
  };

  const filteredOutfits = useMemo(() => {
    return filterOutfits(MOCK_OUTFITS, filters);
  }, [filters]);

  return (
    <section className='grow py-6 px-8'>
      {MOCK_OUTFITS.length === 0 ? (
        <EmptyState
          title='No outfits available yet'
          description='We’re working on adding more interview-ready outfits. Please check back soon.'
          icon={<TbHangerOff size='40' className='text-muted-foreground/30' />}
          
        />
      ) : (
        <div>
          <Filter
            filters={filters}
            updateFilter={updateFilter}
            onClear={clearFilters}
          />
          {filteredOutfits.length === 0 ? (
            <EmptyState
              title='No outfits match your filters'
              description='Try adjusting your size filters to see more options.'
              actionLabel='Clear Filters'
              onAction={clearFilters}
            />
          ) : (
            <OutfitsContainer outfits={filteredOutfits} />
          )}
        </div>
      )}
    </section>
  );
}

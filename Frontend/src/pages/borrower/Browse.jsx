import { useMemo, useState } from 'react';
import Filter from '@/components/borrower/Filter';
import OutfitsContainer from '@/components/outfits/OutfitsContainer';
import { MOCK_OUTFITS } from '@/utils/mockData';
import { filterOutfits } from '@/utils/filterOutfit';

export default function Browse() {
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

  const outfits = MOCK_OUTFITS;

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

  const filteredOutfits = useMemo(() => {
    return filterOutfits(outfits, filters);
  }, [outfits, filters]);

  return (
    <section className='grow py-6 px-8'>
      <div>
        <Filter
          filters={filters}
          setFilters={setFilters}
          onClear={clearFilters}
        />
        <OutfitsContainer outfits={filteredOutfits} />
      </div>
    </section>
  );
}

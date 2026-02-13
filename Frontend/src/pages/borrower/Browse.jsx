import Filter from '@/components/borrower/Filter';
import OutfitsContainer from '@/components/outfits/OutfitsContainer';

export default function Browse() {
  return (
    <section>
      <div>
        <Filter />
      </div>
      <div>
        <OutfitsContainer />
      </div>
    </section>
  );
}

import {Filter} from '@/components/outfits/Filter';
import OutfitsContainer from '@/components/outfits/OutfitsContainer';


export default function Browse() {
  return (
    <section className='grow'>
      <div>
        <Filter />
      </div>
      <div>
        <OutfitsContainer  />
      </div>
    </section>
  );
}

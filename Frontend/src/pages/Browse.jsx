import Filter from '../components/Filter';
import OutfitGallery from '@/components/OutfitGallery';

export default function Browse() {
  return (
    <section>
      <div>
        <Filter />
      </div>
      <div>
        <OutfitGallery />
      </div>
    </section>
  );
}

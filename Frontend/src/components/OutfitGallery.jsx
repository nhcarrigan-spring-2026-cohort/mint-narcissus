import { useState } from "react";
import OutfitCard from "./OutfitCard";

export default function OutfitGallery() {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <div>
      <OutfitCard
        title="Classic Navy Suit"
        imgSrc={
          "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&amp;h=800&amp;fit=crop"
        }
        isFavorite={isFavorite}
        onFavoriteClick={handleFavorite}
        status={"Available"}
        tags={["Formal", "Corporate", "Finance"]}
        fitInfo={"5'9-6'0, Average build"}
        quote={"Coolest ever"}
      />
    </div>
  );
}

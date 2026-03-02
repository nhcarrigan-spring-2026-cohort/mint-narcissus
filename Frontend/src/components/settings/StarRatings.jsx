import { Star, StarHalf } from 'lucide-react';

function StarRating({
  rating,
  max = 5,
  size = 20,
  fillColor = '#f59e0b',
  emptyColor = '#d1d5db',
}) {
  const normalized = Math.max(0, Math.min(max, rating));

  return (
    <div className='flex items-center gap-0.5'>
      {Array.from({ length: max }).map((_, i) => {
        const starValue = i + 1;

        if (normalized >= starValue) {
          // Full star
          return (
            <Star
              key={i}
              size={size}
              fill={fillColor}
              strokeWidth={0}
              color={fillColor}
            />
          );
        }

        if (normalized > i && normalized < starValue) {
          // Half star
          return (
            <StarHalf
              key={i}
              size={size}
              fill={fillColor}
              strokeWidth={0}
              color={fillColor}
            />
          );
        }

        // Empty star
        return (
          <Star
            key={i}
            size={size}
            fill='none'
            color={emptyColor}
            strokeWidth={2}
          />
        );
      })}
    </div>
  );
}

export default StarRating;

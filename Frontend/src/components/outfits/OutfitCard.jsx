import { HiOutlineTag } from "react-icons/hi2";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { IoShirtOutline } from "react-icons/io5";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function OutfitCard({
  title,
  imgSrc,
  isFavorite,
  onFavoriteClick,
  status,
  interviewTypes = [],
  fabric,
  fitInfo,
  quote,
  owner,
  onViewDetails,
}) {
  return (
    <Card className='group overflow-hidden rounded-xl border hover:shadow-lg transition-all duration-200 p-4'>
      {/* Image section */}
      <CardHeader className='p-0 relative'>
        <div className='relative h-64 w-full overflow-hidden'>
          <img
            className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer'
            src={imgSrc}
            alt={title}
          />
        </div>

        {/* Favorite button */}
        <div className='absolute top-3 right-3'>
          <Button
            className='rounded-full bg-white/80 hover:bg-white shadow-sm backdrop-blur-sm size-9 border-none'
            variant='secondary'
            size='icon'
            onClick={(e) => { e.stopPropagation(); onFavoriteClick();}}
          >
            {isFavorite ? (
              <HiHeart className='size-5 text-red-500' />
            ) : (
              <HiOutlineHeart className='size-5' />
            )}
          </Button>
        </div>

        {/* Status badge */}
        <div className='absolute top-3 left-3'>
          <Badge variant='default' className=''>
            {status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className='p-4 space-y-3'>
        <div className='cursor-pointer'>
          <h3>{title}</h3>

          {/* Tags */}
          <div className='flex-wrap gap-2 mb-2'>
            {interviewTypes.map((tag, key) => (
              <Badge
                key={key}
                variant='outline'
                className='font-normal capitalize px-2 py-0'
              >
                {key === 0 && <HiOutlineTag className='mr-1 size-3' />}
                {tag}
              </Badge>
            ))}
          </div>

          {/* Details */}
          <div className='space-y-1.5 text-sm text-muted-foreground'>
            {fitInfo && (
              <div className='flex items-start justify-center gap-2'>
                <IoShirtOutline className='size-4 mt-0.5 shrink-0' />
                <span>{fitInfo}</span>
              </div>
            )}
          </div>
          {/* Fabric */}
          <div className='space-y-1.5 text-xs '>
            <span>Fabric: {fabric}</span>
          </div>
          {/* Quotes */}
          {quote && (
            <div className='bg-[#FDF9F3] border border-[#C5A059]/20 rounded-lg p-3'>
              <p className='text-xs text-[#1A2B48] italic leading-relaxed line-clamp-2'>
                "{quote}"
              </p>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className='p-4 pt-0 flex-col gap-3'>
        {/* Owner Info */}
        {owner && (
          <div className='flex items-center justify-between pt-2 border-t'>
            <Avatar className='flex items-center space-x-2'>
              <span className='relative flex size-10 shrink-0 overflow-hidden rounded-full h-7 w-7'>
                <AvatarImage
                  className='aspect-square size-full'
                  src={owner.avatar}
                  alt={`Picture of person named ${owner.name}`}
                />
              </span>
            </Avatar>
            <span className='text-sm text-muted-foreground'>{owner.name}</span>
          </div>
        )}

        <Button
          onClick={onViewDetails}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 has-[&gt;svg]:px-3 w-full"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}

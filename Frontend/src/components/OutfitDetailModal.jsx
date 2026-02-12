import { Button } from '@/components/ui/button';
import { HiX } from 'react-icons/hi';

import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi2';
import { IoShirtOutline } from 'react-icons/io5';
export default function OutfitDetailModal({ outfit, isOpen, onClose, isFavorite, onFavoriteClick, requestToBorrow }) {
  if (!isOpen || !outfit) return null;

  return (
    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50'>
      <div className='bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto'>
        <div className='sticky top-0 bg-white border-b flex justify-end p-4 z-10 gap-4'>
          <Badge variant='default'>{outfit.status}</Badge>
          <Button
            variant='ghost'
            size='icon'
            onClick={onClose}
            className='rounded-full'
          >
            <HiX className='size-6' />
          </Button>
        </div>
        <div className='p-2'>
          {/* Outfit title */}
          <h3 className='text-2xl'>{outfit.title}</h3>

          {/* Listed by --- owner*/}
          <p className='text-muted-foreground'>
            Listed by: {outfit.owner.name}
          </p>
        </div>
        {/* outfit.imgSrc */}
        <img className='' src={outfit.imgSrc} alt={outfit.title} />
        {/* Owner avatar Lender*/}
        <div className='flex items-center space-x-3 p-4'>
          <Avatar className='flex items-center '>
            <span className=''>
              <AvatarImage
                className='aspect-square size-full'
                src={outfit.owner.avatar}
                alt={outfit.owner.name}
              />
            </span>
          </Avatar>
          <span className='text-sm text-muted-foreground'>
            {outfit.owner.name}
          </span>
        </div>
        {/* Confidence note: Quote*/}
        <div className='border'>
          <p className='text-xs text-[#1A2B48] italic leading-relaxed line-clamp-2'>
            Confidence Note: {outfit.quote}
          </p>
        </div>
        {/* Description */}
        <div>
          <h3>Description</h3>
          <p>{outfit.description}</p>
        </div>
        {/* Outfit Details Catagory, Fabric, Suitable, Top size, Bottom size*/}
        <div className='grid-cols-2'>
          <div className='flex-col'>
            <h3>Outfit Details</h3>
            <div>
              <h5>Category</h5>
              <p>{outfit.category}</p>
            </div>
            <div>
              <h5>Fabric</h5>
              <p>{outfit.fabric}</p>
            </div>
            <div>
              <h5>Suitable For</h5>
              <div className='border border-4'>
                {outfit.tags.map((tag, key) => (
                  <Badge
                    key={key}
                    variant='outline'
                    className=' border border-4 size-10 text-black capitalize text-sm'
                  >
                    {outfit.tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className='flex-col'>
            <div>
              <h5>Top Size</h5>
              <p>{outfit.topSize}</p>
            </div>
            <div>
              <h5>Bottom Size</h5>
              <p>{outfit.bottomSize}</p>
            </div>
          </div>
        </div>
        {/* Save Button */}
        {/* Request to borrow Button*/}
        <div className='flex'>
          <Button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 has-[&gt;svg]:px-3 w-full"
            onClick={onFavoriteClick}
          >
            {isFavorite ? (
              <HiHeart className='size-5 text-red-500' />
            ) : (
              <HiOutlineHeart className='size-5' />
            )}{' '}
            Save
          </Button>
          <Button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 has-[&gt;svg]:px-3 w-full"
            onClick={requestToBorrow}
          >
            <IoShirtOutline className='size-5' /> Request to Borrow
          </Button>
        </div>
        {/* */}
        {/* */}
      </div>
    </div>
  );
}

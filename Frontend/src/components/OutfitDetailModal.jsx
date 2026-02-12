import { Button } from '@/components/ui/button';
import { HiX } from 'react-icons/hi';

import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
export default function OutfitDetailModal({ outfit, isOpen, onClose }) {
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
        {/* Outfit Details Catagory, Fabric, Suitable, Top size, Bottom size*/}
        {/* Save Button */}
        {/* Request to borrow Button*/}
        {/* */}
        {/* */}
      </div>
    </div>
  );
}

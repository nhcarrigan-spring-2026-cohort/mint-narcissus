import { Button } from '@/components/ui/button';
import { HiX } from 'react-icons/hi';

import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi2';
import { IoShirtOutline } from 'react-icons/io5';

export default function OutfitDetailModal({
  outfit,
  isOpen,
  onClose,
  isFavorite,
  onFavoriteClick,
  requestToBorrow,
}) {
  if (!isOpen || !outfit) return null;

  return (
    <div className='bg-background fixed top-[50%] left-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg max-w-3xl max-h-[90vh] overflow-y-auto'>
      {/* Dialog Header */}
      <div className=' flex-col gap-2 text-center sm:text-left'>
        <div className='flex items-start justify-between'>
          <div className='flex-1'>
            <h2 className='font-semibold text-2xl'>{outfit.title}</h2>
            <p className='text-muted-foreground text-sm mt-1'>
              Listed by {outfit.owner.name}
            </p>
          </div>
          <div className='flex items-center gap-4'>
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
        </div>
      </div>

      <div className='space-y-6'>
        {/* Outfit Image */}
        <div className='relative rounded-lg overflow-hidden'>
          <img
            className='w-full h-96 object-cover'
            src={outfit.imgSrc}
            alt={outfit.title}
          />
        </div>
        {/* Owner Details */}
        <div className='flex items-center space-x-4 p-4 bg-muted rounded-lg'>
          <Avatar className='relative flex size-10 shrink-0 overflow-hidden rounded-full h-12 w-12'>
            <AvatarImage
              className='aspect-square size-full'
              src={outfit.owner.img}
              alt={outfit.owner.name}
            />
          </Avatar>
          <div className='flex-1'>
            <p className='font-semibold'>{outfit.owner.name}</p>
            <p className='text-sm text-muted-foreground'>Lender</p>
          </div>
        </div>
        {/* Confidence Note */}
        <div className='p-4 bg-blue-50 border border-blue-200 rounded-lg'>
          <p className='text-sm font-semibold text-blue-900 mb-1'>
            💙 Confidence Note
          </p>
          <p className='text-sm text-blue-700 italic'>
            "{outfit.confidenceNote}"
          </p>
        </div>
        {/* Details */}
        <div>
          <h3 className='font-semibold mb-2'>Description</h3>
          <p className='text-muted-foreground'>{outfit.description}</p>
        </div>
        <hr />
        <div className='grid grid-cols-2 gap-6'>
          <div>
            <h3 className='font-semibold mb-3'>Outfit Details</h3>
            <dl className='space-y-2 text-sm'>
              <div>
                <dt className='text-muted-foreground'>Category</dt>
                <dd className='font-medium'>{outfit.category}</dd>
              </div>
              <div>
                <dt className='text-muted-foreground'>Fabric</dt>
                <dd className='font-medium'>{outfit.fabric}</dd>
              </div>
              <div>
                <dt className='text-muted-foreground'>Suitable For</dt>
                <dd className='font-medium'>
                  {outfit.interviewTypes?.map((interviewTypes, id) => (
                    <Badge
                      key={id}
                      variant='outline'
                      className=' text-black capitalize text-sm'
                    >
                      {interviewTypes}
                    </Badge>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
          <div>
            <h3 className='font-semibold mb-3'>Size Information</h3>
            <dl className='space-y-2 text-sm'>
              <div>
                <dt className='text-muted-foreground'>Top Size</dt>
                <dd className='font-medium'>{outfit.size.top}</dd>
              </div>
              <div>
                <dt className='text-muted-foreground'>Bottom Size</dt>
                <dd className='font-medium'>{outfit.size.bottom}</dd>
              </div>
            </dl>
          </div>
        </div>
        <div className='flex gap-2 pt-4'>
          <div className='flex px-3 gap-3'>
            <Button
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[&gt;svg]:px-3 flex-1"
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
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 has-[&gt;svg]:px-3 flex-1"
              onClick={requestToBorrow}
            >
              <IoShirtOutline className='size-5' /> Request to Borrow
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

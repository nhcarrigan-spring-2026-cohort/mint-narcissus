import { useDispatch } from 'react-redux';
import { toggleSave } from '@/store/savedSlice';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';
import { LuHeart } from '@/utils/icons';
import BorrowRequestDialog from '../borrower/BorrowRequestDialog';

const OutfitDetails = ({ outfit, isAvailable, isSaved }) => {
  const dispatch = useDispatch();

  const {
    category,
    confidenceNote,
    description,
    fabric,
    interviewTypes,
    lenderDetails,
    outfitImageUrl,
    size,
    title,
  } = outfit;

  const handleToggleSave = () => {
    if (isSaved) {
      dispatch(toggleSave(outfit));
      toast.success(`${outfit.title} removed from saved`);
    } else {
      dispatch(toggleSave(outfit));
      toast.success(`${outfit.title} saved successfully`);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={!isAvailable}
          className={`w-full  disabled:cursor-not-allowed ${isAvailable ? 'bg-app-primary/95 hover:bg-app-primary' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
        >
          {isAvailable ? 'View Details' : 'Currently Borrowed'}
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-app-bg'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className='no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4 space-y-4'>
          <div className='rounded-lg overflow-hidden'>
            <img
              src={outfitImageUrl}
              alt={title}
              className='w-full h-96 object-cover'
            />
          </div>
          <div className='flex items-center p-4 bg-muted rounded-lg space-x-4'>
            <Avatar size='lg'>
              <AvatarImage src={lenderDetails.lenderImageUrl} />
              <AvatarFallback>{lenderDetails.lenderName[0]}</AvatarFallback>
            </Avatar>
            <div className='flex flex-col leading-tight'>
              <span className='font-semibold'>{lenderDetails.lenderName}</span>
              <span className='text-sm text-muted-foreground'>Lender</span>
            </div>
          </div>
          <div className='p-4 bg-blue-50 border border-blue-200 rounded-lg'>
            <p className='text-sm font-semibold text-blue-800 mb-1'>
              Confidence Note
            </p>
            <p className='text-xs text-blue-500 italic leading-normal line-clamp-2'>
              "{confidenceNote}"
            </p>
          </div>
          <Separator />
          <div className='grid grid-cols-2 gap-6'>
            <div>
              <h3 className='font-serif text-app-primary font-semibold mb-3'>
                Outfit Details
              </h3>
              <dl className='space-y-2 text-sm'>
                <div>
                  <dt className='text-muted-foreground'>Category</dt>
                  <dd className='font-medium'>{category}</dd>
                </div>
                <div>
                  <dt className='text-muted-foreground'>Fabric</dt>
                  <dd className='font-medium'>{fabric}</dd>
                </div>
                <div>
                  <dt className='text-muted-foreground'>Suitable For</dt>
                  <dd className='flex flex-wrap gap-1 mt-1'>
                    {interviewTypes.map((i) => (
                      <Badge variant='outline' className='rounded' key={i}>
                        {i}
                      </Badge>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
            <div>
              <h3 className='text-app-primary font-serif font-semibold mb-3'>
                Size Information
              </h3>
              <dl className='space-y-2 text-sm'>
                <div>
                  <dt className='text-muted-foreground'>Top Size</dt>
                  <dd className='font-medium'>{size.topSize}</dd>
                </div>
                <div>
                  <dt className='text-muted-foreground'>Bottom Size</dt>
                  <dd className='font-medium'>{size.bottomSize}</dd>
                </div>
                <div>
                  <dt className='text-muted-foreground'>Fit Type</dt>
                  <dd className='font-medium'>
                    {size.height}, {size.fitType}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        <DialogFooter className='flex gap-2'>
          <Button
            variant='outline'
            className='flex-1'
            onClick={handleToggleSave}
          >
            <LuHeart
              className={`transition-colors ${isSaved ? 'text-app-saved fill-app-saved' : ''}`}
            />
            {isSaved ? 'Saved' : 'Save'}
          </Button>
          <div className='flex-1'>
            <BorrowRequestDialog outfit={outfit} isAvailable={isAvailable} />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OutfitDetails;

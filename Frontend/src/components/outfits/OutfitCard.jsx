import { useDispatch, useSelector } from 'react-redux';
import { toggleSave } from '@/store/savedSlice';
import OutfitDetails from './OutfitDetails';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from 'sonner';
import { LuHeart, LuShirt, LuTag } from '@/utils/icons';

export default function OutfitCard({ outfit }) {
  const {
    category,
    confidenceNote,
    description,
    fabric,
    interviewTypes,
    lenderDetails,
    outfitImageUrl,
    size,
    status,
    title,
  } = outfit;
  const isAvailable = status === 'Available';
  const dispatch = useDispatch();
  const savedItems = useSelector((state) => state.saved.items);

  const isSaved = savedItems.some((item) => item.id === outfit.id);

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
    <Card
      className={`pt-0 overflow-hidden transition-all duration-200 ${isAvailable ? 'opacity-100' : 'opacity-50'}`}
    >
      <div className='relative overflow-hidden'>
        <img
          src={outfitImageUrl}
          className='w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer'
        />
        <Button
          variant='outline'
          size='icon'
          className='absolute top-3 right-3 rounded-full bg-white/80 hover:bg-white'
          onClick={handleToggleSave}
        >
          <LuHeart
            className={`transition-colors ${isSaved ? 'text-app-saved fill-app-saved' : ''}`}
          />
        </Button>
      </div>
      <CardHeader>
        <CardAction>
          <Badge
            className={`${isAvailable ? 'bg-app-secondary text-white' : 'bg-app-badge-1 text-app-badge-2'}`}
          >
            {status}
          </Badge>
        </CardAction>
        <CardTitle className='font-serif text-app-primary'>{title}</CardTitle>
        <CardDescription className='text-sm'>{description}</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-2'>
        <div className='flex flex-wrap w-full items-center gap-1'>
          <Badge variant='outline' className='rounded'>
            <LuTag data-icon='inline-start' />
            <span className='ml-1 font-normal'>{category}</span>
          </Badge>
          {interviewTypes.map((i) => (
            <Badge key={i} variant='outline' className='rounded font-normal'>
              {i}
            </Badge>
          ))}
        </div>
        <div className='flex flex-wrap gap-1 justify-between'>
          <Badge variant='secondary' className='flex items-center gap-1.5'>
            <LuShirt />
            <span className='text-xs'>
              {size.height}, {size.fitType}
            </span>
          </Badge>
          <Badge variant='secondary' className='text-xs'>
            Fabric-type: {fabric}
          </Badge>
        </div>
        <Separator />
        <div className='bg-app-note border border-app-secondary/20 rounded-lg p-3 flex flex-col gap-2'>
          <p className='text-xs text-app-primary italic leading-normal line-clamp-2'>
            "{confidenceNote}"
          </p>
          {isAvailable && (
            <div className='flex items-center justify-end gap-2'>
              <Avatar size='sm'>
                <AvatarImage src={lenderDetails.lenderImageUrl} />
                <AvatarFallback>{lenderDetails.lenderName[0]}</AvatarFallback>
              </Avatar>
              <span className='text-xs text-muted-foreground'>
                {lenderDetails.lenderName}
              </span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <OutfitDetails
          outfit={outfit}
          isAvailable={isAvailable}
          isSaved={isSaved}
        />
      </CardFooter>
    </Card>
  );
}

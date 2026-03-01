import { useDispatch } from 'react-redux';
import { removeOutfit, updateOutfitStatus } from '@/store/outfitSlice';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import OutfitDetails from '@/components/outfits/OutfitDetails';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { LuTrash2 } from '@/utils/icons';
import { Card, CardContent } from '@/components/ui/card';

const LentOutfitCard = ({ outfit }) => {
  const dispatch = useDispatch();

  const handleUpdateOutfitStatus = (id, status) =>
    dispatch(
      updateOutfitStatus({
        outfitId: id,
        status,
      }),
      toast.success(`Outfit status changed to ${status} successfully`),
    );

  const handleRemoveOutfit = (id) => {
    dispatch(removeOutfit(id));
    toast.success('Outfit removed successfully');
  };

  return (
    <Card className='bg-card text-card-foreground flex flex-col gap-6 rounded-xl border'>
      <CardContent>
        <div className='flex flex-col md:flex-row gap-6'>
          {/* Outfit Image */}
          <div className='w-full md:w-48 h-48 rounded-lg overflow-hidden shrink-0 relative'>
            <img
              src={outfit.outfitImageUrl}
              alt={outfit.title}
              className='w-full h-full object-cover'
            />
          </div>
          <div className='flex-1 space-y-4'>
            {/* Outfit Details Top*/}
            <div className='flex justify-between items-center'>
              <div>
                <h3 className='font-serif text-app-primary text-xl font-semibold'>
                  {outfit.title}
                </h3>
                <p className='text-sm text-muted-foreground line-clamp-2 mt-1'>
                  {outfit.description}
                </p>
              </div>
            </div>
            <div className='grid grid-cols-3 items-center text-sm'>
              <div className='space-y-1'>
                <Label className='text-muted-foreground font-normal'>
                  Category
                </Label>
                <p className='font-medium capitalize'>{outfit.category}</p>
              </div>
              <div className='space-y-1'>
                <Label className='text-muted-foreground font-normal'>
                  Listed
                </Label>
                <p className='font-medium'>{outfit.createdAt}</p>
              </div>
              <div className='space-y-1'>
                <Label className='text-muted-foreground font-normal'>
                  Quick Status:
                </Label>
                <Select
                  value={outfit.status}
                  onValueChange={(value) =>
                    handleUpdateOutfitStatus(outfit.id, value)
                  }
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select outfit status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Outfit Status</SelectLabel>
                      <SelectItem value='Available'>Available</SelectItem>
                      <SelectItem value='Borrowed'>Borrowed</SelectItem>
                      <SelectItem value='Unavailable'>Unavailable</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* Outfit Details Bottom */}
            <div className='grid grid-cols-2 gap-3 pt-2 border-t'>
              <OutfitDetails
                outfit={outfit}
                isAvailable={outfit.status === 'Available'}
              />
              {/* LATER: Confirm Delete Dialog */}
              <Button
                variant='destructive'
                onClick={() => handleRemoveOutfit(outfit.id)}
              >
                <LuTrash2 /> Remove
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LentOutfitCard;

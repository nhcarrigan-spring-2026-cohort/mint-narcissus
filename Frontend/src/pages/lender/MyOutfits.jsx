import { Card, CardContent } from '@/components/ui/card';
import React from 'react';
import { LuInfo, LuTrash2 } from '@/utils/icons';
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
import { useDispatch, useSelector } from 'react-redux';
import { MOCK_OUTFITS } from '@/utils/mockData';
import { removeOutfit, updateOutfitStatus } from '@/store/outfitSlice';
import { toast } from 'sonner';

const MyOutfits = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // Use for checking while development
  const outfits = MOCK_OUTFITS;
  // const outfits = useSelector((state) => state.outfits.items);

  const handleUpdateOutfitStatus = (id, status) =>
    dispatch(
      updateOutfitStatus({
        outfitId: id,
        status,
      }),
    );

  const handleRemoveOutfit = (id) => {
    dispatch(removeOutfit(id));
    toast.success('Outfit removed successfully');
  };

  const myOutfits = outfits.filter((o) => o.lenderDetails.lenderId === user.id);
  const total = myOutfits.length;
  const available = myOutfits.filter((o) => o.status === 'Available').length;
  const borrowed = myOutfits.filter((o) => o.status === 'Borrowed').length;
  const unavailable = myOutfits.filter(
    (o) => o.status === 'Unavailable',
  ).length;

  const cardMap = [
    {
      title: 'Total Listed',
      value: total,
      textColor: 'text-black',
    },
    {
      title: 'Available',
      value: available,
      textColor: 'text-emerald-600',
    },
    {
      title: 'Currently Lent',
      value: borrowed,
      textColor: 'text-amber-600',
    },
    {
      title: 'Unavailable',
      value: unavailable,
      textColor: 'text-gray-500',
    },
  ];
  return (
    <section className='grow container mx-auto px-4 py-8'>
      <div className='space-y-6'>
        <div className='flex flex-col'>
          <h2 className='font-serif text-app-primary text-3xl font-bold'>
            My Outfits
          </h2>
          <p className='text-muted-foreground'>Manage your listed outfits</p>
        </div>
        {/* Cards */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          {cardMap.map((c) => (
            <Card key={c.title}>
              <CardContent>
                <div className='text-center'>
                  <p className={`text-3xl font-bold ${c.textColor}`}>
                    {c.value}
                  </p>
                  <p className='text-sm text-muted-foreground'>{c.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Status Guide */}
        <div className='bg-blue-50 border border-blue-100 rounded-lg p-4'>
          <div className='flex items-start gap-3'>
            <LuInfo className='text-blue-600 size-5' />
            <div className='text-sm text-blue-900'>
              <p className='font-medium mb-1'>Status Guide</p>
              <ul className='space-y-1 text-blue-800'>
                <li>
                  <strong>Available:</strong> Visible in search, borrowers can
                  request
                </li>
                <li>
                  <strong>Borrowed:</strong> Currently with a borrower, hidden
                  from search
                </li>
                <li>
                  <strong>Unavailable:</strong> Hidden from search, you can
                  re-activate anytime
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Listed Outfits */}
        {myOutfits.map((o) => (
          <Card
            key={o.id}
            className='bg-card text-card-foreground flex flex-col gap-6 rounded-xl border'
          >
            <CardContent>
              <div className='flex flex-col md:flex-row gap-6'>
                {/* Outfit Image */}
                <div className='w-full md:w-48 h-48 rounded-lg overflow-hidden shrink-0 relative'>
                  <img
                    src={o.outfitImageUrl}
                    alt={o.title}
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='flex-1 space-y-4'>
                  {/* Outfit Details Top*/}
                  <div className='flex justify-between items-center'>
                    <div>
                      <h3 className='font-serif text-app-primary text-xl font-semibold'>
                        {o.title}
                      </h3>
                      <p className='text-sm text-muted-foreground line-clamp-2 mt-1'>
                        {o.description}
                      </p>
                    </div>
                  </div>
                  <div className='grid grid-cols-3 items-center text-sm'>
                    <div className='space-y-1'>
                      <Label className='text-muted-foreground font-normal'>
                        Category
                      </Label>
                      <p className='font-medium capitalize'>{o.category}</p>
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-muted-foreground font-normal'>
                        Listed
                      </Label>
                      <p className='font-medium'>{o.createdAt}</p>
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-muted-foreground font-normal'>
                        Quick Status:
                      </Label>
                      <Select
                        value={o.status}
                        onValueChange={(value) =>
                          handleUpdateOutfitStatus(o.id, value)
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
                            <SelectItem value='Unavailable'>
                              Unavailable
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {/* Outfit Details Bottom */}
                  <div className='grid grid-cols-2 gap-3 pt-2 border-t'>
                    <OutfitDetails
                      outfit={o}
                      isAvailable={o.status === 'Available'}
                    />
                    {/* LATER: Confirm Delete Dialog */}
                    <Button
                      variant='destructive'
                      onClick={() => handleRemoveOutfit(o.id)}
                    >
                      <LuTrash2 /> Remove
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default MyOutfits;

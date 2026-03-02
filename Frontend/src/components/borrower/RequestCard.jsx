// import { useSelector } from 'react-redux';
import GetStatusBadge from '../shared/GetStatusBade';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { LuMessageSquare } from '@/utils/icons';
import { MOCK_OUTFITS } from '@/utils/mockData';

const RequestCard = ({ request }) => {
  // Use for checking while development
  const outfits = MOCK_OUTFITS;
  //   const outfits = useSelector((state) => state.outfits.items);

  const outfit = outfits.find((o) => o.id === request.outfitId);

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center gap-4'>
          <img
            src={outfit.outfitImageUrl}
            alt={outfit.title}
            className='w-20 h-20 object-cover rounded-lg'
          />

          <div className='flex-1'>
            <CardTitle className='font-serif text-app-primary text-lg'>
              {outfit.title}
            </CardTitle>
            <CardDescription>{outfit.category}</CardDescription>
          </div>

          <GetStatusBadge status={request.status} />
        </div>
      </CardHeader>

      <CardContent className='space-y-4'>
        {/* Lender Info */}
        <div className='flex items-center gap-4'>
          <Avatar>
            <AvatarImage src={outfit.lenderDetails.lenderImageUrl} />
            <AvatarFallback>
              {outfit.lenderDetails.lenderName[0]}
            </AvatarFallback>
          </Avatar>

          <div>
            <p className='font-semibold'>{outfit.lenderDetails.lenderName}</p>
            <p className='text-sm text-muted-foreground'>Lender</p>
          </div>
        </div>

        {/* Request Info */}
        <div className='text-sm text-muted-foreground'>
          <p>Requested on: {request.createdAt}</p>
        </div>

        {/* Message */}
        <div className='bg-blue-50 border border-blue-100 rounded-lg p-4'>
          <div className='flex items-start gap-2 mb-2'>
            <LuMessageSquare className='size-4 text-blue-600' />
            <span className='text-sm font-medium text-blue-900'>
              Your Message:
            </span>
          </div>
          <p className='text-sm text-blue-800 leading-relaxed'>
            {request.message}
          </p>
        </div>

        {/* Contextual Info */}
        {request.status === 'Approved' && (
          <div className='bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-sm text-emerald-800'>
            🎉 Your request has been approved! You can now coordinate pickup and
            chat with the lender.
          </div>
        )}

        {request.status === 'Declined' && (
          <div className='bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800'>
            Unfortunately, this request was declined. You can explore other
            outfits.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RequestCard;

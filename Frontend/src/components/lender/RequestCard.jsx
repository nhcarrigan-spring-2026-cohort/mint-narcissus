import { useDispatch } from 'react-redux';
import { updateRequestStatus } from '@/store/requestSlice';
import { updateOutfitStatus } from '@/store/outfitSlice';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { LuCircleCheck, LuCircleX, LuMessageSquare } from '@/utils/icons';

const RequestCard = ({ request }) => {
  const dispatch = useDispatch();

  const handleApprove = (request) => {
    dispatch(
      updateRequestStatus({ requestId: request.id, status: 'Approved' }),
    );
    dispatch(
      updateOutfitStatus({ outfitId: request.outfitId, status: 'Borrowed' }),
    );
    toast.success('Request approved successfully');
  };

  const handleDecline = (requestId) => {
    dispatch(updateRequestStatus({ requestId, status: 'Declined' }));
    toast.success('Request declined');
  };
  return (
    <div className='space-y-4 border-t pt-4'>
      <div className='flex items-start gap-4'>
        <Avatar size='lg'>
          <AvatarImage src={request.borrowerImageUrl} />
          <AvatarFallback>{request.borrowerName[0]}</AvatarFallback>
        </Avatar>
        <div className='flex-1'>
          <p className='font-semibold'>{request.borrowerName}</p>
          <p className='text-sm text-muted-foreground'>
            Requested on {request.createdAt}
          </p>
        </div>
      </div>
      {/* Borrower Message */}
      <div className='bg-blue-50 border border-blue-100 rounded-lg p-4'>
        <div className='flex items-start gap-2 mb-2'>
          <LuMessageSquare className='size-4 text-blue-600' />
          <span className='text-sm font-medium text-blue-900'>
            Message from borrower:
          </span>
        </div>
        <p className='text-sm text-blue-800 leading-relaxed'>
          {request.message}
        </p>
      </div>
      {/* After Approval Info */}
      <div className='bg-gray-50 border border-gray-200 rounded-lg p-3'>
        <p className='text-xs text-muted-foreground leading-relaxed'>
          <strong>After approval:</strong> Chat will unlock, LinkedIn profiles
          become visible to both parties, and you'll be able to coordinate
          pickup details.
        </p>
      </div>
      {/* Action Buttons */}
      <div className='flex gap-3 pt-2'>
        <Button
          variant='default'
          className='flex-1 bg-emerald-600 hover:bg-emerald-700'
          disabled={request.status !== 'Pending'}
          onClick={() => handleApprove(request)}
        >
          <LuCircleCheck />
          Accept Request
        </Button>

        <Button
          variant='destructive'
          className='flex-1'
          disabled={request.status !== 'Pending'}
          onClick={() => handleDecline(request.id)}
        >
          <LuCircleX />
          Decline
        </Button>
      </div>
    </div>
  );
};

export default RequestCard;

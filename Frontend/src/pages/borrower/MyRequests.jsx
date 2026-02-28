import { useSelector } from 'react-redux';
import { Card } from '@/components/ui/card';
import EmptyState from '@/pages/shared/EmptyState';

export default function MyRequests() {
  const user = useSelector((state) => state.auth.user);
  const requests = useSelector((state) => state.requests.items);

  const myRequests = requests.filter((r) => r.borrowerId === user.id);

  if (myRequests.length === 0) {
    return (
      <EmptyState
        title='No borrow requests yet'
        description="You haven't requested any outfits yet."
      />
    );
  }

  return (
    <section className='p-6 space-y-4'>
      <h2 className='text-2xl font-semibold'>My Requests</h2>

      {myRequests.map((request) => (
        <Card key={request.id} className='p-4 space-y-2'>
          <div className='flex justify-between w-96'>
            <span className='font-medium'>{request.outfitTitle}</span>
            <span className='text-sm capitalize'>{request.status}</span>
          </div>

          <p className='text-sm text-muted-foreground'>
            Lender: {request.lenderName}
          </p>

          {request.message && (
            <p className='text-sm italic'>"{request.message}"</p>
          )}
        </Card>
      ))}
    </section>
  );
}

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
    <section className='grow py-8 px-4'>
      <h2 className='font-serif font-bold text-app-primary text-3xl leading-snug'>
        My Requests
      </h2>
      <h3 className='text-muted-foreground text-sm'>
        Your collection of interview-ready outfits
      </h3>

      <div className='w-full my-6'>
        {myRequests.map((request) => (
          <Card key={request.id} className='p-4 space-y-2'>
            <div className='flex justify-between'>
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
      </div>
    </section>
  );
}

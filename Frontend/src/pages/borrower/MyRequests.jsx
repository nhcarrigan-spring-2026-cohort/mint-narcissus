import { useSelector } from 'react-redux';
import { Card, CardContent } from '@/components/ui/card';
import { MOCK_REQUESTS } from '@/utils/mockData';
import RequestCard from '@/components/borrower/RequestCard';

const MyRequests = () => {
  const { user } = useSelector((state) => state.auth);
  // const requests = useSelector((state) => state.requests.items);

  // Use for checking while development
  const requests = MOCK_REQUESTS;

  const myRequests = requests.filter((r) => r.borrowerId === user.id);

  return (
    <section className='grow container mx-auto px-4 py-8'>
      <div className='space-y-6'>
        {/* Header */}
        <div>
          <h2 className='font-serif text-app-primary text-3xl font-bold'>
            My Borrow Requests
          </h2>
          <p className='text-muted-foreground'>
            Track the status of your outfit requests
          </p>
        </div>

        {/* Empty State */}
        {myRequests.length === 0 && (
          <Card>
            <CardContent className='text-center py-10 text-muted-foreground'>
              You haven’t requested any outfits yet.
            </CardContent>
          </Card>
        )}

        {/* Requests */}
        {myRequests.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}
      </div>
    </section>
  );
};

export default MyRequests;

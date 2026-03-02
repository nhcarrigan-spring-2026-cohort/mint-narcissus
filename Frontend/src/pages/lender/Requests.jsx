import { useSelector } from 'react-redux';
import { MOCK_OUTFITS, MOCK_REQUESTS } from '@/utils/mockData';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import RequestCard from '@/components/lender/RequestCard';

const Requests = () => {
  const { user } = useSelector((state) => state.auth);
  // const outfits = useSelector((state) => state.outfits.items);
  // const requests = useSelector((state) => state.requests.items);

  // Use for checking while development
  const outfits = MOCK_OUTFITS;
  const requests = MOCK_REQUESTS;

  const myOutfitIds = outfits
    .filter((o) => o.lenderDetails.lenderId === user.id)
    .map((o) => o.id);

  const myRequests = requests.filter((r) => myOutfitIds.includes(r.outfitId));

  const grouped = myRequests.reduce((acc, request) => {
    if (!acc[request.outfitId]) acc[request.outfitId] = [];
    acc[request.outfitId].push(request);
    return acc;
  }, {});

  const pending = myRequests.filter((r) => r.status === 'Pending').length;
  const approved = myRequests.filter((r) => r.status === 'Approved').length;
  const declined = myRequests.filter((r) => r.status === 'Declined').length;

  const statsMap = [
    {
      title: 'Pending',
      value: pending,
      textColor: 'text-black',
    },
    {
      title: 'Approved',
      value: approved,
      textColor: 'text-app-secondary',
    },
    {
      title: 'Declined',
      value: declined,
      textColor: 'text-gray-500',
    },
  ];

  return (
    <section className='grow container mx-auto px-4 py-8'>
      <div className='space-y-6'>
        <div className='flex flex-col'>
          <h2 className='font-serif text-app-primary text-3xl font-bold'>
            Borrow Requests
          </h2>
          <p className='text-muted-foreground'>
            Review and respond to requests for your outfits
          </p>
        </div>
        {/* Stats Card */}
        <Card>
          <CardContent>
            <div className='flex items-center justify-between'>
              {statsMap.map((stat) => (
                <div key={stat.title} className='text-center flex-1'>
                  <p className={`text-3xl font-bold ${stat.textColor}`}>
                    {stat.value}
                  </p>
                  <p className='text-sm text-muted-foreground'>{stat.title}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Empty State */}
        {Object.entries(grouped).length === 0 && (
          <Card>
            <CardContent className='text-center py-10 text-muted-foreground'>
              There are no requests for your outfits yet.
            </CardContent>
          </Card>
        )}

        <div className='space-y-6'>
          {Object.entries(grouped).map(([outfitId, requests]) => {
            const outfit = outfits.find((o) => o.id === outfitId);
            return (
              <Card key={outfitId}>
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
                    <Badge className='rounded-sm bg-app-secondary text-white'>
                      {requests.length} Request
                      {requests.length > 1 ? 's' : ''}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className='space-y-6'>
                  {requests.map((request) => (
                    <RequestCard key={request.id} request={request} />
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Requests;

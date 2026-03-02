import { Badge } from '@/components/ui/badge';

export default function GetStatusBadge({ status }) {
  switch (status) {
    case 'Approved':
      return (
        <Badge className='rounded-lg bg-emerald-100 text-emerald-700 border border-emerald-200'>
          Approved
        </Badge>
      );
    case 'Declined':
      return (
        <Badge className='rounded-lg bg-red-100 text-red-700 border border-red-200'>
          Declined
        </Badge>
      );
    default:
      return (
        <Badge className='rounded-lg bg-yellow-100 text-yellow-800 border border-yellow-200'>
          Pending
        </Badge>
      );
  }
}

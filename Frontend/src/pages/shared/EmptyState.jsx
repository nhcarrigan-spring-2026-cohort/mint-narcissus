import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty';

const EmptyState = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  redirectPath,
}) => {
  return (
    <Empty className='bg-app-fg rounded-sm shadow-sm my-4'>
      <EmptyHeader>
        {icon}
        <EmptyTitle className='font-serif text-app-primary font-semibold'>
          {title}
        </EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent className='flex-row justify-center gap-2'>
        <Button
          className='bg-app-primary/90 hover:bg-app-primary'
          onClick={onAction}
        >
          <Link to={redirectPath}>{actionLabel}</Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
};

export default EmptyState;

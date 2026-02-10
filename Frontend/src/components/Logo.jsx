import { Button } from '@/components/ui/button';

export default function Logo() {
  return (
    <div className='flex items-center space-x-2'>
      <button variant="outline" className='flex items-center space-x-2'>
        <div className='h-8 w-8 bg-(--fig-primary) rounded-lg flex items-center justify-center'>
          <span className='text-[#FDFBF7] font-bold text-sm'>IO</span>
        </div>
        <span className='font-semibold text-lg hidden sm:block text-(--fig-primary)'>Interview Outfits</span>
      </button>      
    </div>
  );
}

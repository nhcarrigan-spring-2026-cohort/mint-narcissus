import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const SizeGuideModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='link' className='px-0 text-app-primary'>
          View Size Guide
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-lg'>
        <DialogHeader>
          <DialogTitle>Size Guide</DialogTitle>
          <DialogDescription>
            This guide will help you find the right size.
          </DialogDescription>
        </DialogHeader>

        <div className='no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4 space-y-6 text-sm'>
          {/* Tops */}
          <div>
            <h3 className='font-semibold mb-2'>Tops (Chest in inches)</h3>
            <table className='w-full border-collapse text-center'>
              <thead>
                <tr className='bg-muted'>
                  <th className='p-2 border'>Size</th>
                  <th className='p-2 border'>Chest Range</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='border p-2'>S</td>
                  <td className='border p-2'>36–38"</td>
                </tr>
                <tr>
                  <td className='border p-2'>M</td>
                  <td className='border p-2'>39–41"</td>
                </tr>
                <tr>
                  <td className='border p-2'>L</td>
                  <td className='border p-2'>42–44"</td>
                </tr>
                <tr>
                  <td className='border p-2'>XL</td>
                  <td className='border p-2'>45–47"</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Bottoms */}
          <div>
            <h3 className='font-semibold mb-2'>Bottoms (Waist in inches)</h3>
            <table className='w-full border-collapse text-center'>
              <thead>
                <tr className='bg-muted'>
                  <th className='p-2 border'>Size</th>
                  <th className='p-2 border'>Waist Range</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='border p-2'>28</td>
                  <td className='border p-2'>28–29"</td>
                </tr>
                <tr>
                  <td className='border p-2'>30</td>
                  <td className='border p-2'>30–31"</td>
                </tr>
                <tr>
                  <td className='border p-2'>32</td>
                  <td className='border p-2'>32–33"</td>
                </tr>
                <tr>
                  <td className='border p-2'>34</td>
                  <td className='border p-2'>34–35"</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Height */}
          <div>
            <h3 className='font-semibold mb-2'>Height Categories</h3>
            <ul className='list-disc pl-5 space-y-1'>
              <li>Short: 5'4" – 5'7"</li>
              <li>Regular: 5'8" – 5'11"</li>
              <li>Tall: 6'0"+</li>
            </ul>
          </div>
          <p className='text-muted-foreground text-xs'>
            Note: Fit may vary slightly by brand and tailoring adjustments.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SizeGuideModal;

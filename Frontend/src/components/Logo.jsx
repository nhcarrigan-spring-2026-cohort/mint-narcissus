export default function Logo() {
  return (
    <div>
      <button variant='outline' className='flex items-center gap-2'>
        <div className='h-8 w-8 text-white font-bold text-sm bg-black rounded-full flex justify-center items-center'>
          IO
        </div>
        <span className='font-semibold text-xl tracking-tighter hidden sm:block text-black'>
          Interview Outfits
        </span>
      </button>
    </div>
  );
}

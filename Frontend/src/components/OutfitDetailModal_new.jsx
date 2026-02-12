import { HiOutlineTag } from 'react-icons/hi2';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { IoShirtOutline } from 'react-icons/io5';
import { HiX } from 'react-icons/hi';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

export default function OutfitDetailModal({
  outfit,
  isOpen,
  onClose,
  isFavorite,
  onFavoriteClick,
}) {
  if (!isOpen || !outfit) return null;

  return (
    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50'>
      <div className='bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto'>
        {/* Close button */}
        <div className='sticky top-0 bg-white border-b flex justify-end p-4 z-10'>
          <Button
            variant='ghost'
            size='icon'
            onClick={onClose}
            className='rounded-full'
          >
            <HiX className='size-6' />
          </Button>
        </div>

        <div className='p-8 space-y-6'>
          {/* Image and header section */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* Image */}
            <div className='flex flex-col gap-4'>
              <div className='relative h-96 w-full overflow-hidden rounded-lg'>
                <img
                  src={outfit.imgSrc}
                  alt={outfit.title}
                  className='w-full h-full object-cover'
                />
              </div>
              <Button
                variant={isFavorite ? 'default' : 'outline'}
                className='w-full gap-2'
                onClick={onFavoriteClick}
              >
                {isFavorite ? (
                  <HiHeart className='size-5 text-red-500' />
                ) : (
                  <HiOutlineHeart className='size-5' />
                )}
                {isFavorite ? 'Favorited' : 'Add to Favorites'}
              </Button>
            </div>

            {/* Content */}
            <div className='space-y-6'>
              {/* Title and status */}
              <div>
                <div className='flex items-start justify-between mb-2'>
                  <h1 className='text-3xl font-bold'>{outfit.title}</h1>
                  <Badge variant='default'>{outfit.status}</Badge>
                </div>

                {/* Tags */}
                <div className='flex flex-wrap gap-2 mt-4'>
                  {outfit.tags?.map((tag, idx) => (
                    <Badge
                      key={idx}
                      variant='outline'
                      className='font-normal capitalize'
                    >
                      {idx === 0 && <HiOutlineTag className='mr-1 size-3' />}
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Fit info */}
              {outfit.fitInfo && (
                <div className='space-y-2'>
                  <h3 className='font-semibold text-lg'>Fit Information</h3>
                  <div className='flex items-start gap-3 text-gray-700'>
                    <IoShirtOutline className='size-5 mt-0.5 shrink-0' />
                    <span>{outfit.fitInfo}</span>
                  </div>
                </div>
              )}

              {/* Quote */}
              {outfit.quote && (
                <div className='space-y-2'>
                  <h3 className='font-semibold text-lg'>Owner's Experience</h3>
                  <div className='bg-[#FDF9F3] border border-[#C5A059]/20 rounded-lg p-4'>
                    <p className='text-[#1A2B48] italic leading-relaxed'>
                      "{outfit.quote}"
                    </p>
                  </div>
                </div>
              )}

              {/* Owner info */}
              {outfit.owner && (
                <div className='space-y-2'>
                  <h3 className='font-semibold text-lg'>Owner</h3>
                  <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                    <Avatar className='size-10'>
                      <AvatarImage
                        src={outfit.owner.avatar}
                        alt={outfit.owner.name}
                      />
                    </Avatar>
                    <div>
                      <p className='font-medium'>{outfit.owner.name}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/*<div role="dialog" id="radix-:rqq:" aria-describedby="radix-:rqs:" aria-labelledby="radix-:rqr:" data-state="open" data-slot="dialog-content" class="bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg max-w-3xl max-h-[90vh] overflow-y-auto" data-fg-dd1a1="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:52:7:1566:5711:e:DialogContent:ete::::s:DUHk:1" data-fg-mmg7="0.26:0.3828:/src/app/components/ui/dialog.tsx:57:7:1469:1070:e:DialogPrimitive.Content:cte" tabindex="-1" style="pointer-events: auto;"><div data-slot="dialog-header" class="flex flex-col gap-2 text-center sm:text-left" data-fg-dd1a2="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:53:9:1641:618:e:DialogHeader:e::::s:DcSk:1" data-fg-mmg13="0.26:0.3828:/src/app/components/ui/dialog.tsx:77:5:2661:140:e:div::1"><div class="flex items-start justify-between" data-fg-dd1a3="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:54:11:1666:569:e:div:ete"><div class="flex-1" data-fg-dd1a4="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:55:13:1729:252:e:div:ete"><h2 id="radix-:rqr:" data-slot="dialog-title" class="font-semibold text-2xl" data-fg-dd1a5="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:56:15:1768:62:e:DialogTitle:x::::s:CHQB:1" data-fg-mmg15="0.26:0.3828:/src/app/components/ui/dialog.tsx:103:5:3206:147:e:DialogPrimitive.Title::1">Classic Navy Suit</h2><p id="radix-:rqs:" data-slot="dialog-description" class="text-muted-foreground text-sm mt-1" data-fg-dd1a7="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:57:15:1845:117:e:DialogDescription:tx::::s:CAQB:1" data-fg-mmg16="0.26:0.3828:/src/app/components/ui/dialog.tsx:116:5:3493:154:e:DialogPrimitive.Description::1">Listed by Sarah Johnson</p></div><span data-slot="badge" class="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-primary text-primary-foreground [a&amp;]:hover:bg-primary/90" data-fg-dd1a10="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:61:13:1994:224:e:Badge:x::::s:DkUt:1" data-fg-eipr0="0.15:0.1636:/src/app/components/ui/badge.tsx:38:5:1481:113:e:Comp::1">Available</span></div></div><div class="space-y-6" data-fg-dd1a12="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:67:9:2269:4985:e:div:xtetxtetxtxtxtetetxtetxte"><div class="relative rounded-lg overflow-hidden" data-fg-dd1a14="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:69:11:2331:223:e:div:e"><img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&amp;h=800&amp;fit=crop" alt="Classic Navy Suit" class="w-full h-96 object-cover" data-fg-dd1a15="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:70:13:2397:140:e:img"></div><div class="flex items-center space-x-4 p-4 bg-muted rounded-lg" data-fg-dd1a17="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:78:11:2596:470:e:div:ete"><span data-slot="avatar" class="relative flex size-10 shrink-0 overflow-hidden rounded-full h-12 w-12" data-fg-dd1a18="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:79:13:2678:178:e:Avatar:ete::::s:EBr9:1" data-fg-bjrp0="0.14:0.1104:/src/app/components/ui/avatar.tsx:13:5:251:190:e:AvatarPrimitive.Root::1"><img data-slot="avatar-image" class="aspect-square size-full" data-fg-dd1a19="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:80:15:2723:41:e:AvatarImage:::::s:cnu:1" data-fg-bjrp1="0.14:0.1104:/src/app/components/ui/avatar.tsx:29:5:569:136:e:AvatarPrimitive.Image::1" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&amp;h=150&amp;fit=crop"></span><div class="flex-1" data-fg-dd1a22="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:83:13:2869:180:e:div:ete"><p class="font-semibold" data-fg-dd1a23="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:84:15:2908:52:e:p:x">Sarah Johnson</p><p class="text-sm text-muted-foreground" data-fg-dd1a25="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:85:15:2975:55:e:p:t">Lender</p></div></div><div class="p-4 bg-blue-50 border border-blue-200 rounded-lg" data-fg-dd1a29="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:91:13:3152:266:e:div:ete"><p class="text-sm font-semibold text-blue-900 mb-1" data-fg-dd1a30="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:92:15:3233:78:e:p:t">💙 Confidence Note</p><p class="text-sm text-blue-700 italic" data-fg-dd1a32="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:93:15:3326:73:e:p:txt">"Wore this for my first investment banking interview at Goldman Sachs. Walk in with confidence."</p></div><div data-fg-dd1a37="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:98:11:3473:160:e:div:ete"><h3 class="font-semibold mb-2" data-fg-dd1a38="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:99:13:3491:51:e:h3:t">Description</h3><p class="text-muted-foreground" data-fg-dd1a40="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:100:13:3555:61:e:p:x">Professional navy blue suit perfect for corporate interviews. Tailored fit with matching pants.</p></div><div data-orientation="horizontal" role="none" data-slot="separator-root" class="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px" data-fg-dd1a42="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:103:11:3645:13:e:Separator:::::s:Cirf:1" data-fg-b1dj0="0.43:0.707:/src/app/components/ui/separator.tsx:15:5:314:362:e:SeparatorPrimitive.Root::1"></div><div class="grid grid-cols-2 gap-6" data-fg-dd1a44="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:106:11:3696:2676:e:div:ete"><div data-fg-dd1a45="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:107:13:3749:999:e:div:ete"><h3 class="font-semibold mb-3" data-fg-dd1a46="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:108:15:3769:54:e:h3:t">Outfit Details</h3><dl class="space-y-2 text-sm" data-fg-dd1a48="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:109:15:3838:891:e:dl:etete"><div data-fg-dd1a49="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:110:17:3889:185:e:div:ete"><dt class="text-muted-foreground" data-fg-dd1a50="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:111:19:3913:51:e:dt:t">Category</dt><dd class="font-medium" data-fg-dd1a52="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:112:19:3983:68:e:dd:x">Formal</dd></div><div data-fg-dd1a54="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:114:17:4091:167:e:div:ete"><dt class="text-muted-foreground" data-fg-dd1a55="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:115:19:4115:49:e:dt:t">Fabric</dt><dd class="font-medium" data-fg-dd1a57="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:116:19:4183:52:e:dd:x">Wool blend</dd></div><div data-fg-dd1a59="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:118:17:4275:434:e:div:ete"><dt class="text-muted-foreground" data-fg-dd1a60="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:119:19:4299:55:e:dt:t">Suitable For</dt><dd class="flex flex-wrap gap-1 mt-1" data-fg-dd1a62="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:120:19:4373:313:e:dd:x"><span data-slot="badge" class="inline-flex items-center justify-center rounded-md border px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden text-foreground [a&amp;]:hover:bg-accent [a&amp;]:hover:text-accent-foreground text-xs" data-fg-dd1a64="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:122:23:4497:141:e:Badge:x::::s:DkUt:1" data-fg-eipr0="0.15:0.1636:/src/app/components/ui/badge.tsx:38:5:1481:113:e:Comp::1">Corporate</span><span data-slot="badge" class="inline-flex items-center justify-center rounded-md border px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden text-foreground [a&amp;]:hover:bg-accent [a&amp;]:hover:text-accent-foreground text-xs" data-fg-dd1a64="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:122:23:4497:141:e:Badge:x::::s:DkUt:1" data-fg-eipr0="0.15:0.1636:/src/app/components/ui/badge.tsx:38:5:1481:113:e:Comp::1">Finance</span></dd></div></dl></div><div data-fg-dd1a66="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:131:13:4762:1593:e:div:ete"><h3 class="font-semibold mb-3" data-fg-dd1a67="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:132:15:4782:56:e:h3:t">Size Information</h3><dl class="space-y-2 text-sm" data-fg-dd1a69="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:133:15:4853:1483:e:dl:xtxtxtx"><div data-fg-dd1a71="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:135:19:4944:173:e:div:ete"><dt class="text-muted-foreground" data-fg-dd1a72="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:136:21:4970:51:e:dt:t">Top Size</dt><dd class="font-medium" data-fg-dd1a74="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:137:21:5042:50:e:dd:x">M / 40</dd></div><div data-fg-dd1a77="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:141:19:5196:179:e:div:ete"><dt class="text-muted-foreground" data-fg-dd1a78="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:142:21:5222:54:e:dt:t">Bottom Size</dt><dd class="font-medium" data-fg-dd1a80="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:143:21:5297:53:e:dd:x">32</dd></div></dl></div></div><div class="flex gap-2 pt-4" data-fg-dd1a110="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:168:11:6417:822:e:div:etxtx"><button data-slot="button" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[&gt;svg]:px-3 flex-1" data-fg-dd1a111="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:169:13:6463:314:e:Button:etx::::s:Uv5:1" data-fg-csem0="0.17:0.2106:/src/app/components/ui/button.tsx:50:5:1941:121:e:Comp::1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart h-4 w-4 mr-2" data-fg-dd1a112="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:174:15:6624:85:e:Heart::::::Bi8G"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>Save</button><button data-slot="button" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 has-[&gt;svg]:px-3 flex-1" data-fg-dd1a115="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:178:15:6859:176:e:Button:et::::s:Uv5:1" data-fg-csem0="0.17:0.2106:/src/app/components/ui/button.tsx:50:5:1941:121:e:Comp::1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shirt h-4 w-4 mr-2" data-fg-dd1a116="1.41:1.7298:/src/app/components/outfits/OutfitDetailDialog.tsx:179:17:6943:34:e:Shirt::::::Cnfw"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path></svg>Request to Borrow</button></div></div><button type="button" class="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4" data-fg-mmg9="0.26:0.3828:/src/app/components/ui/dialog.tsx:66:9:2015:491:e:DialogPrimitive.Close:ete"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x" data-fg-mmg10="0.26:0.3828:/src/app/components/ui/dialog.tsx:67:11:2415:9:e:XIcon::::::BUZD"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg><span class="sr-only" data-fg-mmg11="0.26:0.3828:/src/app/components/ui/dialog.tsx:68:11:2435:38:e:span:t">Close</span></button></div>*/

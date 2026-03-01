import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SizeGuideModal from '@/components/shared/SizeGuideModal';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { addOutfit } from '@/store/outfitSlice';

const interviewTypesMap = [
  'Tech',
  'Corporate',
  'Finance',
  'Creative',
  'Healthcare',
  'Retail',
  'Others',
];

const ListOutfit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [interviewTypes, setInterviewTypes] = useState([]);
  const [fabric, setFabric] = useState('');
  const [height, setHeight] = useState(user.size.height);
  const [fitPreference, setFitPreference] = useState(user.size.fitType);
  const [topSize, setTopSize] = useState(user.size.topSize);
  const [bottomSize, setBottomSize] = useState(user.size.bottomSize);
  const [confidenceNote, setConfidenceNote] = useState('');

  const handleCancel = () => navigate('/');
  const handleListOutfit = (e) => {
    e.preventDefault();
    dispatch(
      addOutfit({
        title,
        description,
        outfitImageUrl: imageUrl,
        category,
        interviewTypes,
        fabric,
        size: { height, fitType: fitPreference, topSize, bottomSize },
        confidenceNote,
        lenderId: user.id,
        lenderName: user.name,
      }),
    );
    toast.success('Outfit listed successfully!');
    navigate('/');
  };

  const isValid =
    title &&
    description &&
    imageUrl &&
    category &&
    interviewTypes.length > 0 &&
    fabric &&
    height &&
    topSize &&
    bottomSize &&
    fitPreference;

  return (
    <section className='grow container mx-auto px-4 py-8'>
      <div className='max-w-2xl mx-auto'>
        <Card className='bg-card text-card-foreground flex flex-col gap-6 rounded-xl border'>
          <CardHeader>
            <CardTitle className='font-serif text-app-primary text-xl'>
              List a New Outfit
            </CardTitle>
            <CardDescription>
              Share your professional outfit with job seekers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className='space-y-6' onSubmit={handleListOutfit}>
              {/* TITLE */}
              <Field>
                <Label htmlFor='title'>Outfit Title *</Label>
                <Input
                  id='title'
                  type='text'
                  placeholder='e.g., Classic Navy Suit'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Field>
              {/* DESCRIPTION */}
              <Field>
                <Label htmlFor='description'>Description *</Label>
                <Textarea
                  id='description'
                  placeholder='Describe the outfit, its features, and condition...'
                  rows={4}
                  className='resize-none'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Field>
              {/* OUTFIT IMAGE URL */}
              <Field>
                <Label htmlFor='imageUrl'>Image URL *</Label>
                <Input
                  id='imageUrl'
                  type='url'
                  placeholder='https://example.com/outfit.jpg'
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                />
                <p className='text-muted-foreground text-xs'>
                  Paste a URL to an image of your outfit
                </p>
              </Field>
              {/* CATEGORY */}
              <Field>
                <Label htmlFor='category'>Category *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select a category' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      <SelectItem value='Formal'>Formal</SelectItem>
                      <SelectItem value='Semi-Formal'>Semi-Formal</SelectItem>
                      <SelectItem value='Business-Casual'>
                        Business-Casual
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              {/* INTERVIEW TYPES */}
              <Field>
                <Label>Suitable for Interview Types *</Label>
                <FieldGroup className='grid grid-cols-3 px-3 gap-1'>
                  {interviewTypesMap.map((type) => (
                    <Field key={type} orientation='horizontal'>
                      <Checkbox
                        id={type}
                        name={type}
                        checked={interviewTypes.includes(type)}
                        onCheckedChange={(checked) =>
                          setInterviewTypes(
                            checked
                              ? [...interviewTypes, type]
                              : interviewTypes.filter((i) => i !== type),
                          )
                        }
                      />
                      <FieldLabel htmlFor={type}>{type}</FieldLabel>
                    </Field>
                  ))}
                </FieldGroup>
              </Field>
              {/* FABRIC */}
              <Field>
                <Label htmlFor='fabric'>Fabric Type *</Label>
                <Input
                  id='fabric'
                  type='text'
                  placeholder='e.g., Wool, Cotton, Polyester blend'
                  value={fabric}
                  onChange={(e) => setFabric(e.target.value)}
                  required
                />
              </Field>
              {/* SIZE */}
              <Field>
                <Label className='flex justify-between'>
                  <span className='flex-1'>Size Information *</span>
                  <SizeGuideModal />
                </Label>
                <FieldGroup className='grid grid-cols-2 px-3 gap-3'>
                  {/* HEIGHT */}
                  <Field>
                    <Label htmlFor='height'>Height</Label>
                    <Select value={height} onValueChange={setHeight}>
                      <SelectTrigger>
                        <SelectValue placeholder='Height' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='Short'>5'4–5'7</SelectItem>
                        <SelectItem value='Regular'>5'8–5'11</SelectItem>
                        <SelectItem value='Tall'>6'0+ </SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  {/* FIT PREFERENCE */}
                  <Field>
                    <Label htmlFor='fitPreference'>Fit Preference</Label>
                    <Select
                      value={fitPreference}
                      onValueChange={setFitPreference}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Fit Preference' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='Slim'>Slim</SelectItem>
                        <SelectItem value='Regular'>Regular</SelectItem>
                        <SelectItem value='Relaxed'>Relaxed</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  {/* TOP SIZE */}
                  <Field>
                    <Label htmlFor='topSize'>Top Size</Label>
                    <Select value={topSize} onValueChange={setTopSize}>
                      <SelectTrigger>
                        <SelectValue placeholder='Top Size' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='S'>S</SelectItem>
                        <SelectItem value='M'>M</SelectItem>
                        <SelectItem value='L'>L</SelectItem>
                        <SelectItem value='XL'>XL</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  {/* BOTTOM SIZE */}
                  <Field>
                    <Label htmlFor='bottomSize'>Bottom Size</Label>
                    <Select value={bottomSize} onValueChange={setBottomSize}>
                      <SelectTrigger>
                        <SelectValue placeholder='Bottom Size' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='28'>28</SelectItem>
                        <SelectItem value='30'>30</SelectItem>
                        <SelectItem value='32'>32</SelectItem>
                        <SelectItem value='34'>34</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                </FieldGroup>
              </Field>
              {/* CONFIDENCE NOTE */}
              <Field>
                <Label htmlFor='confidenceNote'>
                  Confidence Note (Optional)
                </Label>
                <Textarea
                  id='confidenceNote'
                  placeholder='Share an encouraging message or success story...'
                  rows={4}
                  className='resize-none'
                  value={confidenceNote}
                  onChange={(e) => setConfidenceNote(e.target.value)}
                />
                <p className='text-xs text-muted-foreground'>
                  A personal message to inspire the borrower
                </p>
              </Field>
              {/* BUTTONS */}
              <div className='grid grid-cols-2 gap-2'>
                <Button variant='outline' type='button' onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  type='submit'
                  className='bg-app-primary/95 hover:bg-app-primary'
                  disabled={!isValid}
                >
                  List Outfit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ListOutfit;

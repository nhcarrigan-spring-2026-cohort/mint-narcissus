import { LuFilter, LuSearch, LuX } from '@/utils/icons';
import { Field } from '../ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Label } from '../ui/label';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../ui/input-group';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';

const Filter = ({ filters, setFilters, onClear }) => {
  const hasActiveFilters = Object.entries(filters).some(
    ([key, value]) => value && value !== '' && value !== 'None',
  );
  return (
    <div className='w-full p-5 flex flex-col gap-2.5 bg-app-fg shadow-sm rounded-md'>
      <h4 className='flex items-center justify-between gap-2'>
        <span className='flex items-center gap-2 text-app-primary text-lg'>
          <LuFilter />
          <span className='font-serif font-semibold'>Filter Outfits</span>
        </span>
        {/* TODO: Conditional rendering based on filtering logic */}
        {hasActiveFilters && (
          <Button
            variant='outline'
            size='sm'
            className='text-app-filter-label'
            onClick={onClear}
          >
            <LuX /> Clear filters
          </Button>
        )}
      </h4>
      <div className='sm:grid sm:grid-cols-4 flex flex-col gap-4 py-2 w-full items-center'>
        <Field className='w-full'>
          <Label className='text-app-filter-label font-medium'>Search</Label>
          <InputGroup>
            <InputGroupInput
              id='inline-start-input'
              className='text-sm'
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
              placeholder='Search Outfits'
            />
            <InputGroupAddon align='inline-start'>
              <LuSearch className='text-muted-foreground' />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field className='w-full'>
          <Label className='text-app-filter-label font-medium'>Category</Label>
          <Select
            value={filters.category}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, category: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Select a category' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='None'>All Categories</SelectItem>
              <SelectItem value='Formal'>Formal</SelectItem>
              <SelectItem value='Semi-Formal'>Semi-Formal</SelectItem>
              <SelectItem value='Business-Casual'>Business Casual</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field className='w-full'>
          <Label className='text-app-filter-label font-medium'>
            Interview Type
          </Label>
          <Select
            value={filters.interviewType}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, interviewType: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Select interview type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='None'>All Types</SelectItem>
              <SelectItem value='Tech'>Tech</SelectItem>
              <SelectItem value='Corporate'>Corporate</SelectItem>
              <SelectItem value='Finance'>Finance</SelectItem>
              <SelectItem value='Creative'>Creative</SelectItem>
              <SelectItem value='Healthcare'>Healthcare</SelectItem>
              <SelectItem value='Retail'>Retail</SelectItem>
              <SelectItem value='Others'>Others</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field className='w-full'>
          <Label className='text-app-filter-label font-medium'>
            Availability
          </Label>
          <Select
            value={filters.availability}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, availability: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Select availability' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='None'>All</SelectItem>
              <SelectItem value='Available'>Available only</SelectItem>
              <SelectItem value='Borrowed'>Currently Borrowed</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field className='w-full'>
          <Label className='text-app-filter-label font-medium'>Top Size</Label>
          <Select
            value={filters.topSize}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, topSize: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Select Top Size' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='None'>All</SelectItem>
              <SelectItem value='S'>S</SelectItem>
              <SelectItem value='M'>M</SelectItem>
              <SelectItem value='L'>L</SelectItem>
              <SelectItem value='XL'>XL</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field className='w-full'>
          <Label className='text-app-filter-label font-medium'>
            Bottom Size
          </Label>
          <Select
            value={filters.bottomSize}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, bottomSize: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Select Bottom Size' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='None'>All</SelectItem>
              <SelectItem value='28'>28</SelectItem>
              <SelectItem value='30'>30</SelectItem>
              <SelectItem value='32'>32</SelectItem>
              <SelectItem value='34'>34</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field className='w-full'>
          <Label className='text-app-filter-label font-medium'>Height</Label>
          <Select
            value={filters.height}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, height: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Select Height' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='None'>All</SelectItem>
              <SelectItem value='Short'>5'4-5'7</SelectItem>
              <SelectItem value='Regular'>5'8-5'11</SelectItem>
              <SelectItem value='Tall'>6'0+</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field className='w-full'>
          <Label className='text-app-filter-label'>Fit Type</Label>
          <Select
            value={filters.fitType}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, fitType: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Select Fit Type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='None'>All</SelectItem>
              <SelectItem value='Slim'>Slim</SelectItem>
              <SelectItem value='Regular'>Regular</SelectItem>
              <SelectItem value='Relaxed'>Relaxed</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>
      {/* TODO: Conditional Render based on filtering logic  */}
      {hasActiveFilters && (
        <>
          <Separator />
          <div className='flex flex-wrap items-center gap-2 text-sm text-muted-foreground'>
            <span>Active filters:</span>

            {Object.entries(filters)
              .filter(([_, value]) => value && value !== '' && value !== 'None')
              .map(([key, value]) => (
                <Badge
                  key={key}
                  className='rounded bg-app-badge-1 cursor-pointer'
                  variant='secondary'
                  onClick={() => setFilters((prev) => ({ ...prev, [key]: '' }))}
                >
                  {value} ✕
                </Badge>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Filter;

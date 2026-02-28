import { useEffect, useState } from 'react';
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
import { LuFilter, LuSearch, LuX } from '@/utils/icons';

const fieldLabelMap = {
  category: 'Category',
  interviewType: 'Interview Type',
  availability: 'Availability',
  topSize: 'Top Size',
  bottomSize: 'Bottom Size',
  height: 'Height',
  fitType: 'Fit Type',
  search: 'Search',
};

const labelMap = {
  category: {
    Formal: 'Formal',
    'Semi-Formal': 'Semi-Formal',
    'Business-Casual': 'Business Casual',
  },
  interviewType: {
    Tech: 'Tech',
    Corporate: 'Corporate',
    Finance: 'Finance',
    Creative: 'Creative',
    Healthcare: 'Healthcare',
    Retail: 'Retail',
    Others: 'Others',
  },
  availability: {
    Available: 'Available only',
    Borrowed: 'Currently Borrowed',
  },
  topSize: { S: 'S', M: 'M', L: 'L', XL: 'XL' },
  bottomSize: { 28: '28', 30: '30', 32: '32', 34: '34' },
  height: {
    Short: "5'4 - 5'7",
    Regular: "5'8 - 5'11",
    Tall: "6'0+",
  },
  fitType: {
    Slim: 'Slim',
    Regular: 'Regular',
    Relaxed: 'Relaxed',
  },
};

const Filter = ({ filters, updateFilter, onClear }) => {
  const [searchInput, setSearchInput] = useState(filters.search);

  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateFilter('search', searchInput);
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchInput, updateFilter]);

  const hasActiveFilters = Object.entries(filters).some(
    ([key, value]) => value && value !== '' && value !== 'All',
  );

  const getLabel = (key, value) => {
    return labelMap[key]?.[value] || value;
  };
  return (
    <div className='w-full p-5 flex flex-col gap-2.5 bg-app-fg shadow-sm rounded-md'>
      <h4 className='flex items-center justify-between gap-2'>
        <span className='flex items-center gap-2 text-app-primary text-lg'>
          <LuFilter />
          <span className='font-serif font-semibold'>Filter Outfits</span>
        </span>
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
      {/* Filters Grid */}
      <div className='sm:grid sm:grid-cols-4 flex flex-col gap-4 py-2 w-full items-center'>
        {/* Search */}
        <Field className='w-full'>
          <Label className='text-app-filter-label font-medium'>Search</Label>
          <InputGroup>
            <InputGroupInput
              id='inline-start-input'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder='Search outfits'
              className='text-sm'
            />
            <InputGroupAddon align='inline-start'>
              <LuSearch className='text-muted-foreground' />
            </InputGroupAddon>
          </InputGroup>
        </Field>

        {/* Category */}
        <Field className='w-full'>
          <Label className='text-app-filter-label font-medium'>Category</Label>
          <Select
            value={filters.category}
            onValueChange={(v) => updateFilter('category', v)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select a category' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='All'>All Categories</SelectItem>
              <SelectItem value='Formal'>Formal</SelectItem>
              <SelectItem value='Semi-Formal'>Semi-Formal</SelectItem>
              <SelectItem value='Business-Casual'>Business-Casual</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        {/* Interview Type */}
        <Field className='w-full'>
          <Label className='text-app-filter-label font-medium'>
            Interview Type
          </Label>
          <Select
            value={filters.interviewType}
            onValueChange={(v) => updateFilter('interviewType', v)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select interview type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='All'>All Types</SelectItem>
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

        {/* Availability */}
        <Field className='w-full'>
          <Label className='text-app-filter-label font-medium'>
            Availability
          </Label>
          <Select
            value={filters.availability}
            onValueChange={(v) => updateFilter('availability', v)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select availability' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='All'>All</SelectItem>
              <SelectItem value='Available'>Available only</SelectItem>
              <SelectItem value='Borrowed'>Currently Borrowed</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        {/* Top Size */}
        <Field className='w-full'>
          <Label className='text-app-filter-label font-medium'>Top Size</Label>
          <Select
            value={filters.topSize}
            onValueChange={(v) => updateFilter('topSize', v)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select Top Size' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='All'>All</SelectItem>
              <SelectItem value='S'>S</SelectItem>
              <SelectItem value='M'>M</SelectItem>
              <SelectItem value='L'>L</SelectItem>
              <SelectItem value='XL'>XL</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        {/* Bottom Size */}
        <Field className='w-full'>
          <Label className='text-app-filter-label font-medium'>
            Bottom Size
          </Label>
          <Select
            value={filters.bottomSize}
            onValueChange={(v) => updateFilter('bottomSize', v)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select Bottom Size' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='All'>All</SelectItem>
              <SelectItem value='28'>28</SelectItem>
              <SelectItem value='30'>30</SelectItem>
              <SelectItem value='32'>32</SelectItem>
              <SelectItem value='34'>34</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        {/* Height */}
        <Field className='w-full'>
          <Label className='text-app-filter-label font-medium'>Height</Label>
          <Select
            value={filters.height}
            onValueChange={(v) => updateFilter('height', v)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select Height' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='All'>All</SelectItem>
              <SelectItem value='Short'>5'4 - 5'7</SelectItem>
              <SelectItem value='Regular'>5'8 - 5'11</SelectItem>
              <SelectItem value='Tall'>6'0+</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        {/* Fit Type */}
        <Field className='w-full'>
          <Label className='text-app-filter-label font-medium'>Fit Type</Label>
          <Select
            value={filters.fitType}
            onValueChange={(v) => updateFilter('fitType', v)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select Fit Type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='All'>All</SelectItem>
              <SelectItem value='Slim'>Slim</SelectItem>
              <SelectItem value='Regular'>Regular</SelectItem>
              <SelectItem value='Relaxed'>Relaxed</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>

      {/* Active filters */}
      {hasActiveFilters && (
        <>
          <Separator />
          <div className='flex flex-wrap items-center gap-2 text-sm text-muted-foreground'>
            <span>Active filters:</span>

            {Object.entries(filters)
              .filter(([_, value]) => value && value !== '' && value !== 'All')
              .map(([key, value]) => (
                <Badge
                  key={key}
                  className='rounded bg-app-badge-1 cursor-pointer'
                  variant='secondary'
                  onClick={() => updateFilter(key, 'All')}
                >
                  {fieldLabelMap[key]} : {getLabel(key, value)} ✕
                </Badge>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Filter;

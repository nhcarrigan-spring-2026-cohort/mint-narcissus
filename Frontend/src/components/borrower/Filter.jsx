import { useCallback, useEffect, useMemo, useState } from 'react';
import { Field } from '../ui/field';
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
import FilterSelect from './FilterSelect';

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

const filterConfig = [
  { key: 'category', label: 'Category', allLabel: 'All Categories' },
  { key: 'interviewType', label: 'Interview Type', allLabel: 'All Types' },
  { key: 'availability', label: 'Availability' },
  { key: 'topSize', label: 'Top Size' },
  { key: 'bottomSize', label: 'Bottom Size' },
  { key: 'height', label: 'Height' },
  { key: 'fitType', label: 'Fit Type' },
];

const Filter = ({ filters, updateFilter, onClear, defaultFilters }) => {
  const [searchInput, setSearchInput] = useState(filters.search);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchInput !== filters.search) {
        updateFilter('search', searchInput);
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchInput, filters.search, updateFilter]);

  const activeFilters = useMemo(() => {
    return Object.entries(filters).filter(
      ([_, value]) => value && value !== '' && value !== 'All',
    );
  }, [filters]);

  const activeCount = activeFilters.length;
  const hasActiveFilters = activeCount > 0;

  const getLabel = useCallback((key, value) => {
    return labelMap[key]?.[value] || value;
  }, []);

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
            onClick={() => {
              setSearchInput('');
              onClear();
            }}
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

        {filterConfig.map(({ key, label, allLabel }) => (
          <FilterSelect
            key={key}
            label={label}
            value={filters[key]}
            onChange={(v) => updateFilter(key, v)}
            mapKey={key}
            allLabel={allLabel}
            labelMap={labelMap}
          />
        ))}
      </div>

      {/* Active filters */}
      {hasActiveFilters && (
        <>
          <Separator />
          <div className='flex flex-wrap items-center gap-2 text-sm text-muted-foreground'>
            <span>Active filters ({activeCount}) :</span>

            {activeFilters.map(([key, value]) => (
              <Badge
                key={key}
                className='rounded bg-app-badge-1 cursor-pointer'
                variant='secondary'
                onClick={() => updateFilter(key, defaultFilters[key])}
                role='button'
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    updateFilter(key, defaultFilters[key]);
                  }
                }}
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

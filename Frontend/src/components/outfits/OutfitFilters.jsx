import React, { useState, useEffect } from 'react';
import { FiFilter, FiX } from 'react-icons/fi';
import { HiMagnifyingGlass } from 'react-icons/hi2';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const defaultFilters = {
  search: '',
  category: 'all',
  interviewType: 'all',
  status: 'all',
  size: '',
};

export function OutfitFilters({ onFilterChange, initialFilters = {} }) {
  const [filters, setFilters] = useState({
    ...defaultFilters,
    ...initialFilters,
  });


  
useEffect(() => {
  if (typeof onFilterChange === 'function') {
    onFilterChange(filters);
  } else {
    console.warn(
      'onFilterChange prop is not a function – received:',
      onFilterChange,
    );
  }
}, [filters, onFilterChange]);

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const hasActiveFilters = Object.values(filters).some(
    (v) => v !== '' && v !== 'all',
  );

  return (
    <div className='border-b bg-background/50 backdrop-blur-sm'>
      <div className='mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8'>
        <div className='rounded-xl border bg-card p-6 shadow-sm'>
          {/* Header */}
          <div className='mb-6 flex flex-wrap items-center justify-between gap-4'>
            <div className='flex items-center gap-3'>
              <FiFilter className='h-5 w-5 text-primary' />
              <h2 className='text-xl font-semibold tracking-tight'>
                Filter Outfits
              </h2>
            </div>

            <Button
              variant={hasActiveFilters ? 'outline' : 'ghost'}
              size='sm'
              onClick={resetFilters}
              disabled={!hasActiveFilters}
              className='gap-1.5'
            >
              <FiX className='h-4 w-4' />
              Reset
            </Button>
          </div>

          {/* Filters grid */}
          <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
            {/* Search */}
            <div className='space-y-2'>
              <Label htmlFor='search-outfits' className='text-sm font-medium'>
                Search
              </Label>
              <div className='relative'>
                <HiMagnifyingGlass className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                <Input
                  id='search-outfits'
                  placeholder='Name, description, brand...'
                  className='pl-10'
                  value={filters.search}
                  onChange={(e) => debouncedSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Category */}
            <div className='space-y-2'>
              <Label htmlFor='category' className='text-sm font-medium'>
                Category
              </Label>
              <div>
                <Select>
                  <SelectTrigger id='category'>
                    <SelectValue placeholder='All Categories' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Categories</SelectItem>
                    <SelectItem value='formal'>Formal</SelectItem>
                    <SelectItem value='semi-formal'>Semi-Formal</SelectItem>
                    <SelectItem value='business-casual'>
                      Business Casual
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Interview Type */}
            <div className='space-y-2'>
              <Label htmlFor='interview-type' className='text-sm font-medium'>
                Interview Type
              </Label>
              <div>
                <Select>
                  <SelectTrigger id='interview-type'>
                    <SelectValue placeholder='All Types' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Types</SelectItem>
                    <SelectItem value='tech'>Tech</SelectItem>
                    <SelectItem value='corporate'>Corporate</SelectItem>
                    <SelectItem value='finance'>Finance</SelectItem>
                    <SelectItem value='creative'>Creative</SelectItem>
                    <SelectItem value='healthcare'>Healthcare</SelectItem>
                    <SelectItem value='retail'>Retail</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Status */}
            <div className='space-y-2'>
              <Label htmlFor='status' className='text-sm font-medium'>
                Status
              </Label>
              <div>
                <Select>
                  <SelectTrigger id='status'>
                    <SelectValue placeholder='All Statuses' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Statuses</SelectItem>
                    <SelectItem value='available'>Available</SelectItem>
                    <SelectItem value='borrowed'>Currently Borrowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Size */}
            <div className='space-y-2'>
              <Label htmlFor='size' className='text-sm font-medium'>
                Size
              </Label>
              <Input
                id='size'
                placeholder='M, 32, UK 12, L / 34–36…'
                value={filters.size}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    size: e.target.value.trim(),
                  }))
                }
              />
              <p className='text-xs text-muted-foreground/70'>
                e.g. M, 32, UK 10, L / 34–36
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Input, Select, Button } from '../ui';

const categories = CategoryEnum.options;
const interviewTypes = interviewTypeEnum.options;

export function Filter({ onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories =
    searchTerms.length > 0
      ? categories.filter((cat) => cat.toLowerCase().includes(searchTerm))
      : categories;

  return (
    <div className='p-4 border-b'>
      <Input
        type='text'
        placeholder='Search outfits...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {categories.map((category, index) => (
        <Select key={index} defaultValue=''>
          <SelectTrigger>{category}</SelectTrigger>
          <SelectContent>
            <SelectItem value={category}>
              {category.replace('_', ' ')}
            </SelectItem>
          </SelectContent>
        </Select>
      ))}
    </div>
  );
}


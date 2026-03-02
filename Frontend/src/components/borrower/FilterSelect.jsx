import { Field } from '../ui/field';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const FilterSelect = ({
  label,
  value,
  onChange,
  mapKey,
  allLabel,
  labelMap,
}) => {
  return (
    <Field className='w-full'>
      <Label className='text-app-filter-label font-medium'>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='All'>{allLabel || 'All'}</SelectItem>
          {Object.entries(labelMap[mapKey]).map(([v, l]) => (
            <SelectItem key={v} value={v}>
              {l}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
};

export default FilterSelect;

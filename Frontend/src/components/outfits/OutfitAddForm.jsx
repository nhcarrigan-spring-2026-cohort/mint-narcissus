'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '../ui/select';
import { Button } from '@/components/ui/button';

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { Checkbox, Form } from 'radix-ui';
import { Toaster } from '../ui/sonner';

import { Textarea } from '../ui/textarea';
// Enum Definitions
const CategoryEnum = z.enum(['FORMAL', 'SEMI_FORMAL', 'BUSINESS_CASUAL']);
const InterviewTypeEnum = z.enum([
  'TECH',
  'CORPORATE',
  'FINANCE',
  'SALES',
  'CONSULTING',
  'OTHER',
]);
const StatusEnum = z.enum(['AVAILABLE', 'BORROWED', 'UNAVAILABLE']);
const VisibilityEnum = z.enum(['PUBLIC', 'HIDDEN']);

const itemFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),

  // Array of URL strings
  images: z.array(z.string().url('Must be a valid URL')).default([]),

  category: CategoryEnum,

  interviewTypeEnum: z
    .array(InterviewTypeEnum)
    .min(1, 'Select at least one type'),

  // Size Object
  size: z.object({
    label: z.string().min(1, 'Size label is required'),
    notes: z.string().optional(),
  }),

  // Fit Object (Optional) - All measurements in cm
  fit: z
    .object({
      chest: z.number().optional(),
      waist: z.number().optional(),
      hips: z.number().optional(),
      inseam: z.number().optional(),
      shoulder: z.number().optional(),
      length: z.number().optional(),
      fitNotes: z.string().optional(),
    })
    .optional(),

  fabric: z.string().optional(),
  confidenceNote: z.string().optional(),

  status: StatusEnum.default('AVAILABLE'),
  visibility: VisibilityEnum.default('PUBLIC'),
});

function onSubmit(data) {
  Toaster('You submitted the following values:', {
    description: (
      <pre className='bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4'>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    ),
    position: 'bottom-right',
    classNames: {
      content: 'flex flex-col gap-2',
    },
    style: {
      '--border-radius': 'calc(var(--radius)  + 4px)',
    },
  });
}
export function OutfitAddForm() {
  const form = useForm({
    resolver: zodResolver(itemFormSchema),
    defaultValues: {
      title: '',
      description: '',
      images: [],
      category: 'FORMAL',
      interviewTypeEnum: ['Tech','Corporate'],
      size: { label: '', notes: '' },
      fit: {
        chest: '',
        waist: '',
        hips: '',
        inseam: '',
        shoulder: '',
        length: '',
        fitNotes: '',
      },
      fabric: '',
      confidenceNote: '',
      status: 'AVAILABLE',
      visibility: 'PUBLIC',
    },
  });

  function onSubmit(data) {
    console.log(data);
  }


  return (<div className=' m-6'>
    <h1>Add Your Outfit</h1>
      <p>You are helping others to help themselves.</p>
    <div className='flex-col mt-4'>
      
      <form className="flex flex-col space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          name='title'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='outfit-title'>Title:</FieldLabel>
              <Input
                {...field}
                id='outfit-title'
                aria-invalid={fieldState.invalid}
                placeholder='Red dress'
                value={field.value ?? ''}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name='description'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='outfit-description'>Description:</FieldLabel>
              <Textarea
                {...field}
                id='outfit-description'
                aria-invalid={fieldState.invalid}
                placeholder='Describe fully'
                value={field.value ?? ''}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name='images'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='outfit-images'>Upload Pictures:</FieldLabel>
              <Input
                {...field}
                id='outfit-images'
                aria-invalid={fieldState.invalid}
                type='file'
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name='category'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor='outfit-category'>
                  Choose a category for this outfit:
                </FieldLabel>
              </FieldContent>
              <Select {...field} onValueChange={field.onChange}>
                <SelectTrigger
                  id='outfit-category'
                  aria-invalid={fieldState.invalid}
                >
                  <SelectValue placeholder='Select' />
                </SelectTrigger>
                <SelectContent position='item-aligned'>
                  <SelectItem value='FORMAL'>Formal</SelectItem>
                  <SelectItem value='SEMI_FORMAL'>Semi-Formal</SelectItem>
                  <SelectItem value='BUSINESS_CASUAL'>
                    Business-Casual
                  </SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name='type'
          control={form.control}
          defaultValue={['']}
          render={({ field, fieldState }) => {
            <FieldSet data-invalid={fieldState.invalid}>
              <FieldLegend variant='label'>Interview Types</FieldLegend>
              <FieldDescription>
                Select all categories this outfit is appropriate for.
              </FieldDescription>

              <FieldGroup className='grid grid-cols-2 gap-4'>
                {InterviewTypeEnum.options.map((option) => (
        
            
                  <Field
                    key={option}
                    orientation='horizontal'
                    className='flex items-center gap-2'
                  >
                    <Checkbox
                      id={`interview-type-${option}`}
                      checked={field.value?.includes(option)}
                      onCheckedChange={(checked) =>
                        field.onChange(
                          checked
                            ? [...(field.value || []), 'Tech']
                            : field.value.filter((val) => val !== 'Tech'),
                        )
                      }
                    />
                    <FieldLabel
                      htmlFor={`interview-type-${option}`}
                      className='capitalize font-normal'
                    >
                      {option.toLowerCase()}
                    </FieldLabel>
                  </Field>
                ))}
              </FieldGroup>

              {fieldState.error && (
                <p className='text-sm text-red-500 mt-2'>
                  {fieldState.error.message}
                </p>)}
              
              
          </FieldSet>
        }}
        />
<FieldSet>
          <Controller
            name='size.label'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Label</FieldLabel>
                <Input
                  {...field}
                  placeholder='e.g. Large'
                  data-invalid={fieldState.invalid}
                />
                {fieldState.error && (
                  <p className='text-red-500'>{fieldState.error.message}</p>
                )}
              </Field>
            )}
          />

          {/* The Notes Field */}
          <Controller
            name='size.notes'
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Notes (Optional)</FieldLabel>
                <Textarea {...field} placeholder='Special tailoring notes...' />
              </Field>
            )}
          />
        </FieldSet>

        <FieldSet>
          <FieldLegend variant='label'>Fit & Measurements</FieldLegend>
          <FieldDescription>
            Enter the specific measurements for this item in inches or
            centimeters.
          </FieldDescription>

          {/* Grid container for measurement inputs */}
          <FieldGroup className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-4'>
            {/* Chest Measurement */}
            <Controller
              name='fit.chest'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Chest</FieldLabel>
                  <Input
                    {...field}
                    placeholder='e.g. 40\'
                    data-invalid={fieldState.invalid}
                  />
                </Field>
              )}
            />

            {/* Waist Measurement */}
            <Controller
              name='fit.waist'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Waist</FieldLabel>
                  <Input
                    {...field}
                    placeholder='e.g. 32\'
                    data-invalid={fieldState.invalid}
                  />
                </Field>
              )}
            />

            {/* Hips Measurement */}
            <Controller
              name='fit.hips'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Hips</FieldLabel>
                  <Input
                    {...field}
                    placeholder='e.g. 38\'
                    data-invalid={fieldState.invalid}
                  />
                </Field>
              )}
            />

            {/* Inseam Measurement */}
            <Controller
              name='fit.inseam'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Inseam</FieldLabel>
                  <Input
                    {...field}
                    placeholder='e.g. 30\'
                    data-invalid={fieldState.invalid}
                  />
                </Field>
              )}
            />

            {/* Shoulder Measurement */}
            <Controller
              name='fit.shoulder'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Shoulder</FieldLabel>
                  <Input
                    {...field}
                    placeholder='e.g. 18\'
                    data-invalid={fieldState.invalid}
                  />
                </Field>
              )}
            />

            {/* Length Measurement */}
            <Controller
              name='fit.length'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Length</FieldLabel>
                  <Input
                    {...field}
                    placeholder='e.g. 28\'
                    data-invalid={fieldState.invalid}
                  />
                </Field>
              )}
            />

            {/* Fit Notes - Spans full width */}
            <div className='md:col-span-2'>
              <Controller
                name='fit.fitNotes'
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Fit Notes</FieldLabel>
                    <Textarea
                      {...field}
                      placeholder='e.g. Runs small in the shoulders, tailored fit...'
                    />
                  </Field>
                )}
              />
            </div>
          </FieldGroup>
        </FieldSet>

        <div>
          <Field orientation='horizontal'>
            <Button
              type='button'
              variant='outline'
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type='submit' form='form-rhf-demo'>
              Submit
            </Button>
          </Field>
        </div>
      </form>
    </div>
    </div>
  );
}

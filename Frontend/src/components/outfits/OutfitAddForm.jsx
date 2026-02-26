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
import { Textarea } from '../ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Toaster } from '../ui/sonner';

// Schemas
const CategoryEnum = z.enum(['FORMAL', 'SEMI_FORMAL', 'BUSINESS_CASUAL']);
const interviewTypeEnum = z.enum([
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
  images: z.array(z.string().url('Must be a valid URL')).default([]),
  category: CategoryEnum,
  interviewTypes: z.array(interviewTypeEnum).min(1, 'Select at least one type'),
  size: z.object({
    label: z.string().min(1, 'Size label is required'),
    notes: z.string().optional(),
  }),
  fit: z
    .object({
      chest: z.coerce.number().optional(),
      waist: z.coerce.number().optional(),
      hips: z.coerce.number().optional(),
      inseam: z.coerce.number().optional(),
      shoulder: z.coerce.number().optional(),
      length: z.coerce.number().optional(),
      fitNotes: z.string().optional(),
    })
    .optional(),
  fabric: z.string().optional(),
  confidenceNote: z.string().optional(),
  status: StatusEnum.default('AVAILABLE'),
  visibility: VisibilityEnum.default('PUBLIC'),
});

export function OutfitAddForm() {
  const form = useForm({
    resolver: zodResolver(itemFormSchema),
    defaultValues: {
      title: '',
      description: '',
      images: [],
      category: 'FORMAL',
      interviewTypes: [],
      size: { label: '', notes: '' },
      fit: {
        chest: 0,
        waist: 0,
        hips: 0,
        inseam: 0,
        shoulder: 0,
        length: 0,
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

  return (
    <div className=' m-6 p-10 '>
      <h1>List a New Outfit</h1>
      <p>Share your professional outfit with job seekers</p>
      <div className=' mt-4'>
        <form
          id='outfit-form'
          className='space-y-5'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Controller
            name='title'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='outfit-title'>Outfit Title:</FieldLabel>
                <Input
                  {...field}
                  id='outfit-title'
                  aria-invalid={fieldState.invalid}
                  placeholder='e.g., Classic Navy Suit'
                  value={field.value ?? ''}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name='description'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='outfit-description'>
                  Description:
                </FieldLabel>
                <Textarea
                  {...field}
                  id='outfit-description'
                  aria-invalid={fieldState.invalid}
                  placeholder='Describe the outfit, its features, and condition...'
                  value={field.value ?? ''}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name='images'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='outfit-images'>
                  Upload Pictures:
                </FieldLabel>
                <Input
                  {...field}
                  id='outfit-images'
                  aria-invalid={fieldState.invalid}
                  type='file'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
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
                    <SelectItem value='Formal'>Formal</SelectItem>
                    <SelectItem value='Semi Formal'>Semi-Formal</SelectItem>
                    <SelectItem value='Business Casual'>
                      Business-Casual
                    </SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name='interviewTypes'
            control={form.control}
            render={({ field, fieldState }) => (
              <FieldSet data-invalid={fieldState.invalid}>
                <FieldLegend>Suitable for Interview Types</FieldLegend>

                <FieldGroup className='grid grid-cols-3 gap-2'>
                  {interviewTypeEnum.options.map((option) => (
                    <Field
                      key={option}
                      className='flex items-center gap-2'
                      orientation='horizontal'
                    >
                      <Checkbox
                        id={`type-${option}`}
                        checked={field.value?.includes(option)}
                        onCheckedChange={(checked) => {
                          const current = field.value || [];
                          return checked
                            ? field.onChange([...current, option])
                            : field.onChange(
                                current.filter((v) => v !== option),
                              );
                        }}
                      />

                      <FieldLabel
                        htmlFor={`type-${option}`}
                        className='capitalize'
                      >
                        {option.toLowerCase()}
                      </FieldLabel>
                    </Field>
                  ))}
                </FieldGroup>
                {fieldState.error && (
                  <p className='text-sm text-red-500'>
                    {fieldState.error.message}
                  </p>
                )}
              </FieldSet>
            )}
          />

          <FieldSet>
            <FieldLegend variant='label'>Clothing Label</FieldLegend>
            <FieldDescription>
              Enter as much information on the label as you can
            </FieldDescription>
            <div className='flex-col w-2/3 space-y-4'>
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
              <Controller
                name='size.notes'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Notes (Optional)</FieldLabel>
                    <Textarea
                      {...field}
                      placeholder='Special tailoring notes...'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </FieldSet>

          <FieldSet>
            <FieldLegend variant='label'>Fit & Measurements</FieldLegend>
            <FieldDescription>
              Enter the specific measurements for this item in centimeters.
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
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
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
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
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
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
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
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
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
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
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
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Fit Notes - Spans full width */}
              <div className='md:col-span-2'>
                <Controller
                  name='fit.fitNotes'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Fit Notes</FieldLabel>
                      <Textarea
                        {...field}
                        placeholder='e.g. Runs small in the shoulders, tailored fit...'
                        data-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
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
              <Button type='submit' form='outfit-form'>
                Submit
              </Button>
            </Field>
          </div>
        </form>
      </div>
    </div>
  );
}

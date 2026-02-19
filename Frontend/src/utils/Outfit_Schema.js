import { z } from 'zod';

// We export these individually so you can use them to
// populate dropdowns or radio buttons in your UI.
export const CategoryEnum = z.enum([
  'FORMAL',
  'SEMI_FORMAL',
  'BUSINESS_CASUAL',
]);

export const interviewTypeEnum = z.enum([
  'TECH',
  'CORPORATE',
  'FINANCE',
  'SALES',
  'CONSULTING',
  'OTHER',
]);

export const StatusEnum = z.enum(['AVAILABLE', 'BORROWED', 'UNAVAILABLE']);

export const VisibilityEnum = z.enum(['PUBLIC', 'HIDDEN']);

// The main object schema
export const outfitFormSchema = z.object({
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


export const filterSchema = outfitFormSchema.partial();
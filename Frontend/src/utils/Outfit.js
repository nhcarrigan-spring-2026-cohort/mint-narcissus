/**
 * Outfit fields are not standard yet, all over the place
 * 
 * 
 * Browse.jsx use     Modal             Filter
 * imgSrc             yes               no
 * Title              yes               search
 * tags[]             yes               interviewType
 * size               no                  *
 * fit                no                  no
 * fabric             yes                 no
 * confidence note    yes                 no
 * owner.name         yes                 no
 * owner.img          yes                 no
 * description                   description         search
 * topSize                   top-size            size
 * bottomSize                   bottom-size         size
 * category                                       category
 * status                                       available
 *
 */

import { z } from 'zod';

// We export these individually so you can use them to
// populate dropdowns or radio buttons in your UI.
export const categoryEnum = z.enum([
  'FORMAL',
  'SEMI_FORMAL',
  'BUSINESS_CASUAL',
]);

export const typeTags = z.enum([
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
  id: z.string().min(1),
  owner: z.object({ name: z.string(), img: z.string() }),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  image: z.string().min(1, 'Must include an image'),
  category: categoryEnum,
  typeTags: z.array(typeTags).min(1, 'Select at least one type'),
  fabric: z.string().min(1, 'Fabric type is required'),
  size: z.object({
    topSize: z.string(),
    bottomSize: z.string(),
    notes: z.string().optional(),
  }),
  confidenceNote: z.string().optional(),
  status: StatusEnum.default('AVAILABLE'),
  visibility: VisibilityEnum.default('PUBLIC'),
});

export const filterSchema = outfitFormSchema.partial();

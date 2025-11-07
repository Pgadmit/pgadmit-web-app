import { z } from 'zod';

const floatTwoDecimalsRegex = /^\d+(\.\d{1,2})?$/;
const wholeNumberRegex = /^\d+$/;
const nameRegex = /^[\p{L}\s.'-]+$/u;

export const AdmissionFormSchema = z.object({
  homeCountry: z.string().min(1, 'Select a country'),
  gradingScale: z.string().min(1, 'Select grading scale'),
  gradeAverage: z
    .string()
    .regex(floatTwoDecimalsRegex, 'Must be a number with up to 2 decimals'),
  testsTaken: z.array(z.string()).optional(),
  testScore: z.string().min(1, 'Test score required'),
  preferredRegions: z.array(z.string()).nonempty('Select at least one region'),
  major: z.string().min(1, 'Required'),
  budget: z.string().regex(wholeNumberRegex, 'Budget must be a whole number'),
  name: z
    .string()
    .regex(nameRegex, 'Invalid characters in name')
    .min(2, 'Name required'),
  email: z.string().email('Invalid email'),
  newsletter: z.boolean().default(false).optional(),
});

export type AdmissionFormSchemaValues = z.infer<typeof AdmissionFormSchema>;

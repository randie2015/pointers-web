import { z } from 'zod';
import { isValidInternationalPhone } from './phone';

export function createContactFormSchema(t: (key: string) => string) {
  return z.object({
    name: z.string().trim().min(2, t('errors.name')).max(80),
    lastName: z.string().trim().max(80),
    email: z
      .string()
      .trim()
      .max(200)
      .refine((v) => v === '' || z.string().email().safeParse(v).success, t('errors.email')),
    phone: z
      .string()
      .trim()
      .refine(isValidInternationalPhone, t('errors.phone')),
    message: z.string().trim().min(15, t('errors.message')).max(5000)
  });
}

export const contactFormSchema = createContactFormSchema(() => 'Invalid field');

export const contactRequestSchema = z.object({
  data: contactFormSchema,
  metadata: z
    .object({
      locale: z.string().max(10).optional(),
      pageUrl: z.string().max(2048).optional(),
      referrer: z.string().max(2048).optional(),
      source: z.string().max(120).optional()
    })
    .optional()
    .default({})
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type ContactRequest = z.infer<typeof contactRequestSchema>;

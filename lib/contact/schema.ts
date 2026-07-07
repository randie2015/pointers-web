import { z } from 'zod';
import { SERVICE_SLUGS } from '@/lib/services';

export const CONTACT_SERVICE_VALUES = [...SERVICE_SLUGS, 'otro'] as const;
export const CONTACT_BUDGET_VALUES = ['under-500', '500-1500', '1500-5000', 'over-5000'] as const;

export function createContactFormSchema(t: (key: string) => string) {
  return z.object({
    name: z.string().trim().min(2, t('errors.name')).max(120),
    company: z.string().trim().min(2, t('errors.company')).max(120),
    service: z.enum(CONTACT_SERVICE_VALUES, { message: t('errors.service') }),
    budget: z.enum(CONTACT_BUDGET_VALUES, { message: t('errors.budget') }),
    message: z.string().trim().min(10, t('errors.message')).max(5000)
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

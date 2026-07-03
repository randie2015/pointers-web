import { z } from 'zod';

const PHONE_REGEX = /^\+?[\d\s().-]+$/;

function isValidInternationalPhone(value: string) {
  const digits = value.replace(/\D/g, '').length;
  return digits >= 7 && digits <= 15;
}

export function createContactFormSchema(t: (key: string) => string) {
  return z.object({
    firstName: z.string().trim().min(2, t('errors.firstName')).max(80),
    lastName: z.string().trim().max(80).optional(),
    email: z.string().trim().email(t('errors.email')).max(254),
    phone: z
      .string()
      .trim()
      .min(1, t('errors.phoneRequired'))
      .max(30)
      .regex(PHONE_REGEX, t('errors.phoneFormat'))
      .refine(isValidInternationalPhone, t('errors.phoneFormat')),
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

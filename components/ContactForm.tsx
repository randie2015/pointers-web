'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { SectionBadge } from '@/components/ui/section-badge';

const TEAL = '#39B8AD';

/** Cambiar a `true` para probar el estado de error del botón */
const SIMULATE_ERROR = false;

/** Acepta formatos internacionales: +, espacios, guiones, paréntesis (E.164: 7–15 dígitos) */
const PHONE_REGEX = /^\+?[\d\s().-]+$/;

function isValidInternationalPhone(value: string) {
  const digits = value.replace(/\D/g, '').length;
  return digits >= 7 && digits <= 15;
}

function createContactSchema(t: (key: string) => string) {
  return z.object({
    firstName: z.string().trim().min(2, t('errors.firstName')),
    lastName: z.string().trim().max(80).optional(),
    email: z.string().trim().email(t('errors.email')),
    phone: z
      .string()
      .trim()
      .min(1, t('errors.phoneRequired'))
      .regex(PHONE_REGEX, t('errors.phoneFormat'))
      .refine(isValidInternationalPhone, t('errors.phoneFormat')),
    message: z.string().trim().min(10, t('errors.message'))
  });
}

type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const inputClass =
  'w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#39B8AD] focus:ring-2 focus:ring-[#39B8AD]/25';

function Field({
  label,
  error,
  children
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5 text-left">
      <label className="text-xs font-medium uppercase tracking-wider text-gray-500">{label}</label>
      {children}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

export function ContactForm({ id }: { id?: string }) {
  const t = useTranslations('contact');
  const schema = useMemo(() => createContactSchema(t), [t]);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: ''
    }
  });

  const isBusy = formStatus === 'loading';
  const isDone = formStatus === 'success';
  const submitDisabled = isBusy || isDone || (formStatus === 'idle' && !isValid);

  const onSubmit = async (_data: ContactFormValues) => {
    setFormStatus('loading');
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (SIMULATE_ERROR) {
      setFormStatus('error');
      return;
    }

    setFormStatus('success');
    reset();
    setTimeout(() => setFormStatus('idle'), 4000);
  };

  const buttonLabel = {
    idle: t('submitIdle'),
    loading: '',
    success: t('submitSuccess'),
    error: t('submitError')
  }[formStatus];

  return (
    <section
      id={id}
      className={cn('relative overflow-hidden py-16 md:py-24', id && 'scroll-mt-24')}
      style={{ background: 'linear-gradient(135deg, #BC2656 0%, #5E549D 100%)' }}
    >
      <div className="container-page relative z-10">
        <div className="mx-auto max-w-3xl text-center text-white">
          <SectionBadge text={t('eyebrow')} />
          <h1 className="mt-3 font-display text-3xl tracking-tight md:text-4xl lg:text-5xl">{t('title')}</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/85 md:text-base">
            {t('subtitle')}
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl rounded-2xl bg-white p-8 shadow-2xl md:mt-12 md:p-10">
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={t('firstName')} error={errors.firstName?.message}>
                <input
                  {...register('firstName')}
                  autoComplete="given-name"
                  className={inputClass}
                  disabled={isBusy || isDone}
                />
              </Field>
              <Field label={t('lastName')} error={errors.lastName?.message}>
                <input
                  {...register('lastName')}
                  autoComplete="family-name"
                  className={inputClass}
                  disabled={isBusy || isDone}
                />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={t('email')} error={errors.email?.message}>
                <input
                  {...register('email')}
                  type="email"
                  autoComplete="email"
                  className={inputClass}
                  disabled={isBusy || isDone}
                />
              </Field>
              <Field label={t('phone')} error={errors.phone?.message}>
                <input
                  {...register('phone')}
                  type="tel"
                  autoComplete="tel"
                  placeholder={t('phonePlaceholder')}
                  className={inputClass}
                  disabled={isBusy || isDone}
                />
              </Field>
            </div>

            <Field label={t('message')} error={errors.message?.message}>
              <textarea
                {...register('message')}
                rows={5}
                className={cn(inputClass, 'resize-none')}
                disabled={isBusy || isDone}
              />
            </Field>

            <motion.button
              type="submit"
              disabled={submitDisabled}
              className={cn(
                'relative mt-2 flex h-12 w-full items-center justify-center overflow-hidden rounded-xl text-sm font-semibold text-white transition-colors',
                formStatus === 'error' && 'bg-red-800 hover:bg-red-900',
                formStatus === 'success' && 'cursor-default',
                formStatus !== 'error' && formStatus !== 'success' && 'hover:brightness-105',
                submitDisabled && formStatus === 'idle' && 'cursor-not-allowed opacity-50'
              )}
              style={
                formStatus === 'idle' || formStatus === 'loading'
                  ? { backgroundColor: TEAL }
                  : formStatus === 'success'
                    ? { backgroundColor: '#2d9d92' }
                    : undefined
              }
              whileTap={submitDisabled ? undefined : { scale: 0.99 }}
            >
              <AnimatePresence mode="wait">
                {formStatus === 'loading' ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center"
                  >
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                  </motion.span>
                ) : (
                  <motion.span
                    key={formStatus}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="px-4 text-center leading-snug"
                  >
                    {buttonLabel}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {formStatus === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-xs text-red-500"
              >
                {t('retryHint')}
              </motion.p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

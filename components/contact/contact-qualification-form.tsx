'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import { MaskUpButton } from '@/components/ui/mask-up-button';
import { createContactFormSchema, type ContactFormData } from '@/lib/contact/schema';
import { isServiceSlug } from '@/lib/services';

const inputClass =
  'w-full rounded-xl border border-white/25 bg-white px-4 py-3.5 text-sm text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-[#39B8AD] focus:ring-2 focus:ring-[#39B8AD]/25 max-md:min-h-[48px]';

function Field({
  label,
  required,
  error,
  children
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5 text-left">
      <label className="text-xs font-medium uppercase tracking-wider text-white/90">
        {label}
        {required ? <span className="text-white"> *</span> : null}
      </label>
      {children}
      {error && <p className="text-sm text-red-200">{error}</p>}
    </div>
  );
}

type ContactQualificationFormProps = {
  initialService?: string;
  initialPlan?: string;
};

export function ContactQualificationForm({ initialService, initialPlan }: ContactQualificationFormProps) {
  const t = useTranslations('contact');
  const locale = useLocale();
  const schema = useMemo(() => createContactFormSchema(t), [t]);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const resolvedService = isServiceSlug(initialService ?? '') ? initialService : undefined;
  const contextNote = [
    initialPlan && ['pro', 'premium', 'pointers'].includes(initialPlan)
      ? `[Plan de interés: ${initialPlan}]`
      : '',
    resolvedService ? `[Servicio: ${resolvedService}]` : ''
  ]
    .filter(Boolean)
    .join(' ');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      lastName: '',
      email: '',
      phone: '',
      message: ''
    }
  });

  const isBusy = formStatus === 'loading';
  const isDone = formStatus === 'success';
  const submitDisabled = isBusy || isDone || (formStatus === 'idle' && !isValid);

  const onSubmit = async (data: ContactFormData) => {
    setFormStatus('loading');

    const message = [data.message, contextNote].filter(Boolean).join('\n\n');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: { ...data, message },
          metadata: {
            locale,
            pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
            referrer: typeof document !== 'undefined' ? document.referrer || undefined : undefined,
            source: 'contact-qualification-form'
          }
        })
      });

      if (!response.ok) {
        setFormStatus('error');
        return;
      }

      setFormStatus('success');
      reset();
      setTimeout(() => setFormStatus('idle'), 4000);
    } catch {
      setFormStatus('error');
    }
  };

  const buttonLabel = {
    idle: t('submitIdle'),
    loading: '',
    success: t('submitSuccess'),
    error: t('submitError')
  }[formStatus];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t('name')} required error={errors.name?.message}>
          <input
            {...register('name')}
            autoComplete="given-name"
            placeholder={t('placeholders.name')}
            className={inputClass}
            disabled={isBusy || isDone}
          />
        </Field>

        <Field label={t('lastName')} error={errors.lastName?.message}>
          <input
            {...register('lastName')}
            autoComplete="family-name"
            placeholder={t('placeholders.lastName')}
            className={inputClass}
            disabled={isBusy || isDone}
          />
        </Field>
      </div>

      <Field label={t('email')} error={errors.email?.message}>
        <input
          {...register('email')}
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder={t('placeholders.email')}
          className={inputClass}
          disabled={isBusy || isDone}
        />
      </Field>

      <Field label={t('phone')} required error={errors.phone?.message}>
        <input
          {...register('phone')}
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder={t('placeholders.phone')}
          className={inputClass}
          disabled={isBusy || isDone}
        />
      </Field>

      <Field label={t('message')} required error={errors.message?.message}>
        <textarea
          {...register('message')}
          rows={5}
          placeholder={t('placeholders.message')}
          className={cn(inputClass, 'resize-none py-3')}
          disabled={isBusy || isDone}
        />
      </Field>

      <div className="mt-2">
        {formStatus === 'loading' ? (
          <button
            type="button"
            disabled
            className="cta-button mobile-btn-surface flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold"
          >
            <Loader2 className="h-5 w-5 animate-spin text-white" aria-hidden />
          </button>
        ) : formStatus === 'success' || formStatus === 'error' ? (
          <button
            type="button"
            disabled
            className={cn(
              'mobile-btn-surface flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold text-white',
              formStatus === 'error' ? 'bg-red-800' : 'bg-[#2d9d92]'
            )}
          >
            {buttonLabel}
          </button>
        ) : (
          <MaskUpButton
            type="submit"
            label={buttonLabel}
            disabled={submitDisabled}
            hideSlide
            className="block w-full"
          />
        )}
      </div>

      {formStatus === 'error' && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-xs text-red-200"
        >
          {t('retryHint')}
        </motion.p>
      )}
    </form>
  );
}

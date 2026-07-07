'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import { MaskUpButton } from '@/components/ui/mask-up-button';
import {
  CONTACT_BUDGET_VALUES,
  CONTACT_SERVICE_VALUES,
  createContactFormSchema,
  type ContactFormData
} from '@/lib/contact/schema';
import { isServiceSlug } from '@/lib/services';

const inputClass =
  'w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-sm text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-[#39B8AD] focus:ring-2 focus:ring-[#39B8AD]/25 max-md:min-h-[48px]';

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
  const planNote =
    initialPlan && ['pro', 'premium', 'pointers'].includes(initialPlan)
      ? `[Plan de interés: ${initialPlan}]`
      : '';

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
      company: '',
      service: resolvedService as ContactFormData['service'],
      budget: undefined as unknown as ContactFormData['budget'],
      message: planNote
    }
  });

  const isBusy = formStatus === 'loading';
  const isDone = formStatus === 'success';
  const submitDisabled = isBusy || isDone || (formStatus === 'idle' && !isValid);

  const onSubmit = async (data: ContactFormData) => {
    setFormStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data,
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
      <Field label={t('name')} error={errors.name?.message}>
        <input
          {...register('name')}
          autoComplete="name"
          className={inputClass}
          disabled={isBusy || isDone}
        />
      </Field>

      <Field label={t('company')} error={errors.company?.message}>
        <input
          {...register('company')}
          autoComplete="organization"
          className={inputClass}
          disabled={isBusy || isDone}
        />
      </Field>

      <Field label={t('service')} error={errors.service?.message}>
        <select {...register('service')} className={cn(inputClass, 'appearance-none')} disabled={isBusy || isDone}>
          <option value="">{t('servicePlaceholder')}</option>
          {CONTACT_SERVICE_VALUES.map((value) => (
            <option key={value} value={value}>
              {t(`serviceOptions.${value}`)}
            </option>
          ))}
        </select>
      </Field>

      <Field label={t('budget')} error={errors.budget?.message}>
        <select {...register('budget')} className={cn(inputClass, 'appearance-none')} disabled={isBusy || isDone}>
          <option value="">{t('budgetPlaceholder')}</option>
          {CONTACT_BUDGET_VALUES.map((value) => (
            <option key={value} value={value}>
              {t(`budgetOptions.${value}`)}
            </option>
          ))}
        </select>
      </Field>

      <Field label={t('message')} error={errors.message?.message}>
        <textarea
          {...register('message')}
          rows={5}
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
          className="text-center text-xs text-red-500"
        >
          {t('retryHint')}
        </motion.p>
      )}
    </form>
  );
}

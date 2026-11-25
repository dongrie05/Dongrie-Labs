'use client';

import { useEffect, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { createContactFormSchema, sanitizeSource } from '@/lib/contact/schema';

const WHATSAPP_NUMBER = '351927699882';

type ContactValues = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  source: string;
  company_url: string;
};

type ContactFormProps = {
  /** Stored with the lead so a future project page can pass its slug. */
  source?: string;
};

export function ContactForm({ source = 'contact' }: ContactFormProps) {
  const t = useTranslations('contact.form');
  const tTypes = useTranslations('contact.projectTypes');
  const tBudget = useTranslations('contact.budgetOptions');
  const locale = useLocale();
  const safeSource = sanitizeSource(source);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorKind, setErrorKind] = useState<'generic' | 'rate_limited'>('generic');
  const [submitted, setSubmitted] = useState<ContactValues | null>(null);

  const projectTypeOptions = [
    { value: 'mobile', label: tTypes('mobile') },
    { value: 'ai', label: tTypes('ai') },
    { value: 'automation', label: tTypes('automation') },
    { value: 'mvp', label: tTypes('mvp') },
    { value: 'other', label: tTypes('other') },
  ];

  const budgetOptions = [
    { value: 'under2k', label: tBudget('under2k') },
    { value: '2k5k', label: tBudget('2k5k') },
    { value: '5k10k', label: tBudget('5k10k') },
    { value: 'over10k', label: tBudget('over10k') },
  ];

  const schema = useMemo(
    () =>
      createContactFormSchema({
        name: t('nameError'),
        email: t('emailError'),
        projectType: t('projectTypeError'),
        message: t('messageError'),
      }),
    [t]
  );

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      projectType: '',
      budget: '',
      message: '',
      source: safeSource,
      company_url: '',
    },
  });

  useEffect(() => {
    setValue('source', safeSource);
  }, [safeSource, setValue]);

  const openWhatsApp = (data: Partial<ContactValues>) => {
    const projectTypeLabel =
      projectTypeOptions.find((option) => option.value === data.projectType)?.label ??
      data.projectType ??
      '–';
    const budgetLabel = data.budget
      ? (budgetOptions.find((option) => option.value === data.budget)?.label ?? data.budget)
      : '–';
    const lines = [
      t('whatsAppIntro'),
      '',
      `${t('name')}: ${data.name ?? ''}`,
      `${t('email')}: ${data.email ?? ''}`,
      `${t('projectType')}: ${projectTypeLabel}`,
      `${t('budget')}: ${budgetLabel}`,
      '',
      data.message ?? '',
    ];
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const onSubmit = async (data: ContactValues) => {
    setStatus('sending');
    setErrorKind('generic');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          projectType: data.projectType,
          budget: data.budget ?? '',
          message: data.message,
          source: sanitizeSource(data.source || safeSource),
          company_url: data.company_url ?? '',
          locale,
        }),
      });

      if (!response.ok) {
        setErrorKind(response.status === 429 ? 'rate_limited' : 'generic');
        setStatus('error');
        return;
      }

      setSubmitted(data);
      setStatus('success');
    } catch {
      setErrorKind('generic');
      setStatus('error');
    }
  };

  if (status === 'success' && submitted) {
    return (
      <div
        className="rounded-2xl border border-green-500/30 bg-green-500/10 p-8 text-center text-green-400"
        role="status"
      >
        <p className="text-lg font-medium">{t('success')}</p>
        <Button
          type="button"
          variant="whatsapp"
          className="mt-6 w-full"
          onClick={() => openWhatsApp(submitted)}
        >
          {t('whatsAppFallback')}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <input type="hidden" {...register('source')} />
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="company_url">Company URL</label>
        <input
          id="company_url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('company_url')}
        />
      </div>
      <Input
        label={t('name')}
        autoComplete="name"
        {...register('name')}
        error={errors.name?.message}
      />
      <Input
        label={t('email')}
        type="email"
        autoComplete="email"
        {...register('email')}
        error={errors.email?.message}
      />
      <Select
        label={t('projectType')}
        options={projectTypeOptions}
        placeholder={t('projectType')}
        {...register('projectType')}
        error={errors.projectType?.message}
      />
      <Select
        label={t('budget')}
        options={budgetOptions}
        placeholder={t('budget')}
        {...register('budget')}
      />
      <Textarea
        label={t('message')}
        {...register('message')}
        error={errors.message?.message}
      />
      {status === 'error' && (
        <p className="text-sm text-red-400" role="alert">
          {errorKind === 'rate_limited' ? t('rateLimited') : t('error')}
        </p>
      )}
      <Button type="submit" variant="primary" className="w-full" disabled={status === 'sending'}>
        {status === 'sending' ? t('sending') : t('submit')}
      </Button>
      <Button
        type="button"
        variant="whatsapp"
        className="w-full"
        onClick={() => openWhatsApp(getValues())}
      >
        {t('whatsAppFallback')}
      </Button>
    </form>
  );
}

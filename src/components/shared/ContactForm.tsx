'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

const WHATSAPP_NUMBER = '351927699882';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  projectType: z.string().min(1, 'Select a type'),
  budget: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const t = useTranslations('contact.form');
  const tTypes = useTranslations('contact.projectTypes');
  const tBudget = useTranslations('contact.budgetOptions');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      projectType: '',
      budget: '',
    },
  });

  const onSubmit = (data: FormData) => {
    setStatus('sending');

    const projectTypeLabel = projectTypeOptions.find((o) => o.value === data.projectType)?.label ?? data.projectType;
    const budgetLabel = data.budget ? (budgetOptions.find((o) => o.value === data.budget)?.label ?? data.budget) : '–';

    const lines = [
      t('whatsAppIntro'),
      '',
      `${t('name')}: ${data.name}`,
      `${t('email')}: ${data.email}`,
      `${t('projectType')}: ${projectTypeLabel}`,
      `${t('budget')}: ${budgetLabel}`,
      '',
      data.message,
    ];
    const text = lines.join('\n');
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

    window.open(url, '_blank');
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-8 text-center text-green-400">
        <p className="text-lg font-medium">{t('success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label={t('name')}
        {...register('name')}
        error={errors.name?.message}
      />
      <Input
        label={t('email')}
        type="email"
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
        <p className="text-sm text-red-400">{t('error')}</p>
      )}
      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? t('sending') : t('submit')}
      </Button>
    </form>
  );
}

'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Link } from '@/navigation';
import { Mail } from 'lucide-react';
import { MagneticButton } from '@/components/shared/MagneticButton';

const FOUNDER_IMAGE = '/images/portfolio/founder.JPG';
const EMAIL = 'goncalo.dongrie05@gmail.com';
const WHATSAPP = 'https://wa.me/351927699882';

export function AboutContact() {
  const t = useTranslations('aiLayer.aboutContact');
  const tContact = useTranslations('contact');

  return (
    <section id="about-contact" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            className="relative mx-auto flex w-full max-w-sm items-center justify-center"
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10 bg-navy-900/50">
              {/* Founder photo — replace if a dedicated shot is provided later */}
              <Image
                src={FOUNDER_IMAGE}
                alt={t('photoAlt')}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 80vw, 360px"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(10,14,26,0.55) 0%, transparent 45%)',
                }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-lilac">
              {t('label')}
            </p>
            <h2 className="font-heading mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
              {t('title')}
            </h2>
            <p className="mt-3 text-lg text-lilac/80">{t('subtitle')}</p>
            <p className="mt-6 text-base leading-relaxed text-slate-400">{t('bio')}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <MagneticButton strength={0.15}>
                <Link
                  href="/contact"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-navy-950 transition-transform hover:scale-[1.02]"
                >
                  {t('ctaContact')}
                </Link>
              </MagneticButton>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-white/10 px-6 py-3 text-sm font-medium text-slate-300 transition-colors hover:border-lilac/40 hover:text-white"
              >
                <Mail className="h-4 w-4" />
                {EMAIL}
              </a>
              <a
                href={`${WHATSAPP}?text=${encodeURIComponent(tContact('whatsAppDefaultMessage'))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-white/10 px-6 py-3 text-sm font-medium text-slate-300 transition-colors hover:border-green-500/30 hover:text-green-300"
              >
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

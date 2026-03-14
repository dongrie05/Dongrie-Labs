'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, MessageCircle, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from '@/navigation';
import { TextReveal } from '@/components/shared/TextReveal';
import { MagneticButton } from '@/components/shared/MagneticButton';

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/goncalo-dongrie05/30min';
const WHATSAPP_BASE = 'https://wa.me/351927699882';

export function CTASection() {
  const t = useTranslations('cta');
  const tContact = useTranslations('contact');
  const whatsappUrl = `${WHATSAPP_BASE}?text=${encodeURIComponent(tContact('whatsAppDefaultMessage'))}`;

  return (
    <section className="relative px-4 py-32 sm:px-6 sm:py-40 lg:px-8 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Background effects */}
        <div
          className="pointer-events-none absolute left-1/4 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="pointer-events-none absolute right-1/4 bottom-1/4 h-[400px] w-[400px] translate-x-1/2 rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />

        <div className="relative text-center">
          <motion.p
            className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            {t('sectionLabel')}
          </motion.p>

          {/* Scroll-driven text reveal for the headline */}
          <div className="mx-auto mt-6 max-w-4xl">
            <TextReveal
              text={t('headline')}
              className="flex justify-center"
            />
          </div>

          <motion.p
            className="mx-auto mt-6 max-w-xl text-lg text-slate-400"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {t('subtitle')}
          </motion.p>
          <motion.p
            className="mx-auto mt-3 max-w-lg text-sm text-slate-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            {t('noCommitment')}
          </motion.p>

          <motion.div
            className="mt-12 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <MagneticButton strength={0.15}>
              <a
                href={CALENDLY_URL}
                target={CALENDLY_URL.startsWith('http') ? '_blank' : undefined}
                rel={CALENDLY_URL.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group relative inline-flex min-h-[48px] w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-blue-500 px-8 py-4 text-base font-medium text-white shadow-xl shadow-blue-500/25 transition-all hover:shadow-blue-400/40 active:scale-[0.98] sm:w-auto"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t('bookCall')}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-transform duration-500 group-hover:translate-x-0" />
              </a>
            </MagneticButton>
            <MagneticButton strength={0.15}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-8 py-4 text-base font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-green-500/30 hover:bg-green-500/10 hover:text-green-300 active:scale-[0.98] sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" />
                {t('whatsApp')}
              </a>
            </MagneticButton>
            <MagneticButton strength={0.15}>
              <Link
                href="/contact"
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-8 py-4 text-base font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.06] active:scale-[0.98] sm:w-auto"
              >
                <FileText className="h-5 w-5" />
                {t('requestQuote')}
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

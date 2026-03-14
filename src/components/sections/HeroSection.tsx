'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from '@/navigation';
import { useRef } from 'react';
import { MagneticButton } from '@/components/shared/MagneticButton';
import { CodeToAppAnimation } from './CodeToAppAnimation';

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/goncalo-dongrie05/30min';
const WHATSAPP_BASE = 'https://wa.me/351927699882';

const GRADIENT_WORDS = new Set(['weeks,', 'semanas,', 'AI', 'IA']);

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
};

const wordVariant = {
  hidden: { opacity: 0, y: 40, rotateX: -40, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export function HeroSection() {
  const t = useTranslations('hero');
  const tContact = useTranslations('contact');
  const title = t('title');
  const words = title.split(' ');
  const whatsappUrl = `${WHATSAPP_BASE}?text=${encodeURIComponent(tContact('whatsAppDefaultMessage'))}`;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100vh] items-center overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      <motion.div className="gradient-mesh" style={{ y: bgY, opacity: bgOpacity }}>
        <div className="mesh-blob mesh-blob-1" />
        <div className="mesh-blob mesh-blob-2" />
        <div className="mesh-blob mesh-blob-3" />
      </motion.div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-64"
        style={{ background: 'linear-gradient(to top, var(--navy-950) 0%, transparent 100%)' }}
      />

      <div className="relative mx-auto flex w-full max-w-7xl items-center gap-8 py-20 lg:gap-10">
        <div className="flex min-h-0 flex-1 max-w-2xl flex-col justify-center pr-0 lg:max-w-[70rem]" style={{ perspective: '1000px' }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/8 px-4 py-2 text-sm text-blue-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
            </span>
            {t('badge')}
          </motion.div>

          <motion.h1
            className="font-heading mt-8 flex max-w-full flex-wrap gap-x-[0.3em] gap-y-1 text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl md:text-6xl lg:text-[3.5rem]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariant}
                className={GRADIENT_WORDS.has(word) ? 'text-gradient-strong' : 'text-white'}
                style={{ display: 'inline-block' }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="mt-8 max-w-xl text-lg leading-relaxed text-slate-400 sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <MagneticButton strength={0.2}>
              <a
                href={CALENDLY_URL}
                target={CALENDLY_URL.startsWith('http') ? '_blank' : undefined}
                rel={CALENDLY_URL.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group relative inline-flex min-h-[48px] w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-blue-500 px-7 py-4 text-base font-medium text-white shadow-xl shadow-blue-500/25 transition-all hover:shadow-blue-400/40 active:scale-[0.98] sm:w-auto"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t('ctaBookCall')}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-transform duration-500 group-hover:translate-x-0" />
              </a>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-7 py-4 text-base font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-green-500/30 hover:bg-green-500/10 hover:text-green-300 active:scale-[0.98] sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          className="hidden lg:flex lg:min-w-[min(448px,45vw)] lg:flex-1 lg:items-center lg:justify-end xl:min-w-0 xl:flex-[1.6] xl:justify-end"
          initial={{ opacity: 0, x: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <CodeToAppAnimation />
        </motion.div>
      </div>

      {/* Scroll cue with arrow */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-medium">{t('scroll')}</span>
          <div className="flex h-10 w-6 justify-center overflow-hidden rounded-full border border-white/15 pt-2">
            <motion.div
              className="h-2 w-0.5 rounded-full bg-white/40"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

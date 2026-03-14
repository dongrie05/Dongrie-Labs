'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

const WHATSAPP_BASE = 'https://wa.me/351927699882';

export function FloatingWhatsApp() {
  const tContact = useTranslations('contact');
  const tCommon = useTranslations('common');
  const url = `${WHATSAPP_BASE}?text=${encodeURIComponent(tContact('whatsAppDefaultMessage'))}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-4 z-50 flex h-14 w-14 min-h-[56px] min-w-[56px] items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/25 transition-colors duration-200 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-navy-950 md:bottom-6 md:right-6"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingRight: 'env(safe-area-inset-right)',
      } as React.CSSProperties}
      aria-label={tCommon('contactWhatsApp')}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-15" />
      <MessageCircle className="h-7 w-7 relative z-10" />
    </motion.a>
  );
}

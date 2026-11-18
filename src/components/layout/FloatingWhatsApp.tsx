'use client';

import { MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

const WHATSAPP_BASE = 'https://wa.me/351927699882';

export function FloatingWhatsApp() {
  const tContact = useTranslations('contact');
  const tCommon = useTranslations('common');
  const url = `${WHATSAPP_BASE}?text=${encodeURIComponent(tContact('whatsAppDefaultMessage'))}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-4 z-40 inline-flex h-11 min-h-11 min-w-11 items-center justify-center gap-2 rounded-full bg-[#075E54] px-4 text-[15px] font-medium text-white active:scale-[0.97] md:right-6"
      style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
      aria-label={tCommon('contactWhatsApp')}
    >
      <MessageCircle className="h-5 w-5" aria-hidden />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}

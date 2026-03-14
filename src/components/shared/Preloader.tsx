'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

const CHAR_DELAY_MS = 14;
const LINE_PAUSE_MS = 50;
const CURSOR_BLINK_MS = 480;
const HOLD_AT_END_MS = 400;

// Code lines (same in all locales); comments come from translations
const CODE_LINES = [
  { text: '', type: 'blank' as const },
  { text: "const idea = client.brainstorm();", type: 'code' as const },
  { text: "const deadline = 'next week';  // yes, really", type: 'code' as const },
  { text: "const coffee = Infinity;", type: 'code' as const },
  { text: '', type: 'blank' as const },
  { text: "const app = await build(idea, { speed: 'weeks', quality: 'agency' });", type: 'code' as const },
  { text: "return app.ship();  // 🚀", type: 'code' as const },
  { text: '', type: 'blank' as const },
];

export function Preloader() {
  const t = useTranslations('preloader');
  const LINES = useMemo(
    () => [
      { text: t('buildingComment'), type: 'comment' as const },
      ...CODE_LINES,
      { text: t('readyComment'), type: 'comment' as const },
    ],
    [t]
  );

  const [visible, setVisible] = useState(true);
  const [displayLines, setDisplayLines] = useState<Array<{ text: string; type: string }>>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [phase, setPhase] = useState<'typing' | 'holding'>('typing');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Cursor blink
  useEffect(() => {
    const t = setInterval(() => setShowCursor((c) => !c), CURSOR_BLINK_MS);
    return () => clearInterval(t);
  }, []);

  // Typewriter: build displayed content line by line, char by char
  useEffect(() => {
    if (phase === 'holding') return;

    const line = LINES[currentLineIndex];
    if (!line) return;

    const isBlank = line.type === 'blank';
    const lineLen = line.text.length;

    if (currentCharIndex < lineLen) {
      const timeout = setTimeout(() => {
        setDisplayLines((prev) => {
          const next = [...prev];
          if (!next[currentLineIndex]) {
            next[currentLineIndex] = { ...line, text: '' };
          }
          const char = line.text[currentCharIndex];
          next[currentLineIndex] = {
            ...next[currentLineIndex],
            text: (next[currentLineIndex].text || '') + char,
          };
          return next;
        });
        setCurrentCharIndex((i) => i + 1);
      }, isBlank ? LINE_PAUSE_MS : CHAR_DELAY_MS);
      return () => clearTimeout(timeout);
    }

    // End of line
    const timeout = setTimeout(() => {
      if (currentLineIndex < LINES.length - 1) {
        setCurrentLineIndex((i) => i + 1);
        setCurrentCharIndex(0);
        setDisplayLines((prev) => {
          const next = [...prev];
          const nextLine = LINES[currentLineIndex + 1];
          if (nextLine && !next[currentLineIndex + 1]) {
            next[currentLineIndex + 1] = { ...nextLine, text: '' };
          }
          return next;
        });
      } else {
        setPhase('holding');
      }
    }, LINE_PAUSE_MS);
    return () => clearTimeout(timeout);
  }, [currentLineIndex, currentCharIndex, phase, LINES]);

  // After holding at end, exit preloader
  useEffect(() => {
    if (phase !== 'holding') return;
    const t = setTimeout(() => setVisible(false), HOLD_AT_END_MS);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-navy-950 p-4 sm:p-8"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          onAnimationComplete={() => {
            document.body.style.overflow = '';
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-2xl overflow-hidden rounded-xl border border-white/[0.08] bg-navy-900/80 shadow-2xl shadow-black/40"
          >
            {/* Window chrome */}
            <div className="flex items-center gap-2 border-b border-white/[0.06] bg-navy-900/90 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-slate-500" />
                <div className="h-2.5 w-2.5 rounded-full bg-slate-500" />
                <div className="h-2.5 w-2.5 rounded-full bg-slate-500" />
              </div>
              <span className="ml-2 text-xs text-slate-500 font-medium">boot.js</span>
            </div>

            <div className="p-4 font-mono text-sm min-h-[220px] sm:p-5 sm:text-base sm:min-h-[280px]">
              {displayLines.map((line, i) => (
                <div key={i} className="flex">
                  {line.type === 'comment' && (
                    <span className="select-none text-slate-500 pr-2">{'  '}</span>
                  )}
                  {line.type === 'code' && (
                    <span className="select-none text-slate-600 pr-2">{'  '}</span>
                  )}
                  <span
                    className={
                      line.type === 'comment'
                        ? 'text-emerald-400/90'
                        : line.type === 'code'
                          ? 'text-slate-300'
                          : ''
                    }
                  >
                    {line.text}
                    {i === currentLineIndex && phase === 'typing' && (
                      <span
                        className="inline-block w-2.5 h-4 ml-0.5 bg-cyan-400 align-middle"
                        style={{ opacity: showCursor ? 1 : 0 }}
                      />
                    )}
                  </span>
                </div>
              ))}
              {phase === 'holding' && (
                <div className="flex">
                  <span className="select-none text-slate-600 pr-2">{'  '}</span>
                  <span className="text-slate-500">$</span>
                  <span className="ml-1 text-cyan-400/80">_</span>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Zap, ArrowRight, Workflow } from 'lucide-react';

const CODE_STRING = `function App() {
  const [user, setUser] = useState(null);

  return (
    <View style={styles.container}>
      <Header />
      <Feed data={user?.feed} />
    </View>
  );
}`;

// 1.6x faster: code → AI → phone cycle
const CHAR_DELAY_MS = 26;
const CODE_PAUSE_AFTER_MS = 1000;
const AI_DURATION_MS = 2375;
const OUTPUT_DURATION_MS = 3250;

type Phase = 'code' | 'ai' | 'output';
type OutputVariant = 'app' | 'pipeline';

export function CodeToAppAnimation() {
  const [phase, setPhase] = useState<Phase>('code');
  const [visibleChars, setVisibleChars] = useState(0);
  const [outputVariant, setOutputVariant] = useState<OutputVariant>('app');

  const totalChars = CODE_STRING.length;

  // Code: typewriter letter by letter
  useEffect(() => {
    if (phase !== 'code') return;
    setVisibleChars(0);
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i <= totalChars; i++) {
      timeouts.push(setTimeout(() => setVisibleChars(i), i * CHAR_DELAY_MS));
    }
    const pauseThenNext = setTimeout(() => {
      setPhase('ai');
    }, totalChars * CHAR_DELAY_MS + CODE_PAUSE_AFTER_MS);
    timeouts.push(pauseThenNext);
    return () => timeouts.forEach(clearTimeout);
  }, [phase, totalChars]);

  // AI: show for duration then go to output
  useEffect(() => {
    if (phase !== 'ai') return;
    const t = setTimeout(() => setPhase('output'), AI_DURATION_MS);
    return () => clearTimeout(t);
  }, [phase]);

  // Output: show then back to code, alternate variant next time
  useEffect(() => {
    if (phase !== 'output') return;
    const t = setTimeout(() => {
      setOutputVariant((v) => (v === 'app' ? 'pipeline' : 'app'));
      setPhase('code');
    }, OUTPUT_DURATION_MS);
    return () => clearTimeout(t);
  }, [phase]);

  const showPipeline = outputVariant === 'pipeline';

  // Split visible text into lines for display with line numbers
  const visibleLines = useMemo(() => {
    const text = CODE_STRING.slice(0, visibleChars);
    return text.split('\n');
  }, [visibleChars]);

  const showCursor = phase === 'code' && visibleChars > 0;

  return (
    <div className="relative flex h-[512px] w-[448px] items-center justify-center xl:h-[576px] xl:w-[512px]">
      <AnimatePresence mode="wait">
        {phase === 'code' && (
          <motion.div
            key="code"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: 0.92,
              filter: 'blur(6px)',
              transition: { duration: 0.5 },
            }}
            transition={{ duration: 0.4 }}
          >
            {/* ~15 lines height: line-height 1.65 × 15 lines + header */}
            <div className="flex h-[390px] w-full max-w-full flex-col overflow-hidden rounded-2xl border border-navy-700 bg-navy-900/95 shadow-2xl shadow-black/30 backdrop-blur-sm">
              <div className="flex shrink-0 items-center gap-2 border-b border-navy-700 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                <span className="ml-2 text-sm text-slate-500">App.tsx</span>
              </div>
              <pre className="min-h-0 flex-1 overflow-auto p-5 text-left text-[15px] leading-[1.65] xl:text-base">
                <code>
                  {visibleLines.map((line, i) => (
                    <div key={i} className="flex">
                      <span className="w-8 shrink-0 select-none text-slate-600">
                        {i + 1}
                      </span>
                      <span className="text-slate-300">
                        {line}
                        {i === visibleLines.length - 1 && showCursor && (
                          <motion.span
                            className="ml-0.5 inline-block h-4 w-0.5 align-middle bg-cyan-400"
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.7, repeat: Infinity }}
                          />
                        )}
                      </span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </motion.div>
        )}

        {phase === 'ai' && (
          <motion.div
            key="ai"
            className="absolute flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 1.15,
              filter: 'blur(10px)',
              transition: { duration: 0.45 },
            }}
            transition={{
              type: 'spring',
              stiffness: 160,
              damping: 22,
              mass: 0.9,
            }}
          >
            <motion.div
              className="relative flex h-32 w-32 items-center justify-center rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 shadow-xl shadow-cyan-500/25 xl:h-36 xl:w-36"
              animate={{
                boxShadow: [
                  '0 0 40px -5px rgba(34, 211, 238, 0.28)',
                  '0 0 60px -5px rgba(34, 211, 238, 0.4)',
                  '0 0 40px -5px rgba(34, 211, 238, 0.28)',
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Brain className="h-14 w-14 text-cyan-400 xl:h-16 xl:w-16" strokeWidth={1.5} />
            </motion.div>
            <p className="mt-5 text-base font-medium text-slate-400">AI-powered</p>
            <p className="mt-1 text-sm text-slate-500">
              {showPipeline ? 'building automation' : 'building your app'}
            </p>
          </motion.div>
        )}

        {phase === 'output' && !showPipeline && (
          <motion.div
            key="app"
            className="absolute flex items-center justify-center"
            initial={{ opacity: 0, y: 24, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: -20,
              scale: 0.94,
              transition: { duration: 0.45 },
            }}
            transition={{
              type: 'spring',
              stiffness: 140,
              damping: 24,
            }}
          >
            <div className="relative rounded-[2.5rem] border-[8px] border-navy-700 bg-navy-800 p-2.5 shadow-2xl shadow-black/40">
              <div className="h-[384px] w-[224px] overflow-hidden rounded-[1.75rem] bg-navy-900 xl:h-[448px] xl:w-[256px]">
                <div className="absolute left-1/2 top-3 z-10 h-6 w-20 -translate-x-1/2 rounded-full bg-navy-950" />
                <div className="flex h-full flex-col pt-10">
                  <div className="flex items-center justify-between px-5 py-4">
                    <span className="text-base font-semibold text-white">App</span>
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 space-y-3 px-4">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="rounded-xl bg-navy-800/80 p-3"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.06 * i, duration: 0.25 }}
                      >
                        <div className="h-2.5 w-3/4 rounded bg-slate-600" />
                        <div className="mt-2 h-2 w-full rounded bg-slate-700/80" />
                        <div className="mt-1.5 h-2 w-1/2 rounded bg-slate-700/60" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {phase === 'output' && showPipeline && (
          <motion.div
            key="pipeline"
            className="absolute flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.45 } }}
            transition={{
              type: 'spring',
              stiffness: 140,
              damping: 24,
            }}
          >
            <div className="w-full max-w-[420px] rounded-2xl border border-navy-700 bg-navy-900/95 p-5 shadow-2xl shadow-black/30 xl:max-w-[448px]">
              <div className="mb-4 flex items-center gap-2.5">
                <Workflow className="h-5 w-5 text-cyan-400" />
                <span className="text-sm font-medium text-slate-400">Automation</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.div
                  className="flex flex-1 flex-col items-center gap-2 rounded-xl border border-navy-700 bg-navy-800/80 px-4 py-3"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 }}
                >
                  <Zap className="h-6 w-6 text-amber-400" />
                  <span className="text-xs font-medium text-slate-400">Trigger</span>
                </motion.div>
                <motion.span
                  className="text-navy-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.span>
                <motion.div
                  className="flex flex-1 flex-col items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 }}
                >
                  <Brain className="h-6 w-6 text-cyan-400" />
                  <span className="text-xs font-medium text-cyan-400/90">AI</span>
                </motion.div>
                <motion.span
                  className="text-navy-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.span>
                <motion.div
                  className="flex flex-1 flex-col items-center gap-2 rounded-xl border border-navy-700 bg-navy-800/80 px-4 py-3"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28 }}
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-green-500/20 text-green-400">
                    <span className="text-sm font-bold">✓</span>
                  </div>
                  <span className="text-xs font-medium text-slate-400">Output</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

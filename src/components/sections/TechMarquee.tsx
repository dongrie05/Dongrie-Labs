'use client';

import { Marquee } from '@/components/shared/Marquee';
import {
  Smartphone,
  Brain,
  Workflow,
  Rocket,
  Zap,
  Shield,
  Globe,
  Code2,
  Cpu,
  Database,
  Cloud,
  Layers,
} from 'lucide-react';

const techs = [
  { name: 'React Native', icon: Smartphone },
  { name: 'Next.js', icon: Globe },
  { name: 'OpenAI', icon: Brain },
  { name: 'Swift', icon: Code2 },
  { name: 'TypeScript', icon: Layers },
  { name: 'Node.js', icon: Cpu },
  { name: 'Firebase', icon: Cloud },
  { name: 'PostgreSQL', icon: Database },
  { name: 'Automation', icon: Workflow },
  { name: 'Performance', icon: Rocket },
  { name: 'Fast Delivery', icon: Zap },
  { name: 'Secure', icon: Shield },
];

export function TechMarquee() {
  return (
    <section className="relative py-10 border-y border-white/[0.04] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(59,130,246,0.03) 0%, transparent 70%)' }}
      />
      <Marquee speed={50}>
        {techs.map((tech) => (
          <div
            key={tech.name}
            className="flex shrink-0 items-center gap-3 rounded-full border border-white/[0.04] bg-navy-900/40 px-5 py-2.5 backdrop-blur-sm"
          >
            <tech.icon className="h-4 w-4 text-slate-500" strokeWidth={1.5} />
            <span className="text-sm font-medium text-slate-400 whitespace-nowrap">
              {tech.name}
            </span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}

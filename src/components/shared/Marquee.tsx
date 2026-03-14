'use client';

import { cn } from '@/lib/utils';

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
  direction?: 'left' | 'right';
  className?: string;
}

export function Marquee({
  children,
  speed = 40,
  pauseOnHover = true,
  direction = 'left',
  className,
}: MarqueeProps) {
  const animDirection = direction === 'left' ? 'normal' : 'reverse';

  return (
    <div
      className={cn(
        'group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]',
        className,
      )}
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          className={cn(
            'flex min-w-full shrink-0 items-center gap-8',
            pauseOnHover && 'group-hover:[animation-play-state:paused]',
          )}
          style={{
            animation: `marquee ${speed}s linear infinite`,
            animationDirection: animDirection,
          }}
          aria-hidden={copy === 1}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

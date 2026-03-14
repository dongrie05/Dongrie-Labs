'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  hover?: boolean;
  children: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ glass, hover = true, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl border border-white/[0.06] bg-navy-900 p-6 transition-all duration-300',
          glass && 'bg-navy-900/60 backdrop-blur-xl',
          hover && 'card-glow hover:border-white/[0.1] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card };
export type { CardProps };

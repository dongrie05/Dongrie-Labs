'use client';

import Link from 'next/link';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'whatsapp' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-blue-500 hover:bg-blue-400 text-white border-0 shadow-lg shadow-blue-500/20',
  secondary:
    'border border-navy-700 hover:border-blue-500 text-white bg-transparent',
  whatsapp: 'bg-green-500 hover:bg-green-400 text-white border-0',
  ghost:
    'border-0 text-slate-300 hover:text-white hover:bg-navy-800/50 bg-transparent',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-xl',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      href,
      children,
      className,
      external,
      disabled,
      ...props
    },
    ref
  ) => {
    const base =
      'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-navy-950 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] hover:scale-[1.02] min-h-[44px]';
    const combined = cn(
      base,
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={combined}
          >
            {children}
          </a>
        );
      }
      return <Link href={href} className={combined}>{children}</Link>;
    }

    return (
      <button
        ref={ref}
        type="button"
        className={combined}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };

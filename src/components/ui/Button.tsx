'use client';

import { forwardRef } from 'react';
import { Link } from '@/navigation';
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
    'bg-accent text-on-accent hover:bg-accent-press active:bg-accent-press',
  secondary:
    'border border-line bg-transparent text-ink hover:bg-ink/[0.04]',
  whatsapp: 'bg-[#128C7E] text-white hover:bg-[#0e7468]',
  ghost: 'bg-transparent text-ink hover:bg-ink/[0.04]',
};

const sizeStyles = {
  sm: 'min-h-11 px-4 text-[15px]',
  md: 'min-h-11 px-5 text-[17px]',
  lg: 'min-h-12 px-6 text-[17px]',
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
    const combined = cn(
      'inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] transition-transform duration-100 ease-out active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50',
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
            onClick={props.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={combined} onClick={props.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} type="button" className={combined} disabled={disabled} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };

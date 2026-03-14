import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'platform' | 'tech';
  children: React.ReactNode;
}

const variantStyles = {
  default:
    'bg-navy-800 text-slate-300 border border-navy-700',
  platform: 'bg-blue-500/10 text-blue-400 border border-blue-500/30',
  tech: 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/30',
};

export function Badge({
  variant = 'default',
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

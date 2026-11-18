import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'platform' | 'tech';
  children: React.ReactNode;
}

export function Badge({
  variant: _variant = 'default',
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span className={cn('text-[15px] text-muted', className)} {...props}>
      {children}
    </span>
  );
}

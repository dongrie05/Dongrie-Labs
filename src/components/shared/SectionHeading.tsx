import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
  as?: 'h1' | 'h2';
}

export function SectionHeading({
  title,
  subtitle,
  align = 'left',
  className,
  as = 'h2',
}: SectionHeadingProps) {
  const Tag = as;
  return (
    <div className={cn(align === 'center' && 'mx-auto max-w-prose text-center', className)}>
      <Tag className="headline">{title}</Tag>
      {subtitle && <p className={cn('lede', align === 'center' && 'mx-auto')}>{subtitle}</p>}
    </div>
  );
}

import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' && 'text-center mx-auto max-w-3xl',
        align === 'left' && 'max-w-2xl',
        className
      )}
    >
      <h2 className="font-heading text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-slate-300 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

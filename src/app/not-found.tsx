import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-6 text-ink">
      <div className="max-w-md">
        <p className="text-[15px] text-muted">404</p>
        <h1 className="headline mt-3">Page not found</h1>
        <p className="mt-4 text-[17px] leading-relaxed text-muted">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/en"
            className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-[17px] font-medium text-on-accent"
          >
            Home
          </Link>
          <Link
            href="/en/contact"
            className="inline-flex min-h-11 items-center rounded-full border border-line px-5 text-[17px] font-medium"
          >
            Contact
          </Link>
        </div>
        <p className="mt-8 text-[15px] text-muted">
          <Link href="/pt" className="text-link hover:underline">
            Português
          </Link>
          <span className="px-2">/</span>
          <Link href="/en" className="text-link hover:underline">
            English
          </Link>
        </p>
      </div>
    </div>
  );
}

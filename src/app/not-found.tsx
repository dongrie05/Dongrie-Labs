import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-navy-950 text-white">
      <div className="text-center max-w-md">
        <p className="text-6xl font-heading font-bold text-white/10">404</p>
        <h1 className="mt-4 font-heading text-2xl font-semibold text-white">
          Page not found
        </h1>
        <p className="mt-2 text-slate-400">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/en"
            className="rounded-xl bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400"
          >
            Home
          </Link>
          <Link
            href="/en/contact"
            className="rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
          >
            Contact
          </Link>
        </div>
        <p className="mt-6 text-xs text-slate-500">
          <Link href="/pt" className="hover:text-slate-400">Português</Link>
          {' · '}
          <Link href="/en" className="hover:text-slate-400">English</Link>
        </p>
      </div>
    </div>
  );
}

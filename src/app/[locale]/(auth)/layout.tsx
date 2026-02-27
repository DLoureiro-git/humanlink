import { Link } from '@/i18n/routing';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-12">
      {/* Logo */}
      <Link href="/" className="group mb-10 flex items-center gap-2.5">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-purple to-accent-cyan">
          <span className="font-heading text-base font-bold text-white">H</span>
        </div>
        <span className="font-heading text-xl font-semibold tracking-tight text-white">
          Human
          <span className="bg-gradient-to-r from-accent-purple to-accent-cyan bg-clip-text text-transparent">
            Link
          </span>
        </span>
      </Link>
      {children}
    </div>
  );
}

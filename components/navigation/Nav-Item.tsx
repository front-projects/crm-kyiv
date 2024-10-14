'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavItem({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <Link
      href={to}
      className={`max-sm:text-sm ${pathname.includes(to) ? 'text-purple-600 border-purple-600' : ''} border-2 rounded-xl p-2 hover:bg-gray-600/50`}
    >
      {children}
    </Link>
  );
}

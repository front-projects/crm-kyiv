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
      className={`${pathname.startsWith(to) ? 'text-red-400 border-red-400' : ''} border-2 rounded-xl p-2 hover:bg-gray-600/50`}
    >
      {children}
    </Link>
  );
}

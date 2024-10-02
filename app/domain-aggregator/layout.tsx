'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <section className="relative">
      <Link
        href={`${pathname == '/domain-aggregator/check-domain' ? '/domain-aggregator/my-domains' : '/domain-aggregator/check-domain'} `}
      >
        <div className="fixed right-1/4 max-sm:right-4 top-24 bg-yellow-700 p-4 rounded-[24px] cursor-pointer">
          {pathname !== '/domain-aggregator/check-domain'
            ? 'Buy domain'
            : 'My Domains'}
        </div>
      </Link>

      <div>{children}</div>
    </section>
  );
}

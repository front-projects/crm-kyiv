'use client';

import { Button } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <section className="relative">
      <Link
        className="fixed right-1/4 max-sm:right-4 top-24"
        href={`${pathname == '/menu/domain-aggregator/check-domain' ? '/menu/domain-aggregator/my-domains' : '/menu/domain-aggregator/check-domain'} `}
      >
        <Button variant="contained" color="secondary">
          {pathname !== '/menu/domain-aggregator/check-domain'
            ? 'Buy domain'
            : 'My Domains'}
        </Button>
      </Link>

      <div>{children}</div>
    </section>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { getDomains } from '../requests';
import DomainItem from '@/components/domain-aggregator/Domain-Item';

export default function DomainsList() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [domains, setDomains] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDomains();
      setDomains(data);
    };

    fetchData();
  }, []);

  return (
    <>
      {!domains ? (
        <div>No domains purchased yet</div>
      ) : (
        domains.map((el) => {
          return <DomainItem key={el.Name} domain={el} />;
        })
      )}
    </>
  );
}

'use client';

import { FaCheck } from 'react-icons/fa';
import { useState } from 'react';
import { Modal } from './Modal';
import { buyDomain } from '@/app/menu/domain-aggregator/requests';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@mui/material';

export default function FreeInfo({ domain }: { domain: string }) {
  const [status, setStatus] = useState('question');
  const searchParams = useSearchParams();
  const show = searchParams.get('show');
  const router = useRouter();

  const submitHandler = async () => {
    setStatus('loading');
    const response = await buyDomain(domain);
    if (response) {
      setStatus('success');
    } else {
      setStatus('failed');
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 mt-10 text-green-600 text-[24px] px-10 max-sm:px-2 text-center mb-4">
        <p>This domain is available for purchase</p>
        <div>
          <FaCheck />
        </div>
      </div>

      <Link href="/menu/domain-aggregator/check-domain?show=true">
        <Button variant="contained" color="secondary">Buy {domain}</Button>
      </Link>

      {show && (
        <Modal>
          <div className="py-6">
            {(status == 'question' || status == 'loading') && (
              <div>Do you really want to buy a domain - {domain} ?</div>
            )}
            {status == 'success' && (
              <div>You have successfully purchased a domain - {domain}</div>
            )}
            {status == 'failed' && (
              <div>There was an error, please try again later</div>
            )}
          </div>
          {status == 'question' && (
            <Button onClick={() => submitHandler()}>Yes</Button>
          )}
          {status == 'loading' && <Button disabled>Buying..</Button>}
          {status == 'failed' && (
            <Button
              onClick={() => {
                setStatus('question');
                router.back();
              }}
            >
              Close
            </Button>
          )}
          {status == 'success' && (
            <Link href="/domain-aggregator/my-domains">
              <Button>Show my domains</Button>
            </Link>
          )}
        </Modal>
      )}
    </>
  );
}

'use client';
import { referralBuilder } from './requests';

export default function DomainPage() {
  const handleSubmit = async () => {
    await referralBuilder();
  };

  return <div onClick={handleSubmit}>Domain</div>;
}

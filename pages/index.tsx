'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default () => {
  const { push } = useRouter();

  useEffect(() => {
     push('/en-us');
  }, []);
  return <></>;
};
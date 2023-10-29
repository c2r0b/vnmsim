'use client';

import { usePathname, useRouter } from 'next/navigation';

export default () => {
  const { push } = useRouter();
  const pathname = usePathname();

  if (pathname === '/') {
    push('/en-us');
  }
  
  return <></>;
};
'use client';

import type { ReactNode } from 'react';

import { useApplicationModal } from '@/components/application-modal-provider';

export function ApplyTrigger({
  className,
  children
}: {
  className?: string;
  children: ReactNode;
}) {
  const { open } = useApplicationModal();

  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}

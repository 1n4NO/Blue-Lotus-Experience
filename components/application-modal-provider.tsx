'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import { ApplicationModal } from '@/components/application-modal';

type ApplicationModalContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const ApplicationModalContext = createContext<ApplicationModalContextValue | null>(null);

export function ApplicationModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  return (
    <ApplicationModalContext.Provider value={value}>
      {children}
      <ApplicationModal isOpen={isOpen} onClose={close} />
    </ApplicationModalContext.Provider>
  );
}

export function useApplicationModal() {
  const context = useContext(ApplicationModalContext);
  if (!context) {
    throw new Error('useApplicationModal must be used within an ApplicationModalProvider');
  }
  return context;
}

'use client';

import { PropsWithChildren } from 'react';
import StyledComponentsRegistry from '@/components/lib/StyledComponentsRegistry';
import GlobalStyles from '@/styles/GlobalStyles';
import { AppContextProvider } from '@/context/AppContext';

export default function AppWrapper({ children }: PropsWithChildren) {
  return (
    <StyledComponentsRegistry>
      <GlobalStyles />
      <AppContextProvider>{children}</AppContextProvider>
    </StyledComponentsRegistry>
  );
}

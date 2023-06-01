import AppWrapper from '@/components/AppWrapper';
import { PropsWithChildren } from 'react';

export const metadata = {
  title: 'TUM LAN',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <main>
          <AppWrapper>{children}</AppWrapper>
        </main>
      </body>
    </html>
  );
}

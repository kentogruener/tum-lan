'use client';

import Clock from '@/components/Clock';
import { ViewPort } from '@/components/layout';
import { Subtitle, Title } from '@/components/text';

export default function Welcome() {
  return (
    <>
      <ViewPort>
        <Title>Welcome</Title>
        <Subtitle>at TUM LAN</Subtitle>
      </ViewPort>
    </>
  );
}

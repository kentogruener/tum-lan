'use client';

import Clock from '@/components/Clock';
import { ViewPort } from '@/components/layout';
import { Subtitle, Title } from '@/components/text';

export default function EndPage() {
  return (
    <>
      <ViewPort>
        <Title>Thank you for coming</Title>
        <Subtitle>This event ends at 9:00 am</Subtitle>
      </ViewPort>
    </>
  );
}

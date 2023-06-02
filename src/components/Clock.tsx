'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function Clock() {
  const [time, setTime] = useState(new Date(1900, 1, 1, 0, 0, 0));

  useEffect(() => {
    setTime(new Date(1900, 1, 1, 0, 0, 0));
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, [setTime]);

  return (
    <ClockContainer>
      <ClockString>{time.toLocaleTimeString('de')}</ClockString>
    </ClockContainer>
  );
}

const ClockContainer = styled.div`
  position: fixed;
  right: 32px;
  bottom: 32px;

  border: 4px solid #fff;
  border-radius: 8px;

  padding: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 180px;
`;

const ClockString = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #fff;
`;

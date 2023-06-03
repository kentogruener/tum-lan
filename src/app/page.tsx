'use client';

import Clock from '@/components/Clock';
import Background from '@/components/Background';
import EndScene from '@/components/scenes/end';
import PizzaScene from '@/components/scenes/pizza';
import WelcomeScene from '@/components/scenes/welcome';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function StreamPage() {
  const scenes = [
    <WelcomeScene key={0} />,
    <PizzaScene key={1} />,
    <EndScene key={2} />,
  ];
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [currentScene, setCurrentScene] = useState(<WelcomeScene />);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSceneIndex((prev) => {
        const next = (prev + 1) % scenes.length;
        setCurrentScene(scenes[next]);
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageContainer>
      <Background />
      {/* Dynmaic Component */}
      {currentScene}
      <Clock />
    </PageContainer>
  );
}

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

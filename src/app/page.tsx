'use client';

import { sceneComponents, scenesMeta } from '@/components/scenes';
import styled from 'styled-components';
import { useAppContext } from '@/context/AppContext';
import { useEffect, useState } from 'react';
import Background from '@/components/Background';
import Clock from '@/components/Clock';

export default function StreamPage() {
  const { scenes, setSceneKey } = useAppContext();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!scenes.rotationActive) return;

      const selectableScenes = scenes.scenesMeta.filter((scene) => scene.show);

      if (!selectableScenes.length) return;

      const nextSceneIndex = selectableScenes.findIndex(
        (scene) => scene.key === scenes.currentSceneKey
      );

      if (nextSceneIndex === selectableScenes.length - 1) {
        setSceneKey(
          selectableScenes[0] ? selectableScenes[0].key : scenesMeta[0].key
        );
      } else {
        setSceneKey(selectableScenes[nextSceneIndex + 1].key);
      }
    }, scenes.duration * 1000);

    return () => clearInterval(interval);
  }, [scenes.rotationActive, scenes.duration, scenes.scenesMeta, setSceneKey]);

  return (
    <PageContainer>
      {sceneComponents[scenes.currentSceneKey].background && <Background />}
      {sceneComponents[scenes.currentSceneKey].scene}
      {sceneComponents[scenes.currentSceneKey].overlay && <Clock />}
    </PageContainer>
  );
}

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

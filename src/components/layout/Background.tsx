import Image from 'next/image';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import BackgroundImageSrc from '../../../public/render-background.png';
import Island from '../../../public/render-island.png';

export default function Background({ children }: PropsWithChildren) {
  return (
    <>
      <BackgroundImage src={BackgroundImageSrc} alt={'background'} />
      <AnimationContainer>
        <IslandImage src={Island} alt={'island'} />
      </AnimationContainer>
      <Page>{children}</Page>
    </>
  );
}

const Page = styled.div`
  position: absolute;

  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: baseline;

  padding: 32px;
`;

const BackgroundImage = styled(Image)`
  height: 100vh;
  width: 100vw;

  position: absolute;
  top: 0;
  left: 0;

  z-index: -1;
`;

const AnimationContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
  width: 100vw;

  overflow: hidden;
`;

const IslandImage = styled(Image)`
  width: auto;
  height: 2000px;

  aspect-ratio: 9933 / 14043;

  animation: island 10s ease-in-out infinite;

  @keyframes island {
    0% {
      transform: translate(0px, 20px);
    }
    50% {
      transform: translate(0px, -20px);
    }
    100% {
      transform: translate(0px, 20px);
    }
  }
`;

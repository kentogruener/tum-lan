import Image from 'next/image';
import styled from 'styled-components';
import BackgroundImageSrc from '../../public/render-background.png';
import Island from '../../public/Insel-klein.png';
import WolkeLinksImage from '../../public/Wolke-links-klein.png';
import WolkeRechtsImage from '../../public/Wolke-rechts-klein.png';

export default function Background() {
  return (
    <>
      <BackgroundImage src={BackgroundImageSrc} alt={'background'} />
      <AnimationContainer>
        <IslandImage src={Island} alt={'island'} />
        <WolkeLinks src={WolkeLinksImage} alt={'wolke links'} />
        <WolkeRechts src={WolkeRechtsImage} alt={'wolke rechts'} />
      </AnimationContainer>
    </>
  );
}

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
  position: absolute;

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

const WolkeLinks = styled(Image)`
  position: absolute;

  width: auto;
  height: 100px;
  aspect-ratio: 16 / 9;

  transform: translate(-450px, -260px);

  animation: wolke-links 10s ease-in-out infinite;

  @keyframes wolke-links {
    0% {
      transform: translate(-450px, -260px);
    }
    50% {
      transform: translate(-470px, -300px);
    }
    100% {
      transform: translate(-450px, -260px);
    }
  }
`;

const WolkeRechts = styled(Image)`
  position: absolute;

  width: auto;
  height: 100px;
  aspect-ratio: 16 / 9;

  transform: translate(400px, -230px);

  animation: wolke-rechts 10s ease-in-out infinite;

  @keyframes wolke-rechts {
    0% {
      transform: translate(400px, -230px);
    }
    50% {
      transform: translate(420px, -270px);
    }
    100% {
      transform: translate(400px, -230px);
    }
  }
`;

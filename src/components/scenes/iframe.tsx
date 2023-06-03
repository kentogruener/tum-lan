'use client';

import styled from 'styled-components';
import { ViewPort } from '../Layout';

export default function IFrameScene({ url }: { url: string }) {
  return <IFrame src={url} allowFullScreen></IFrame>;
}

const IFrame = styled.iframe`
  position: absolute;

  height: 100vh;
  width: 100vw;

  border: none;
`;

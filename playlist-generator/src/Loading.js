import React from 'react';
import styled, { keyframes } from 'styled-components';

const barCount = 6;
const barHeight = 20;
const barSpacing = 4;
const duration = 1.2;

const waveKeyframes = keyframes`
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-30px);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(0);
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100%;
`;

const Bar = styled.div`
  width: ${barHeight}px;
  height: ${barHeight}px;
  margin: 0 ${barSpacing}px;
  border-radius: 50%;
  background-color: #FF7C60;
  border-color: #ffff;
  border-width: 1px;
  animation: ${waveKeyframes} ${duration}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
`;

const Loading = () => {
  return (
    <Wrapper>
      {[...Array(barCount)].map((_, i) => (
        <Bar key={i} delay={-duration + (i * duration) / barCount} />
      ))}
    </Wrapper>
  );
};

export default Loading;

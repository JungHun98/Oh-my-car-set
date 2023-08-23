import React from 'react';
import styled from 'styled-components';
import Header from '@/component/header/Header';
import GuideContent from '@/component/guidecontent/GuideContent';

function Guide() {
  return (
    <Wrapper>
      <TopWrapper>
        <Header />
      </TopWrapper>
      <GuideContent />
    </Wrapper>
  );
}

export default Guide;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
const TopWrapper = styled.div`
  width: 100%;
  min-height: 111px;
  position: fixed;
  background: white;
  z-index: 999999;
`;

import React from 'react';
import styled from 'styled-components';
import {flexCenter} from '../../style/common';

function SelectedOptionImage() {
  return (
    <Wrapper>
      <img src="image 103.png"></img>
    </Wrapper>
  );
}

export default SelectedOptionImage;

const Wrapper = styled.div`
  ${flexCenter}
  flex: 6;
`;

import React from 'react';
import styled, {css} from 'styled-components';
import {Body1_Medium, Title1_Medium, Title3_Regular} from '@/style/fonts';
import {colors} from '@/style/theme';
import GridList from './selectflow/GridList';
import CardList from './selectflow/CardList';

function SelectFlow() {
  return (
    <Wrapper>
      <FlowContainer.Left>
        <Left.Level>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="33"
            height="33"
            viewBox="0 0 33 33"
            fill="none"
          >
            <circle cx="16.5" cy="16.5" r="16.5" fill="#DFDFDF" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="33"
            height="33"
            viewBox="0 0 33 33"
            fill="none"
          >
            <circle cx="16.5" cy="16.5" r="16.5" fill="#DFDFDF" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="33"
            height="33"
            viewBox="0 0 33 33"
            fill="none"
          >
            <circle cx="16.5" cy="16.5" r="16.5" fill="#DFDFDF" />
          </svg>
        </Left.Level>
        <Left.Comment>만나서 반가워요!</Left.Comment>
        <Left.SelectionText>
          키워드를 중요한 순서로키워드를 중요한 순서로
        </Left.SelectionText>
        <Left.Tip>
          비슷한 나이대의 사람들이 선호하는 컬러를 알려드려요.
        </Left.Tip>
        <Left.Button>선택완료</Left.Button>
      </FlowContainer.Left>
      <FlowContainer.Right>
        <CardList />
      </FlowContainer.Right>
    </Wrapper>
  );
}

export default SelectFlow;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const flexLayout = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

const FlowContainer = {
  Left: styled.div`
    ${flexLayout}
    gap: 16px;
  `,
  Right: styled.div`
    ${flexLayout}
    align-items: flex-end;
    gap: 12px;
  `,
};

const Left = {
  Level: styled.div`
    display: inline-flex;
    align-items: flex-start;
    width: 131px;
    height: 33px;
    gap: 16px;
  `,
  Comment: styled.div`
    ${Title3_Regular}
    font-size: 32px;
    width: 290px;
  `,
  SelectionText: styled.div`
    ${Title1_Medium}
    font-size: 32px;
    line-height: 140%;
    width: 290px;
  `,
  Tip: styled.div`
    ${Title3_Regular}
    color: #8C8C8C;
    font-size: 20px;
  `,
  Button: styled.button`
    ${Body1_Medium}
    display: inline-flex;
    padding: 19px 120px;
    justify-content: center;
    align-items: center;
    width: 297px;
    height: 59px;
    border-radius: 6px;
    opacity: 0;
    pointer-events: none;
    color: ${colors.Hyundai_White};
    background: ${colors.Main_Hyundai_Blue};
    gap: 10px;
  `,
};

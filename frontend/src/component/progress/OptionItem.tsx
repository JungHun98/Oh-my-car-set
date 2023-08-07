import React from 'react';
import styled from 'styled-components';
import {colors} from '@/style/theme';
interface OptionItemProps {
  idx: number;
  menuName: string;
  selected: boolean;
  onClick: () => void;
}

function OptionItem({idx, menuName, selected, onClick}: OptionItemProps) {
  const handleClick = () => {
    onClick();
  };

  return (
    <Wrapper onClick={handleClick}>
      <Option selected={selected}>
        0{idx + 1} {menuName}
      </Option>
    </Wrapper>
  );
}

export default OptionItem;

const Wrapper = styled.div`
  width: 120px;
  height: 100%;
  text-align: center;
`;
const Option = styled.p<{selected: boolean}>`
  color: ${(props) =>
    props.selected ? colors.Main_Hyundai_Blue : colors.Cool_Grey_002};
  font-family: 'Title5_Medium';
  font-style: normal;
  font-display: swap;
  line-height: 130%;
  letter-spacing: -3%;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;

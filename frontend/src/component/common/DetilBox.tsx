import {colors} from '@/style/theme';
import React, {useRef} from 'react';
import styled from 'styled-components';
import {Label2_Regular} from '@/style/fonts';

interface Info {
  title: string;
  description: string;
}
interface DetailData {
  title: string;
  description: string;
  info?: string;
}

interface DetailBoxProps {
  isOpen: boolean;
  id: number;
  descriptionData: DetailData | null;
}
function DetailBox({isOpen, id, descriptionData}: DetailBoxProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  let info: React.JSX.Element[] = [];
  if (descriptionData?.info) {
    info = JSON.parse(descriptionData?.info).map(
      (elem: Info, index: number) => (
        <Info key={index}>
          <InfoTitle>{elem.title}</InfoTitle>
          <InfoDescription>{elem.description}</InfoDescription>
        </Info>
      ),
    );
  }

  return (
    <Wrapper $isOpen={isOpen} $height={contentRef?.current?.clientHeight}>
      <DetailContent ref={contentRef}>
        <DescriptionBox>{descriptionData?.description}</DescriptionBox>
        {descriptionData?.info && <InfoBox>{info}</InfoBox>}
      </DetailContent>
    </Wrapper>
  );
}
export default DetailBox;

const Wrapper = styled.div<{$isOpen: boolean; $height?: number}>`
  position: relative;
  width: 334px;
  height: ${({$isOpen, $height}) => ($isOpen ? $height : '0')}px;
  opacity: ${({$isOpen}) => ($isOpen ? '1' : '0')};
  pointer-events: ${({$isOpen}) => !$isOpen && 'none'};
  overflow: hidden;
  transition:
    height 1s,
    opacity 1s;
`;

const DetailContent = styled.div`
  position: absolute;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  border-top: 1px solid ${colors.Cool_Grey_001};
`;

const DescriptionBox = styled.div`
  ${Label2_Regular}
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 334px;
  height: 64px;
  margin-top: 17px;
  padding: 12px;
  border-radius: 6px;
  background: #f3f3f3;
  gap: 8px;
`;

const Info = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;

  div {
    ${Label2_Regular}
  }
`;

const InfoTitle = styled.div``;
const InfoDescription = styled.div``;

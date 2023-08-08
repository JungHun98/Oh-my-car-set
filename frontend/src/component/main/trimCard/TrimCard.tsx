import Icon from '@/component/common/icons';
import {flexBetween} from '@/style/common';
import {Body2_Regular, Title2_Medium} from '@/style/fonts';
import {colors} from '@/style/theme';
import React, {useState} from 'react';
import {styled} from 'styled-components';

import trim from '@/assets/mocks/trim.json';
import TrimDescription from './trimDescription/TrimDescription';

type TrimData = {
  id: number;
  name: string;
  tag: string;
  price: number;
  route: string;
  description?: {
    title: string;
    hasDescription: boolean;
    descriptionData: Array<{
      main: string;
      sub: string;
    }>;
  } | null;
};

export interface TrimCardProps {
  trimData: TrimData;
}
function TrimCard({trimData}: TrimCardProps) {
  const [isHover, setIsHover] = useState<boolean>(false);
  return (
    <>
      <Card.Wrapper
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Card.Tag>{`#${trimData.tag}`}</Card.Tag>
        <Card.Name>{`${trimData.name}`}</Card.Name>
        <Card.PriceWrapper>
          <Card.Price>{`${trimData.price.toLocaleString()}원 부터`}</Card.Price>
          <Icon name="ArrowRight" size={20} />
        </Card.PriceWrapper>
        {isHover && (
          <>
            {trimData.description && (
              <TrimDescription trimDescription={trimData.description} />
            )}
          </>
        )}
      </Card.Wrapper>
    </>
  );
}
function TrimCardList() {
  return (
    <>
      {trim.map((trimItem) => (
        <TrimCard key={trimItem.id} trimData={trimItem} />
      ))}
    </>
  );
}

export default TrimCardList;

const Card = {
  Wrapper: styled.div`
    position: relative;
    width: 192px;
    height: 123px;
    border-radius: 6px;
    background: ${colors.Hyundai_White};
    color: ${colors.Cool_Grey};
    flex-shrink: 0;
    backdrop-filter: blur(12px);
    padding: 20px 14px 20px 20px;
    cursor: pointer;

    transition: all 0.1s;

    &:hover {
      color: white;
      background-color: ${colors.Main_Hyundai_Blue};

      & svg {
        fill: white;
      }
    }
  `,
  Tag: styled.p`
    ${Body2_Regular}
    margin-bottom : 8px;
  `,
  Name: styled.p`
    ${Title2_Medium}
    margin-bottom : 17px;
  `,
  PriceWrapper: styled.div`
    ${flexBetween}
  `,
  Price: styled.p`
    ${Body2_Regular}
  `,
};
